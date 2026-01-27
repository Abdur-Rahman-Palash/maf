'use client';

import { motion } from 'framer-motion';
import { FaStore, FaShoppingBag, FaBook, FaGift } from 'react-icons/fa';

export default function SouqAlJami() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Souq Al Jami
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional marketplace offering Islamic goods and cultural items
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <FaBook className="text-3xl text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Islamic Books</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Wide selection of Quran, Hadith, and Islamic literature in multiple languages.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Holy Quran translations
              </div>
              <div className="text-sm text-gray-500">
                Islamic history and culture
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
              <FaShoppingBag className="text-3xl text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Traditional Attire</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Authentic Islamic clothing including prayer garments and traditional wear.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Prayer mats and garments
              </div>
              <div className="text-sm text-gray-500">
                Traditional Islamic clothing
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
              <FaGift className="text-3xl text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold">Gift Items</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Beautiful Islamic art, calligraphy, and decorative items for your home.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Islamic calligraphy art
              </div>
              <div className="text-sm text-gray-500">
                Decorative items
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
              <FaStore className="text-3xl text-orange-600 mr-3" />
              <h3 className="text-xl font-semibold">Essentials</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Daily Islamic essentials including prayer beads, incense, and religious items.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Prayer beads (Tasbih)
              </div>
              <div className="text-sm text-gray-500">
                Attar and incense
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Store Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Opening Hours</h3>
              <p className="text-gray-600">
                Monday - Saturday: 10:00 AM - 8:00 PM<br />
                Sunday: 12:00 PM - 6:00 PM
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">
                Located within the mosque premises<br />
                Main entrance, ground floor
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
