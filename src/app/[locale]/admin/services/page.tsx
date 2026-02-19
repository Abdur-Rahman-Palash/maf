'use client';

import { useState, useEffect } from 'react';
import AdminAuth from '@/components/AdminAuth';
import ServiceManager from '@/components/admin/ServiceManager';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  permissions: string[];
}

export default function ServicesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    console.log('ServicesPage: Component mounted');
    
    // Check for existing session
    const sessionData = sessionStorage.getItem('adminSession');
    console.log('ServicesPage: Session data:', sessionData);
    
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        const now = new Date();
        const expires = new Date(session.expires);

        console.log('ServicesPage: Session valid:', now < expires);

        if (now < expires) {
          setAdminUser(session.user);
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('adminSession');
        }
      } catch (error) {
        console.error('ServicesPage: Session parse error:', error);
        sessionStorage.removeItem('adminSession');
      }
    }
  }, []);

  const handleAuthSuccess = (user: AdminUser) => {
    console.log('ServicesPage: Auth success:', user);
    setAdminUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('ServicesPage: Logging out');
    sessionStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  console.log('ServicesPage: Render state - Authenticated:', isAuthenticated, 'User:', adminUser);

  if (!isAuthenticated) {
    console.log('ServicesPage: Showing auth component');
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  console.log('ServicesPage: Showing admin dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Services Management</h1>
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
        <ServiceManager />
      </div>
    </div>
  );
}
