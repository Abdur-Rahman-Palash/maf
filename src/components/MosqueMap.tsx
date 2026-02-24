'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const MosqueMap = () => {
  const mosqueInfo = {
    name: 'Masjid Salman Al Farsi',
    address: '2187 Fellowship Rd, Tucker, GA 30084',
    phone: '(770) 934-7777',
    email: 'info@masjidsalmanalfarsi.org',
    coordinates: {
      lat: 33.8545,
      lng: -84.2198
    }
  };

  const prayerTimes = {
    Fajr: '5:45 AM',
    Dhuhr: '1:00 PM',
    Asr: '3:30 PM',
    Maghrib: '6:15 PM',
    Isha: '7:30 PM'
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 py-16 px-6 overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIzA0NzY1MSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSIjMDQ3NjUxIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiMwNDc2NTEiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI1MCIgcj0iMSIgZmlsbD0iIzA0NzY1MSIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjMDQ3NjUxIi8+CjwvZGlnPgo=')] bg-repeat" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-emerald-600 text-3xl" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-philosopher), sans-serif' }}>
              Find Us
            </h2>
            <FaMapMarkerAlt className="text-emerald-600 text-3xl" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our beautiful mosque in Tucker, Georgia
          </p>
        </motion.div>

        {/* Full Width Map */}
        <motion.div
          className="bg-white shadow-lg overflow-hidden"
          style={{
            borderRadius: '2rem 0.5rem 3rem 1rem',
            borderTopLeftRadius: '2rem',
            borderTopRightRadius: '0.5rem',
            borderBottomRightRadius: '3rem',
            borderBottomLeftRadius: '1rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative h-96 lg:h-[500px] bg-gray-100">
            {/* Embedded Google Map */}
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8954329!2d-84.2198!3d33.8545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a1a5a5a5a5a5%3A0x5a5a5a5a5a5a5a5a!2s${encodeURIComponent(mosqueInfo.address)}!5e0!3m2!1sen!2sus!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Masjid Salman Al Farsi Location"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MosqueMap;
