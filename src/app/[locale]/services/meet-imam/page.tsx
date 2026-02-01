'use client';

import { motion } from 'framer-motion';
import { FaUserTie, FaCalendarAlt, FaPhone, FaBook, FaEnvelope, FaClock } from 'react-icons/fa';
import { useState } from 'react';

export default function MeetImam() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Appointment request submitted! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            Meet our Imam
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a meeting up to two weeks in advance with one of our Imams to discuss one of a range of topics
          </p>
        </motion.div>

        {/* Top Section - Spiritual Guidance (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <FaUserTie className="text-3xl text-green-600 mr-4" />
            <h2 className="text-2xl font-bold text-gray-900">Spiritual Guidance</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Our Imams are available to provide spiritual guidance, counseling, and support
            for various aspects of Islamic life and personal development.
          </p>
          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-green-800 font-medium text-center text-lg">
              &quot;And consult them in the affairs. Then when you have taken a decision,
              put your trust in Allah.&quot;
              <span className="text-sm block mt-2">- Quran 3:159</span>
            </p>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <FaUserTie className="text-3xl text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-800">Personal Counseling</h3>
              <p className="text-gray-600 text-sm">One-on-one spiritual guidance for personal matters</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <FaBook className="text-3xl text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-800">Islamic Education</h3>
              <p className="text-gray-600 text-sm">Learn about Islamic principles and practices</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <FaPhone className="text-3xl text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-800">Family Support</h3>
              <p className="text-gray-600 text-sm">Guidance for family and marital issues</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section - Parallel Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaUserTie className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2 text-blue-600" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaClock className="inline mr-2 text-purple-600" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  min="09:00"
                  max="18:00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Office hours: 9:00 AM - 6:00 PM</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUserTie className="inline mr-2 text-green-600" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-2 text-blue-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                Submit Appointment Request
              </button>
            </form>
          </motion.div>

          {/* Right Side - Topics for Discussion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaBook className="text-3xl text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Topics for Discussion</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Our Imams can assist with:
            </p>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Islamic questions and answers
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Marriage counseling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Family disputes
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Personal development
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Religious education
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Community matters
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
