import {
  getEmailTransporter,
  getDefaultFromAddress,
  getDepartmentSenders,
  getAdminNotificationEmail,
} from './transporter';
import {
  renderCustomerOrderConfirmation,
  renderAdminOrderAlert,
  renderCustomerAppointmentConfirmation,
  renderAdminAppointmentAlert,
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
  const adminEmail = getAdminNotificationEmail();
  if (adminEmail) {
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
  const adminEmail = getAdminNotificationEmail();
  if (adminEmail) {
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

