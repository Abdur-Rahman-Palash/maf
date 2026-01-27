'use client';

import { motion } from 'framer-motion';
import {FaTabletAlt, FaHeadphones, FaVideo, FaCamera} from 'react-icons/fa';

export default function MultimediaGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Multimedia E-Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive digital guide with audio, video, and augmented reality features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaTabletAlt className="text-3xl text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Interactive Features</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Touch-enabled displays with rich multimedia content about the mosque.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Touch screen navigation
              </div>
              <div className="text-sm text-gray-500">
                High-resolution images
              </div>
              <div className="text-sm text-gray-500">
                Interactive floor plans
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
              <FaHeadphones className="text-3xl text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Audio Tours</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Professional narration available in multiple languages.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                10+ language options
              </div>
              <div className="text-sm text-gray-500">
                Expert commentary
              </div>
              <div className="text-sm text-gray-500">
                Self-paced exploration
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
              <FaVideo className="text-3xl text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Video Content</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Documentary-style videos about Islamic architecture and traditions.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Historical documentaries
              </div>
              <div className="text-sm text-gray-500">
                Architectural demonstrations
              </div>
              <div className="text-sm text-gray-500">
                Cultural presentations
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
              <FaCamera className="text-3xl text-orange-600 mr-3" />
              <h3 className="text-xl font-semibold">AR Experience</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Augmented reality features bring the mosque's history to life.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                3D architectural models
              </div>
              <div className="text-sm text-gray-500">
                Historical reconstructions
              </div>
              <div className="text-sm text-gray-500">
                Interactive learning tools
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Access</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold">Mobile App</h3>
              <p className="text-sm text-gray-600">Download our free app</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3">
                <span className="text-2xl">🖥️</span>
              </div>
              <h3 className="font-semibold">Kiosk Stations</h3>
              <p className="text-sm text-gray-600">Available throughout mosque</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3">
                <span className="text-2xl">🎧</span>
              </div>
              <h3 className="font-semibold">Rental Devices</h3>
              <p className="text-sm text-gray-600">Tablets available at reception</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
