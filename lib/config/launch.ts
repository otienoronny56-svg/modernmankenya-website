// Modern Man Kenya - Pre-Launch & Grand Opening Configuration

export const LAUNCH_CONFIG = {
  /**
   * Website is LIVE to the public.
   * Anyone can visit the site, browse collections, book fittings, and sign in.
   */
  isPrelaunch: false,

  /**
   * Official Launch Date & Time:
   * November 17, 2026 at 06:00:00 AM East Africa Time (Nairobi, UTC+3)
   */
  launchDate: '2026-11-17T06:00:00+03:00',

  /**
   * Secret Passcode for preview access:
   * Append `?preview=modernman2026` to any URL or enter it via the discreet lock
   * to unlock and test all 53 pages on your phone, tablet, and computer.
   */
  previewPasscode: process.env.PREVIEW_PASSCODE || 'modernman2026',

  /**
   * Name of the cookie that grants preview access to your browser
   */
  cookieName: 'mm_launch_preview_access',

  /**
   * Official Atelier details from brand profile
   */
  conciergeWhatsApp: '254114122510',
  conciergePhone: '+254 114 122 510',
  atelierEmail: 'info@modernmanke.com',
  atelierLocation: 'Trust Mansion, 1st Floor, opposite City Market, Tubman Road, Nairobi',
  atelierHours: 'Monday – Saturday: 9:00 AM – 7:00 PM EAT',
} as const;
