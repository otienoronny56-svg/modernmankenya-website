'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/common/SearchModal';
import { FloatingWhatsAppButton } from '@/components/common/FloatingWhatsAppButton';
import { ModernManAIAssistant } from '@/components/common/ModernManAIAssistant';
import { PreviewModeBanner } from '@/components/prelaunch/PreviewModeBanner';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import { LAUNCH_CONFIG } from '@/lib/config/launch';

interface ClientLayoutProps {
  children: React.ReactNode;
  hasBypass?: boolean;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children, hasBypass = false }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isComingSoon = pathname === '/coming-soon';

  // Do not render consumer store header/footer inside the admin portal
  if (isAdmin) {
    return <>{children}</>;
  }

  // Pre-launch holding page: when prelaunch is active and user does not have preview bypass,
  // render ONLY children! NO Header, NO Footer, NO AI Assistant, NO WhatsApp button, NO bottom prompts!
  const isPrelaunchLocked = LAUNCH_CONFIG.isPrelaunch && !hasBypass;

  if (isComingSoon || isPrelaunchLocked) {
    return <main className="h-screen max-h-screen w-screen overflow-hidden">{children}</main>;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Header onOpenSearch={() => setSearchOpen(true)} />
        {children}
        <Footer />
        <CartDrawer />
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <FloatingWhatsAppButton />
        <ModernManAIAssistant />
        <PreviewModeBanner />
      </AuthProvider>
    </ThemeProvider>
  );
};
