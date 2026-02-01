'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTicketAlt, FaPlay, FaChevronDown, FaMosque, FaTimes, FaMoon, FaSun, FaCloudSun, FaCloudMoon } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPrayerTimes, setShowPrayerTimes] = useState(false);
  const router = useRouter();

  // Prayer times for Masjid Salman al Farsi
  const prayerTimes = {
    Fajr: '5:45 AM',
    Sunrise: '6:30 AM', 
    Dhuhr: '1:00 PM',
    Asr: '3:30 PM',
    Maghrib: '6:15 PM',
    Isha: '7:30 PM'
  };

  const [nextPrayer, setNextPrayer] = useState({ name: 'DHUHR', time: '12:30 PM' });

  // Prayer icons mapping
  const prayerIcons = {
    Fajr: <FaMoon className="text-blue-200" />,
    Sunrise: <FaSun className="text-orange-200" />,
    Dhuhr: <FaSun className="text-yellow-200" />,
    Asr: <FaCloudSun className="text-orange-200" />,
    Maghrib: <FaCloudMoon className="text-purple-200" />,
    Isha: <FaMoon className="text-indigo-200" />
  };

  const slides = [
    {
      id: 1,
      image: '/image1.png',
      title: 'Grand Mosque',
      description: 'Magnificent Islamic architecture with golden domes'
    },
    {
      id: 2,
      image: '/image2.jpg',
      title: 'Prayer Hall',
      description: 'Serene interior with intricate Islamic patterns'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900">
      {/* Remove Background Slideshow - Using gradient background instead */}

      {/* Subtle dome silhouette watermark */}
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjBDMTQ0LjE4IDIwIDE4MCA1NS44MTgyIDE4MCAxMDBDMTgwIDE0NC4xODIgMTQ0LjE4IDE4MCAxMDAgMTgwQzU1LjgxODIgMTgwIDIwIDE0NC4xODIgMjAgMTAwQzIwIDU1LjgxODIgNTUuODE4MiAyMCAxMDAgMjBaIiBmaWxsPSIjRkZEN0AwIi8+Cjwvc3ZnPgo=')] bg-center bg-no-repeat bg-contain" />
      </div>

      {/* Prayer Times Modal */}
      <AnimatePresence>
        {showPrayerTimes && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrayerTimes(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl p-8 border border-yellow-400/50 shadow-2xl max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-yellow-400 font-bold text-2xl">Prayer Times</h3>
                <motion.button
                  onClick={() => setShowPrayerTimes(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                  <motion.div
                    key={prayer}
                    className="flex items-center justify-between text-white/90 text-base bg-black/20 rounded-lg p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      {prayerIcons[prayer as keyof typeof prayerIcons]}
                      <span className="font-bold text-lg">{prayer}</span>
                    </div>
                    <span className="text-yellow-300 font-bold text-lg">{time}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-yellow-400/40">
                <div className="text-base text-yellow-400">
                  <div className="font-bold text-lg">Next: {nextPrayer.name}</div>
                  <div className="text-yellow-300 font-bold text-lg">{nextPrayer.time}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* Main Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-6 leading-snug sm:leading-tight"
            style={{
              fontFamily: 'var(--font-philosopher), serif'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <span className="block">Welcome to</span>
            <span className="block">Masjid Salman al Farsi</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          >
 From Modern Architecture to Spiritual Masterpiece –
            <br />
            Experience the Beauty of Islamic Worship
          </motion.p>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaChevronDown className="text-2xl" />
          <span className="text-sm font-medium">Journey Begins Here</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
