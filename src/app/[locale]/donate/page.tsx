import { Metadata } from 'next';
import DonationForm from '@/components/DonationForm';

// Generate static params for static export
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' }
  ];
}



export const metadata: Metadata = {
  title: 'Donate - Masjid Salman al Farsi',
  description: 'Support Masjid Salman al Farsi with your generous donation. Help us serve the community and spread the message of peace.',
};

export default function DonatePage() {
  return <DonationForm />;
}
