'use client';

import { motion } from 'framer-motion';
import { FaBus, FaCar, FaWalking, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function GettingToMosque() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Getting To The Mosque
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the best way to reach Masjid Salman al Farsi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaBus className="text-3xl text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Public Transportation</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Several bus routes serve the mosque area. Check local transit schedules for the most convenient options.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <FaMapMarkerAlt className="mr-2" />
                Bus Stop: 2187 Fellowship Rd
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FaClock className="mr-2" />
                Service Hours: 6:00 AM - 10:00 PM
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
              <FaCar className="text-3xl text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">By Car</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Ample parking available on-site. Follow GPS directions to 2187 Fellowship Rd, Tucker, GA 30084.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <FaMapMarkerAlt className="mr-2" />
                Address: 2187 Fellowship Rd, Tucker, GA 30084
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FaClock className="mr-2" />
                Parking: Free for all visitors
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
              <FaWalking className="text-3xl text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Walking</h3>
            </div>
            <p className="text-gray-600 mb-4">
              The mosque is accessible by foot from nearby residential areas. Well-maintained sidewalks available.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <FaMapMarkerAlt className="mr-2" />
                Walking distance from downtown Tucker
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FaClock className="mr-2" />
                Approx. 15-20 minutes walk
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-blue-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">2187 Fellowship Rd, Tucker, GA 30084</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">+1 (503) 437-2165</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
