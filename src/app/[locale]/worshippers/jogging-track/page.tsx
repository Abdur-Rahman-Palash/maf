'use client';

import { motion } from 'framer-motion';
import {FaRunning, FaClock, FaMapMarkerAlt, FaHeart} from 'react-icons/fa';

export default function JoggingTrack() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Mosque's Jogging Track
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A unique facility combining wellness with spiritual reflection
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaRunning className="text-3xl text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Track Features</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Professional-grade jogging track surrounding the mosque grounds with scenic views.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Length: 500 meters per lap
              </div>
              <div className="text-sm text-gray-500">
                Surface: Professional running track material
              </div>
              <div className="text-sm text-gray-500">
                Lighting: Available for evening runs
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
              <FaHeart className="text-3xl text-red-600 mr-3" />
              <h3 className="text-xl font-semibold">Health & Wellness</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Promoting physical wellness as part of holistic Islamic lifestyle.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Free for all community members
              </div>
              <div className="text-sm text-gray-500">
                Water stations available
              </div>
              <div className="text-sm text-gray-500">
                Family-friendly environment
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Schedule</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Opening Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2 text-green-600" />
                  <span>Monday - Friday: 5:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2 text-green-600" />
                  <span>Saturday - Sunday: 6:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Special Programs</h3>
              <div className="space-y-2">
                <div className="text-gray-600">
                  <strong>Morning Runs:</strong> 6:00 AM - 8:00 AM
                </div>
                <div className="text-gray-600">
                  <strong>Family Hours:</strong> Weekends 4:00 PM - 7:00 PM
                </div>
                <div className="text-gray-600">
                  <strong>Women's Only:</strong> Tuesday & Thursday 7:00 PM - 9:00 PM
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What to Bring</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Appropriate athletic attire</li>
                <li>• Water bottle</li>
                <li>• Towel</li>
                <li>• Running shoes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Track Rules</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Respect prayer times</li>
                <li>• Keep to designated lanes</li>
                <li>• No loud music</li>
                <li>• Clean up after use</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
