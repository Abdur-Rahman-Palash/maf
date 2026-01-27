'use client';

import { motion } from 'framer-motion';
import { FaMobileAlt, FaQrcode, FaMap, FaInfoCircle } from 'react-icons/fa';

export default function EVisitorGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            E-Visitor Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Digital guide to enhance your mosque visit experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaMobileAlt className="text-3xl text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Mobile App</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Download our official mobile app for interactive tours, prayer times, and real-time updates.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Available on iOS and Android
              </div>
              <div className="text-sm text-gray-500">
                Features: Audio guides, AR experiences
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
              <FaQrcode className="text-3xl text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">QR Code Access</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Scan QR codes throughout the mosque for instant information about architecture and history.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                No app download required
              </div>
              <div className="text-sm text-gray-500">
                Works with any smartphone camera
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
              <FaMap className="text-3xl text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Interactive Maps</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Navigate the mosque easily with our interactive floor plans and location-based information.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Detailed floor plans
              </div>
              <div className="text-sm text-gray-500">
                Points of interest marked
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaInfoCircle className="text-3xl text-orange-600 mr-3" />
              <h3 className="text-xl font-semibold">Visitor Information</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Access detailed information about mosque etiquette, prayer times, and facilities.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Mosque guidelines
              </div>
              <div className="text-sm text-gray-500">
                Facility locations
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold">Download</h3>
              <p className="text-sm text-gray-600">Get the app or scan QR codes</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold">Explore</h3>
              <p className="text-sm text-gray-600">Navigate with interactive maps</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold">Learn</h3>
              <p className="text-sm text-gray-600">Discover history and architecture</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
