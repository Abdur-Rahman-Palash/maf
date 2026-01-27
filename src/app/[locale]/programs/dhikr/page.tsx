'use client';

import { motion } from 'framer-motion';
import { FaHands, FaClock, FaUsers, FaBook } from 'react-icons/fa';

export default function Dhikr() {
  const dhikrSessions = [
    {
      title: 'Morning Dhikr',
      time: 'After Fajr Prayer',
      duration: '15 minutes',
      description: 'Daily morning remembrance and supplications'
    },
    {
      title: 'Evening Dhikr',
      time: 'After Maghrib Prayer',
      duration: '15 minutes',
      description: 'Daily evening remembrance and protection prayers'
    },
    {
      title: 'Friday Dhikr',
      time: 'After Jumuah Prayer',
      duration: '30 minutes',
      description: 'Special Friday gathering with extended remembrance'
    },
    {
      title: 'Weekend Dhikr Circle',
      time: 'Saturday 4:00 PM',
      duration: '45 minutes',
      description: 'Community gathering with spiritual reflection'
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
            Dhikr from the Mosque
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Daily remembrance and spiritual gatherings for peace and blessings
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {dhikrSessions.map((session, index) => (
            <motion.div
              key={session.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <FaHands className="text-3xl text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2 text-blue-600" />
                  <span>{session.time}</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">Duration:</span> {session.duration}
                </div>
                <p className="text-gray-600 pt-2 border-t">
                  {session.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Dhikr</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Spiritual Benefits</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Peace of mind and heart</li>
                <li>• Increased faith and devotion</li>
                <li>• Protection from negative thoughts</li>
                <li>• Closer connection to Allah</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Community Benefits</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Unity among believers</li>
                <li>• Shared spiritual experience</li>
                <li>• Learning from scholars</li>
                <li>• Building strong community bonds</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Participate</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <FaUsers className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Join Us</h3>
                <p className="text-gray-600">No registration required. Simply arrive at the prayer hall at the scheduled times.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaBook className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What to Bring</h3>
                <p className="text-gray-600">Bring your heart and mind. Dhikr books and prayer beads are available.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
