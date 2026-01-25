'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiYoutube,
  FiGlobe
} from 'react-icons/fi';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();
  const router = useRouter();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Navigation Links with Dropdown Structure
  const navLinks = [
    {
      key: 'home',
      href: '/',
      label: 'Home',
      dropdown: null
    },
    {
      key: 'worshippers',
      href: '#',
      label: 'Worshippers',
      dropdown: [
        { href: '/worshippers/prayer-timings', label: 'Prayer Timings' },
        { href: '/worshippers/friday-sermon', label: 'Friday Sermon & Minbar Al Jami' },
        { href: '/worshippers/mosque-manners', label: 'Mosque Manners' },
        { href: '/worshippers/religious-programs', label: 'Religious Programs' },
        { href: '/worshippers/services-facilities', label: 'Services and Facilities' },
        { href: '/worshippers/getting-to-mosque', label: 'Getting To The Mosque' },
        { href: '/worshippers/e-visitor-guide', label: 'E-Visitor Guide' },
        { href: '/worshippers/souq-al-jami', label: 'Souq Al Jami' },
        { href: '/worshippers/jogging-track', label: "The Mosque's Jogging Track" },
        { href: '/worshippers/ramadan', label: 'Ramadan 1446 / 2025' }
      ]
    },
    {
      key: 'visitors',
      href: '#',
      label: 'Visitors',
      dropdown: [
        { href: '/visitors/mosque-manners', label: 'Mosque Manners' },
        { href: '/visitors/visiting-hours', label: 'Visiting Hours' },
        { href: '/visitors/book-visit', label: 'Book Your Visit' },
        { href: '/visitors/public-cultural-tours', label: 'Public Cultural Tours' },
        { href: '/visitors/private-cultural-tours', label: 'Private Cultural Tours' },
        { href: '/visitors/multimedia-guide', label: 'Multimedia E-Guide' },
        { href: '/visitors/sura-tour', label: 'Sura Tour' },
        { href: '/visitors/light-peace-museum', label: 'Light & Peace Museum' },
        { href: '/visitors/diya-experience', label: 'The 360-degree "Diya" Experience' },
        { href: '/visitors/visitor-journey', label: "Visitor's Journey" },
        { href: '/visitors/services-facilities', label: 'Services & Facilities' },
        { href: '/visitors/transportation', label: 'Transportation' },
        { href: '/visitors/faqs', label: 'FAQs' }
      ]
    },
    {
      key: 'news',
      href: '#',
      label: 'News & Media',
      dropdown: [
        { href: '/news/multimedia-gallery', label: 'View Our Multimedia Gallery' },
        { href: '/news/press-kit', label: 'Press Kit' },
        { href: '/news/coverage', label: 'View Our News and Media Coverage' }
      ]
    },
    {
      key: 'architecture',
      href: '#',
      label: 'Islamic Architecture',
      dropdown: [
        { href: '/architecture/overview', label: 'Overview' },
        { href: '/architecture/domes', label: 'The Domes' },
        { href: '/architecture/minarets', label: 'The Minarets' },
        { href: '/architecture/columns', label: 'The Columns' },
        { href: '/architecture/interior-columns', label: 'The Interior Columns' },
        { href: '/architecture/main-prayer-hall', label: 'The Main Prayer Hall' },
        { href: '/architecture/courtyard', label: 'The Courtyard' },
        { href: '/architecture/chandeliers', label: 'The Chandeliers' },
        { href: '/architecture/carpet', label: 'The Carpet' },
        { href: '/architecture/mihrab', label: 'The Mihrab' },
        { href: '/architecture/reflective-pools', label: 'Reflective Pools' },
        { href: '/architecture/glass-doors', label: 'The Glass Doors' },
        { href: '/architecture/interior-walls', label: 'The Interior Walls' },
        { href: '/architecture/clocks', label: 'The Clocks' },
        { href: '/architecture/qibla-wall', label: 'The Qibla Wall' }
      ]
    },
    {
      key: 'mosques',
      href: '#',
      label: 'Our Grand Mosques',
      dropdown: [
        { href: '/mosques/sheikh-zayed', label: 'Masjid Salman al Farsi' },
        { href: '/mosques/social-wall', label: 'Our Social Wall' }
      ]
    },
    {
      key: 'donate',
      href: '/donate',
      label: 'Donate',
      dropdown: null
    }
  ];

  // Handle dropdown hover
  const handleDropdownHover = (key: string | null) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Handle language switch
  const handleLanguageSwitch = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  const toggleMobileDropdown = (key: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm lg:text-lg">MSF</span>
              </div>
              <span className="font-bold text-slate-800 text-sm lg:text-lg hidden sm:inline">
                Masjid Salman al Farsi
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <div
                key={link.key}
                className="relative"
                onMouseEnter={() => handleDropdownHover(link.key)}
                onMouseLeave={handleDropdownLeave}
              >
                {link.dropdown ? (
                  <button className="flex items-center space-x-1 px-3 py-2 text-slate-700 hover:text-amber-600 font-medium transition-all duration-200 hover:bg-amber-50 rounded-lg text-sm xl:text-base">
                    <span>{link.label}</span>
                    <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.key ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link 
                    href={link.href} 
                    className="px-3 py-2 text-slate-700 hover:text-amber-600 font-medium transition-all duration-200 hover:bg-amber-50 rounded-lg text-sm xl:text-base"
                  >
                    {link.label}
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === link.key && link.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden"
                    >
                      <div className="py-2">
                        {link.dropdown.map((item, index) => (
                          <Link
                            key={index}
                            href={item.href}
                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLanguageSwitch}
              className="flex items-center space-x-1 px-3 py-1.5 lg:px-4 lg:py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors duration-200 group"
            >
              <FiGlobe className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-180" />
              <span className="font-medium text-xs sm:text-sm hidden sm:inline">
                {locale === 'ar' ? 'EN' : 'AR'}
              </span>
            </motion.button>

            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden p-2 text-slate-700 hover:text-amber-500 transition-colors duration-200"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              aria-label="Menu"
            >
              {isOpen ? <FiX className="w-5 h-5 sm:w-6 sm:h-6" /> : <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay - NEW IMPLEMENTATION */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 overflow-hidden">
              <div className="p-4 space-y-2 h-full">
                {navLinks.map((link) => (
                  <div key={link.key}>
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleMobileDropdown(link.key)}
                          className="flex items-center justify-between w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <span>{link.label}</span>
                          <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns[link.key] ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileDropdowns[link.key] && (
                          <div className="ml-4 mt-2 space-y-1">
                            {link.dropdown.map((item, index) => (
                              <Link
                                key={index}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-50 hover:text-amber-600 rounded-lg"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <Link
                    href="/donate"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    💝 Donate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
