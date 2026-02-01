'use client';

import { motion } from 'framer-motion';
import { FaUsers, FaStar, FaCalendarAlt, FaPhone } from 'react-icons/fa';

export default function PrivateCulturalTours() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Private Cultural Tours
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exclusive guided tours tailored to your group&apos;s interests
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
              <FaStar className="text-3xl text-yellow-500 mr-3" />
              <h3 className="text-xl font-semibold">Premium Experience</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Personalized tours with expert guides for an in-depth understanding.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Customized itinerary
              </div>
              <div className="text-sm text-gray-500">
                Flexible scheduling
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
              <FaUsers className="text-3xl text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Group Tours</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Perfect for schools, organizations, and special interest groups.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                10-50 people per group
              </div>
              <div className="text-sm text-gray-500">
                Educational focus available
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
              <FaCalendarAlt className="text-3xl text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Advanced Booking</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Schedule your private tour at least 2 weeks in advance.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Online booking available
              </div>
              <div className="text-sm text-gray-500">
                Confirmation within 48 hours
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Standard Private Tour</h3>
              <p className="text-gray-600 mb-3">60-minute comprehensive tour</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Main prayer hall</li>
                <li>• Architecture overview</li>
                <li>• Cultural insights</li>
                <li>• Q&A session</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Premium Private Tour</h3>
              <p className="text-gray-600 mb-3">90-minute in-depth experience</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• All standard features</li>
                <li>• Behind-the-scenes access</li>
                <li>• Special exhibitions</li>
                <li>• Refreshments included</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Contact Details</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-2 text-blue-600" />
                  <span>+1 (503) 437-2165</span>
                </div>
                <div className="text-gray-600">
                  Email: tours@masjidsalmanlfarsi.org
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Requirements</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Minimum 10 people</li>
                <li>• 2-week advance booking</li>
                <li>• Group coordinator required</li>
                <li>• Modest dress code enforced</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
