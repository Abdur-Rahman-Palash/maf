'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Friday Jumu'ah Prayer",
      date: "Every Friday",
      time: "1:30 PM",
      description: "Weekly congregational prayer with sermon",
      type: "weekly"
    },
    {
      id: 2,
      title: "Weekend Islamic School",
      date: "Saturday & Sunday",
      time: "10:00 AM - 12:00 PM",
      description: "Quranic studies and Islamic education for children",
      type: "weekly"
    },
    {
      id: 3,
      title: "Ramadan Iftar",
      date: "Coming Soon",
      time: "Sunset",
      description: "Community iftar during the holy month of Ramadan",
      type: "special"
    },
    {
      id: 4,
      title: "Eid Celebration",
      date: "Coming Soon",
      time: "Morning Prayer",
      description: "Eid prayer and community celebration",
      type: "special"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Events & Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for our regular prayers, educational programs, and special community events
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                event.type === 'special' 
                  ? 'border-l-amber-500' 
                  : 'border-l-emerald-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-emerald-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-emerald-600" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.type === 'special'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {event.type === 'special' ? 'Special Event' : 'Weekly'}
                </div>
              </div>
              <p className="text-gray-600">{event.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Regular Prayer Schedule</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Fajr", time: "5:30 AM", description: "Morning prayer" },
              { name: "Dhuhr", time: "1:30 PM", description: "Noon prayer" },
              { name: "Asr", time: "4:30 PM", description: "Afternoon prayer" },
              { name: "Maghrib", time: "7:00 PM", description: "Sunset prayer" },
              { name: "Isha", time: "8:30 PM", description: "Night prayer" },
              { name: "Jumu'ah", time: "1:30 PM", description: "Friday prayer" }
            ].map((prayer, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center">
                <h3 className="font-bold text-gray-900 mb-1">{prayer.name}</h3>
                <p className="text-emerald-600 font-semibold mb-1">{prayer.time}</p>
                <p className="text-sm text-gray-600">{prayer.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get Involved</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-emerald-50 rounded-lg p-4 mb-3">
                <FaUsers className="text-3xl text-emerald-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Volunteer</h3>
              <p className="text-sm text-gray-600">Help us organize and run community events</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-50 rounded-lg p-4 mb-3">
                <FaMapMarkerAlt className="text-3xl text-amber-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm text-gray-600">Join us at 2187 Fellowship Rd, Tucker, GA</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
