import type { Currency } from '@/types';

/**
 * Universal Currency Formatter for Modern Man Kenya
 * Supported currencies: KES (Kenyan Shilling), USD (US Dollar), GBP (British Pound)
 */

export const EXCHANGE_RATES = {
  USD_PER_KES: 1 / 129.5, // ~129.5 KES per 1 USD
  GBP_PER_USD: 0.79,      // ~0.79 GBP per 1 USD
};

export function getCurrencySymbol(currency: Currency = 'KES'): string {
  switch (currency) {
    case 'USD':
      return '$';
    case 'GBP':
      return '£';
    case 'KES':
    default:
      return 'KES ';
  }
}

export function convertFromKes(
  priceKes: number,
  targetCurrency: Currency = 'KES',
  overrideUsd?: number
): number {
  if (targetCurrency === 'KES') {
    return priceKes;
  }
  const usd = overrideUsd && overrideUsd > 0 
    ? overrideUsd 
    : Math.round(priceKes * EXCHANGE_RATES.USD_PER_KES);

  if (targetCurrency === 'USD') {
    return usd;
  }
  if (targetCurrency === 'GBP') {
    return Math.round(usd * EXCHANGE_RATES.GBP_PER_USD);
  }
  return priceKes;
}

export function formatCurrencyPrice(
  priceKes: number,
  currency: Currency = 'KES',
  overrideUsd?: number
): string {
  const amount = convertFromKes(priceKes, currency, overrideUsd);

  if (currency === 'USD') {
    return `$${amount.toLocaleString()}`;
  }
  if (currency === 'GBP') {
    return `£${amount.toLocaleString()}`;
  }
  return `KES ${amount.toLocaleString()}`;
}
