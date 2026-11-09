/**
 * Modern Man Kenya — Luxury Responsive Email Templates
 * Styled with Sartorial Navy (#0A1128), Artisan Gold (#C5A059), and Crisp Ivory.
 */

interface OrderEmailData {
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
}

interface AppointmentEmailData {
  referenceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  fittingType: string;
  locationType: string;
  appointmentDate: string;
  timeSlot: string;
  notes?: string;
}

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1a202c;
  line-height: 1.6;
  background-color: #f7fafc;
  margin: 0;
  padding: 0;
`;

const headerHtml = `
  <div style="background-color: #0A1128; padding: 32px 24px; text-align: center; border-top: 4px solid #C5A059;">
    <div style="color: #C5A059; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">
      Atelier Nairobi • Savile Row Craftsmanship
    </div>
    <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: 0.08em; margin: 0; font-family: 'Times New Roman', serif;">
      MODERN MAN KENYA
    </h1>
    <div style="color: #94a3b8; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 4px;">
      Bespoke Sartorial & Luxury Perfumes
    </div>
  </div>
`;

const footerHtml = `
  <div style="background-color: #0d1527; padding: 28px 24px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #1e293b;">
    <p style="margin: 0 0 8px 0; color: #cbd5e1; font-weight: 600;">Modern Man Kenya Atelier</p>
    <p style="margin: 0 0 12px 0;">Nairobi, Kenya • WhatsApp Concierge: +254 700 000 000</p>
    <div style="margin: 14px 0;">
      <a href="https://www.modernmanke.com" style="color: #C5A059; text-decoration: none; margin: 0 10px; font-weight: 600;">Official Atelier</a> •
      <a href="https://www.modernmanke.com/ready-to-wear" style="color: #C5A059; text-decoration: none; margin: 0 10px; font-weight: 600;">Ready-to-Wear</a> •
      <a href="https://www.modernmanke.com/book-appointment" style="color: #C5A059; text-decoration: none; margin: 0 10px; font-weight: 600;">Book a Fitting</a>
    </div>
    <p style="margin: 16px 0 0 0; font-size: 11px; color: #64748b;">
      © ${new Date().getFullYear()} Modern Man Kenya. All rights reserved. Precision Sartorial Distinction.
    </p>
  </div>
`;

/**
 * 1. Customer Order Confirmation Email
 */
export function renderCustomerOrderConfirmation(data: OrderEmailData): string {
  const itemsRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 14px 8px; border-bottom: 1px solid #edf2f7; font-size: 14px;">
          <strong style="color: #0A1128;">${item.name}</strong>
          ${item.size ? `<br><span style="color: #64748b; font-size: 12px;">Size: ${item.size}</span>` : ''}
          ${item.color ? `<span style="color: #64748b; font-size: 12px;"> • ${item.color}</span>` : ''}
        </td>
        <td style="padding: 14px 8px; border-bottom: 1px solid #edf2f7; font-size: 14px; text-align: center; color: #475569;">
          × ${item.quantity}
        </td>
        <td style="padding: 14px 8px; border-bottom: 1px solid #edf2f7; font-size: 14px; text-align: right; font-weight: 700; color: #0A1128;">
          KES ${(item.priceKes * item.quantity).toLocaleString()}
        </td>
      </tr>
    `
    )
    .join('');

  const paymentInstructionHtml =
    data.paymentStatus === 'paid'
      ? `
      <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <div style="display: flex; align-items: center;">
          <strong style="color: #166534; font-size: 14px;">✓ Payment Confirmed via Safaricom M-Pesa</strong>
        </div>
        <p style="margin: 6px 0 0 0; color: #15803d; font-size: 13px;">
          Your sartorial commission is now queued for immediate atelier preparation and dispatch.
        </p>
      </div>
    `
      : `
      <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 18px; margin: 24px 0;">
        <strong style="color: #92400e; font-size: 14px; display: block; margin-bottom: 8px;">
          Settlement Instructions via Lipa Na M-Pesa:
        </strong>
        <p style="margin: 0 0 8px 0; color: #78350f; font-size: 13px;">
          To complete your order, send <strong>KES ${data.totalAmountKes.toLocaleString()}</strong> to our official Paybill:
        </p>
        <div style="background-color: #ffffff; border: 1px dashed #d97706; padding: 12px; border-radius: 6px; font-size: 13px; color: #0A1128;">
          <div>• <strong>Paybill Business Number:</strong> <span style="color: #b45309; font-weight: 800; font-size: 15px;">542542</span></div>
          <div>• <strong>Account Number:</strong> <span style="color: #b45309; font-weight: 800; font-size: 15px;">923082</span></div>
          <div>• <strong>Amount:</strong> KES ${data.totalAmountKes.toLocaleString()}</div>
        </div>
        <p style="margin: 8px 0 0 0; color: #92400e; font-size: 12px;">
          Once sent, your order will be instantly verified by our dispatch concierge.
        </p>
      </div>
    `;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Modern Man Kenya</title>
      </head>
      <body style="${baseStyles}">
        <div style="max-width: 620px; margin: 24px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          ${headerHtml}
          
          <div style="padding: 32px 28px;">
            <div style="border-bottom: 2px solid #C5A059; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="color: #C5A059; font-size: 12px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;">
                ORDER CONFIRMATION
              </span>
              <h2 style="margin: 4px 0 0 0; color: #0A1128; font-size: 22px; font-family: 'Times New Roman', serif;">
                Thank you for your commission, ${data.customerName}
              </h2>
              <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">
                Reference: <strong style="color: #0A1128;">${data.orderNumber}</strong> • Placed on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            <p style="font-size: 14px; color: #334155; line-height: 1.6;">
              We have received your bespoke order. Each item in our collection is crafted with unwavering sartorial standards. Below is the summary of your selected items:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
              <thead>
                <tr style="border-bottom: 2px solid #cbd5e1; text-align: left; font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
                  <th style="padding: 8px;">Item</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 16px 8px 6px 8px; font-size: 15px; font-weight: 700; color: #0A1128; text-align: right;">
                    Total Commission:
                  </td>
                  <td style="padding: 16px 8px 6px 8px; font-size: 18px; font-weight: 800; color: #C5A059; text-align: right;">
                    KES ${data.totalAmountKes.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>

            ${paymentInstructionHtml}

            <div style="background-color: #f8fafc; border-radius: 8px; padding: 18px; margin: 24px 0; border: 1px solid #e2e8f0;">
              <h3 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #0A1128;">
                Delivery Destination
              </h3>
              <p style="margin: 0; font-size: 14px; color: #475569;">
                📍 <strong>${data.deliveryLocation}</strong>
                ${data.notes ? `<br><span style="font-size: 12px; color: #64748b; margin-top: 4px; display: inline-block;">Notes: "${data.notes}"</span>` : ''}
              </p>
            </div>

            <div style="text-align: center; margin-top: 32px;">
              <a href="https://wa.me/254700000000?text=Hello%20Modern%20Man%20Kenya,%20I%20am%20inquiring%20about%20my%20order%20${encodeURIComponent(data.orderNumber)}" 
                 style="display: inline-block; background-color: #0A1128; color: #C5A059; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; padding: 14px 28px; border-radius: 6px; text-decoration: none; border: 1px solid #C5A059;">
                Connect With Atelier Concierge
              </a>
            </div>
          </div>

          ${footerHtml}
        </div>
      </body>
    </html>
  `;
}

/**
 * 2. Admin Alert: New Order Placed
 */
export function renderAdminOrderAlert(data: OrderEmailData): string {
  const itemsSummary = data.items
    .map((i) => `• ${i.name} (Qty: ${i.quantity}, Size: ${i.size || 'N/A'}) - KES ${(i.priceKes * i.quantity).toLocaleString()}`)
    .join('<br>');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Alert - Modern Man Kenya</title>
      </head>
      <body style="${baseStyles}">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; overflow: hidden;">
          <div style="background-color: #0A1128; padding: 20px; color: #ffffff;">
            <div style="color: #C5A059; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;">
              ATELIER ADMIN DISPATCH ALERT
            </div>
            <h2 style="margin: 4px 0 0 0; font-size: 20px;">New Order Placed: ${data.orderNumber}</h2>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; font-size: 14px; line-height: 1.8;">
              <tr>
                <td style="width: 140px; color: #64748b;"><strong>Customer:</strong></td>
                <td>${data.customerName}</td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Phone:</strong></td>
                <td><a href="tel:${data.customerPhone}" style="color: #0A1128; font-weight: 700;">${data.customerPhone || 'Not provided'}</a></td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Email:</strong></td>
                <td><a href="mailto:${data.customerEmail}">${data.customerEmail || 'Not provided'}</a></td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Location:</strong></td>
                <td>${data.deliveryLocation}</td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Total Amount:</strong></td>
                <td style="color: #b45309; font-weight: 800; font-size: 16px;">KES ${data.totalAmountKes.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Payment Status:</strong></td>
                <td><span style="background-color: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-weight: 700; text-transform: uppercase; font-size: 12px;">${data.paymentStatus}</span></td>
              </tr>
            </table>

            <div style="margin: 20px 0; padding: 16px; background-color: #f8fafc; border-left: 3px solid #C5A059; border-radius: 4px;">
              <strong style="display: block; font-size: 12px; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Commissioned Items:</strong>
              <div style="font-size: 13px; color: #1e293b;">
                ${itemsSummary}
              </div>
            </div>

            ${data.notes ? `<p style="font-size: 13px; color: #64748b;"><strong>Customer Notes:</strong> "${data.notes}"</p>` : ''}

            <div style="margin-top: 24px; text-align: center;">
              <a href="https://www.modernmanke.com/atelier-portal" style="background-color: #0A1128; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: 700;">
                Open Atelier Admin Portal →
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * 3. Customer Private Fitting / Appointment Confirmation Email
 */
export function renderCustomerAppointmentConfirmation(data: AppointmentEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sartorial Fitting Confirmation - Modern Man Kenya</title>
      </head>
      <body style="${baseStyles}">
        <div style="max-width: 620px; margin: 24px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          ${headerHtml}

          <div style="padding: 32px 28px;">
            <div style="border-bottom: 2px solid #C5A059; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="color: #C5A059; font-size: 12px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;">
                BESPOKE FITTING CONFIRMATION
              </span>
              <h2 style="margin: 4px 0 0 0; color: #0A1128; font-size: 24px; font-family: 'Times New Roman', serif;">
                Your Sartorial Session is Confirmed, ${data.clientName}
              </h2>
              <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">
                Booking Pass: <strong style="color: #0A1128;">${data.referenceId}</strong>
              </p>
            </div>

            <p style="font-size: 14px; color: #334155; line-height: 1.6;">
              Our Master Tailors have reserved your private appointment. We look forward to guiding you through our curated archive of Italian wools, English flannels, and bespoke styling disciplines.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <table style="width: 100%; font-size: 14px; line-height: 1.8;">
                <tr>
                  <td style="width: 140px; color: #64748b;"><strong>Fitting Discipline:</strong></td>
                  <td style="color: #0A1128; font-weight: 700;">${data.fittingType}</td>
                </tr>
                <tr>
                  <td style="color: #64748b;"><strong>Date & Time:</strong></td>
                  <td style="color: #C5A059; font-weight: 800; font-size: 15px;">
                    📅 ${data.appointmentDate} at 🕒 ${data.timeSlot}
                  </td>
                </tr>
                <tr>
                  <td style="color: #64748b;"><strong>Venue / Format:</strong></td>
                  <td style="color: #0A1128; font-weight: 600;">${data.locationType}</td>
                </tr>
                ${data.notes ? `
                <tr>
                  <td style="color: #64748b;"><strong>Client Notes:</strong></td>
                  <td style="color: #475569; font-style: italic;">"${data.notes}"</td>
                </tr>` : ''}
              </table>
            </div>

            <div style="border-left: 4px solid #C5A059; padding-left: 16px; margin: 24px 0;">
              <h4 style="margin: 0 0 6px 0; color: #0A1128; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">
                Appointment Preparation Note:
              </h4>
              <p style="margin: 0; font-size: 13px; color: #475569;">
                For accurate drape and shoulder contours, we recommend wearing a well-fitting collared dress shirt and the dress shoes you intend to wear with your commission.
              </p>
            </div>

            <div style="text-align: center; margin-top: 32px;">
              <a href="https://wa.me/254700000000?text=Hello%20Modern%20Man%20Kenya,%20I%20have%20an%20appointment%20${encodeURIComponent(data.referenceId)}%20on%20${encodeURIComponent(data.appointmentDate)}"
                 style="display: inline-block; background-color: #0A1128; color: #C5A059; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; padding: 14px 28px; border-radius: 6px; text-decoration: none; border: 1px solid #C5A059;">
                Reschedule or Message Concierge
              </a>
            </div>
          </div>

          ${footerHtml}
        </div>
      </body>
    </html>
  `;
}

/**
 * 4. Admin Alert: New Appointment Booked
 */
export function renderAdminAppointmentAlert(data: AppointmentEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Fitting Booking Alert - Modern Man Kenya</title>
      </head>
      <body style="${baseStyles}">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; overflow: hidden;">
          <div style="background-color: #0A1128; padding: 20px; color: #ffffff;">
            <div style="color: #C5A059; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;">
              ATELIER CALENDAR RESERVATION
            </div>
            <h2 style="margin: 4px 0 0 0; font-size: 20px;">New Fitting: ${data.clientName}</h2>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; font-size: 14px; line-height: 1.8;">
              <tr>
                <td style="width: 140px; color: #64748b;"><strong>Reference ID:</strong></td>
                <td><strong>${data.referenceId}</strong></td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Client Name:</strong></td>
                <td>${data.clientName}</td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Phone:</strong></td>
                <td><a href="tel:${data.clientPhone}" style="color: #0A1128; font-weight: 700;">${data.clientPhone}</a></td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Email:</strong></td>
                <td><a href="mailto:${data.clientEmail}">${data.clientEmail}</a></td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Discipline:</strong></td>
                <td><strong>${data.fittingType}</strong></td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Date & Time:</strong></td>
                <td style="color: #b45309; font-weight: 800;">${data.appointmentDate} at ${data.timeSlot}</td>
              </tr>
              <tr>
                <td style="color: #64748b;"><strong>Location:</strong></td>
                <td>${data.locationType}</td>
              </tr>
            </table>

            ${data.notes ? `
              <div style="margin: 16px 0; padding: 12px; background-color: #f8fafc; border-left: 3px solid #C5A059; font-size: 13px;">
                <strong>Client Request:</strong> "${data.notes}"
              </div>
            ` : ''}

            <div style="margin-top: 24px; text-align: center;">
              <a href="https://www.modernmanke.com/atelier-portal" style="background-color: #0A1128; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: 700;">
                View In Atelier Portal →
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

