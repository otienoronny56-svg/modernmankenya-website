import { NextResponse } from 'next/server';
import { getAllClients } from '@/lib/clients/store';
import { readLocalWaitlist } from '@/lib/waitlist/store';
import {
  dispatchNewsletterBroadcast,
  getDepartmentSenders,
  getAdminNotificationEmails,
} from '@/lib/email';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // 1. Fetch registered clients
    const clients = await getAllClients();
    const clientEmails = Array.from(
      new Set(
        clients
          .map((c) => c.email?.toLowerCase().trim())
          .filter((e): e is string => Boolean(e && e.includes('@') && !e.includes('example.com')))
      )
    );

    // 2. Fetch waitlist leads
    const localWaitlist = readLocalWaitlist();
    const waitlistEmailsSet = new Set<string>();

    for (const entry of localWaitlist) {
      if (entry.contact && entry.contact.includes('@')) {
        waitlistEmailsSet.add(entry.contact.toLowerCase().trim());
      }
    }

    // Try Supabase waitlist as well
    try {
      if (supabase) {
        const { data } = await (supabase as any)
          .from('launch_waitlist')
          .select('contact, contact_type');
        if (Array.isArray(data)) {
          for (const row of data) {
            if (row.contact && row.contact.includes('@')) {
              waitlistEmailsSet.add(row.contact.toLowerCase().trim());
            }
          }
        }
      }
    } catch {
      // Supabase table fallback
    }

    const waitlistEmails = Array.from(waitlistEmailsSet);
    const combinedEmails = Array.from(new Set([...clientEmails, ...waitlistEmails]));
    const adminEmails = getAdminNotificationEmails();
    const senders = getDepartmentSenders();

    return NextResponse.json({
      success: true,
      stats: {
        clientsCount: clientEmails.length,
        waitlistCount: waitlistEmails.length,
        combinedCount: combinedEmails.length,
        adminEmails,
      },
      senders,
    });
  } catch (err: any) {
    console.error('Error fetching communications audience:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch communications audience' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      subject,
      heading,
      message,
      ctaText,
      ctaUrl,
      audience = 'custom',
      customEmail,
      senderDepartment = 'info',
    } = body;

    if (!subject || !heading || !message) {
      return NextResponse.json(
        { success: false, error: 'Subject, heading, and message body are required.' },
        { status: 400 }
      );
    }

    let recipients: string[] = [];

    if (audience === 'custom') {
      if (!customEmail || !customEmail.includes('@')) {
        return NextResponse.json(
          { success: false, error: 'Please provide a valid recipient email address for custom dispatch.' },
          { status: 400 }
        );
      }
      recipients = customEmail
        .split(',')
        .map((e: string) => e.trim().toLowerCase())
        .filter((e: string) => e.includes('@'));
    } else if (audience === 'all_clients') {
      const clients = await getAllClients();
      recipients = Array.from(
        new Set(
          clients
            .map((c) => c.email?.toLowerCase().trim())
            .filter((e): e is string => Boolean(e && e.includes('@') && !e.includes('example.com')))
        )
      );
    } else if (audience === 'waitlist') {
      const waitlistEmailsSet = new Set<string>();
      const local = readLocalWaitlist();
      for (const entry of local) {
        if (entry.contact?.includes('@')) {
          waitlistEmailsSet.add(entry.contact.toLowerCase().trim());
        }
      }
      recipients = Array.from(waitlistEmailsSet);
    } else if (audience === 'all') {
      const clients = await getAllClients();
      const clientEmails = clients
        .map((c) => c.email?.toLowerCase().trim())
        .filter((e): e is string => Boolean(e && e.includes('@') && !e.includes('example.com')));
      const waitlist = readLocalWaitlist();
      const waitlistEmails = waitlist
        .map((w) => w.contact?.toLowerCase().trim())
        .filter((e): e is string => Boolean(e && e.includes('@')));
      recipients = Array.from(new Set([...clientEmails, ...waitlistEmails]));
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid recipient email addresses found for the chosen audience.' },
        { status: 400 }
      );
    }

    const results = await dispatchNewsletterBroadcast({
      subject,
      heading,
      message,
      ctaText: ctaText?.trim() || undefined,
      ctaUrl: ctaUrl?.trim() || undefined,
      recipients,
      senderDepartment: (['info', 'sales', 'support'].includes(senderDepartment)
        ? senderDepartment
        : 'info') as 'info' | 'sales' | 'support',
    });

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    return NextResponse.json({
      success: true,
      dispatchedCount: results.length,
      successCount,
      failureCount,
      results,
    });
  } catch (err: any) {
    console.error('Error dispatching campaign:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to dispatch campaign' },
      { status: 500 }
    );
  }
}

