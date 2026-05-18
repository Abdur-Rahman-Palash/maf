import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import LocaleLayoutClient from './LocaleLayoutClient';
// import SmoothScroll from '@/components/SmoothScroll';
// import UltraPremiumAnimations from '@/components/UltraPremiumAnimations';
// import UltraPremiumPageTransitions from '@/components/UltraPremiumPageTransitions';
// import UltraPremiumInteractions from '@/components/UltraPremiumInteractions';
 
export const metadata = {
  title: 'Masjid Salman al Farsi',
  description: 'Masjid Salman al Farsi - 2187 Fellowship Rd, Tucker, GA 30084',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
 
  const messages = await getMessages({locale});
 
  return (
    <LocaleLayoutClient locale={locale} messages={messages}>
      {children}
    </LocaleLayoutClient>
  );
}
