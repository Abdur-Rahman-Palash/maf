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
    Fajr: '5:15 AM',
    Sunrise: '6:30 AM', 
    Dhuhr: '12:30 PM',
    Asr: '3:45 PM',
    Maghrib: '6:00 PM',
    Isha: '7:15 PM'
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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Subtle dome silhouette watermark */}
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjBDMTQ0LjE4IDIwIDE4MCA1NS44MTgyIDE4MCAxMDBDMTgwIDE0NC4xODIgMTQ0LjE4IDE4MCAxMDAgMTgwQzU1LjgxODIgMTgwIDIwIDE0NC4xODIgMjAgMTAwQzIwIDU1LjgxODIgNTUuODE4MiAyMCAxMDAgMjBaIiBmaWxsPSIjRkZEN0AwIi8+Cjwvc3ZnPgo=')] bg-center bg-no-repeat bg-contain" />
      </div>

      {/* Prayer Time Widget - Left Side */}
      <motion.div
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <AnimatePresence>
          {showPrayerTimes ? (
            <motion.div
              className="bg-black/95 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/50 shadow-2xl"
              initial={{ width: 100, height: 100 }}
              animate={{ width: 450, height: 'auto' }}
              exit={{ width: 100, height: 100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-yellow-400 font-bold text-xl">Prayer Times</h3>
                <motion.button
                  onClick={() => setShowPrayerTimes(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                  <motion.div
                    key={prayer}
                    className="flex items-center justify-between text-white/90 text-base"
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
          ) : (
            <motion.button
              onClick={() => setShowPrayerTimes(true)}
              className="bg-black/95 backdrop-blur-md rounded-full p-6 border border-yellow-400/50 shadow-2xl hover:bg-black/100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaMosque className="w-10 h-10 text-yellow-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-6 leading-tight"
            style={{
              fontFamily: 'Georgia, serif',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            Welcome to our
            <br />
            Masjid Salman al Farsi
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          >
 From Modern Architecture to Spiritual Masterpiece –
            <br />
            Experience the Beauty of Islamic Worship
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6 }}
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.3)',
                  '0 0 40px rgba(255, 215, 0, 0.6)',
                  '0 0 20px rgba(255, 215, 0, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <button
                onClick={() => router.push('/visitors/book-visit')}
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-full font-bold text-lg sm:text-xl lg:text-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaTicketAlt className="text-xl sm:text-2xl" />
                  Book Skip-the-Line Tickets
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>

            {/* Secondary CTA */}
            <Link
              href="/architecture/overview"
              className="group relative overflow-hidden bg-transparent border-2 border-white/60 text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-full font-bold text-lg sm:text-xl lg:text-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 block"
              onClick={() => {
                console.log('Architecture link clicked!');
                alert('Architecture link clicked!');
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaPlay className="text-xl sm:text-2xl" />
                Explore Hidden Stories
              </span>
            </Link>
          </motion.div>
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

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-yellow-500 w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
