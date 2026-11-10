import {
  getEmailTransporter,
  getDefaultFromAddress,
  getDepartmentSenders,
  getAdminNotificationEmails,
  getAdminNotificationEmail,
} from './transporter';
import {
  renderCustomerOrderConfirmation,
  renderAdminOrderAlert,
  renderCustomerAppointmentConfirmation,
  renderAdminAppointmentAlert,
  renderTwoFactorEmail,
  renderPasswordResetEmail,
  renderWelcomeMemberEmail,
  renderAdminNewMemberAlert,
  renderNewsletterEmail,
} from './templates';

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  previewOnly?: boolean;
}

/**
 * Universal safe email dispatcher supporting custom departmental senders
 */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
  from,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  from?: string;
}): Promise<SendEmailResult> {
  const transporter = getEmailTransporter();
  const senderFrom = from || getDefaultFromAddress();

  if (!transporter) {
    console.info(`[Email Preview Mode] From: ${senderFrom} | To: ${to} | Subject: "${subject}"`);
    return {
      success: true,
      previewOnly: true,
      messageId: `mock-msg-${Date.now()}`,
    };
  }

  try {
    const info = await transporter.sendMail({
      from: senderFrom,
      to,
      subject,
      html,
      replyTo: replyTo || senderFrom,
    });

    console.info(`[Email Sent] Message ID: ${info.messageId} from: ${senderFrom} to: ${to}`);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: any) {
    console.error(`[Email Send Error] Failed to send to ${to}:`, err);
    return {
      success: false,
      error: err?.message || 'Unknown email transmission error',
    };
  }
}

/**
 * Send Customer & Admin emails when an order is created (Dispatched via sales@modernmanke.com)
 */
export async function dispatchOrderEmails(orderData: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryLocation: string;
  items: Array<{
    name: string;
    priceKes: number;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  totalAmountKes: number;
  paymentStatus: 'paid' | 'pending' | 'on_delivery';
  notes?: string;
}) {
  const tasks: Promise<SendEmailResult>[] = [];
  const salesSender = getDepartmentSenders().sales;

  // 1. Customer Confirmation (if valid email provided)
  if (orderData.customerEmail && orderData.customerEmail.includes('@') && !orderData.customerEmail.includes('example.com')) {
    const customerHtml = renderCustomerOrderConfirmation(orderData);
    tasks.push(
      sendEmail({
        from: salesSender,
        to: orderData.customerEmail,
        subject: `Your Commission Confirmation: ${orderData.orderNumber} • Modern Man Kenya`,
        html: customerHtml,
      })
    );
  }

  // 2. Admin Alert to Ronny / Atelier Team
  const adminEmails = getAdminNotificationEmails();
  for (const adminEmail of adminEmails) {
    const adminHtml = renderAdminOrderAlert(orderData);
    tasks.push(
      sendEmail({
        from: salesSender,
        to: adminEmail,
        subject: `🛎️ New Order Received: ${orderData.orderNumber} (KES ${orderData.totalAmountKes.toLocaleString()})`,
        html: adminHtml,
        replyTo: orderData.customerEmail || undefined,
      })
    );
  }

  return Promise.allSettled(tasks);
}

/**
 * Send Customer & Admin emails when an appointment is booked (Dispatched via support@modernmanke.com)
 */
export async function dispatchAppointmentEmails(appointmentData: {
  referenceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  fittingType: string;
  locationType: string;
  appointmentDate: string;
  timeSlot: string;
  notes?: string;
}) {
  const tasks: Promise<SendEmailResult>[] = [];
  const supportSender = getDepartmentSenders().support;

  // 1. Customer Confirmation
  if (appointmentData.clientEmail && appointmentData.clientEmail.includes('@') && !appointmentData.clientEmail.includes('example.com')) {
    const customerHtml = renderCustomerAppointmentConfirmation(appointmentData);
    tasks.push(
      sendEmail({
        from: supportSender,
        to: appointmentData.clientEmail,
        subject: `Your Bespoke Fitting Confirmed: ${appointmentData.referenceId} • Modern Man Kenya`,
        html: customerHtml,
      })
    );
  }

  // 2. Admin Alert to Ronny / Atelier Team
  const adminEmails = getAdminNotificationEmails();
  for (const adminEmail of adminEmails) {
    const adminHtml = renderAdminAppointmentAlert(appointmentData);
    tasks.push(
      sendEmail({
        from: supportSender,
        to: adminEmail,
        subject: `📅 New Fitting Booking: ${appointmentData.clientName} (${appointmentData.appointmentDate} at ${appointmentData.timeSlot})`,
        html: adminHtml,
        replyTo: appointmentData.clientEmail,
      })
    );
  }

  return Promise.allSettled(tasks);
}

/**
 * Send 2-Step Authentication Verification Code via Email (support@modernmanke.com)
 */
export async function dispatchTwoFactorCode({ email, code }: { email: string; code: string }) {
  const supportSender = getDepartmentSenders().support;
  const html = renderTwoFactorEmail({ code, email });
  return sendEmail({
    from: supportSender,
    to: email,
    subject: `Your Security Verification Code: ${code} • Modern Man Kenya`,
    html,
  });
}

/**
 * Send Password Reset Link via Email (support@modernmanke.com)
 */
export async function dispatchPasswordResetEmail({ email, resetUrl }: { email: string; resetUrl: string }) {
  const supportSender = getDepartmentSenders().support;
  const html = renderPasswordResetEmail({ resetUrl, email });
  return sendEmail({
    from: supportSender,
    to: email,
    subject: 'Reset Your Password • Modern Man Kenya',
    html,
  });
}

/**
 * Send Welcome Email to New Member & Alert Admins (info@modernmanke.com)
 */
export async function dispatchNewMemberEmails({
  fullName,
  email,
  phone,
}: {
  fullName: string;
  email: string;
  phone?: string;
}) {
  const tasks: Promise<SendEmailResult>[] = [];
  const infoSender = getDepartmentSenders().info;

  // 1. Send Welcome Email to New Client
  if (email && email.includes('@') && !email.includes('example.com')) {
    const welcomeHtml = renderWelcomeMemberEmail({ fullName, email });
    tasks.push(
      sendEmail({
        from: infoSender,
        to: email,
        subject: `Welcome to Modern Man Kenya • Your Bespoke Membership`,
        html: welcomeHtml,
      })
    );
  }

  // 2. Alert Atelier Admins of New Registration
  const adminEmails = getAdminNotificationEmails();
  for (const adminEmail of adminEmails) {
    const adminHtml = renderAdminNewMemberAlert({ fullName, email, phone });
    tasks.push(
      sendEmail({
        from: infoSender,
        to: adminEmail,
        subject: `🛎️ New VIP Member Registered: ${fullName} (${email})`,
        html: adminHtml,
        replyTo: email,
      })
    );
  }

  return Promise.allSettled(tasks);
}

/**
 * Broadcast Newsletter / Campaign to a list of recipients
 */
export async function dispatchNewsletterBroadcast({
  subject,
  heading,
  message,
  ctaText,
  ctaUrl,
  recipients,
  senderDepartment = 'info',
}: {
  subject: string;
  heading: string;
  message: string;
  ctaText?: string;
  ctaUrl?: string;
  recipients: string[];
  senderDepartment?: 'info' | 'sales' | 'support';
}) {
  const senders = getDepartmentSenders();
  const from = senders[senderDepartment] || senders.info;
  const html = renderNewsletterEmail({ heading, message, ctaText, ctaUrl });

  const results: { email: string; success: boolean; messageId?: string; error?: string }[] = [];

  for (const to of recipients) {
    if (!to || !to.includes('@')) continue;
    const res = await sendEmail({
      from,
      to,
      subject,
      html,
    });
    results.push({
      email: to,
      success: res.success,
      messageId: res.messageId,
      error: res.error,
    });
  }

  return results;
}

