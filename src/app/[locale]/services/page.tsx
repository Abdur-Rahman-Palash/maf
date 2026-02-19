'use client';

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaBook, FaUser, FaHeart, FaHandsHelping, FaUsers, FaClock } from 'react-icons/fa';
import { Link } from '@/i18n/routing';
import WaveAnimation from '@/components/WaveAnimation';

const servicesData = [
  { 
    id: 2, 
    title: 'Shahadas', 
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800',
    description: 'Whether you are just interested in Islam, have some questions or are ready to convert, we are happy to speak to you and guide you through the Shahada. Learn more and book here.',
    icon: '🤝',
    href: '/services/shahadas'
  },
  { 
    id: 3, 
    title: 'Nikahs', 
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    description: 'Offering a unique & stunning yet economical & eco-friendly venue, getting married at Cambridge Central Mosque is an experience of a lifetime. Find out more here.',
    icon: '💒',
    href: '/services/nikahs'
  },
  { 
    id: 5, 
    title: 'General Events', 
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800',
    description: 'To book rooms for other events or Islamic celebrations, from \'aqiqas and private gatherings to conferences, we offer rooms at reasonable rates of hire. Book here.',
    icon: '🎉',
    href: '/services/general-events'
  }
];

const additionalServices = [
  {
    title: 'Madrasa Classes',
    icon: FaBook,
    description: 'Islamic education for children and adults',
    href: '/services/madrasa',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    title: 'Meet with Imam',
    icon: FaUser,
    description: 'Schedule appointments with the Imam',
    href: '/services/meet-imam',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Family Counseling',
    icon: FaHeart,
    description: 'Family and marriage counseling services',
    href: '/services/meet-imam',
    color: 'from-teal-500 to-teal-600'
  },
  {
    title: 'Community Services',
    icon: FaHandsHelping,
    description: 'Volunteer and community service opportunities',
    href: '/services/general-events',
    color: 'from-pink-500 to-pink-600'
  },
  {
    title: 'Youth Programs',
    icon: FaUsers,
    description: 'Special programs for youth and young adults',
    href: '/services/madrasa',
    color: 'from-yellow-500 to-yellow-600'
  }
];

export default function Services() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our comprehensive range of services designed to serve our community and support your spiritual journey
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services/shahadas"
                className="inline-flex items-center bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300"
              >
                Book Shahada
              </Link>
              <Link
                href="/services/nikahs"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Book Nikah
              </Link>
            </div>
          </motion.div>
        </div>
        <WaveAnimation />
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From religious ceremonies to community events, we provide comprehensive services for our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group-hover:translate-x-2 transform duration-300"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Additional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore more services and programs offered by our mosque
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2 + index * 0.1 
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <Link
                  href={service.href}
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Help With Our Services?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Our team is here to assist you with any questions about our services and programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Us
              </Link>
              <Link
                href="/meet-our-imam"
                className="inline-flex items-center bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-800 transition-colors duration-300"
              >
                Meet Our Imam
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
