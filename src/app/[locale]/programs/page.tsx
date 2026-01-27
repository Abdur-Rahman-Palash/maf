'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMoon, FaHands, FaHeart } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

const programs = [
  {
    title: 'Hijri Calendar',
    icon: FaCalendarAlt,
    description: 'Islamic lunar calendar with important dates and events',
    href: '/programs/hijri-calendar',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'The month of Ramadan',
    icon: FaMoon,
    description: 'Ramadan 1446/2025 schedule, programs, and activities',
    href: '/worshippers/ramadan',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Dhikr from the mosque',
    icon: FaHands,
    description: 'Daily remembrance and spiritual gatherings',
    href: '/programs/dhikr',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Names of Allah',
    icon: FaHeart,
    description: 'Learn and reflect on the 99 beautiful names of Allah',
    href: '/programs/names-of-allah',
    color: 'from-red-500 to-red-600'
  }
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our spiritual and educational programs designed to enrich your Islamic journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={program.href}
                className="block h-full"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full group-hover:scale-105">
                  <div className={`w-20 h-20 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <program.icon className="text-white text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {program.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Learn more
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">How to Participate</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• No registration required for most programs</li>
                <li>• Check schedule for specific timings</li>
                <li>• All programs are free of charge</li>
                <li>• Open to all community members</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
              <div className="text-gray-600">
                <p>For program inquiries:</p>
                <p>Phone: +1 (503) 437-2165</p>
                <p>Email: programs@masjidsalmanlfarsi.org</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
