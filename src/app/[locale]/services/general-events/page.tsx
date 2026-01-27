'use client';

import { motion } from 'framer-motion';
import {FaCalendarAlt, FaUsers, FaHome, FaPhone} from 'react-icons/fa';

export default function GeneralEvents() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            General Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To book rooms for other events or Islamic celebrations, from 'aqiqas and private gatherings to conferences, we offer rooms at reasonable rates of hire
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaHome className="text-3xl text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Event Facilities</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Our mosque offers versatile spaces for various Islamic events and celebrations. 
              We provide well-maintained facilities suitable for both small gatherings and larger events.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Multi-purpose event halls</li>
              <li>• Conference rooms</li>
              <li>• Dining facilities</li>
              <li>• Audio/visual equipment</li>
              <li>• Parking available</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FaUsers className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Event Types</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We accommodate various Islamic celebrations and community events:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Aqiqah (baby naming ceremonies)</li>
              <li>• Walimah (wedding receptions)</li>
              <li>• Private gatherings</li>
              <li>• Conferences and seminars</li>
              <li>• Community meetings</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Capacity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Room Rates</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Small Hall (50 people):</span>
                  <span className="font-medium">$200/hour</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Main Hall (200 people):</span>
                  <span className="font-medium">$500/hour</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Conference Room (30 people):</span>
                  <span className="font-medium">$150/hour</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Included Services</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Tables and chairs</li>
                <li>• Basic sound system</li>
                <li>• Cleaning services</li>
                <li>• Parking access</li>
                <li>• Setup assistance</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <FaCalendarAlt className="text-3xl text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Inquire</h3>
              <p className="text-sm text-gray-600">Contact us with your event details</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <FaPhone className="text-3xl text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Consultation</h3>
              <p className="text-sm text-gray-600">Discuss requirements and pricing</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <FaHome className="text-3xl text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Book</h3>
              <p className="text-sm text-gray-600">Confirm your reservation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
