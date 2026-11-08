import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const callback = data?.Body?.stkCallback;
    if (!callback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted but missing stkCallback body' });
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callback;

    console.log(`[M-Pesa Webhook] CheckoutRequestID: ${CheckoutRequestID}, ResultCode: ${ResultCode}, ResultDesc: ${ResultDesc}`);

    if (ResultCode === 0) {
      // Payment Successful!
      let amountPaid = 0;
      let mpesaReceipt = '';
      let transactionDate = '';
      let phoneNumber = '';

      if (CallbackMetadata?.Item && Array.isArray(CallbackMetadata.Item)) {
        for (const item of CallbackMetadata.Item) {
          if (item.Name === 'Amount') amountPaid = Number(item.Value);
          if (item.Name === 'MpesaReceiptNumber') mpesaReceipt = String(item.Value);
          if (item.Name === 'TransactionDate') transactionDate = String(item.Value);
          if (item.Name === 'PhoneNumber') phoneNumber = String(item.Value);
        }
      }

      console.log(`[M-Pesa Success] Receipt: ${mpesaReceipt}, Amount: KES ${amountPaid}, Phone: ${phoneNumber}`);

      // Update matching order in Supabase
      try {
        const { getSupabaseAdmin } = await import('@/lib/supabase/server');
        const supabaseAdmin = getSupabaseAdmin();
        await (supabaseAdmin.from('orders') as any)
          .update({
            payment_status: 'paid',
            fulfillment_status: 'confirmed',
            mpesa_receipt: mpesaReceipt,
            special_instructions: `Paid via M-Pesa STK (Receipt: ${mpesaReceipt}, Date: ${transactionDate}, Phone: ${phoneNumber})`,
          })
          .eq('mpesa_checkout_request_id', CheckoutRequestID);
      } catch (dbErr) {
        console.warn('Notice updating order via webhook callback:', dbErr);
      }
    } else {
      console.log(`[M-Pesa Declined/Cancelled] Code: ${ResultCode}, Desc: ${ResultDesc}`);
    }

    // Safaricom expects a 200 response with ResultCode 0
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    console.error('M-Pesa callback processing error:', error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted with internal warning' });
  }
}
