import fs from 'fs';
import path from 'path';

export interface ClientMeasurementProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  savedDelivery: {
    town: string;
    streetAddress?: string;
    deliveryNotes?: string;
  };
  preferences: {
    fitStyle: 'slim_bespoke' | 'contemporary_tailored' | 'classic_comfort';
    shoulderSlope: 'normal' | 'sloping' | 'square';
    lapelPreference: 'peak_lapel' | 'notch_lapel' | 'shawl_collar';
    jacketVents: 'double_side_vents' | 'center_vent' | 'ventless';
    trouserBreak: 'no_break' | 'slight_break' | 'medium_break' | 'full_break';
    monogramInitials?: string;
    notes?: string;
  };
  measurements: {
    unit: 'inches' | 'cm';
    chest: number | null;
    waistStomach: number | null;
    hipsSeat: number | null;
    shoulderWidth: number | null;
    halfBack: number | null;
    jacketLength: number | null;
    sleeveLengthLeft: number | null;
    sleeveLengthRight: number | null;
    neckCollar: number | null;
    bicep: number | null;
    wrist: number | null;
    trouserWaist: number | null;
    trouserSeat: number | null;
    trouserOutseam: number | null;
    trouserInseam: number | null;
    thigh: number | null;
    knee: number | null;
    ankleOpening: number | null;
    crotchRise: number | null;
  };
  approvalStatus: 'approved' | 'pending_review' | 'needs_update';
  approvedBy?: string;
  approvedAt?: string;
  tailorNotes?: string;
  // 2FA Security fields
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  twoFactorMethod?: 'totp' | 'sms';
  backupCodes?: string[];
  updatedAt: string;
  createdAt: string;
}

const STORAGE_FILE = path.join(process.cwd(), 'data', 'custom_clients.json');

const INITIAL_CLIENTS: ClientMeasurementProfile[] = [
  {
    id: 'client-seed-01',
    email: 'david.mwangi@gmail.com',
    fullName: 'David Mwangi',
    phone: '+254 722 458 910',
    savedDelivery: {
      town: 'Kilimani, Nairobi',
      streetAddress: 'Wood Avenue Court, 4th Floor',
      deliveryNotes: 'Call on arrival at reception. White-glove suit bag required.',
    },
    preferences: {
      fitStyle: 'contemporary_tailored',
      shoulderSlope: 'normal',
      lapelPreference: 'peak_lapel',
      jacketVents: 'double_side_vents',
      trouserBreak: 'slight_break',
      monogramInitials: 'D.M.',
      notes: 'Prefers breathable English wools and horn buttons.',
    },
    measurements: {
      unit: 'inches',
      chest: 40.5,
      waistStomach: 34.0,
      hipsSeat: 41.0,
      shoulderWidth: 18.25,
      halfBack: 8.5,
      jacketLength: 30.0,
      sleeveLengthLeft: 25.0,
      sleeveLengthRight: 25.25,
      neckCollar: 16.0,
      bicep: 14.5,
      wrist: 7.25,
      trouserWaist: 34.0,
      trouserSeat: 41.5,
      trouserOutseam: 41.0,
      trouserInseam: 31.5,
      thigh: 24.0,
      knee: 17.5,
      ankleOpening: 15.0,
      crotchRise: 10.5,
    },
    approvalStatus: 'approved',
    approvedBy: 'Samuel M. (Master Cutter)',
    approvedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    tailorNotes: 'Right shoulder sits 0.25" lower. Armholes calibrated for natural ergonomic reach.',
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: 'client-seed-02',
    email: 'kevin.otieno@gmail.com',
    fullName: 'Kevin Otieno',
    phone: '+254 711 893 224',
    savedDelivery: {
      town: 'Westlands, Nairobi',
      streetAddress: 'Parklands Road, Sovereign Suites',
      deliveryNotes: 'Leave with concierge if after 5 PM.',
    },
    preferences: {
      fitStyle: 'slim_bespoke',
      shoulderSlope: 'square',
      lapelPreference: 'shawl_collar',
      jacketVents: 'double_side_vents',
      trouserBreak: 'no_break',
      monogramInitials: 'K.O.',
      notes: 'Black-tie and evening dinner wear focus.',
    },
    measurements: {
      unit: 'inches',
      chest: 42.0,
      waistStomach: 35.0,
      hipsSeat: 42.5,
      shoulderWidth: 19.0,
      halfBack: 9.0,
      jacketLength: 30.5,
      sleeveLengthLeft: 26.0,
      sleeveLengthRight: 26.0,
      neckCollar: 16.5,
      bicep: 15.0,
      wrist: 7.5,
      trouserWaist: 35.0,
      trouserSeat: 42.5,
      trouserOutseam: 42.0,
      trouserInseam: 32.0,
      thigh: 24.5,
      knee: 18.0,
      ankleOpening: 15.5,
      crotchRise: 10.75,
    },
    approvalStatus: 'pending_review',
    tailorNotes: 'Awaiting in-person basted fitting calibration on Tubman Road.',
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

function readLocalClients(): ClientMeasurementProfile[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      writeLocalClients(INITIAL_CLIENTS);
      return INITIAL_CLIENTS;
    }
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CLIENTS;
  } catch (err) {
    console.error('Error reading custom clients file:', err);
    return INITIAL_CLIENTS;
  }
}

function writeLocalClients(clients: ClientMeasurementProfile[]) {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(clients, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing custom clients file:', err);
  }
}

export async function getAllClients(): Promise<ClientMeasurementProfile[]> {
  return readLocalClients();
}

export async function getClientProfile(emailOrId: string): Promise<ClientMeasurementProfile | null> {
  const clients = readLocalClients();
  const lower = emailOrId.toLowerCase().trim();
  const match = clients.find(
    (c) => c.email.toLowerCase() === lower || c.id === emailOrId || (c.phone && c.phone.replace(/\s+/g, '') === lower)
  );

  if (match) return match;

  // If email was given but not found, provide a clean default profile structure for that user
  if (emailOrId.includes('@')) {
    return {
      id: `client-${Date.now()}`,
      email: emailOrId.toLowerCase().trim(),
      fullName: emailOrId.split('@')[0].replace(/[._-]/g, ' '),
      phone: '',
      savedDelivery: {
        town: 'Nairobi',
        streetAddress: '',
        deliveryNotes: '',
      },
      preferences: {
        fitStyle: 'contemporary_tailored',
        shoulderSlope: 'normal',
        lapelPreference: 'peak_lapel',
        jacketVents: 'double_side_vents',
        trouserBreak: 'slight_break',
        monogramInitials: '',
        notes: '',
      },
      measurements: {
        unit: 'inches',
        chest: null,
        waistStomach: null,
        hipsSeat: null,
        shoulderWidth: null,
        halfBack: null,
        jacketLength: null,
        sleeveLengthLeft: null,
        sleeveLengthRight: null,
        neckCollar: null,
        bicep: null,
        wrist: null,
        trouserWaist: null,
        trouserSeat: null,
        trouserOutseam: null,
        trouserInseam: null,
        thigh: null,
        knee: null,
        ankleOpening: null,
        crotchRise: null,
      },
      approvalStatus: 'pending_review',
      tailorNotes: 'New client profile. Book an atelier fitting or enter self-measurements.',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  }

  return null;
}

export async function upsertClientProfile(
  data: Partial<ClientMeasurementProfile> & { email: string }
): Promise<ClientMeasurementProfile> {
  const clients = readLocalClients();
  const lowerEmail = data.email.toLowerCase().trim();
  const index = clients.findIndex((c) => c.email.toLowerCase() === lowerEmail || (data.id && c.id === data.id));

  const now = new Date().toISOString();

  if (index > -1) {
    const existing = clients[index];
    const updated: ClientMeasurementProfile = {
      ...existing,
      ...data,
      savedDelivery: {
        ...existing.savedDelivery,
        ...(data.savedDelivery || {}),
      },
      preferences: {
        ...existing.preferences,
        ...(data.preferences || {}),
      },
      measurements: {
        ...existing.measurements,
        ...(data.measurements || {}),
      },
      updatedAt: now,
    };
    clients[index] = updated;
    writeLocalClients(clients);
    return updated;
  } else {
    const newProfile: ClientMeasurementProfile = {
      id: data.id || `client-${Date.now()}`,
      email: lowerEmail,
      fullName: data.fullName || lowerEmail.split('@')[0],
      phone: data.phone || '',
      savedDelivery: {
        town: data.savedDelivery?.town || 'Nairobi',
        streetAddress: data.savedDelivery?.streetAddress || '',
        deliveryNotes: data.savedDelivery?.deliveryNotes || '',
      },
      preferences: {
        fitStyle: data.preferences?.fitStyle || 'contemporary_tailored',
        shoulderSlope: data.preferences?.shoulderSlope || 'normal',
        lapelPreference: data.preferences?.lapelPreference || 'peak_lapel',
        jacketVents: data.preferences?.jacketVents || 'double_side_vents',
        trouserBreak: data.preferences?.trouserBreak || 'slight_break',
        monogramInitials: data.preferences?.monogramInitials || '',
        notes: data.preferences?.notes || '',
      },
      measurements: {
        unit: data.measurements?.unit || 'inches',
        chest: data.measurements?.chest ?? null,
        waistStomach: data.measurements?.waistStomach ?? null,
        hipsSeat: data.measurements?.hipsSeat ?? null,
        shoulderWidth: data.measurements?.shoulderWidth ?? null,
        halfBack: data.measurements?.halfBack ?? null,
        jacketLength: data.measurements?.jacketLength ?? null,
        sleeveLengthLeft: data.measurements?.sleeveLengthLeft ?? null,
        sleeveLengthRight: data.measurements?.sleeveLengthRight ?? null,
        neckCollar: data.measurements?.neckCollar ?? null,
        bicep: data.measurements?.bicep ?? null,
        wrist: data.measurements?.wrist ?? null,
        trouserWaist: data.measurements?.trouserWaist ?? null,
        trouserSeat: data.measurements?.trouserSeat ?? null,
        trouserOutseam: data.measurements?.trouserOutseam ?? null,
        trouserInseam: data.measurements?.trouserInseam ?? null,
        thigh: data.measurements?.thigh ?? null,
        knee: data.measurements?.knee ?? null,
        ankleOpening: data.measurements?.ankleOpening ?? null,
        crotchRise: data.measurements?.crotchRise ?? null,
      },
      approvalStatus: data.approvalStatus || 'pending_review',
      approvedBy: data.approvedBy,
      approvedAt: data.approvedAt,
      tailorNotes: data.tailorNotes || 'Profile registered. Ready for Master Cutter calibration.',
      updatedAt: now,
      createdAt: now,
    };
    clients.unshift(newProfile);
    writeLocalClients(clients);
    return newProfile;
  }
}

export async function approveClientMeasurements(
  emailOrId: string,
  approvedBy = 'Samuel M. (Master Cutter)',
  tailorNotes?: string
): Promise<ClientMeasurementProfile | null> {
  const clients = readLocalClients();
  const lower = emailOrId.toLowerCase().trim();
  const index = clients.findIndex((c) => c.email.toLowerCase() === lower || c.id === emailOrId);

  if (index === -1) return null;

  clients[index].approvalStatus = 'approved';
  clients[index].approvedBy = approvedBy;
  clients[index].approvedAt = new Date().toISOString();
  if (tailorNotes) {
    clients[index].tailorNotes = tailorNotes;
  }
  clients[index].updatedAt = new Date().toISOString();

  writeLocalClients(clients);
  return clients[index];
}

export async function get2FAStatus(emailOrId: string): Promise<{ enabled: boolean; method?: 'totp' | 'sms' }> {
  const clients = readLocalClients();
  const lower = emailOrId.toLowerCase().trim();
  const client = clients.find((c) => c.email.toLowerCase() === lower || c.id === emailOrId);
  return {
    enabled: Boolean(client?.twoFactorEnabled),
    method: client?.twoFactorMethod || 'totp',
  };
}

export async function set2FAEnabled(
  emailOrId: string,
  secret: string,
  backupCodes: string[],
  method: 'totp' | 'sms' = 'totp'
): Promise<boolean> {
  const clients = readLocalClients();
  const lower = emailOrId.toLowerCase().trim();
  const index = clients.findIndex((c) => c.email.toLowerCase() === lower || c.id === emailOrId);
  if (index === -1) return false;

  clients[index].twoFactorEnabled = true;
  clients[index].twoFactorSecret = secret;
  clients[index].twoFactorMethod = method;
  clients[index].backupCodes = backupCodes;
  clients[index].updatedAt = new Date().toISOString();

  writeLocalClients(clients);
  return true;
}

export async function disable2FA(emailOrId: string): Promise<boolean> {
  const clients = readLocalClients();
  const lower = emailOrId.toLowerCase().trim();
  const index = clients.findIndex((c) => c.email.toLowerCase() === lower || c.id === emailOrId);
  if (index === -1) return false;

  clients[index].twoFactorEnabled = false;
  delete clients[index].twoFactorSecret;
  delete clients[index].backupCodes;
  clients[index].updatedAt = new Date().toISOString();

  writeLocalClients(clients);
  return true;
}

export async function verifyClient2FA(
  emailOrId: string,
  token: string
): Promise<{ valid: boolean; usedBackupCode?: boolean }> {
  const clients = readLocalClients();
  const lower = emailOrId.toLowerCase().trim();
  const index = clients.findIndex((c) => c.email.toLowerCase() === lower || c.id === emailOrId);
  if (index === -1) return { valid: false };

  const client = clients[index];
  if (!client.twoFactorEnabled) return { valid: true };

  const cleanToken = token.trim().toUpperCase();

  // Check backup codes first
  if (client.backupCodes && client.backupCodes.includes(cleanToken)) {
    // Consume used backup code
    client.backupCodes = client.backupCodes.filter((c) => c !== cleanToken);
    client.updatedAt = new Date().toISOString();
    writeLocalClients(clients);
    return { valid: true, usedBackupCode: true };
  }

  // Check TOTP
  if (client.twoFactorSecret) {
    const { verifyTOTP } = await import('@/lib/auth/twoFactor');
    const isValid = verifyTOTP(client.twoFactorSecret, cleanToken);
    if (isValid) return { valid: true };
  }

  return { valid: false };
}

