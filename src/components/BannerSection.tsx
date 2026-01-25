'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const BannerSection = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const worshippersItems = [
    {
      title: 'Prayer Timings',
      icon: '🕌',
      href: '/worshippers/prayer-timings'
    },
    {
      title: 'Friday Sermon & Minbar Al Jami',
      icon: '🎤',
      href: '/worshippers/friday-sermon'
    },
    {
      title: 'Mosque Manners',
      icon: '📋',
      href: '/worshippers/mosque-manners'
    },
    {
      title: 'Religious Programs',
      icon: '📚',
      href: '/worshippers/religious-programs'
    },
    {
      title: 'Services and Facilities',
      icon: '🏗️',
      href: '/worshippers/services-facilities'
    },
    {
      title: 'Getting To The Mosque',
      icon: '🚌',
      href: '/worshippers/getting-to-mosque'
    },
    {
      title: 'E-Visitor Guide',
      icon: '📱',
      href: '/worshippers/e-visitor-guide'
    },
    {
      title: 'Souq Al Jami',
      icon: '🛍️',
      href: '/worshippers/souq-al-jami'
    },
    {
      title: 'The Mosque\'s Jogging Track',
      icon: '🏃',
      href: '/worshippers/jogging-track'
    },
    {
      title: 'Ramadan 1446 / 2025',
      icon: '🌙',
      href: '/worshippers/ramadan'
    }
  ];

  const visitorsItems = [
    {
      title: 'Mosque Manners',
      icon: '📋',
      href: '/visitors/mosque-manners'
    },
    {
      title: 'Visiting Hours',
      icon: '⏰',
      href: '/visitors/visiting-hours'
    },
    {
      title: 'Book Your Visit',
      icon: '📅',
      href: '/visitors/book-visit'
    },
    {
      title: 'Public Cultural Tours',
      icon: '🎭',
      href: '/visitors/public-cultural-tours'
    },
    {
      title: 'Private Cultural Tours',
      icon: '👥',
      href: '/visitors/private-cultural-tours'
    },
    {
      title: 'Multimedia E-Guide',
      icon: '📱',
      href: '/visitors/multimedia-guide'
    },
    {
      title: 'Sura Tour',
      icon: '📖',
      href: '/visitors/sura-tour'
    },
    {
      title: 'Light & Peace Museum',
      icon: '🏛️',
      href: '/visitors/light-peace-museum'
    },
    {
      title: 'The 360-degree "Diya" Experience',
      icon: '💡',
      href: '/visitors/diya-experience'
    },
    {
      title: 'The Mosque\'s Jogging Track',
      icon: '🏃',
      href: '/visitors/jogging-track'
    },
    {
      title: 'Souq Al Jami',
      icon: '🛍️',
      href: '/visitors/souq-al-jami'
    },
    {
      title: 'Getting to The Mosque',
      icon: '🚌',
      href: '/visitors/getting-to-mosque'
    },
    {
      title: 'E-Visitor Guide',
      icon: '📱',
      href: '/visitors/e-visitor-guide'
    },
    {
      title: 'Visitor\'s Journey',
      icon: '🗺️',
      href: '/visitors/visitor-journey'
    },
    {
      title: 'Services & Facilities',
      icon: '🏗️',
      href: '/visitors/services-facilities'
    },
    {
      title: 'Transportation',
      icon: '🚗',
      href: '/visitors/transportation'
    },
    {
      title: 'FAQs',
      icon: '❓',
      href: '/visitors/faqs'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Worshippers Section */}
          <div className="lg:col-span-2">
            <div 
              className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setActiveSection('worshippers')}
              onMouseLeave={() => setActiveSection(null)}
              onTouchStart={() => setActiveSection('worshippers')}
              onTouchEnd={() => setActiveSection(null)}
            >
              {/* Animated Background */}
              <iframe
                src="/islamic-worshippers-animation.html"
                className="absolute inset-0 w-full h-full border-0"
                style={{ 
                  transform: 'scale(1.1)',
                  pointerEvents: 'none'
                }}
              />
              
              {/* Animated Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-amber-600/60 via-amber-500/40 to-orange-600/60"
                animate={{
                  opacity: activeSection === 'worshippers' ? [0.6, 0.8, 0.6] : 0.6
                }}
                transition={{
                  duration: 2,
                  repeat: activeSection === 'worshippers' ? 2 : 0,
                  ease: "easeInOut"
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                {/* Floating Islamic Elements - Hidden on mobile for performance */}
                {activeSection === 'worshippers' && (
                  <div className="absolute inset-0 pointer-events-none hidden md:block">
                    <motion.div
                      className="absolute top-10 left-10 text-4xl sm:text-5xl lg:text-6xl opacity-20"
                      animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: 2 }}
                    >
                      🕌
                    </motion.div>
                    <motion.div
                      className="absolute bottom-10 right-10 text-3xl sm:text-4xl lg:text-5xl opacity-20"
                      animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 5, repeat: 2, delay: 1 }}
                    >
                      🌙
                    </motion.div>
                    <motion.div
                      className="absolute top-1/2 left-1/4 text-2xl sm:text-3xl lg:text-4xl opacity-15"
                      animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 6, repeat: 2, delay: 2 }}
                    >
                      📖
                    </motion.div>
                  </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: activeSection === 'worshippers' ? 1 : 0.8, y: activeSection === 'worshippers' ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                      Worshippers
                    </h2>
                  </motion.div>

                  {/* Hover Items */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeSection === 'worshippers' ? 1 : 0, 
                      height: activeSection === 'worshippers' ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 lg:mb-6 max-h-48 sm:max-h-64 lg:max-h-96 overflow-y-auto">
                      {worshippersItems.map((item, index) => (
                        <motion.a
                          key={index}
                          href={item.href}
                          className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -3, scale: 1.02 }}
                        >
                          <div className="flex flex-col items-center text-center">
                            <motion.span 
                              className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2"
                              whileHover={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              {item.icon}
                            </motion.span>
                            <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition-colors leading-tight">
                              {item.title}
                            </h3>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Discover More Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeSection === 'worshippers' ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.a 
                      href="/worshippers"
                      className="inline-flex items-center bg-amber-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-amber-600 transition-colors"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      DISCOVER MORE 
                      <motion.svg 
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 ml-1 sm:ml-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ x: activeSection === 'worshippers' ? [0, 3, 0] : 0 }}
                        transition={{ duration: 1, repeat: activeSection === 'worshippers' ? 2 : 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Visitors Section */}
          <div className="lg:col-span-1">
            <div 
              className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setActiveSection('visitors')}
              onMouseLeave={() => setActiveSection(null)}
              onTouchStart={() => setActiveSection('visitors')}
              onTouchEnd={() => setActiveSection(null)}
            >
              {/* Animated Background */}
              <iframe
                src="/islamic-visitors-animation.html"
                className="absolute inset-0 w-full h-full border-0"
                style={{ 
                  transform: 'scale(1.1)',
                  pointerEvents: 'none'
                }}
              />
              
              {/* Animated Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-blue-500/40 to-indigo-600/60"
                animate={{
                  opacity: activeSection === 'visitors' ? [0.6, 0.8, 0.6] : 0.6
                }}
                transition={{
                  duration: 2,
                  repeat: activeSection === 'visitors' ? 2 : 0,
                  ease: "easeInOut"
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                {/* Floating Islamic Elements - Hidden on mobile for performance */}
                {activeSection === 'visitors' && (
                  <div className="absolute inset-0 pointer-events-none hidden md:block">
                    <motion.div
                      className="absolute top-10 left-10 text-3xl sm:text-4xl lg:text-5xl opacity-20"
                      animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: 2 }}
                    >
                      🕌
                    </motion.div>
                    <motion.div
                      className="absolute bottom-10 right-10 text-2xl sm:text-3xl lg:text-4xl opacity-20"
                      animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 5, repeat: 2, delay: 1 }}
                    >
                      🌙
                    </motion.div>
                    <motion.div
                      className="absolute top-1/3 right-1/4 text-xl sm:text-2xl lg:text-3xl opacity-15"
                      animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 6, repeat: 2, delay: 2 }}
                    >
                      🤲
                    </motion.div>
                  </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: activeSection === 'visitors' ? 1 : 0.8, y: activeSection === 'visitors' ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                      Visitors
                    </h2>
                  </motion.div>

                  {/* Hover Items */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeSection === 'visitors' ? 1 : 0, 
                      height: activeSection === 'visitors' ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 lg:mb-6 max-h-40 sm:max-h-48 lg:max-h-96 overflow-y-auto">
                      {visitorsItems.map((item, index) => (
                        <motion.a
                          key={index}
                          href={item.href}
                          className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.03 }}
                          whileHover={{ y: -2, scale: 1.02 }}
                        >
                          <div className="flex flex-col items-center text-center">
                            <motion.span 
                              className="text-lg sm:text-xl lg:text-2xl mb-1"
                              whileHover={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              {item.icon}
                            </motion.span>
                            <h3 className="text-xs font-semibold text-slate-800 group-hover:text-amber-600 transition-colors leading-tight">
                              {item.title}
                            </h3>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Discover More Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeSection === 'visitors' ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.a 
                      href="/visitors"
                      className="inline-flex items-center bg-amber-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-amber-600 transition-colors"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      DISCOVER MORE 
                      <motion.svg 
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 ml-1 sm:ml-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ x: activeSection === 'visitors' ? [0, 3, 0] : 0 }}
                        transition={{ duration: 1, repeat: activeSection === 'visitors' ? 2 : 0 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
