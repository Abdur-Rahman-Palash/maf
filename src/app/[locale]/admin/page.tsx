'use client';
import { useState, useEffect } from 'react';
import AdminAuth from '@/components/AdminAuth';
import { getDashboardStats, initializeSampleData } from '@/lib/crudOperations';
import EventManager from '@/components/admin/EventManager';
import MemberManager from '@/components/admin/MemberManager';
import DonationManager from '@/components/admin/DonationManager';
import ContentManager from '@/components/admin/ContentManager';
import RealTimeSync from '@/components/admin/RealTimeSync';
import { 
  FaUsers, FaCalendarAlt, FaChartBar, FaCog, FaBell, FaMosque, 
  FaDonate, FaBook, FaComments, FaClock, FaChartLine, FaEye,
  FaEdit, FaTrash, FaPlus, FaDownload, FaUpload, FaSignOutAlt,
  FaUserCheck, FaUserTimes, FaEnvelope, FaFileAlt, FaImage,
  FaVideo, FaMicrophone, FaNewspaper, FaHandsHelping, FaPray,
  FaGraduationCap, FaCheck, FaMapMarkerAlt, FaUser, FaPlay
} from 'react-icons/fa';

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
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalMembers: 0,
    activeMembers: 0,
    totalDonations: 0,
    monthlyDonations: 0,
    totalContent: 0,
    publishedContent: 0
  });

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

  useEffect(() => {
    if (isAuthenticated) {
      initializeSampleData();
      const dashboardStats = getDashboardStats();
      setStats(dashboardStats);
    }
  }, [isAuthenticated]);

  const handleAuthSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const handleDataUpdate = () => {
    // Refresh dashboard stats when data changes
    const dashboardStats = getDashboardStats();
    setStats(dashboardStats);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventManager />;
      case 'members':
        return <MemberManager />;
      case 'donations':
        return <DonationManager />;
      case 'content':
        return <ContentManager />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
                    <p className="text-xs text-gray-500">{stats.upcomingEvents} upcoming</p>
                  </div>
                  <FaCalendarAlt className="text-3xl text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                    <p className="text-xs text-gray-500">{stats.activeMembers} active</p>
                  </div>
                  <FaUsers className="text-3xl text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Donations</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalDonations}</p>
                    <p className="text-xs text-gray-500">${stats.monthlyDonations.toLocaleString()} this month</p>
                  </div>
                  <FaDonate className="text-3xl text-purple-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Content</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalContent}</p>
                    <p className="text-xs text-gray-500">{stats.publishedContent} published</p>
                  </div>
                  <FaBook className="text-3xl text-orange-500" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('events')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus /> Add New Event
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaUsers /> Add Member
                </button>
                <button
                  onClick={() => setActiveTab('donations')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaDonate /> Record Donation
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <p className="text-gray-900 font-medium">System initialized successfully</p>
                    <p className="text-gray-600 text-sm">Just now</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Success</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div>
                    <p className="text-gray-900 font-medium">Sample data loaded</p>
                    <p className="text-gray-600 text-sm">Just now</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Setup</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-900 font-medium">Admin dashboard ready</p>
                    <p className="text-gray-600 text-sm">Just now</p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Ready</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

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

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaChartBar className="inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaCalendarAlt className="inline mr-2" />
              Events
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaUsers className="inline mr-2" />
              Members
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'donations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaDonate className="inline mr-2" />
              Donations
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaBook className="inline mr-2" />
              Content
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>

      {/* Real-time Sync Indicator */}
      <RealTimeSync onDataUpdate={handleDataUpdate} />
    </div>
  );
}
