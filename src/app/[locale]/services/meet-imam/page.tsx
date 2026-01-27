'use client';

import { motion } from 'framer-motion';
import {FaUserTie, FaCalendarAlt, FaPhone, FaBook} from 'react-icons/fa';

export default function MeetImam() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet an Imam
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a meeting up to two weeks in advance with one of our Imams to discuss one of a range of topics
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
              <FaUserTie className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Spiritual Guidance</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Our Imams are available to provide spiritual guidance, counseling, and support 
              for various aspects of Islamic life and personal development.
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800 font-medium text-center">
                "And consult them in the affairs. Then when you have taken a decision, 
                put your trust in Allah."
                <span className="text-sm block mt-2">- Quran 3:159</span>
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
              <FaBook className="text-3xl text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Topics for Discussion</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Our Imams can assist with:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Islamic questions and answers</li>
              <li>• Marriage counseling</li>
              <li>• Family disputes</li>
              <li>• Personal development</li>
              <li>• Religious education</li>
              <li>• Community matters</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Booking Details</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  <span>Book up to 2 weeks in advance</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUserTie className="mr-2 text-green-600" />
                  <span>30-minute sessions available</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-2 text-purple-600" />
                  <span>Both in-person and virtual meetings</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
              <div className="text-gray-600">
                <p>For appointments:</p>
                <p>Phone: +1 (503) 437-2165</p>
                <p>Email: imam@masjidsalmanlfarsi.org</p>
                <p>Office Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <FaCalendarAlt className="text-3xl text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Schedule</h3>
              <p className="text-sm text-gray-600">Book your appointment in advance</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <FaUserTie className="text-3xl text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Consultation</h3>
              <p className="text-sm text-gray-600">Discuss your concerns with the Imam</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <FaBook className="text-3xl text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Guidance</h3>
              <p className="text-sm text-gray-600">Receive Islamic guidance and support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
