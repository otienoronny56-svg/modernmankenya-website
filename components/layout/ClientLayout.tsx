'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/common/SearchModal';
import { FloatingWhatsAppButton } from '@/components/common/FloatingWhatsAppButton';
import { ModernManAIAssistant } from '@/components/common/ModernManAIAssistant';
import { MemberVisitPrompt } from '@/components/common/MemberVisitPrompt';
import { PreviewModeBanner } from '@/components/prelaunch/PreviewModeBanner';
import { AuthProvider } from '@/lib/auth/AuthContext';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isComingSoon = pathname === '/coming-soon';

  // Do not render consumer store header/footer inside the admin portal
  if (isAdmin) {
    return <>{children}</>;
  }

  // Pre-launch holding page is self-contained
  if (isComingSoon) {
    return (
      <>
        {children}
        <PreviewModeBanner />
      </>
    );
  }

  return (
    <AuthProvider>
      <Header onOpenSearch={() => setSearchOpen(true)} />
      {children}
      <Footer />
      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <FloatingWhatsAppButton />
      <ModernManAIAssistant />
      <MemberVisitPrompt />
      <PreviewModeBanner />
    </AuthProvider>
  );
};
