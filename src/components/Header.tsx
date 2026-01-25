'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSearch, FaGlobe, FaHeart } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect current section for color matching
      const sections = ['hero', 'banner', 'services', 'quran'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'EN' ? 'TR' : 'EN');
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#banner' },
    { name: 'Services', href: '#services' },
    { name: 'Quran', href: '#quran' }
  ];

  // Dynamic background based on current section
  const getBackgroundClass = () => {
    if (!isScrolled) return 'bg-gradient-to-r from-teal-900/80 via-teal-800/80 to-yellow-700/80 backdrop-blur-sm';
    
    switch (currentSection) {
      case 'hero':
        return 'bg-gradient-to-r from-teal-900/95 via-teal-800/95 to-yellow-700/95 backdrop-blur-md';
      case 'banner':
        return 'bg-gradient-to-r from-amber-900/95 via-amber-800/95 to-yellow-700/95 backdrop-blur-md';
      case 'services':
        return 'bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-indigo-700/95 backdrop-blur-md';
      case 'quran':
        return 'bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-pink-700/95 backdrop-blur-md';
      default:
        return 'bg-gradient-to-r from-teal-900/95 via-teal-800/95 to-yellow-700/95 backdrop-blur-md';
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[999999] transition-all duration-500 ${getBackgroundClass()} shadow-2xl backdrop-blur-md`}
        style={{ 
          height: '80px',
          position: 'fixed',
          width: '100vw',
          left: 0,
          top: 0,
          transform: 'translateZ(0)'
        }}
      >
        <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-12">
          {/* Logo - Left */}
          <motion.a
            href="#hero"
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <h1 
                className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  letterSpacing: '1px',
                  textShadow: '0 4px 8px rgba(0,0,0,0.4)'
                }}
              >
                Masjid Salman al
              </h1>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/70 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
            <span 
              className="hidden md:block text-xl md:text-2xl text-yellow-200/90 font-semibold"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Farsi
            </span>
          </motion.a>

          {/* Navigation Links - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="relative text-white/90 hover:text-yellow-300 transition-colors duration-200 font-medium"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </nav>

          {/* Right Side - Donate Button & Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <motion.button
              className="hidden md:flex text-white/80 hover:text-yellow-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaSearch className="text-lg" />
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="hidden md:flex items-center space-x-2 text-white/80 hover:text-yellow-300 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGlobe className="text-sm" />
              <span className="text-sm font-medium">{currentLang}</span>
            </motion.button>

            {/* Gorgeous Donate Button */}
            <motion.button
              className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-pink-500/70 transition-all duration-300 flex items-center gap-3 border-2 border-pink-400/30"
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(236, 72, 153, 0.3)',
                  '0 0 40px rgba(236, 72, 153, 0.6)',
                  '0 0 20px rgba(236, 72, 153, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <FaHeart className="text-base" />
              </motion.div>
              <span className="relative z-10 font-bold tracking-wide">Donate</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 transform translate-y-full hover:translate-y-0 transition-transform duration-300 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden text-white/80 hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="absolute top-20 right-0 w-80 max-w-full bg-gradient-to-b from-teal-900/95 to-teal-800/95 backdrop-blur-md shadow-2xl rounded-l-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="p-6">
                {/* Mobile Nav Links */}
                <nav className="space-y-4 mb-6">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="block text-white/90 hover:text-yellow-300 transition-colors duration-200 font-medium py-3 px-4 rounded-lg hover:bg-white/10"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Donate Button */}
                <motion.button
                  className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaHeart className="text-sm" />
                  <span>Donate</span>
                </motion.button>

                {/* Mobile Language & Search */}
                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <motion.button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-2 text-white/80 hover:text-yellow-300 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGlobe className="text-sm" />
                    <span className="text-sm font-medium">{currentLang}</span>
                  </motion.button>

                  <motion.button
                    className="text-white/80 hover:text-yellow-300 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaSearch className="text-lg" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div style={{ height: '80px' }} />
    </>
  );
};

export default Header;
