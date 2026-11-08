import { NextRequest, NextResponse } from 'next/server';
import { initiateStkPush, formatKenyanPhone } from '@/lib/mpesa/daraja';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, amountKes, orderNumber, description } = body;

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Phone number is required' }, { status: 400 });
    }

    if (!amountKes || Number(amountKes) <= 0) {
      return NextResponse.json({ success: false, error: 'Valid amount is required' }, { status: 400 });
    }

    const phoneValidation = formatKenyanPhone(phone);
    if (!phoneValidation.valid) {
      return NextResponse.json({ success: false, error: phoneValidation.error }, { status: 400 });
    }

    const orderRef = orderNumber || `MMK-${Date.now().toString().slice(-5)}`;

    const result = await initiateStkPush({
      phone: phoneValidation.formatted,
      amountKes: Number(amountKes),
      orderNumber: orderRef,
      description: description || 'Modern Man Kenya Tailoring',
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to initiate M-Pesa STK Push',
          responseCode: result.responseCode,
        },
        { status: 502 }
      );
    }

    // Persist pending payment session with checkoutRequestId
    try {
      const { getSupabaseAdmin } = await import('@/lib/supabase/server');
      const supabaseAdmin = getSupabaseAdmin();
      await (supabaseAdmin.from('orders') as any)
        .update({
          payment_method: 'mpesa_stk',
          mpesa_checkout_request_id: result.checkoutRequestId,
          mpesa_merchant_request_id: result.merchantRequestId,
          payment_status: 'pending',
        })
        .eq('order_number', orderRef);
    } catch (e) {
      console.warn('Notice updating order with checkoutRequestId:', e);
    }

    return NextResponse.json({
      success: true,
      checkoutRequestId: result.checkoutRequestId,
      merchantRequestId: result.merchantRequestId,
      customerMessage: result.customerMessage || 'Please check your phone and enter your M-Pesa PIN',
      phone: phoneValidation.formatted,
      amount: amountKes,
    });
  } catch (error: any) {
    console.error('STK Push API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error while processing M-Pesa request',
      },
      { status: 500 }
    );
  }
}
