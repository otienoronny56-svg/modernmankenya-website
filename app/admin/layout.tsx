import React from 'react';
import type { Metadata } from 'next';
import { AdminLayoutClient } from './AdminLayoutClient';

export const metadata: Metadata = {
  title: 'Atelier Admin Portal | Modern Man Kenya',
  description: 'Manage ready-to-wear collections, photography, and pricing for Modern Man Kenya.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
