// Safaricom Daraja M-Pesa STK Push (Lipa Na M-Pesa Online) Integration Module
// STRICTLY SERVER-SIDE ONLY - NEVER EXPOSE OR IMPORT IN CLIENT COMPONENTS

export interface DarajaConfig {
  environment: 'sandbox' | 'production';
  consumerKey: string;
  consumerSecret: string;
  passkey: string;
  shortcode: string;
  callbackUrl: string;
}

export function getDarajaConfig(): DarajaConfig {
  return {
    environment: (process.env.MPESA_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
    consumerKey:
      process.env.MPESA_CONSUMER_KEY ||
      '1E6PyFNCb88wTq0bLhGcG3mpUAXGVrndfDSHJL4zGzDhkFqH',
    consumerSecret:
      process.env.MPESA_CONSUMER_SECRET ||
      '3QZF10V7AjNfzHrcqpyFG2ca8SL2006SgmKTmow4jJFvkGKK29qPQFyRL9puLfhV',
    passkey:
      process.env.MPESA_PASSKEY ||
      'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
    shortcode: process.env.MPESA_SHORTCODE || '174379',
    callbackUrl:
      process.env.MPESA_CALLBACK_URL ||
      'https://www.modernmanke.com/api/payments/mpesa/callback',
  };
}

export function getDarajaBaseUrl(): string {
  const config = getDarajaConfig();
  return config.environment === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
}

/**
 * Format any Kenyan phone number to international E.164 without leading plus (2547XXXXXXXX or 2541XXXXXXXX)
 */
export function formatKenyanPhone(input: string): { valid: boolean; formatted: string; error?: string } {
  if (!input) return { valid: false, formatted: '', error: 'Phone number is required' };

  // Strip spaces, dashes, parentheses, plus
  let cleaned = input.replace(/[\s\-\(\)\+]/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.slice(1);
  } else if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
    cleaned = '254' + cleaned;
  }

  // Must start with 2547 or 2541 and be exactly 12 digits
  const isValid = /^254(7|1)\d{8}$/.test(cleaned);

  if (!isValid) {
    return {
      valid: false,
      formatted: cleaned,
      error: 'Please enter a valid Safaricom phone number (e.g. 0712 345 678 or 0110 123 456)',
    };
  }

  return { valid: true, formatted: cleaned };
}

// In-memory token cache to prevent redundant token generation requests
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Obtain OAuth Access Token from Safaricom Daraja API
 */
export async function getDarajaAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60000) {
    return cachedToken.token;
  }

  const config = getDarajaConfig();
  const baseUrl = getDarajaBaseUrl();
  const credentials = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64');

  const res = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Cache-Control': 'no-cache',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Failed to obtain Daraja access token:', errorText);
    throw new Error(`Daraja Auth Error: ${res.statusText}`);
  }

  const data = await res.json();
  const token = data.access_token;
  const expiresInMs = (parseInt(data.expires_in, 10) || 3599) * 1000;

  cachedToken = {
    token,
    expiresAt: now + expiresInMs,
  };

  return token;
}

/**
 * Generate Timestamp string formatted as YYYYMMDDHHmmss in East Africa Time (UTC+3)
 */
export function generateDarajaTimestamp(): string {
  const d = new Date();
  // Adjust to East Africa Time (UTC+3)
  const eatOffsetMs = 3 * 60 * 60 * 1000;
  const eatDate = new Date(d.getTime() + eatOffsetMs);

  const year = eatDate.getUTCFullYear();
  const month = String(eatDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(eatDate.getUTCDate()).padStart(2, '0');
  const hours = String(eatDate.getUTCHours()).padStart(2, '0');
  const minutes = String(eatDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(eatDate.getUTCSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

/**
 * Generate the encrypted password: Base64(Shortcode + Passkey + Timestamp)
 */
export function generateDarajaPassword(shortcode: string, passkey: string, timestamp: string): string {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
}

export interface StkPushParams {
  phone: string;
  amountKes: number;
  orderNumber: string;
  description?: string;
}

export interface StkPushResponse {
  success: boolean;
  merchantRequestId?: string;
  checkoutRequestId?: string;
  responseCode?: string;
  responseDescription?: string;
  customerMessage?: string;
  error?: string;
}

/**
 * Trigger Lipa Na M-Pesa Online STK Push prompt on user's phone
 */
export async function initiateStkPush({
  phone,
  amountKes,
  orderNumber,
  description = 'Modern Man Tailoring',
}: StkPushParams): Promise<StkPushResponse> {
  const phoneValidation = formatKenyanPhone(phone);
  if (!phoneValidation.valid) {
    return { success: false, error: phoneValidation.error };
  }

  // Enforce minimum amount of KES 1 for sandbox testing or production
  const finalAmount = Math.max(1, Math.round(amountKes));

  const config = getDarajaConfig();
  const baseUrl = getDarajaBaseUrl();
  const token = await getDarajaAccessToken();
  const timestamp = generateDarajaTimestamp();
  const password = generateDarajaPassword(config.shortcode, config.passkey, timestamp);

  // Clean account reference: max 12 characters, alphanumeric
  const accountRef = orderNumber.replace(/[^a-zA-Z0-9]/g, '').slice(-12) || 'MMKENYA';

  const payload = {
    BusinessShortCode: config.shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: finalAmount,
    PartyA: phoneValidation.formatted,
    PartyB: config.shortcode,
    PhoneNumber: phoneValidation.formatted,
    CallBackURL: config.callbackUrl,
    AccountReference: accountRef,
    TransactionDesc: description.slice(0, 32),
  };

  const res = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || data.ResponseCode !== '0') {
    console.error('Daraja STK Push Failed:', data);
    return {
      success: false,
      responseCode: data.ResponseCode || data.errorCode,
      responseDescription: data.ResponseDescription || data.errorMessage || 'Failed to initiate STK Push',
      error: data.ResponseDescription || data.errorMessage || 'Payment initiation failed',
    };
  }

  return {
    success: true,
    merchantRequestId: data.MerchantRequestID,
    checkoutRequestId: data.CheckoutRequestID,
    responseCode: data.ResponseCode,
    responseDescription: data.ResponseDescription,
    customerMessage: data.CustomerMessage || 'Please check your phone and enter your M-Pesa PIN',
  };
}

export interface StkQueryResponse {
  success: boolean;
  resultCode?: string;
  resultDesc?: string;
  isPaid: boolean;
  isCancelled: boolean;
  isPending: boolean;
  raw?: any;
}

/**
 * Query status of an ongoing STK Push request directly from Safaricom
 */
export async function queryStkPushStatus(checkoutRequestId: string): Promise<StkQueryResponse> {
  const config = getDarajaConfig();
  const baseUrl = getDarajaBaseUrl();
  const token = await getDarajaAccessToken();
  const timestamp = generateDarajaTimestamp();
  const password = generateDarajaPassword(config.shortcode, config.passkey, timestamp);

  const payload = {
    BusinessShortCode: config.shortcode,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestId,
  };

  const res = await fetch(`${baseUrl}/mpesa/stkpushquery/v1/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  // Safaricom ResultCodes:
  // "0": Transaction successful
  // "1032": Transaction cancelled by user
  // "1": The balance is insufficient
  // "1037": Timeout / No response from user phone
  // "2001": The initiator information is invalid
  const resultCode = String(data.ResultCode ?? '');
  const isPaid = resultCode === '0';
  const isCancelled = resultCode === '1032';
  const isPending = !isPaid && !isCancelled && (res.status === 200 || data.errorCode === '500.001.1001');

  return {
    success: res.ok,
    resultCode,
    resultDesc: data.ResultDesc || data.errorMessage || '',
    isPaid,
    isCancelled,
    isPending,
    raw: data,
  };
}
