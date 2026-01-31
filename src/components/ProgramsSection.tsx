'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMoon, FaHands, FaHeart } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

const ProgramsSection = () => {
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

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-philosopher), serif' }}>
            Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our spiritual and educational programs designed to enrich your Islamic journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={program.href}
                className="block h-full"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full group-hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <program.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {program.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/programs"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            View All Programs
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
