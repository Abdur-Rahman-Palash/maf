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
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(22)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-orange-400/25 to-amber-400/30 rounded-full"
              animate={{
                x: [0, 100, 50, 0],
                y: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
              }}
              transition={{
                duration: 8 + Math.random() * 16,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Gradient Wave Animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-transparent via-orange-200/20 to-transparent"
          animate={{
            x: ["-100%", "0%", "100%"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulsing Circles */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-orange-500/12 to-amber-500/12"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-32 h-32">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-amber-500/12 to-yellow-500/12"
            animate={{
              scale: [1.15, 1, 1.15],
              opacity: [0.25, 0.1, 0.25],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Additional Floating Elements */}
        <div className="absolute top-2/3 left-1/6 w-24 h-24">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400/15 to-orange-400/15"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.08, 0.2],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute bottom-1/4 right-1/6 w-20 h-20">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-amber-400/10 to-yellow-400/10"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.15, 0.06, 0.15],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-philosopher), serif' }}>
            E-Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
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
