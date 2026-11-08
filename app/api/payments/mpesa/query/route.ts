import { NextRequest, NextResponse } from 'next/server';
import { queryStkPushStatus } from '@/lib/mpesa/daraja';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const checkoutRequestId = searchParams.get('checkoutRequestId');
    const orderNumber = searchParams.get('orderNumber');

    if (!checkoutRequestId) {
      return NextResponse.json(
        { success: false, error: 'checkoutRequestId query parameter is required' },
        { status: 400 }
      );
    }

    const queryResult = await queryStkPushStatus(checkoutRequestId);

    // If transaction succeeded, mark the order as paid in the database and local cache!
    if (queryResult.isPaid) {
      if (orderNumber) {
        try {
          const { getSupabaseAdmin } = await import('@/lib/supabase/server');
          const supabaseAdmin = getSupabaseAdmin();
          await (supabaseAdmin.from('orders') as any)
            .update({
              payment_status: 'paid',
              fulfillment_status: 'confirmed',
            })
            .eq('order_number', orderNumber);
        } catch (dbErr) {
          console.warn('Notice updating order to paid via STK query:', dbErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      isPaid: queryResult.isPaid,
      isCancelled: queryResult.isCancelled,
      isPending: queryResult.isPending,
      resultCode: queryResult.resultCode,
      resultDesc: queryResult.resultDesc,
    });
  } catch (error: any) {
    console.error('STK Query API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error querying M-Pesa transaction status',
        isPending: true,
      },
      { status: 500 }
    );
  }
}
