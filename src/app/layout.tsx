import { Amiri } from 'next/font/google';
import { Philosopher } from 'next/font/google';
import "./globals.css";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body 
        className={`${amiri.variable} ${philosopher.variable} font-sans bg-slate-50 text-slate-900 overflow-x-hidden antialiased relative`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
