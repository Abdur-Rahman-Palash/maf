'use client';

import { motion } from 'framer-motion';
import {FaMoon, FaCalendarAlt, FaUtensils, FaPray} from 'react-icons/fa';

export default function Ramadan() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ramadan 1446 / 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for a blessed Ramadan at Masjid Salman al Farsi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <FaMoon className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ramadan Start</h3>
            <p className="text-gray-600">Expected: February 28, 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <FaCalendarAlt className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Duration</h3>
            <p className="text-gray-600">29-30 days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <FaUtensils className="text-4xl text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Iftar Time</h3>
            <p className="text-gray-600">Daily at sunset</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <FaPray className="text-4xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Taraweeh</h3>
            <p className="text-gray-600">8:30 PM nightly</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Daily Ramadan Schedule</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Suhoor</span>
                <span className="font-medium">5:15 AM</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Fajr Prayer</span>
                <span className="font-medium">5:45 AM</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Iftar</span>
                <span className="font-medium">7:30 PM</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Maghrib Prayer</span>
                <span className="font-medium">7:35 PM</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Taraweeh Prayer</span>
                <span className="font-medium">8:30 PM</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Ramadan Programs</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800">Daily Iftar</h4>
                <p className="text-sm text-gray-600">Community iftar for all</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800">Quran Recitation</h4>
                <p className="text-sm text-gray-600">Daily after Asr prayer</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800">Islamic Lectures</h4>
                <p className="text-sm text-gray-600">Weekend programs</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-800">Charity Drive</h4>
                <p className="text-sm text-gray-600">Zakat and Sadaqa collection</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to Participate</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Join daily prayers</li>
                <li>• Participate in iftar programs</li>
                <li>• Volunteer for community service</li>
                <li>• Contribute to charity initiatives</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
              <p className="text-gray-600">
                For Ramadan inquiries:<br />
                Phone: +1 (503) 437-2165<br />
                Email: ramadan@masjidsalmanlfarsi.org
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
