'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMoon, FaStar } from 'react-icons/fa';

export default function HijriCalendar() {
  const months = [
    { name: 'Muharram', days: 30, significance: 'Islamic New Year' },
    { name: 'Safar', days: 29, significance: 'Second sacred month' },
    { name: 'Rabi al-Awwal', days: 30, significance: 'Birth of Prophet Muhammad' },
    { name: 'Rabi al-Thani', days: 29, significance: 'Fourth month' },
    { name: 'Jumada al-Awwal', days: 30, significance: 'Fifth month' },
    { name: 'Jumada al-Thani', days: 29, significance: 'Sixth month' },
    { name: 'Rajab', days: 30, significance: 'One of the four sacred months' },
    { name: 'Shaban', days: 29, significance: 'Month preceding Ramadan' },
    { name: 'Ramadan', days: 30, significance: 'Month of fasting' },
    { name: 'Shawwal', days: 29, significance: 'Eid al-Fitr' },
    { name: 'Dhu al-Qadah', days: 30, significance: 'One of the four sacred months' },
    { name: 'Dhu al-Hijjah', days: 29, significance: 'Month of Hajj' }
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
            Hijri Calendar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Islamic lunar calendar with important dates and events
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {months.map((month, index) => (
            <motion.div
              key={month.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-2xl text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{month.name}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Days:</span>
                  <span className="font-medium">{month.days}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Significance:</span> {month.significance}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Islamic Dates</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">2025 Key Dates</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaMoon className="mr-2 text-blue-600" />
                  <span>Islamic New Year: July 28, 2025</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaStar className="mr-2 text-yellow-500" />
                  <span>Ramadan Begins: February 28, 2025</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaStar className="mr-2 text-green-600" />
                  <span>Eid al-Fitr: March 30, 2025</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaStar className="mr-2 text-purple-600" />
                  <span>Eid al-Adha: June 7, 2025</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Calendar Features</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Based on lunar cycles</li>
                <li>• 354 or 355 days per year</li>
                <li>• 12 months of 29 or 30 days</li>
                <li>• Begins with Muharram</li>
                <li>• Four sacred months</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
