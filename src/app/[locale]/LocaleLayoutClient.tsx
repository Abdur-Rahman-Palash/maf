'use client';

import type { ReactNode } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LocaleLayoutClientProps {
  children: ReactNode;
  messages: Record<string, any>;
  locale: string;
}

export default function LocaleLayoutClient({ children, messages, locale }: LocaleLayoutClientProps) {
  const segments = useSelectedLayoutSegments();
  const isAdminPage = segments?.[0] === 'admin';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        {!isAdminPage && <Header />}
        <main className="flex-1">{children}</main>
        {!isAdminPage && <Footer />}
      </div>
    </NextIntlClientProvider>
  );
}
