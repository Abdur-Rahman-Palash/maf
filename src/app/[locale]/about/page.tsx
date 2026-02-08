'use client';
import { motion } from 'framer-motion';
import { FaMosque, FaUsers, FaHeart, FaCalendarAlt } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaMosque className="text-emerald-600 text-4xl" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              About Masjid Salman Al Farsi
            </h1>
            <FaMosque className="text-emerald-600 text-4xl" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A welcoming community mosque serving the Muslim community in Tucker, Georgia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaMosque className="text-3xl text-emerald-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To provide a place of worship and spiritual guidance for the Muslim community,
              fostering unity, education, and service based on the teachings of Islam.
              We strive to create an environment where families can grow in faith and build
              lasting relationships with fellow community members.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaHeart className="text-3xl text-rose-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
            </div>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Faith and devotion to Allah (SWT)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Community unity and brotherhood</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Education and continuous learning</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>Service to humanity and charity</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visit Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-3">Address</h3>
              <p className="text-gray-600">
                2187 Fellowship Rd<br />
                Tucker, GA 30084<br />
                United States
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
              <p className="text-gray-600">
                Phone: (770) 934-7777<br />
                Email: info@masjidsalmanalfarsi.org
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Join Our Community</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-emerald-50 rounded-lg p-4 mb-3">
                <FaUsers className="text-3xl text-emerald-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Become a Member</h3>
              <p className="text-sm text-gray-600">Join our growing community</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-50 rounded-lg p-4 mb-3">
                <FaCalendarAlt className="text-3xl text-amber-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Attend Events</h3>
              <p className="text-sm text-gray-600">Participate in our programs</p>
            </div>
            <div className="text-center">
              <div className="bg-rose-50 rounded-lg p-4 mb-3">
                <FaHeart className="text-3xl text-rose-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Support Us</h3>
              <p className="text-sm text-gray-600">Help us serve the community</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
