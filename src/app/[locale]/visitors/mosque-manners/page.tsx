'use client';

import { motion } from 'framer-motion';
import { FaHands, FaShoePrints, FaUserTie, FaVolumeMute } from 'react-icons/fa';

export default function MosqueManners() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mosque Manners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guidelines for respectful visits to Masjid Salman al Farsi
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
              <FaHands className="text-3xl text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Prayer Etiquette</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Proper conduct during prayer times and religious activities.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Maintain silence during prayers</li>
              <li>• Follow prayer lines orderly</li>
              <li>• Respect personal space</li>
              <li>• Turn off mobile phones</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaShoePrints className="text-3xl text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Dress Code</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Appropriate attire for visiting the mosque.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Modest clothing required</li>
              <li>• No shorts or revealing attire</li>
              <li>• Head covering for women</li>
              <li>• Remove shoes before entering</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaVolumeMute className="text-3xl text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Behavior Guidelines</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Expected conduct within the mosque premises.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Speak in low voices</li>
              <li>• No eating in prayer areas</li>
              <li>• Respect ongoing activities</li>
              <li>• Follow staff instructions</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaUserTie className="text-3xl text-orange-600 mr-3" />
              <h3 className="text-xl font-semibold">Special Considerations</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Additional guidelines for specific situations.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Photography restrictions</li>
              <li>• Children supervision</li>
              <li>• Group visit protocols</li>
              <li>• Special needs accommodation</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Reminders</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Do&apos;s</h3>
              <ul className="text-gray-600 space-y-1">
                <li>✓ Dress modestly</li>
                <li>✓ Remove shoes at entrance</li>
                <li>✓ Maintain quiet atmosphere</li>
                <li>✓ Respect prayer times</li>
                <li>✓ Follow designated pathways</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Don&apos;ts</h3>
              <ul className="text-gray-600 space-y-1">
                <li>✗ Enter during prayer calls</li>
                <li>✗ Take photos without permission</li>
                <li>✗ Eat in prayer areas</li>
                <li>✗ Make loud noises</li>
                <li>✗ Touch religious artifacts</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
