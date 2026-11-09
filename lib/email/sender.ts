import { getEmailTransporter, getDefaultFromAddress, getAdminNotificationEmail } from './transporter';
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
 * Universal safe email dispatcher
 */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendEmailResult> {
  const transporter = getEmailTransporter();
  const from = getDefaultFromAddress();

  if (!transporter) {
    console.info(`[Email Preview Mode] To: ${to} | Subject: "${subject}"`);
    return {
      success: true,
      previewOnly: true,
      messageId: `mock-msg-${Date.now()}`,
    };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      replyTo: replyTo || from,
    });

    console.info(`[Email Sent] Message ID: ${info.messageId} to ${to}`);
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
 * Send Customer & Admin emails when an order is created
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

  // 1. Customer Confirmation (if valid email provided)
  if (orderData.customerEmail && orderData.customerEmail.includes('@') && !orderData.customerEmail.includes('example.com')) {
    const customerHtml = renderCustomerOrderConfirmation(orderData);
    tasks.push(
      sendEmail({
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
 * Send Customer & Admin emails when an appointment is booked
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

  // 1. Customer Confirmation
  if (appointmentData.clientEmail && appointmentData.clientEmail.includes('@') && !appointmentData.clientEmail.includes('example.com')) {
    const customerHtml = renderCustomerAppointmentConfirmation(appointmentData);
    tasks.push(
      sendEmail({
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
        to: adminEmail,
        subject: `📅 New Fitting Booking: ${appointmentData.clientName} (${appointmentData.appointmentDate} at ${appointmentData.timeSlot})`,
        html: adminHtml,
        replyTo: appointmentData.clientEmail,
      })
    );
  }

  return Promise.allSettled(tasks);
}

