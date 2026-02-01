'use client';

import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaBook, FaCalendarAlt, FaPhone } from 'react-icons/fa';

export default function Shahadas() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shahadas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you are just interested in Islam, have some questions or are ready to convert, we are happy to speak to you and guide you through the Shahada
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
              <FaHandHoldingHeart className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">What is Shahada?</h2>
            </div>
            <p className="text-gray-600 mb-4">
              The Shahada is the declaration of faith in Islam. It is the first and most important pillar of Islam,
              declaring belief in the oneness of Allah and that Muhammad is His messenger.
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800 font-medium text-center">
                &quot;Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasulullah&quot;<br />
                <span className="text-sm">I bear witness that there is no god but Allah, and I bear witness that Muhammad is His messenger</span>
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
              <h2 className="text-2xl font-bold text-gray-900">Learn & Understand</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We offer comprehensive guidance for those interested in Islam. Our knowledgeable team can help you:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Understand the basic principles of Islam</li>
              <li>• Learn about the five pillars</li>
              <li>• Ask questions in a welcoming environment</li>
              <li>• Prepare for taking the Shahada</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Shahada</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Process</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  <span>Schedule an appointment</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaBook className="mr-2 text-green-600" />
                  <span>Learn about Islam</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaHandHoldingHeart className="mr-2 text-purple-600" />
                  <span>Take the Shahada</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
              <div className="text-gray-600">
                <p>For Shahada inquiries:</p>
                <p>Phone: +1 (503) 437-2165</p>
                <p>Email: shahada@masjidsalmanlfarsi.org</p>
                <p>Imam available by appointment</p>
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
                <FaPhone className="text-3xl text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Initial Contact</h3>
              <p className="text-sm text-gray-600">Call or email to schedule your first meeting</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <FaBook className="text-3xl text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Learning Session</h3>
              <p className="text-sm text-gray-600">Meet with our team to learn about Islam</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <FaHandHoldingHeart className="text-3xl text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Shahada Ceremony</h3>
              <p className="text-sm text-gray-600">Take your declaration of faith</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
