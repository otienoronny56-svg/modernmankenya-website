'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, LogOut, Sparkles, X } from 'lucide-react';
import { LAUNCH_CONFIG } from '@/lib/config/launch';

export const PreviewModeBanner: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if the bypass cookie exists
    const hasBypass = document.cookie.includes(`${LAUNCH_CONFIG.cookieName}=`);
    setIsPreview(hasBypass);
  }, []);

  const handleExitPreview = async () => {
    try {
      await fetch('/api/prelaunch/bypass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'exit' }),
      });
      // Delete cookie locally
      document.cookie = `${LAUNCH_CONFIG.cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      window.location.reload();
    } catch (err) {
      console.error('Failed to exit preview', err);
    }
  };

  if (!isPreview || isDismissed) return null;

  return (
    <aside
      aria-label="Staff Preview Mode"
      className="fixed bottom-4 left-4 z-50 bg-[#0A1226]/95 border border-brand-gold/80 backdrop-blur-md rounded-2xl shadow-2xl p-3 text-white max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-brand-gold uppercase tracking-wider leading-tight">
              VIP Testing Mode Active
            </div>
            <div className="text-[10px] text-slate-300 leading-tight">
              Public sees the Nov 17 Countdown
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] gap-2">
        <Link
          href="/coming-soon"
          className="text-brand-gold hover:underline flex items-center space-x-1 font-medium"
        >
          <Eye className="w-3 h-3" />
          <span>View Public Screen</span>
        </Link>

        <button
          onClick={handleExitPreview}
          className="text-slate-400 hover:text-rose-400 flex items-center space-x-1 font-medium transition-colors"
        >
          <LogOut className="w-3 h-3" />
          <span>Exit Preview</span>
        </button>
      </div>
    </aside>
  );
};

