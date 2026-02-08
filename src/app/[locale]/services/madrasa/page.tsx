'use client';
import { motion } from 'framer-motion';
import { FaBook, FaGraduationCap, FaUsers, FaCalendarAlt } from 'react-icons/fa';

export default function Madrasa() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Madrasa
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We have a range of educational programmes being offered for both children and adults
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
              <FaBook className="text-3xl text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Islamic Education</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Our Madrasa provides comprehensive Islamic education following traditional methods
              while adapting to modern educational needs. We focus on Quran, Hadith, Fiqh, and Arabic language.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 font-medium text-center">
                &quot;Read! In the name of your Lord who has created&quot;<br />
                <span className="text-sm block mt-2">- Quran 96:1</span>
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
              <FaGraduationCap className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Our Programs</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We offer structured programs for different age groups:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Children&apos;s Islamic Studies (Ages 5-12)</li>
              <li>• Youth Programs (Ages 13-18)</li>
              <li>• Adult Education Classes</li>
              <li>• Quran Memorization (Hifz)</li>
              <li>• Arabic Language Courses</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Schedule</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Children&apos;s Classes</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  <span>Saturday & Sunday: 10:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-green-600" />
                  <span>Weekdays: 4:00 PM - 6:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Adult Classes</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-purple-600" />
                  <span>Monday & Wednesday: 7:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-orange-600" />
                  <span>Weekend Workshops: Monthly</span>
                </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enrollment Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <FaUsers className="text-3xl text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Registration</h3>
              <p className="text-sm text-gray-600">Open enrollment throughout the year</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <FaBook className="text-3xl text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Curriculum</h3>
              <p className="text-sm text-gray-600">Comprehensive Islamic studies program</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <FaGraduationCap className="text-3xl text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className="text-sm text-gray-600">Certificates upon completion</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
