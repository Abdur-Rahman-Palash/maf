'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaCamera, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone, FaFlag, FaSearch, FaTimes } from 'react-icons/fa';

interface LostItem {
  typeCode: string;
  location: string;
  description: string;
  lostDate: string;
  lostTime: string;
  attachment?: File;
}

const LostAndFound: React.FC = () => {
  const [formData, setFormData] = useState({
    ticketNumber: '',
    name: '',
    email: '',
    phoneNumber: '',
    nationalityCode: '',
    items: {
      typeCode: '',
      location: '',
      description: '',
      lostDate: '',
      lostTime: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemTypes = [
    { value: '77', label: 'Mobile Phone' },
    { value: '78', label: 'Headsets' },
    { value: '80', label: 'Camera' },
    { value: '82', label: 'Electronic Devices' },
    { value: '95', label: 'Key' },
    { value: '101', label: 'Glasses' },
    { value: '113', label: 'Clothes' },
    { value: '116', label: 'Shoes' },
    { value: '141', label: 'Wallet' },
    { value: '142', label: 'Bags' },
    { value: '145', label: 'Watch' },
    { value: '152', label: 'Jewelry' },
    { value: '174', label: 'Passport' },
    { value: '178', label: 'Card' },
    { value: '2110', label: 'Smoking Tools' },
    { value: '2111', label: 'Kids Accessories' },
    { value: '2112', label: 'Others' }
  ];

  const nationalities = [
    { value: 'US', label: 'United States of America' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'IN', label: 'Republic of India' },
    { value: 'PK', label: 'Islamic Republic of Pakistan' },
    { value: 'EG', label: 'Arab Republic of Egypt' },
    { value: 'SA', label: 'Kingdom of Saudi Arabia' },
    { value: 'BD', label: 'People\'s Republic of Bangladesh' }
  ];

  const validateField = (field: string, value: string): boolean => {
    let isValid = true;
    let errorMessage = '';

    switch (field) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Name is required';
          isValid = false;
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = 'Please enter a valid email';
          isValid = false;
        }
        break;
      case 'phoneNumber':
        if (!value.trim()) {
          errorMessage = 'Phone number is required';
          isValid = false;
        }
        break;
      case 'nationalityCode':
        if (!value) {
          errorMessage = 'Nationality is required';
          isValid = false;
        }
        break;
      case 'typeCode':
        if (!value) {
          errorMessage = 'Lost item type is required';
          isValid = false;
        }
        break;
      case 'location':
        if (!value.trim()) {
          errorMessage = 'Location is required';
          isValid = false;
        }
        break;
      case 'description':
        if (!value.trim()) {
          errorMessage = 'Description is required';
          isValid = false;
        }
        break;
      case 'lostDate':
        if (!value) {
          errorMessage = 'Lost date is required';
          isValid = false;
        }
        break;
      case 'lostTime':
        if (!value) {
          errorMessage = 'Lost time is required';
          isValid = false;
        }
        break;
    }

    setErrors(prev => ({ ...prev, [field]: errorMessage }));
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleItemChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [field]: value
      }
    }));
    
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const fieldsToValidate = [
      'name', 'email', 'phoneNumber', 'nationalityCode',
      'typeCode', 'location', 'description', 'lostDate', 'lostTime'
    ];

    let isValid = true;
    for (const field of fieldsToValidate) {
      const value = field.includes('typeCode') || field.includes('location') || 
                   field.includes('description') || field.includes('lostDate') || 
                   field.includes('lostTime') 
        ? formData.items[field as keyof typeof formData.items] 
        : formData[field as keyof typeof formData];
      
      if (!validateField(field, value as string)) {
        isValid = false;
      }
    }

    if (isValid) {
      // Here you would normally submit to your backend
      console.log('Form submitted:', formData);
      alert('Lost item report submitted successfully! We will contact you within 3 working days.');
      
      // Reset form
      setFormData({
        ticketNumber: '',
        name: '',
        email: '',
        phoneNumber: '',
        nationalityCode: '',
        items: {
          typeCode: '',
          location: '',
          description: '',
          lostDate: '',
          lostTime: ''
        }
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-slate-50 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-slate-800 mb-4"
            style={{ fontFamily: 'var(--font-amiri)' }}
          >
            Lost and Found
            <motion.span
              className="inline-block ml-3 text-amber-500"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <FaSearch />
            </motion.span>
          </motion.h2>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start space-x-3">
            <FaInfoCircle className="text-amber-500 text-xl mt-1 flex-shrink-0" />
            <p className="text-slate-700">
              Please fill-up the form below. We will contact you within 3 working days
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Personal Information */}
          <h3 className="text-2xl font-bold text-slate-800 mb-6 pb-3 border-b border-amber-200">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Access Pass Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Access Pass Number (If exists)
              </label>
              <input
                type="text"
                value={formData.ticketNumber}
                onChange={(e) => handleInputChange('ticketNumber', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter access pass number"
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => validateField('name', formData.name)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                <div className="flex items-center space-x-1">
                  <FaInfoCircle className="text-amber-500 text-xs" />
                  <span>Email <span className="text-red-500">*</span></span>
                </div>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => validateField('email', formData.email)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  onBlur={() => validateField('phoneNumber', formData.phoneNumber)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    errors.phoneNumber ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Nationality */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Nationality <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <select
                  value={formData.nationalityCode}
                  onChange={(e) => handleInputChange('nationalityCode', e.target.value)}
                  onBlur={() => validateField('nationalityCode', formData.nationalityCode)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none ${
                    errors.nationalityCode ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Choose Nationality</option>
                  {nationalities.map(nat => (
                    <option key={nat.value} value={nat.value}>
                      {nat.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.nationalityCode && (
                <p className="text-red-500 text-sm">{errors.nationalityCode}</p>
              )}
            </div>
          </div>

          {/* Lost Items Details */}
          <h3 className="text-2xl font-bold text-slate-800 mb-6 pb-3 border-b border-amber-200">
            Lost Items Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Lost Item Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Lost item type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.items.typeCode}
                onChange={(e) => handleItemChange('typeCode', e.target.value)}
                onBlur={() => validateField('typeCode', formData.items.typeCode)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none ${
                  errors.typeCode ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Choose Type</option>
                {itemTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.typeCode && (
                <p className="text-red-500 text-sm">{errors.typeCode}</p>
              )}
            </div>

            {/* Lost Item Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Lost item Location/Area <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.items.location}
                  onChange={(e) => handleItemChange('location', e.target.value)}
                  onBlur={() => validateField('location', formData.items.location)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    errors.location ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g., Prayer Hall, Parking Area"
                />
              </div>
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>

            {/* Lost Item Description */}
            <div className="space-y-2 lg:col-span-3">
              <label className="block text-sm font-medium text-slate-700">
                Lost Item Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.items.description}
                onChange={(e) => handleItemChange('description', e.target.value)}
                onBlur={() => validateField('description', formData.items.description)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all h-32 resize-none ${
                  errors.description ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Please provide detailed description of the lost item (color, brand, unique features, etc.)"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Lost Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Lost Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={formData.items.lostDate}
                  onChange={(e) => handleItemChange('lostDate', e.target.value)}
                  onBlur={() => validateField('lostDate', formData.items.lostDate)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    errors.lostDate ? 'border-red-500' : 'border-slate-300'
                  }`}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.lostDate && (
                <p className="text-red-500 text-sm">{errors.lostDate}</p>
              )}
            </div>

            {/* Lost Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Lost Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="time"
                  value={formData.items.lostTime}
                  onChange={(e) => handleItemChange('lostTime', e.target.value)}
                  onBlur={() => validateField('lostTime', formData.items.lostTime)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    errors.lostTime ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.lostTime && (
                <p className="text-red-500 text-sm">{errors.lostTime}</p>
              )}
            </div>

            {/* Picture Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Picture of the lost item (if exists)
              </label>
              <div className="relative">
                <FaCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <motion.button
              type="button"
              onClick={() => {
                setFormData({
                  ticketNumber: '',
                  name: '',
                  email: '',
                  phoneNumber: '',
                  nationalityCode: '',
                  items: {
                    typeCode: '',
                    location: '',
                    description: '',
                    lostDate: '',
                    lostTime: ''
                  }
                });
                setErrors({});
              }}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTimes />
              <span>Cancel</span>
            </motion.button>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FaSearch />
                  <span>Submit Report</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default LostAndFound;
