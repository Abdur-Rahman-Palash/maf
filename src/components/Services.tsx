'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import WaveAnimation from '@/components/WaveAnimation';
import MediaStorage, { Media } from '@/lib/mediaStorage';
import { eventSync, EVENT_TYPES } from '@/lib/eventSync';

function Services() {
  const [services, setServices] = useState<Media[]>([]);

  useEffect(() => {
    // Load services from MediaStorage
    const allMedia = MediaStorage.getMedia();
    const servicesData = allMedia.filter(media => media.category === 'service');
    
    // If no services found, reset to defaults
    if (servicesData.length === 0) {
      MediaStorage.resetToDefaults();
      const resetAllMedia = MediaStorage.getMedia();
      const resetServices = resetAllMedia.filter(media => media.category === 'service');
      setServices(resetServices);
    } else {
      setServices(servicesData);
    }

    // Set up real-time sync
    const unsubscribe = eventSync.subscribe(EVENT_TYPES.MEDIA_UPDATED, () => {
      const allMedia = MediaStorage.getMedia();
      const servicesData = allMedia.filter(media => media.category === 'service');
      setServices(servicesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const t = useTranslations('Services');
  const [showAllServices, setShowAllServices] = useState(false);

  function ServiceCard({ service, index }: { service: Media; index: number }) {
    return (
      <Link href={service.file_url || '/services'} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl group cursor-pointer relative hover:shadow-2xl transition-shadow duration-300">
          {/* Background Image */}
          <div className="relative h-64 sm:h-72 lg:h-80">
            {service.thumbnail_url ? (
              <Image
                src={service.thumbnail_url}
                alt={service.title}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  // Fallback to a default image if the image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-6xl">
                  🕌
                </div>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
            {/* Icon */}
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
                🕌
              </div>
            </div>

            {/* Title and Description */}
            <div className="mt-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                {service.description}
              </p>
            </div>

            {/* Hover Button */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-full bg-amber-500 text-white py-2 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                <span>Learn More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.section 
      className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(15)].map((_, i) => {
            const seed = i * 137.5;
            const left = (seed * 9.7) % 100;
            const top = (seed * 13.3) % 100;
            const duration = 7 + ((seed * 7.1) % 14);
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/25 to-indigo-400/30 rounded-full"
                animate={{
                  x: [0, 100, 50, 0],
                  y: [0, 30, 70, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              />
            );
          })}
        </div>
        
        {/* Gradient Wave Animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-transparent via-rose-200/20 to-transparent"
          animate={{
            x: ["-100%", "0%", "100%"],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulsing Circles */}
        <div className="absolute top-1/4 left-1/4 w-36 h-36">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-rose-500/12 to-pink-500/12"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.08, 0.25],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0
            }}
          />
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-28 h-28">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-pink-500/12 to-amber-500/12"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.08, 0.2],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Additional Floating Elements */}
        <div className="absolute top-2/3 left-1/6 w-20 h-20">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-amber-400/15 to-rose-400/15"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.18, 0.07, 0.18],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute bottom-1/4 right-1/6 w-16 h-16">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-pink-400/10 to-amber-400/10"
            animate={{
              scale: [1.05, 1, 1.05],
              opacity: [0.12, 0.05, 0.12],
            }}
            transition={{
              duration: 6,
              repeat: 2,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Additional Animated Elements */}
        <div className="absolute top-3/4 left-1/3 w-24 h-24">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-tr from-blue-400/20 to-indigo-400/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.08, 0.2],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute bottom-1/3 left-1/5 w-20 h-20">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-rose-400/15 to-pink-400/15"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.15, 0.06, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: 2,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Wave Animation */}
        <WaveAnimation />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('title')}
          </h1>
        </motion.div>

        {/* Services Grid - Beautiful Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.slice(0, showAllServices ? services.length : 3).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  {service.thumbnail_url ? (
                    <Image
                      src={service.thumbnail_url}
                      alt={service.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-white text-6xl">🕌</div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Service Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🕌</span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  
                  {/* Service Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <div className="flex items-center justify-between">
                    <Link 
                      href={service.file_url || '/services'} 
                      className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors group-hover:shadow-lg"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    {service.featured && (
                      <div className="flex items-center text-amber-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.118 1.118l1.07 3.292a1 1 0 00.364 1.118L2.98 8.72c-.783.57-.38 1.81.588 1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show All Services Button */}
        {services.length > 3 && (
          <div className="text-center mt-12">
            <motion.button
              onClick={() => setShowAllServices(!showAllServices)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform shadow-xl"
            >
              {showAllServices ? 'Show Less Services' : 'Show All Services'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllServices ? "M5 15l7-7 7 7" : "M19 8l-7 7-7-7"} />
              </svg>
            </motion.button>
            <p className="text-sm text-gray-600 mt-2">
              {showAllServices ? 'Showing all' : `Showing 7 of ${services.length}`} services
            </p>
          </div>
        )}

              </div>
    </motion.section>
  );
}

export default Services;
