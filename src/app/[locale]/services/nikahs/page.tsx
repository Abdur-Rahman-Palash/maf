'use client';

import { motion } from 'framer-motion';
import {FaHeart, FaCalendarAlt, FaRing, FaMosque} from 'react-icons/fa';

export default function Nikahs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nikahs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Offering a unique & stunning yet economical & eco-friendly venue, getting married at Masjid Salman al Farsi is the experience of a lifetime
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
              <FaHeart className="text-3xl text-red-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Islamic Marriage</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Nikah is the Islamic marriage contract that joins a couple together in accordance with Islamic law. 
              Our mosque provides a beautiful and sacred environment for this blessed occasion.
            </p>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-800 font-medium text-center">
                "And among His signs is that He created for you spouses from among yourselves, 
                that you may find tranquility in them, and He has put between you affection and mercy."
                <span className="text-sm block mt-2">- Quran 30:21</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaMosque className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Our Venue</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Experience the beauty of Islamic architecture for your special day:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Stunning prayer hall with Islamic decor</li>
              <li>• Capacity for up to 200 guests</li>
              <li>• Eco-friendly and economical</li>
              <li>• Professional photography opportunities</li>
              <li>• Convenient location and parking</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nikah Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">What We Provide</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Qualified Imam for ceremony</li>
                <li>• Marriage certificate (Nikahnama)</li>
                <li>• Islamic marriage counseling</li>
                <li>• Venue preparation</li>
                <li>• Guest coordination</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Requirements</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Valid identification documents</li>
                <li>• Two witnesses (male)</li>
                <li>• Wali (guardian) for bride</li>
                <li>• Mahr (dowry) agreement</li>
                <li>• Marriage license (if required)</li>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <FaCalendarAlt className="text-3xl text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Schedule</h3>
              <p className="text-sm text-gray-600">Book your date at least 3 months in advance</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <FaRing className="text-3xl text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Consultation</h3>
              <p className="text-sm text-gray-600">Meet with our team to plan your ceremony</p>
            </div>
            <div className="text-center">
              <div className="bg-red-50 rounded-lg p-4 mb-3">
                <FaHeart className="text-3xl text-red-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Nikah Day</h3>
              <p className="text-sm text-gray-600">Enjoy your blessed marriage ceremony</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
