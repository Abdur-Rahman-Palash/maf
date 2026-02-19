'use client';

import { useState, useEffect } from 'react';
import AdminAuth from '@/components/AdminAuth';
import QuranAyahManager from '@/components/admin/QuranAyahManager';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  permissions: string[];
}

export default function QuranPage() {
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
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Quran Ayah Management</h1>
              <span className="ml-4 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                {adminUser?.role}
              </span>
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuranAyahManager />
      </div>
    </div>
  );
}
