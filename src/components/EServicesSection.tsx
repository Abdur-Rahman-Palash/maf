'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaBriefcase, FaUsers, FaClipboardList, FaCalendarCheck, FaUserTie } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

const EServicesSection = () => {
  const eServices = [
    {
      title: 'LOST & FOUND',
      icon: FaSearch,
      description: 'Report and track lost items within the mosque premises',
      href: '/e-services/lost-found',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'CAREERS',
      icon: FaBriefcase,
      description: 'Join our team and explore career opportunities at the mosque',
      href: '/e-services/careers',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Official Delegates Booking',
      icon: FaUsers,
      description: 'Special booking services for official delegates and dignitaries',
      href: '/e-services/official-delegates',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'TOUR OPERATOR REGISTRATION',
      icon: FaClipboardList,
      description: 'Register your tour company for organized visits to the mosque',
      href: '/e-services/tour-operator-registration',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Tour Operator Booking',
      icon: FaCalendarCheck,
      description: 'Book tours through registered tour operators',
      href: '/e-services/tour-operator-booking',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Private Cultural Tours',
      icon: FaUserTie,
      description: 'Exclusive private tours with personalized experiences',
      href: '/visitors/private-cultural-tours',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            E-Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive digital services for booking, registration, and support
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={service.href}
                className="block h-full"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full group-hover:scale-105 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                    Access service
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
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/e-services"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            All E-Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EServicesSection;
