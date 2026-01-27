'use client';

import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaHandSparkles } from 'react-icons/fa';

export default function NamesOfAllah() {
  const namesOfAllah = [
    { name: 'Ar-Rahman', meaning: 'The Most Merciful', description: 'Bestows mercy upon all creation' },
    { name: 'Ar-Rahim', meaning: 'The Most Compassionate', description: 'Bestows mercy upon believers' },
    { name: 'Al-Malik', meaning: 'The King', description: 'The absolute ruler and sovereign' },
    { name: 'Al-Quddus', meaning: 'The Most Holy', description: 'Pure from any imperfection' },
    { name: 'As-Salam', meaning: 'The Source of Peace', description: 'The source of all peace and safety' },
    { name: 'Al-Mumin', meaning: 'The Giver of Faith', description: 'Bestows faith and security' },
    { name: 'Al-Muhaimin', meaning: 'The Guardian', description: 'The watcher and protector' },
    { name: 'Al-Aziz', meaning: 'The Mighty', description: 'The unconquerable and invincible' },
    { name: 'Al-Jabbar', meaning: 'The Compeller', description: 'The one who repairs and restores' },
    { name: 'Al-Mutakabbir', meaning: 'The Supreme', description: 'The one with greatness and pride' },
    { name: 'Al-Khaliq', meaning: 'The Creator', description: 'The creator of all existence' },
    { name: 'Al-Bari', meaning: 'The Evolver', description: 'The one who shapes and forms' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Names of Allah
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn and reflect on the 99 beautiful names of Allah
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {namesOfAllah.map((name, index) => (
            <motion.div
              key={name.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <FaHeart className="text-2xl text-red-500 mr-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900">{name.name}</h3>
              </div>
              <div className="space-y-2">
                <div className="text-blue-600 font-medium">
                  {name.meaning}
                </div>
                <p className="text-gray-600 text-sm">
                  {name.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Knowing Allah's Names</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Spiritual Benefits</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Increased love for Allah</li>
                <li>• Deeper understanding of faith</li>
                <li>• Enhanced prayer experience</li>
                <li>• Greater sense of peace</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Personal Development</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Character improvement</li>
                <li>• Better moral compass</li>
                <li>• Increased humility</li>
                <li>• Strengthened patience</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Learn</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-red-50 rounded-lg p-4 mb-3">
                <FaStar className="text-3xl text-red-500 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Memorize Daily</h3>
              <p className="text-sm text-gray-600">Learn one name each day with its meaning</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-50 rounded-lg p-4 mb-3">
                <FaHandSparkles className="text-3xl text-pink-500 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Reflect & Apply</h3>
              <p className="text-sm text-gray-600">Contemplate the meaning in your life</p>
            </div>
            <div className="text-center">
              <div className="bg-red-50 rounded-lg p-4 mb-3">
                <FaHeart className="text-3xl text-red-500 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Make Dua</h3>
              <p className="text-sm text-gray-600">Call upon Allah by His beautiful names</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
