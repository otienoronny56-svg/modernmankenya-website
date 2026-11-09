import { NextResponse } from 'next/server';
import { getEmailTransporter, getDefaultFromAddress, getAdminNotificationEmail } from '@/lib/email/transporter';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const recipient = body.to || getAdminNotificationEmail();

    const transporter = getEmailTransporter();
    if (!transporter) {
      return NextResponse.json({
        success: false,
        error:
          'SMTP credentials not detected. Please add SMTP_PASS or RESEND_API_KEY in your environment variables (.env.local or Vercel).',
        config: {
          host: process.env.SMTP_HOST || 'smtp.resend.com (default)',
          port: process.env.SMTP_PORT || '465 (default)',
          user: process.env.SMTP_USER || 'resend (default)',
          from: getDefaultFromAddress(),
          status: 'Missing Password / API Key',
        },
      });
    }

    // Verify SMTP connection
    await transporter.verify();

    // Send luxury test email
    const from = getDefaultFromAddress();
    const info = await transporter.sendMail({
      from,
      to: recipient,
      subject: '✓ Modern Man Kenya — Automated Email System Verification',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; overflow: hidden;">
          <div style="background-color: #0A1128; padding: 24px; text-align: center; border-top: 4px solid #C5A059;">
            <div style="color: #C5A059; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;">
              Atelier Nairobi
            </div>
            <h1 style="color: #ffffff; font-size: 20px; margin: 6px 0 0 0; font-family: serif;">
              MODERN MAN KENYA
            </h1>
          </div>
          <div style="padding: 24px; color: #1e293b;">
            <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 14px; margin-bottom: 20px;">
              <strong style="color: #166534; font-size: 14px;">✓ SMTP Connection Successful!</strong>
              <p style="margin: 4px 0 0 0; color: #15803d; font-size: 13px;">
                Your automated email system is active. Customer receipts, M-Pesa order confirmations, and private appointment alerts are ready to deliver.
              </p>
            </div>
            <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
              <strong>Host:</strong> ${process.env.SMTP_HOST || 'smtp.resend.com'}<br>
              <strong>Port:</strong> ${process.env.SMTP_PORT || '465'}<br>
              <strong>Sender:</strong> ${from}<br>
              <strong>Recipient:</strong> ${recipient}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Test email successfully dispatched to ${recipient}`,
      messageId: info.messageId,
      accepted: info.accepted,
    });
  } catch (error: any) {
    console.error('SMTP test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'SMTP connection failed',
        code: error?.code,
      },
      { status: 500 }
    );
  }
}

