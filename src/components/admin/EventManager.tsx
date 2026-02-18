'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventManager, Event, initializeSampleData } from '@/lib/crudOperations';
import { eventsApi } from '@/lib/apiService';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaCalendarAlt,
  FaMapMarkerAlt, FaUsers, FaClock, FaSave, FaTimes, FaEye
} from 'react-icons/fa';

const EventManager: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({});

  useEffect(() => {
    initializeSampleData();
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, statusFilter]);

  const loadEvents = () => {
    const allEvents = eventManager.readAll();
    setEvents(allEvents);
  };

  const filterEvents = () => {
    let filtered = events;

    if (searchTerm) {
      filtered = eventManager.search(searchTerm, ['title', 'description', 'location', 'category']);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  };

  const handleCreate = async () => {
    try {
      const newEvent = eventManager.create({
        title: formData.title || '',
        description: formData.description || '',
        date: formData.date || '',
        time: formData.time || '',
        location: formData.location || '',
        category: formData.category || '',
        maxAttendees: formData.maxAttendees,
        currentAttendees: 0,
        status: 'upcoming'
      });

      // Also create via API to sync with homepage
      await eventsApi.create({
        title: formData.title || '',
        description: formData.description || '',
        date: formData.date || '',
        time: formData.time || '',
        location: formData.location || '',
        category: formData.category || '',
        maxAttendees: formData.maxAttendees,
        currentAttendees: 0,
        status: 'upcoming'
      });

      setEvents([...events, newEvent]);
      setIsCreateModalOpen(false);
      setFormData({});
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  const handleUpdate = () => {
    if (!selectedEvent) return;

    const updatedEvent = eventManager.update(selectedEvent.id, formData);
    if (updatedEvent) {
      setEvents(events.map(e => e.id === selectedEvent.id ? updatedEvent : e));
      setIsEditModalOpen(false);
      setSelectedEvent(null);
      setFormData({});
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      eventManager.delete(id);
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const openEditModal = (event: Event) => {
    setSelectedEvent(event);
    setFormData(event);
    setIsEditModalOpen(true);
  };

  const openViewModal = (event: Event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-green-500" />
                    <span>{event.currentAttendees} / {event.maxAttendees || 'Unlimited'} attendees</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => openViewModal(event)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => openEditModal(event)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">Create New Event</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="time"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max Attendees (optional)"
                  value={formData.maxAttendees || ''}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaSave className="inline mr-2" /> Create
                </button>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setFormData({});
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FaTimes className="inline mr-2" /> Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">Edit Event</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="time"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={formData.status || ''}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Event['status'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <input
                  type="number"
                  placeholder="Max Attendees (optional)"
                  value={formData.maxAttendees || ''}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaSave className="inline mr-2" /> Update
                </button>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedEvent(null);
                    setFormData({});
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FaTimes className="inline mr-2" /> Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">{selectedEvent.title}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Date & Time</h4>
                    <p className="text-gray-600">{selectedEvent.date} at {selectedEvent.time}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Status</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Location</h4>
                  <p className="text-gray-600">{selectedEvent.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Category</h4>
                  <p className="text-gray-600">{selectedEvent.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Attendees</h4>
                  <p className="text-gray-600">{selectedEvent.currentAttendees} / {selectedEvent.maxAttendees || 'Unlimited'}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setSelectedEvent(null);
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventManager;
