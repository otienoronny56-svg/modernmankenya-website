'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/common/SearchModal';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Header onOpenSearch={() => setSearchOpen(true)} />
      {children}
      <Footer />
      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
