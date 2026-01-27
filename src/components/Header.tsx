'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSearch, FaGlobe, FaHeart } from 'react-icons/fa';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [currentSection, setCurrentSection] = useState('hero');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

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
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
    setCurrentLang(newLocale === 'en' ? 'EN' : 'TR');
    console.log(`Language switched to: ${newLocale}`);
    alert(`Language switched to: ${newLocale.toUpperCase()}`);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/mosques/sheikh-zayed' },
    { name: 'Programs', href: '/programs' },
    { name: 'E-Services', href: '/e-services' },
    { name: 'Services', href: '/worshippers/services-facilities' },
    { name: 'Architecture', href: '/architecture/overview' }
  ];

  // Dynamic background based on current section
  const getBackgroundClass = () => {
    if (!isScrolled) return 'bg-transparent backdrop-blur-sm';
    
    switch (currentSection) {
      case 'hero':
        return 'bg-white/90 backdrop-blur-md shadow-lg';
      case 'banner':
        return 'bg-white/90 backdrop-blur-md shadow-lg';
      case 'services':
        return 'bg-white/90 backdrop-blur-md shadow-lg';
      case 'quran':
        return 'bg-white/90 backdrop-blur-md shadow-lg';
      default:
        return 'bg-white/90 backdrop-blur-md shadow-lg';
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
          <motion.div
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <h1 
                  className={`text-3xl md:text-4xl font-bold ${isScrolled ? 'text-black' : 'text-black'}`}
                  style={{ 
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    letterSpacing: '1px',
                    textShadow: isScrolled ? 'none' : '0 4px 12px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)'
                  }}
                >
                  Masjid Salman al
                </h1>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/70 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              <span 
                className={`hidden md:block text-xl md:text-2xl ${isScrolled ? 'text-black' : 'text-black'} font-semibold`}
                style={{ 
                  fontFamily: 'Georgia, serif',
                  textShadow: isScrolled ? 'none' : '0 2px 8px rgba(255,255,255,0.8)'
                }}
              >
                Farsi
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    href={link.href}
                    className={`relative ${isScrolled ? 'text-black hover:text-yellow-600' : 'text-black hover:text-yellow-600'} transition-colors duration-200 font-bold block py-2`}
                    style={{ 
                      fontFamily: 'system-ui, sans-serif',
                      textShadow: isScrolled ? 'none' : '0 2px 6px rgba(255,255,255,0.8)'
                    }}
                  >
                    {link.name}
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Right Side - Donate Button & Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <motion.button
              onClick={() => {
                console.log('Search clicked!');
                alert('Search functionality coming soon!');
              }}
              className={`hidden md:flex ${isScrolled ? 'text-black hover:text-yellow-600' : 'text-black hover:text-yellow-600'} transition-colors duration-200`}
              style={{ textShadow: isScrolled ? 'none' : '0 2px 6px rgba(255,255,255,0.8)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaSearch className="text-lg" />
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className={`hidden md:flex items-center space-x-2 ${isScrolled ? 'text-black hover:text-yellow-600' : 'text-black hover:text-yellow-600'} transition-colors duration-200`}
              style={{ textShadow: isScrolled ? 'none' : '0 2px 6px rgba(255,255,255,0.8)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGlobe className="text-sm" />
              <span className="text-sm font-medium">{currentLang}</span>
            </motion.button>

            {/* Gorgeous Donate Button */}
            <Link
              href="/donate"
              className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-pink-500/70 transition-all duration-300 flex items-center gap-3 border-2 border-pink-400/30 hover:scale-105 z-50"
              style={{ pointerEvents: 'auto' }}
            >
              <FaHeart className="text-base" />
              <span className="relative z-10 font-bold tracking-wide">Donate</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 transform translate-y-full hover:translate-y-0 transition-transform duration-300 rounded-full" />
            </Link>

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
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Link
                        href={link.href}
                        className="block text-black hover:text-yellow-600 transition-colors duration-200 font-bold py-3 px-4 rounded-lg hover:bg-white/20"
                        style={{ 
                          fontFamily: 'system-ui, sans-serif',
                          textShadow: '0 2px 6px rgba(255,255,255,0.8)'
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Donate Button */}
                <Link
                  href="/donate"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2 mb-6 hover:scale-105"
                >
                  <FaHeart className="text-sm" />
                  <span>Donate</span>
                </Link>

                {/* Mobile Language & Search */}
                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <motion.button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-2 text-black hover:text-yellow-600 transition-colors duration-200"
                    style={{ textShadow: '0 2px 6px rgba(255,255,255,0.8)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGlobe className="text-sm" />
                    <span className="text-sm font-medium">{currentLang}</span>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      console.log('Mobile search clicked!');
                      alert('Search functionality coming soon!');
                    }}
                    className="text-black hover:text-yellow-600 transition-colors duration-200"
                    style={{ textShadow: '0 2px 6px rgba(255,255,255,0.8)' }}
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
