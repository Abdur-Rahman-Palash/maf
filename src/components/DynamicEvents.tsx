'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useEvents } from '@/hooks/useApiData';
import { Event } from '@/lib/crudOperations';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';

const DynamicEvents: React.FC = () => {
  const { data: events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load events. Please try again later.</p>
      </div>
    );
  }

  // Filter upcoming events
  const upcomingEvents = (events as Event[]).filter(event => 
    event.status === 'upcoming' && new Date(event.date) >= new Date()
  ).slice(0, 3); // Show only next 3 events

  if (upcomingEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No upcoming events at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <p className="text-lg text-gray-600">Join us for our upcoming mosque events and activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event: Event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {event.category}
                </span>
                <span className="text-sm text-gray-500">
                  {event.currentAttendees} / {event.maxAttendees || '∞'} attending
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-green-500" />
                    <span className="text-sm text-gray-600">
                      {event.maxAttendees ? 
                        `${Math.round((event.currentAttendees / event.maxAttendees) * 100)}% full` : 
                        'Open to all'
                      }
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default DynamicEvents;
