import nodemailer from 'nodemailer';

/**
 * Returns a configured Nodemailer Transporter based on environment variables.
 * Compatible with Resend SMTP (smtp.resend.com), Namecheap Private Email, Zoho Mail, Gmail, etc.
 */
export function getEmailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.resend.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || 'resend';
  const pass = process.env.SMTP_PASS || process.env.RESEND_API_KEY || '';
  const secure = process.env.SMTP_SECURE === 'false' ? false : port === 465;

  if (!pass) {
    console.warn(
      '[Email Service] Notice: Neither SMTP_PASS nor RESEND_API_KEY is configured. Emails will be logged to console in preview mode.'
    );
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production' && !host.includes('localhost'),
    },
  });
}

/**
 * Modern Man Kenya standard sender signature
 */
export function getDefaultFromAddress(): string {
  return (
    process.env.SMTP_FROM ||
    `"Modern Man Kenya" <${process.env.SMTP_USER && process.env.SMTP_USER.includes('@') ? process.env.SMTP_USER : 'concierge@modernmanke.com'}>`
  );
}

/**
 * Atelier Administrator notification inbox
 */
export function getAdminNotificationEmail(): string {
  return process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'otienoronny56@gmail.com';
}

