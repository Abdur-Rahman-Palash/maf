import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default function ArchitecturePage() {
  redirect('/architecture/overview');
}
