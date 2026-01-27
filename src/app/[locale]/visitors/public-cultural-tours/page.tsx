'use client';

import { motion } from 'framer-motion';
import {FaUsers, FaClock, FaCalendarAlt, FaTicketAlt} from 'react-icons/fa';

export default function PublicCulturalTours() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Public Cultural Tours
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Islamic architecture and culture with our guided tours
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaClock className="text-3xl text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Daily Tours</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Regular guided tours available throughout the week.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Duration: 45 minutes
              </div>
              <div className="text-sm text-gray-500">
                Group size: Up to 25 people
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaUsers className="text-3xl text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Expert Guides</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Knowledgeable guides share insights about Islamic architecture and history.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Multilingual guides available
              </div>
              <div className="text-sm text-gray-500">
                Interactive Q&A sessions
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaTicketAlt className="text-3xl text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Free Admission</h3>
            </div>
            <p className="text-gray-600 mb-4">
              All public cultural tours are free of charge.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                No booking required
              </div>
              <div className="text-sm text-gray-500">
                First-come, first-served
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Schedule</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Weekday Tours</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  <span>Monday - Friday: 10:00 AM, 2:00 PM, 4:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Weekend Tours</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-green-600" />
                  <span>Saturday - Sunday: 11:00 AM, 1:00 PM, 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll See</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Architecture Highlights</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Main prayer hall</li>
                <li>• Islamic geometric patterns</li>
                <li>• Calligraphy artwork</li>
                <li>• Dome and minaret design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Cultural Insights</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Islamic traditions</li>
                <li>• Prayer rituals</li>
                <li>• Community activities</li>
                <li>• Historical significance</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
