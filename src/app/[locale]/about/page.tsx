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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ABOUT US
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about Masjid Salman al Farsi and our mission to serve the community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">
                Masjid Salman al Farsi is dedicated to providing a welcoming space for worship, 
                education, and community service. We strive to foster spiritual growth and 
                strengthen the bonds of brotherhood among Muslims.
              </p>
              <p className="text-lg leading-relaxed">
                Our mission is to serve the religious, social, and educational needs of the 
                Muslim community while promoting understanding and harmony with people of all faiths.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaMosque className="text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Faith</h4>
                    <p className="text-gray-600 text-sm">Strengthening Islamic beliefs and practices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaUsers className="text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Community</h4>
                    <p className="text-gray-600 text-sm">Building strong, supportive relationships</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaHeart className="text-red-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Service</h4>
                    <p className="text-gray-600 text-sm">Serving humanity with compassion</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCalendarAlt className="text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Tradition</h4>
                    <p className="text-gray-600 text-sm">Preserving Islamic heritage</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2010</div>
              <p className="text-gray-600">Masjid Salman al Farsi established</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-600">Families served weekly</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
              <p className="text-gray-600">Programs and services</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
