'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Mail,
  Send,
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Eye,
  FileText,
  Bookmark
} from 'lucide-react';

interface AudienceStats {
  clientsCount: number;
  waitlistCount: number;
  combinedCount: number;
  adminEmails: string[];
}

const TEMPLATES = [
  {
    name: 'New Collection Announcement',
    subject: 'Modern Man Kenya • The 2026 Executive Sartorial Collection',
    heading: 'The 2026 Executive Sartorial Collection',
    message:
      'We are pleased to unveil our newest curation of Super 130s and Super 150s pure wool suiting, celebratory jacquard fabrics, and sartorial tunics.\n\nCrafted with full and half-floating canvas architectures, each piece is measured to the millimeter for unmatched silhouette drape and longevity.\n\nExplore the lookbook or reserve an exclusive one-on-one atelier fitting in our Nairobi CBD studio.',
    ctaText: 'Explore The Collection',
    ctaUrl: 'https://www.modernmanke.com/bespoke/the-craft',
    sender: 'info' as const,
  },
  {
    name: 'Private Atelier Fitting Invitation',
    subject: 'Private Fitting Invitation • Reserve Your Master Tailor Session',
    heading: 'An Exclusive Invitation to Your Private Fitting',
    message:
      'Distinguished Client,\n\nOur master tailors are currently scheduling personalized basted fitting sessions for the upcoming celebratory season.\n\nWhether preparing for a black-tie gala, an executive presentation, or your wedding day, we invite you to experience our Tubman Road atelier with private beverage service and over 4,000 curated global textiles.',
    ctaText: 'Book Private Fitting',
    ctaUrl: 'https://www.modernmanke.com/bespoke/book-fitting',
    sender: 'sales' as const,
  },
  {
    name: 'Artisanal Fragrance & Accessories Release',
    subject: 'Sensory Sartorial • Introducing Atelier Fragrances & Silk Accents',
    heading: 'Signature Fragrances & Pure Silk Accessories',
    message:
      'Complete your presence with our newly arrived artisanal fragrances — including Atelier Santal & Black Leather and Savile Cedar & Spiced Vetiver.\n\nNow available alongside handcrafted brass cufflinks, woven silk ties, and hand-rolled pocket squares for immediate delivery across Kenya.',
    ctaText: 'Shop Ready-to-Wear',
    ctaUrl: 'https://www.modernmanke.com/ready-to-wear',
    sender: 'sales' as const,
  },
];

export default function AdminCommunicationsPage() {
  const [stats, setStats] = useState<AudienceStats>({
    clientsCount: 0,
    waitlistCount: 0,
    combinedCount: 0,
    adminEmails: ['otienoronny56@gmail.com'],
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Form states
  const [senderDepartment, setSenderDepartment] = useState<'info' | 'sales' | 'support'>('info');
  const [audience, setAudience] = useState<'all_clients' | 'waitlist' | 'all' | 'custom'>('all_clients');
  const [customEmail, setCustomEmail] = useState('otienoronny56@gmail.com');
  const [subject, setSubject] = useState(TEMPLATES[0].subject);
  const [heading, setHeading] = useState(TEMPLATES[0].heading);
  const [message, setMessage] = useState(TEMPLATES[0].message);
  const [ctaText, setCtaText] = useState(TEMPLATES[0].ctaText);
  const [ctaUrl, setCtaUrl] = useState(TEMPLATES[0].ctaUrl);

  // Action states
  const [sendingTest, setSendingTest] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);
  const [confirmBroadcast, setConfirmBroadcast] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchAudienceStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('/api/admin/communications');
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
        if (data.stats.adminEmails?.[0]) {
          setCustomEmail(data.stats.adminEmails[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching communications stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchAudienceStats();
  }, []);

  const applyTemplate = (tpl: (typeof TEMPLATES)[number]) => {
    setSubject(tpl.subject);
    setHeading(tpl.heading);
    setMessage(tpl.message);
    setCtaText(tpl.ctaText);
    setCtaUrl(tpl.ctaUrl);
    setSenderDepartment(tpl.sender);
    setFeedback({ type: 'success', text: `Loaded template: "${tpl.name}"` });
  };

  const handleSendTest = async () => {
    const testRecipient = stats.adminEmails[0] || customEmail || 'otienoronny56@gmail.com';
    setSendingTest(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `[TEST PREVIEW] ${subject}`,
          heading,
          message,
          ctaText,
          ctaUrl,
          audience: 'custom',
          customEmail: testRecipient,
          senderDepartment,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          text: `Test email dispatched to ${testRecipient} from ${senderDepartment}@modernmanke.com! Check your inbox.`,
        });
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'Failed to dispatch test email.',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: err.message || 'Network error while dispatching test email.',
      });
    } finally {
      setSendingTest(false);
    }
  };

  const handleBroadcast = async () => {
    setBroadcasting(true);
    setFeedback(null);
    setConfirmBroadcast(false);

    try {
      const res = await fetch('/api/admin/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          heading,
          message,
          ctaText,
          ctaUrl,
          audience,
          customEmail: audience === 'custom' ? customEmail : undefined,
          senderDepartment,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          text: `Campaign successfully broadcasted to ${data.successCount} recipients from ${senderDepartment}@modernmanke.com!`,
        });
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'Failed to broadcast campaign.',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: err.message || 'Error occurred during campaign broadcast.',
      });
    } finally {
      setBroadcasting(false);
    }
  };

  const getAudienceCount = () => {
    if (audience === 'all_clients') return stats.clientsCount;
    if (audience === 'waitlist') return stats.waitlistCount;
    if (audience === 'all') return stats.combinedCount;
    return customEmail ? customEmail.split(',').filter((e) => e.includes('@')).length : 1;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-brand-gold text-xs font-bold tracking-luxury uppercase mb-1">
            <Mail className="w-4 h-4" />
            <span>Atelier Concierge & Communications</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Newsletter & Campaign Broadcast
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dispatch luxury HTML announcements, invitations, and newsletters to your VIP clients and waitlist.
          </p>
        </div>

        <button
          onClick={fetchAudienceStats}
          disabled={loadingStats}
          className="inline-flex items-center space-x-2 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingStats ? 'animate-spin' : ''}`} />
          <span>Refresh Audience</span>
        </button>
      </div>

      {/* Audience Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Registered Clients</p>
            <p className="text-xl font-bold text-brand-navy">{stats.clientsCount} VIPs</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-brand-gold/15 text-brand-gold border border-brand-gold/30 flex items-center justify-center font-bold">
            <Bookmark className="w-5 h-5 text-brand-navy" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Launch Waitlist</p>
            <p className="text-xl font-bold text-brand-navy">{stats.waitlistCount} Leads</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total VIP Reach</p>
            <p className="text-xl font-bold text-emerald-800">{stats.combinedCount} Contacts</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-600 border border-stone-200 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-brand-navy" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Sender Inboxes</p>
            <p className="text-xs font-semibold text-brand-navy truncate">
              info@, sales@, support@
            </p>
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start space-x-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
          )}
          <span className="font-medium">{feedback.text}</span>
        </div>
      )}

      {/* Template Presets Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Quick Editorial Templates:
        </p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.name}
              type="button"
              onClick={() => applyTemplate(tpl)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 hover:bg-brand-navy hover:text-brand-gold text-slate-700 border border-slate-200 transition-colors"
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Composer (Left) & Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Broadcast Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <h2 className="font-serif text-lg font-bold text-brand-navy border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Compose Dispatch</span>
            <span className="text-xs font-mono font-normal text-slate-400">
              Target Audience: {getAudienceCount()} Recipient{getAudienceCount() === 1 ? '' : 's'}
            </span>
          </h2>

          <div className="space-y-5 text-xs sm:text-sm">
            {/* Sender Department Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Sending Address (Department)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSenderDepartment('info')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    senderDepartment === 'info'
                      ? 'border-brand-navy bg-brand-navy text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <p className="font-bold text-xs">info@modernmanke.com</p>
                  <p className={`text-[10px] mt-0.5 ${senderDepartment === 'info' ? 'text-brand-gold' : 'text-slate-500'}`}>
                    General & Announcements
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSenderDepartment('sales')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    senderDepartment === 'sales'
                      ? 'border-brand-navy bg-brand-navy text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <p className="font-bold text-xs">sales@modernmanke.com</p>
                  <p className={`text-[10px] mt-0.5 ${senderDepartment === 'sales' ? 'text-brand-gold' : 'text-slate-500'}`}>
                    Private Orders & Releases
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSenderDepartment('support')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    senderDepartment === 'support'
                      ? 'border-brand-navy bg-brand-navy text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <p className="font-bold text-xs">support@modernmanke.com</p>
                  <p className={`text-[10px] mt-0.5 ${senderDepartment === 'support' ? 'text-brand-gold' : 'text-slate-500'}`}>
                    VIP Concierge & Fittings
                  </p>
                </button>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Target Audience
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'all_clients', label: `Clients (${stats.clientsCount})` },
                  { id: 'waitlist', label: `Waitlist (${stats.waitlistCount})` },
                  { id: 'all', label: `All VIPs (${stats.combinedCount})` },
                  { id: 'custom', label: 'Single / Test Email' },
                ].map((aud) => (
                  <button
                    key={aud.id}
                    type="button"
                    onClick={() => setAudience(aud.id as any)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                      audience === aud.id
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-navy font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {aud.label}
                  </button>
                ))}
              </div>

              {audience === 'custom' && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="Enter recipient email (e.g. client@example.com)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Separate multiple test emails with commas.
                  </p>
                </div>
              )}
            </div>

            {/* Subject Line */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                3. Subject Line
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Modern Man Kenya • The 2026 Executive Collection"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-brand-gold focus:outline-hidden font-medium"
              />
            </div>

            {/* Email Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                4. Email Headline (H2)
              </label>
              <input
                type="text"
                required
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="e.g. The Sartorial Edit: Pure Wool & Bespoke Mastery"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-brand-gold focus:outline-hidden font-medium"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                5. Message Body (Markdown / Paragraphs)
              </label>
              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement or newsletter paragraphs here..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-brand-gold focus:outline-hidden leading-relaxed font-sans"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: Separate paragraphs with a blank line for clean spacing.
              </p>
            </div>

            {/* CTA Button Text & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Button Label (Optional)
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="e.g. Reserve Private Fitting"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Button Link URL (Optional)
                </label>
                <input
                  type="text"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="e.g. https://www.modernmanke.com/bespoke/book-fitting"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleSendTest}
                disabled={sendingTest || broadcasting}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sendingTest ? 'Sending Test...' : 'Send Test to Admin'}</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmBroadcast(true)}
                disabled={sendingTest || broadcasting || getAudienceCount() === 0}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center space-x-2 border border-brand-gold/30 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {broadcasting
                    ? 'Broadcasting Campaign...'
                    : `Broadcast to ${getAudienceCount()} Recipient${getAudienceCount() === 1 ? '' : 's'}`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Luxury Email Preview */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
              <Eye className="w-4 h-4 text-brand-navy" />
              <span>Live Email Preview</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              From: {senderDepartment}@modernmanke.com
            </span>
          </div>

          <div className="bg-slate-100 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-inner">
            <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-luxury border border-slate-200 text-slate-800">
              {/* Email Top Navy Header */}
              <div className="bg-[#0A1128] p-5 text-center border-b-2 border-[#C5A059]">
                <div className="relative w-28 h-10 mx-auto mb-1">
                  <Image
                    src="/images/logo-full.png"
                    alt="Modern Man Kenya"
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
                <p className="text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold">
                  NAIROBI ATELIER • TUBMAN ROAD
                </p>
              </div>

              {/* Email Body Card */}
              <div className="p-6 space-y-4">
                <div className="border-b border-[#C5A059]/40 pb-2">
                  <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                    ATELIER DISPATCH
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#0A1128] mt-1">
                    {heading || 'Headline Preview'}
                  </h3>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                  {message.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {ctaText && (
                  <div className="text-center pt-4 border-t border-slate-100">
                    <span className="inline-block bg-[#0A1128] text-[#C5A059] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg border border-[#C5A059] shadow-xs cursor-pointer">
                      {ctaText} →
                    </span>
                  </div>
                )}
              </div>

              {/* Email Footer */}
              <div className="bg-[#0A1128] p-4 text-center text-[10px] text-slate-400 border-t border-white/10 space-y-1">
                <p className="font-semibold text-white">Modern Man Kenya</p>
                <p>Tubman Road, Nairobi CBD • Mon-Sat 8:00 AM - 7:00 PM</p>
                <p className="text-slate-500">
                  Direct Concierge: +254 700 000 000 • {senderDepartment}@modernmanke.com
                </p>
                <p className="text-[9px] text-slate-600 pt-2 border-t border-white/5">
                  © 2026 Modern Man Kenya. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmBroadcast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif text-xl font-bold text-brand-navy">
                Confirm Campaign Dispatch
              </h3>
              <p className="text-xs text-slate-600">
                You are about to broadcast this luxury email to{' '}
                <strong className="text-brand-navy">{getAudienceCount()} recipient(s)</strong>{' '}
                from <strong className="text-brand-navy">{senderDepartment}@modernmanke.com</strong>.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p className="text-slate-500 font-medium">
                Subject: <span className="text-slate-800 font-semibold">{subject}</span>
              </p>
              <p className="text-slate-500 font-medium">
                Audience: <span className="text-slate-800 font-semibold">{audience.replace('_', ' ')}</span>
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmBroadcast(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBroadcast}
                className="flex-1 py-2.5 rounded-xl bg-brand-navy text-brand-gold text-xs font-bold uppercase tracking-wider hover:bg-brand-navy/90 transition-colors shadow-md"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

