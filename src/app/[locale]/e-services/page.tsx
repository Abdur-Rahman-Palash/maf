'use client';
import { Link } from '@/i18n/routing';

    { locale: 'ar' }

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

export default function EServices() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            E-Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive digital services for booking, registration, and support
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {eServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">E-Services Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Available Services</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 24/7 online access</li>
                <li>• User-friendly interfaces</li>
                <li>• Secure data handling</li>
                <li>• Quick response times</li>
                <li>• Mobile compatible</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Support</h3>
              <div className="text-gray-600">
                <p>For e-services support:</p>
                <p>Phone: +1 (503) 437-2165</p>
                <p>Email: eservices@masjidsalmanlfarsi.org</p>
                <p>Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
