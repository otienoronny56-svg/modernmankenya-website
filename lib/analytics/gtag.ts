// Google Analytics 4 (gtag.js) Utility for Modern Man Kenya

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-3VQRKJPB51';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Log a pageview to Google Analytics 4
 */
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
};

/**
 * Generic GA4 Event dispatcher
 */
export const event = ({
  action,
  category,
  label,
  value,
  params = {},
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, any>;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...params,
  });
};

/**
 * High-value Lead Generation Tracking
 * Tracks high-intent interactions: WhatsApp atelier chats, appointments, contact inquiries
 */
export const trackLead = ({
  leadType,
  source,
  label,
  valueKes,
}: {
  leadType: 'whatsapp' | 'appointment' | 'phone_call' | 'contact_form' | 'measurements_profile';
  source: string;
  label?: string;
  valueKes?: number;
}) => {
  event({
    action: 'generate_lead',
    category: 'Leads',
    label: `${leadType} | ${source}${label ? ` | ${label}` : ''}`,
    value: valueKes,
    params: {
      lead_type: leadType,
      lead_source: source,
      currency: 'KES',
    },
  });
};

/**
 * Dedicated WhatsApp Atelier Lead Tracker
 */
export const trackWhatsAppClick = (source: string, garmentOrContext?: string) => {
  trackLead({
    leadType: 'whatsapp',
    source,
    label: garmentOrContext || 'Direct Consultation Inquiry',
  });
};

/**
 * Dedicated Appointment Booking Lead Tracker
 */
export const trackAppointmentBooking = ({
  fittingType,
  date,
  location,
}: {
  fittingType: string;
  date: string;
  location: string;
}) => {
  trackLead({
    leadType: 'appointment',
    source: 'book_appointment_wizard',
    label: `${fittingType} (${location}) on ${date}`,
    valueKes: 5000, // Estimated initial consultation lead value
  });
};

/**
 * Dedicated Client Measurement Profile Save Tracker
 */
export const trackMeasurementSave = (unit: string) => {
  trackLead({
    leadType: 'measurements_profile',
    source: 'client_account_dashboard',
    label: `Measurements Stored (${unit})`,
    valueKes: 25000, // High-intent custom client value
  });
};

/**
 * eCommerce: Add to Cart Tracker
 */
export const trackAddToCart = ({
  id,
  name,
  category,
  priceKes,
}: {
  id: string;
  name: string;
  category?: string;
  priceKes: number;
}) => {
  event({
    action: 'add_to_cart',
    category: 'eCommerce',
    label: name,
    value: priceKes,
    params: {
      items: [
        {
          item_id: id,
          item_name: name,
          item_category: category || 'Menswear',
          price: priceKes,
          quantity: 1,
        },
      ],
      currency: 'KES',
    },
  });
};
