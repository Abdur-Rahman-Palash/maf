import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { Amiri } from 'next/font/google';
import { Philosopher } from 'next/font/google';
import "../globals.css";
import SmoothScroll from '@/components/SmoothScroll';
import UltraPremiumAnimations from '@/components/UltraPremiumAnimations';
import UltraPremiumPageTransitions from '@/components/UltraPremiumPageTransitions';
import UltraPremiumInteractions from '@/components/UltraPremiumInteractions';
 
const amiri = Amiri({ 
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-philosopher',
  display: 'swap',
});

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
 
  const messages = await getMessages();
 
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body 
        className={`${amiri.variable} ${philosopher.variable} font-serif bg-slate-50 text-slate-900 overflow-x-hidden antialiased relative`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          {/* <UltraPremiumPageTransitions>
            <UltraPremiumAnimations>
              <UltraPremiumInteractions> */}
                <SmoothScroll>
                  {children}
                </SmoothScroll>
              {/* </UltraPremiumInteractions>
            </UltraPremiumAnimations>
          </UltraPremiumPageTransitions> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
