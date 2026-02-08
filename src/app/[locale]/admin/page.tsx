'use client';
import { useState, useEffect } from 'react';
import AdminAuth from '@/components/AdminAuth';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  permissions: string[];
}

export default function AdminPage() {
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
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
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

      {/* Admin Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overview Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
            <p className="text-gray-600 text-sm">System overview and statistics</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details →
            </button>
          </div>

          {/* Content Management Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Content</h3>
            <p className="text-gray-600 text-sm">Manage website content</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage →
            </button>
          </div>

          {/* Members Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Members</h3>
            <p className="text-gray-600 text-sm">Member management</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage →
            </button>
          </div>

          {/* Donations Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Donations</h3>
            <p className="text-gray-600 text-sm">Donation records and reports</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add New Event
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Update Prayer Times
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Send Newsletter
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-900 font-medium">System backup completed</p>
                <p className="text-gray-600 text-sm">2 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Success</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-900 font-medium">New member registration</p>
                <p className="text-gray-600 text-sm">5 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">New</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-gray-900 font-medium">Prayer times updated</p>
                <p className="text-gray-600 text-sm">1 day ago</p>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Updated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
