'use client';

import React, { useState } from 'react';
import {
  Check,
  Copy,
  Smartphone,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles
} from 'lucide-react';
import { formatCurrencyPrice } from '@/lib/currency';

interface MpesaManualPaybillModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  totalAmountKes: number;
  customerName: string;
  customerPhone: string;
  deliveryLocation: string;
  items: Array<{ name: string; quantity: number; priceKes: number; size?: string }>;
  onConfirmPayment: (details: { receiptCode: string; fullMessage: string; method: 'whatsapp' | 'website' }) => void;
}

export function extractMpesaReceiptCode(text: string): string {
  if (!text) return '';
  // Match standard 10-character Safaricom M-Pesa receipt code at start of message or surrounded by whitespace
  const match = text.trim().match(/\b([A-Z0-9]{10})\b/i);
  return match ? match[1].toUpperCase() : '';
}

export const MpesaManualPaybillModal: React.FC<MpesaManualPaybillModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  totalAmountKes,
  customerName,
  customerPhone,
  deliveryLocation,
  items,
  onConfirmPayment,
}) => {
  const [copiedField, setCopiedField] = useState<'paybill' | 'acc' | 'amount' | null>(null);
  const [mpesaMessage, setMpesaMessage] = useState('');
  const [customReceipt, setCustomReceipt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const detectedCode = extractMpesaReceiptCode(mpesaMessage);
  const effectiveReceipt = customReceipt.trim().toUpperCase() || detectedCode;

  const copyToClipboard = (text: string, field: 'paybill' | 'acc' | 'amount') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField((curr) => (curr === field ? null : curr));
    }, 2000);
  };

  const handleConfirm = (sendViaWhatsApp: boolean) => {
    setIsSubmitting(true);
    const receiptToUse = effectiveReceipt || `MPESA-${Date.now().toString().slice(-6)}`;

    if (sendViaWhatsApp) {
      const itemLines = items
        .map((i) => `• ${i.quantity}x ${i.name}${i.size ? ` (Size: ${i.size})` : ''} - KES ${(i.priceKes * i.quantity).toLocaleString()}`)
        .join('\n');

      const waText = `Hello Modern Man Kenya Nairobi atelier,\nI have completed payment via Lipa Na M-Pesa Paybill:\n\n*Order Reference:* #${orderNumber}\n*Client:* ${customerName}\n*Phone:* ${customerPhone}\n*Delivery Location:* ${deliveryLocation}\n\n*Total Paid:* KES ${totalAmountKes.toLocaleString()}\n*Paybill:* 542542 | *Account:* 923082\n\n*M-Pesa Confirmation / Receipt:*\n${mpesaMessage.trim() || receiptToUse}\n\n*Items Ordered:*\n${itemLines}\n\nPlease verify and advise on dispatch schedule.`;

      const waUrl = `https://wa.me/254114122510?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    }

    onConfirmPayment({
      receiptCode: receiptToUse,
      fullMessage: mpesaMessage.trim(),
      method: sendViaWhatsApp ? 'whatsapp' : 'website',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#121622] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 text-left relative my-auto">
        
        {/* Subtle Luxury Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold via-amber-400 to-[#00A651] rounded-t-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Lipa Na M-Pesa + Order Reference */}
        <div className="pt-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-[#00A651] flex items-center justify-center text-white shadow-2xs">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#006B35] dark:text-emerald-400 block leading-tight">
                LIPA NA M-PESA
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Paybill 542542 Settlement
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Order Reference</span>
            <span className="font-mono font-bold text-xs text-brand-navy dark:text-brand-gold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              #{orderNumber}
            </span>
          </div>
        </div>

        {/* Total Payable Banner */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-3.5 mb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
              Total Amount Payable
            </span>
            <span className="text-xl sm:text-2xl font-serif font-black text-brand-navy dark:text-brand-gold">
              {formatCurrencyPrice(totalAmountKes, 'KES')}
            </span>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(String(totalAmountKes), 'amount')}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-navy dark:hover:text-white flex items-center space-x-1.5 shadow-2xs transition-all cursor-pointer"
          >
            {copiedField === 'amount' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Amount</span>
              </>
            )}
          </button>
        </div>

        {/* Step-by-Step Payment Instructions with 1-Click Copy */}
        <div className="space-y-2.5 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Payment Steps:
          </span>

          {/* Step 1 & 2: Paybill Number */}
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded-full bg-[#00A651] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Business / Paybill Number</span>
              </div>
              <div className="font-mono font-black text-lg text-brand-navy dark:text-white tracking-wider pl-5.5">
                542542
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard('542542', 'paybill')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-2xs cursor-pointer ${
                copiedField === 'paybill'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#00A651]/10 text-[#006B35] dark:text-emerald-300 hover:bg-[#00A651] hover:text-white border border-[#00A651]/30'
              }`}
            >
              {copiedField === 'paybill' ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Paybill</span>
                </>
              )}
            </button>
          </div>

          {/* Step 3: Account Number (Option A: Fixed 923082) */}
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded-full bg-[#00A651] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Account Number</span>
              </div>
              <div className="font-mono font-black text-lg text-brand-navy dark:text-white tracking-wider pl-5.5">
                923082
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard('923082', 'acc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-2xs cursor-pointer ${
                copiedField === 'acc'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-gold/15 text-brand-navy dark:text-brand-gold hover:bg-brand-navy hover:text-brand-gold border border-brand-gold/40'
              }`}
            >
              {copiedField === 'acc' ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Acc No</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step 4: Paste M-Pesa SMS Confirmation Message */}
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center">3</span>
              <span>Paste M-Pesa Confirmation SMS / Code:</span>
            </label>
            {detectedCode && (
              <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                Detected: {detectedCode}
              </span>
            )}
          </div>

          <textarea
            value={mpesaMessage}
            onChange={(e) => setMpesaMessage(e.target.value)}
            rows={2}
            placeholder="Paste your M-Pesa message here (e.g. QKH789234X Confirmed. Ksh... sent to 542542 - MODERN MAN...)"
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#00A651] font-mono resize-none"
          />

          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Paste the SMS from Safaricom or enter your 10-character M-Pesa code so our master cutters can verify and begin tailoring immediately.
          </p>
        </div>

        {/* Action Buttons: WhatsApp (Primary) + Website Direct */}
        <div className="space-y-2.5">
          {/* Primary: 1-Click WhatsApp Confirmation */}
          <button
            type="button"
            onClick={() => handleConfirm(true)}
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-[#00A651] hover:from-emerald-700 hover:to-[#008f45] text-white rounded-xl font-bold text-xs uppercase tracking-luxury flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>Confirm Order & Send via WhatsApp</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          {/* Secondary: Website Only Confirmation */}
          <button
            type="button"
            onClick={() => handleConfirm(false)}
            disabled={isSubmitting}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-xs transition-colors cursor-pointer text-center"
          >
            Confirm Order on Website Only (Without WhatsApp)
          </button>
        </div>

        {/* Footer Guarantee */}
        <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-center space-x-2 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
          <span>Verified Modern Man Kenya Nairobi Atelier • Trust Mansion, Tubman Road</span>
        </div>
      </div>
    </div>
  );
};
