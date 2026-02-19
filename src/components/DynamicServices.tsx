'use client';

import { useRealTimeData } from '@/lib/dataSync';
import { motion } from 'framer-motion';
import { 
  FaMosque, FaGraduationCap, FaUsers, FaHandHoldingHeart, FaClock,
  FaStar, FaArrowRight
} from 'react-icons/fa';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
  image_url?: string;
  status: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const DynamicServices: React.FC = () => {
  const { data: services } = useRealTimeData<Service>('services');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'prayer': return <FaMosque className="text-blue-600" />;
      case 'education': return <FaGraduationCap className="text-green-600" />;
      case 'community': return <FaUsers className="text-purple-600" />;
      case 'welfare': return <FaHandHoldingHeart className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const featuredServices = services.filter(service => service.featured && service.status === 'active');
  const regularServices = services.filter(service => !service.featured && service.status === 'active');

  if (services.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-500">
          <FaMosque className="text-4xl mx-auto mb-4" />
          <p>No services available yet.</p>
          <p className="text-sm mt-2">Services will appear here once added from the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            Featured Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Service Image */}
                {service.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
                        <FaStar className="mr-1" /> Featured
                      </span>
                    </div>
                  </div>
                )}

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getCategoryIcon(service.category)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {service.category}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                      Learn More <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Services */}
      {regularServices.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Service Icon/Image */}
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        {getCategoryIcon(service.category)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Service Content */}
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {service.category}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicServices;
