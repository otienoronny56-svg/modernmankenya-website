// Modern Man Kenya - Pre-Launch & Grand Opening Configuration

export const LAUNCH_CONFIG = {
  /**
   * Set NEXT_PUBLIC_LAUNCH_STATUS="live" in Vercel Environment Variables
   * or change this to false when you are ready to open the full site to the public.
   */
  isPrelaunch: process.env.NEXT_PUBLIC_LAUNCH_STATUS !== 'live',

  /**
   * Official Launch Date & Time:
   * November 17, 2026 at 09:00:00 AM East Africa Time (Nairobi, UTC+3)
   */
  launchDate: '2026-11-17T09:00:00+03:00',

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
  conciergePhone: '+254 718 923 082',
  atelierEmail: 'info@modernmanke.com',
  atelierLocation: 'Trust Mansion, 1st Floor, opposite City Market, Tubman Road, Nairobi',
  atelierHours: 'Monday – Saturday: 9:00 AM – 7:00 PM EAT',
} as const;
