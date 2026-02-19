'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function AdminRedirect() {
  const router = useRouter();
  const locale = useLocale();

  // Redirect to locale-specific admin page
  router.replace(`/${locale}/admin`);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to admin dashboard...</p>
      </div>
    </div>
  );
}
