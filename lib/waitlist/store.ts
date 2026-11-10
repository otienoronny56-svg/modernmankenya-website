import fs from 'fs';
import path from 'path';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

export interface WaitlistEntry {
  contact: string;
  contactType: 'email' | 'phone';
  fullName: string;
  createdAt: string;
}

export function readLocalWaitlist(): WaitlistEntry[] {
  try {
    if (!fs.existsSync(WAITLIST_FILE)) {
      return [];
    }
    const data = fs.readFileSync(WAITLIST_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading waitlist.json:', err);
    return [];
  }
}

export function writeLocalWaitlist(entries: WaitlistEntry[]) {
  try {
    const dir = path.dirname(WAITLIST_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing waitlist.json:', err);
  }
}

