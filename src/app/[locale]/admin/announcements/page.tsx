'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { FaArrowLeft, FaBell, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: string;
  priority: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}

export default function AdminAnnouncementsPage() {
  const router = useRouter();
  const locale = useLocale();

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Jumu\'ah Prayer Reminder',
      content: 'Every Friday at 1:30 PM - Please arrive early',
      type: 'prayer',
      priority: 'high',
      status: 'active',
      createdAt: '2024-05-10T10:00:00Z',
      expiresAt: '2024-12-31T23:59:59Z'
    },
    {
      id: 2,
      title: 'Ramadan Mubarak',
      content: 'Join us for daily Iftar and Taraweeh prayers',
      type: 'event',
      priority: 'high',
      status: 'active',
      createdAt: '2024-03-10T10:00:00Z',
      expiresAt: '2024-04-10T23:59:59Z'
    },
    {
      id: 3,
      title: 'Weekend Islamic School',
      content: 'Saturdays & Sundays 10 AM - 2 PM',
      type: 'education',
      priority: 'medium',
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      expiresAt: '2024-12-31T23:59:59Z'
    }
  ]);

  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddAnnouncement = () => {
    const newAnnouncement: Announcement = {
      id: Date.now(),
      title: 'New Announcement',
      content: 'Enter announcement content here',
      type: 'general',
      priority: 'medium',
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    setAnnouncements([...announcements, newAnnouncement]);
  };

  const handleDeleteAnnouncement = (id: number) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push(`/${locale}/admin`)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <FaArrowLeft />
          Back to Admin Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Announcement Management</h1>
          <p className="mt-2 text-gray-600">Manage announcements, prayer reminders, and community notifications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Announcements</p>
                <p className="text-2xl font-bold text-gray-800">{announcements.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaBell className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {announcements.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaPlus className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {announcements.filter(a => a.priority === 'high').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FaBell className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <button
            onClick={handleAddAnnouncement}
            className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
          >
            <FaPlus className="mr-2" />
            Add New Announcement
          </button>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      announcement.priority === 'high' 
                        ? 'bg-red-100 text-red-600'
                        : announcement.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {announcement.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      announcement.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {announcement.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Type: {announcement.type}</span>
                    <span>Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                    <span>Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingAnnouncement(announcement);
                      setShowAddModal(true);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
