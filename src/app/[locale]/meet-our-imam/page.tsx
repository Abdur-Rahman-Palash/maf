'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaBook, FaHandsHelping, FaEnvelope, FaPhone, FaClock, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function MeetOurImamPage() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    topic: '',
    customTopic: '',
    name: '',
    email: ''
  });

  const counselingTopics = [
    'Islamic questions and answers',
    'Marriage counseling',
    'Family issues',
    'Personal issue',
    'Religious / general education',
    'Community matters',
    'Other (please specify)'
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment booked:', formData);
    // Handle appointment booking logic here
    alert('Appointment request submitted successfully! We will contact you soon.');
    setShowAppointmentModal(false);
    setFormData({
      date: '',
      time: '',
      topic: '',
      customTopic: '',
      name: '',
      email: ''
    });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaUserGraduate className="text-emerald-600 text-4xl" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Meet Our Imam
            </h1>
            <FaUserGraduate className="text-emerald-600 text-4xl" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about our spiritual leader and guide
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Imam Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 text-center sticky top-8">
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-full flex items-center justify-center">
                <FaUserGraduate className="text-6xl text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sheikh Dr. Md Ataur Rahman Sarkar</h2>
              <p className="text-emerald-600 font-semibold mb-4"> Imam and Khatib</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <FaEnvelope className="text-emerald-600" />
                  <span>imam@masjidsalmanalfarsi.org</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <FaPhone className="text-emerald-600" />
                  <span>(770) 934-7777</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Biography */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaUserGraduate className="text-3xl text-emerald-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Biography</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Mawlana Dr. Ataur Sarkar has a PhD in Electrical Engineering and works at Intel Corporation, Oregon, as a Senior Product Development Engineer. He has more than three decades of formal and informal teaching experience at various levels and areas. He was an Assistant Professor in the Department of Electrical and Electronic Engineering in Bangladesh University of Engineering and Technology and taught in Canada and USA during his graduate studies. He is licensed Professional Engineer (PE) in Electronics, Controls, and Communications and a certified Notary Public of the State of Oregon.
              </p>
              <p className="text-gray-600 leading-relaxed">
               He is highly enthusiastic about learning, practicing, and preaching the teachings of Quran and Sunnah, and call people to the beautiful way life, Islam. Allah SWT has blessed him with the tawfiq to memorize the Noble Quran and complete Dars-e-Nizami Dawrah Hadith Alimiyyah degree equivalent to a master’s in Islamic studies in August 2024. He has multiple Ijazaat in Quran recitation, Books of Hadith, Arabic language, and Islamic laws of inheritance. He has completed formal courses on the Rules and Regulations of Reciting Quran Properly (Tajweed), Quranic Exegesis and its Principles (Tafsir), Islamic Creed and its Principles (Aqidah), Islamic Jurisprudence and its Principles (Fiqh), and is still studying in all these areas. Mawlana Sarkar is currently pursuing an Ifta degree in pursuit of becoming a Mufti. He has conducted several courses on Arabic language and Tajweed for the community in the past years. He conducted Tajweed4All sessions open to local and international participants and is currently leading the Tajweed session hosted by PDX Quran Study Circle. He has been delivering Friday sermons in the local Masjids and Vancouver Islands in Canada for last several years.

He is the founding President of Jamiatul Ikhlas where he is offering voluntary service as the Director and Lead Instructor of Quran and Adab (QnA) program.
              </p>
            </div>

            {/* Education & Qualifications */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaBook className="text-3xl text-amber-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Education & Qualifications</h2>
              </div>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2 mt-1">•</span>
                  <span>Advanced degree in Islamic Studies from renowned Islamic institution</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2 mt-1">•</span>
                  <span>Ijazah (certification) in Quranic recitation and memorization</span>
                </li>
                
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2 mt-1">•</span>
                  <span>Fluent in Arabic, English, and other community languages</span>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaHandsHelping className="text-3xl text-rose-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Services & Availability</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Religious Services</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Daily Salah (Prayer) Leadership</li>
                    <li>• Friday Khutbah (Sermon)</li>
                    <li>• Quranic Studies Classes</li>
                    <li>• Islamic Education for Youth</li>
                    <li>• Marriage Counseling</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Office Hours</h3>
                  <div className="text-gray-600 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-emerald-600" />
                      <span>Monday - Thursday: 9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-emerald-600" />
                      <span>Friday: 9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-emerald-600" />
                      <span>Saturday: 10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-emerald-600" />
                      <span>Sunday: By Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h2>
              <p className="text-gray-600 text-center mb-6">
                Our Imam is available for spiritual guidance, counseling, and religious questions. 
                Please feel free to reach out during office hours or leave a message.
              </p>
              <div className="text-center">
                <button 
                  onClick={() => setShowAppointmentModal(true)}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AnimatePresence>
        {showAppointmentModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowAppointmentModal(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-amber-600 p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-2xl text-white" />
                    <h2 className="text-2xl font-bold text-white">Schedule Appointment</h2>
                  </div>
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 overflow-y-auto">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2 text-emerald-600" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    min={getMinDate()}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaClock className="inline mr-2 text-emerald-600" />
                    Preferred Time
                  </label>
                  <div className="space-y-2">
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select a time or enter manually</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                      <option value="manual">Enter time manually</option>
                    </select>
                    {formData.time === 'manual' && (
                      <input
                        type="text"
                        placeholder="Enter preferred time (e.g., 2:30 PM)"
                        value={formData.time === 'manual' ? '' : formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    )}
                  </div>
                </div>

                {/* Counseling Topic */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaHandsHelping className="inline mr-2 text-emerald-600" />
                    Counseling Topic
                  </label>
                  <div className="space-y-2">
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select a topic or enter manually</option>
                      {counselingTopics.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                      <option value="manual">Enter topic manually</option>
                    </select>
                    {(formData.topic === 'Other (please specify)' || formData.topic === 'manual') && (
                      <input
                        type="text"
                        placeholder="Please specify your topic"
                        value={formData.customTopic}
                        onChange={(e) => setFormData({ ...formData, customTopic: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaUserGraduate className="inline mr-2 text-emerald-600" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2 text-emerald-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAppointmentModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-amber-600 text-white rounded-lg hover:from-emerald-700 hover:to-amber-700 transition-colors font-semibold"
                  >
                    Submit Appointment Request
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
