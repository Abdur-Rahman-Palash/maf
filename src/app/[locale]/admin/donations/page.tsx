'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import DonationManager from '@/components/admin/DonationManager';
import { FaArrowLeft } from 'react-icons/fa';

export default function AdminDonationsPage() {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push(`/${locale}/admin`)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FaArrowLeft />
          Back to Admin Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donation Management</h1>
          <p className="mt-2 text-gray-600">Manage donations, track contributions, and generate reports</p>
        </div>
        <DonationManager />
      </div>
    </div>
  );
}
