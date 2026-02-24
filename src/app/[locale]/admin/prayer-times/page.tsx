'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import AdminAuth from '@/components/AdminAuth';
import PrayerTimesManager from '@/components/admin/PrayerTimesManager';
import { 
  FaArrowLeft, FaClock, FaMosque
} from 'react-icons/fa';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  permissions: string[];
}

export default function PrayerTimesAdminPage() {
  const router = useRouter();
  const locale = useLocale();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check for existing session
    const sessionData = sessionStorage.getItem('adminSession');
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        const now = new Date();
        const expires = new Date(session.expires);

        if (now < expires) {
          setAdminUser(session.user);
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('adminSession');
        }
      } catch (error) {
        sessionStorage.removeItem('adminSession');
      }
    }
  }, []);

  const handleAuthSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setAdminUser(null);
    router.push(`/${locale}/admin`);
  };

  const handleBackToDashboard = () => {
    router.push(`/${locale}/admin`);
  };

  const handleDataUpdate = () => {
    // Refresh data when prayer times are updated
    console.log('Prayer times updated');
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft />
                Back to Dashboard
              </button>
              <div className="flex items-center gap-3">
                <FaMosque className="text-2xl text-emerald-600" />
                <h1 className="text-xl font-bold text-gray-900">Prayer Times Management</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {adminUser?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 py-3 text-sm">
              <button
                onClick={handleBackToDashboard}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Admin Dashboard
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Prayer Times</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrayerTimesManager onDataUpdate={handleDataUpdate} />
      </div>
    </div>
  );
}
