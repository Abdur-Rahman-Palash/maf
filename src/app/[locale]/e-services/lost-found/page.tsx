'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaClipboardList, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

export default function LostFound() {
  const [formData, setFormData] = useState({
    type: 'lost',
    name: '',
    contact: '',
    email: '',
    description: '',
    date: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your submission. We will contact you soon.');
    setFormData({
      type: 'lost',
      name: '',
      contact: '',
      email: '',
      description: '',
      date: '',
      location: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            LOST & FOUND
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Report and track lost items within the mosque premises
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Lost or Found Items</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="lost">Lost Item</option>
                  <option value="found">Found Item</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location in Mosque
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Prayer Hall, Entrance, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Please describe the item in detail..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Submit Report
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Process</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaClipboardList className="text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Report</h4>
                    <p className="text-gray-600 text-sm">Fill out the form with detailed information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaSearch className="text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Review</h4>
                    <p className="text-gray-600 text-sm">Our team reviews and investigates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaPhone className="text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Contact</h4>
                    <p className="text-gray-600 text-sm">We'll contact you within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-2 text-blue-600" />
                  <span>+1 (503) 437-2165</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-2 text-green-600" />
                  <span>lostfound@masjidsalmanlfarsi.org</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Report within 24 hours for best results</li>
                <li>• Provide detailed descriptions</li>
                <li>• Keep your contact information updated</li>
                <li>• Check back regularly for updates</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
