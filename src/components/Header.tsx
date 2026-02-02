'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSearch, FaGlobe, FaHeart } from 'react-icons/fa';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import HeaderPrayerTimes from './HeaderPrayerTimes';
import DonateButton from './DonateButton';

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
    { name: 'About Us', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Events', href: '/events' },
    { name: 'Media', href: '/media' },
    { name: 'Contact Us', href: '/contact' }
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
      {/* Prayer Times Bar - Normal header content */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <HeaderPrayerTimes />
      </div>

      {/* Sticky Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-[999999] transition-all duration-500 ${getBackgroundClass()} shadow-2xl backdrop-blur-md`}
        style={{ 
          height: '80px',
          position: 'sticky',
          width: '100vw',
          left: 0,
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
                <img
                  src="/cropped-logo.png"
                  alt="Masjid Salman al Farsi"
                  className="h-14 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/70 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
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

          {/* Right Side - Donate Button Only */}
          <div className="flex items-center space-x-4">
            {/* Donate Button */}
            <DonateButton href="/donate" className="my-0">
              Donate
            </DonateButton>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden text-gray-800 hover:text-yellow-600 transition-colors duration-200"
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
                        className="block text-white hover:text-yellow-600 transition-colors duration-200 font-bold py-3 px-4 rounded-lg hover:bg-white/20"
                        style={{ 
                          fontFamily: 'system-ui, sans-serif',
                          textShadow: '0 2px 6px rgba(0,0,0,0.8)'
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Donate Button */}
                <DonateButton 
                  href="/donate"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center my-4"
                >
                  Donate
                </DonateButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
