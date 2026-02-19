'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminDataOperations, useRealTimeData } from '@/lib/dataSync';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaSave, FaTimes, FaEye,
  FaHandHoldingHeart, FaGraduationCap, FaMosque, FaUsers, FaClock,
  FaImage, FaStar, FaArrowUp, FaArrowDown
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

const ServiceManager: React.FC = () => {
  console.log('ServiceManager: Component mounted');
  
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'prayer',
    icon: '',
    image_url: '',
    status: 'active',
    featured: false,
    order_index: 0
  });

  // Use real-time data synchronization
  const { data: services, updateData } = useRealTimeData<Service>('services');
  
  console.log('ServiceManager: Services data:', services);

  // Sample data for initialization
  useEffect(() => {
    if (services.length === 0) {
      const sampleServices: Service[] = [
        {
          id: '1',
          title: 'Daily Prayer',
          description: 'Join us for our daily congregational prayers including Fajr, Dhuhr, Asr, Maghrib, and Isha.',
          category: 'prayer',
          icon: 'mosque',
          image_url: '/images/prayer-service.jpg',
          status: 'active',
          featured: true,
          order_index: 1,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          title: 'Islamic Education',
          description: 'Comprehensive Islamic education programs for children and adults including Quran memorization and Arabic classes.',
          category: 'education',
          icon: 'graduation-cap',
          image_url: '/images/education-service.jpg',
          status: 'active',
          featured: true,
          order_index: 2,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: '3',
          title: 'Community Services',
          description: 'Support for the community including food assistance, counseling, and social services.',
          category: 'community',
          icon: 'hands-helping',
          image_url: '/images/community-service.jpg',
          status: 'active',
          featured: false,
          order_index: 3,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: '4',
          title: 'Welfare Programs',
          description: 'Zakat and Sadaqa collection and distribution to help those in need.',
          category: 'welfare',
          icon: 'hand-holding-heart',
          image_url: '/images/welfare-service.jpg',
          status: 'active',
          featured: true,
          order_index: 4,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ];
      updateData(sampleServices);
    }
  }, [services.length, updateData]);

  useEffect(() => {
    let filtered = services;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(service => service.category === categoryFilter);
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, categoryFilter]);

  const handleCreate = () => {
    console.log('Creating service with data:', formData);
    
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newService: Service = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      icon: formData.icon,
      image_url: formData.image_url,
      status: formData.status,
      featured: formData.featured,
      order_index: services.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('New service created:', newService);
    adminDataOperations.addService(newService);
    setIsCreateModalOpen(false);
    setFormData({
      title: '',
      description: '',
      category: 'prayer',
      icon: '',
      image_url: '',
      status: 'active',
      featured: false,
      order_index: 0
    });
  };

  const handleUpdate = () => {
    console.log('Updating service with data:', formData);
    
    if (!selectedService || !formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedService: Service = {
      ...selectedService,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      icon: formData.icon,
      image_url: formData.image_url,
      status: formData.status,
      featured: formData.featured,
      order_index: formData.order_index,
      updated_at: new Date().toISOString()
    };

    console.log('Service updated:', updatedService);
    adminDataOperations.updateService(selectedService.id, updatedService);
    setIsEditModalOpen(false);
    setSelectedService(null);
    setFormData({
      title: '',
      description: '',
      category: 'prayer',
      icon: '',
      image_url: '',
      status: 'active',
      featured: false,
      order_index: 0
    });
  };

  const handleDelete = (id: string) => {
    console.log('Deleting service with ID:', id);
    
    if (confirm('Are you sure you want to delete this service?')) {
      adminDataOperations.deleteService(id);
      console.log('Service deleted:', id);
    }
  };

  const openEditModal = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      icon: service.icon || '',
      image_url: service.image_url || '',
      status: service.status,
      featured: service.featured,
      order_index: service.order_index
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (service: Service) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };

  const moveService = (id: string, direction: 'up' | 'down') => {
    const serviceIndex = services.findIndex(s => s.id === id);
    if (serviceIndex === -1) return;

    const newServices = [...services];
    const service = newServices[serviceIndex];
    
    if (direction === 'up' && serviceIndex > 0) {
      // Move up
      newServices[serviceIndex] = newServices[serviceIndex - 1];
      newServices[serviceIndex - 1] = service;
    } else if (direction === 'down' && serviceIndex < newServices.length - 1) {
      // Move down
      newServices[serviceIndex] = newServices[serviceIndex + 1];
      newServices[serviceIndex + 1] = service;
    }

    // Update order indices
    newServices.forEach((s, index) => {
      s.order_index = index + 1;
    });

    updateData(newServices);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'prayer': return <FaMosque className="text-blue-600" />;
      case 'education': return <FaGraduationCap className="text-green-600" />;
      case 'community': return <FaUsers className="text-purple-600" />;
      case 'welfare': return <FaHandHoldingHeart className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Management</h1>
        <p className="text-gray-600">Manage mosque services and programs</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="prayer">Prayer</option>
              <option value="education">Education</option>
              <option value="community">Community</option>
              <option value="welfare">Welfare</option>
            </select>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add Service
            </button>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service, index) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        #{service.order_index}
                      </span>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveService(service.id, 'up')}
                          className="text-gray-400 hover:text-gray-600"
                          disabled={index === 0}
                        >
                          <FaArrowUp className="text-xs" />
                        </button>
                        <button
                          onClick={() => moveService(service.id, 'down')}
                          className="text-gray-400 hover:text-gray-600"
                          disabled={index === filteredServices.length - 1}
                        >
                          <FaArrowDown className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {service.icon && (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {getCategoryIcon(service.category)}
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {service.title}
                        </div>
                        {service.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <FaStar className="mr-1" /> Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openViewModal(service)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openEditModal(service)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Daily Prayer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="prayer">Prayer</option>
                      <option value="education">Education</option>
                      <option value="community">Community</option>
                      <option value="welfare">Welfare</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe the service..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="mosque"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Featured Service
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <FaSave className="inline mr-2" />
                  Save Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Edit Service</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="prayer">Prayer</option>
                      <option value="education">Education</option>
                      <option value="community">Community</option>
                      <option value="welfare">Welfare</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({...formData, icon: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Featured Service
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FaSave className="inline mr-2" />
                  Update Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Service Details</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {selectedService.icon && (
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      {getCategoryIcon(selectedService.category)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedService.title}</h3>
                    {selectedService.featured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mt-2">
                        <FaStar className="mr-1" /> Featured Service
                      </span>
                    )}
                  </div>
                </div>

                {selectedService.image_url && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <FaImage className="text-blue-600" />
                      Service Image
                    </h4>
                    <img 
                      src={selectedService.image_url} 
                      alt={selectedService.title}
                      className="w-full max-w-md rounded-lg shadow-md"
                    />
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Description</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Category</h4>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(selectedService.category)}
                      <span className="text-gray-700 font-medium">
                        {selectedService.category}
                      </span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Status</h4>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedService.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedService.status}
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Order</h4>
                  <p className="text-gray-700">
                    Display Order: #{selectedService.order_index}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceManager;
