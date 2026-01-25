'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion, easeOut } from 'framer-motion';
import { useLenis } from 'lenis/react';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Professional USA Masjid Salman al Farsi images - Beautiful mosque backgrounds
const slides = [
  { 
    id: 1, 
    image: '/moon-light-shine-through-window-into-islamic-mosque-interior.jpg', 
    alt: 'Masjid Salman al Farsi - Moon Light Shine Through Window Into Islamic Mosque Interior' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop', 
    alt: 'Masjid Salman al Farsi - Grand Mosque Interior' 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1542042958-3d5f9919c013?w=1920&h=1080&fit=crop', 
    alt: 'Masjid Salman al Farsi - Prayer Hall with Islamic Architecture' 
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1596706059274-123403d1591d?w=1920&h=1080&fit=crop', 
    alt: 'Masjid Salman al Farsi - Islamic Calligraphy & Art' 
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1586962434213-cee7e4fe3b56?w=1920&h=1080&fit=crop', 
    alt: 'Masjid Salman al Farsi - Community Prayer Space' 
  },
];

// Mosque video URL - using 12081478_3840_2160_60fps.mp4 as background
const mosqueVideoUrl = '/12081478_3840_2160_60fps.mp4';

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

export default function Hero() {
  const swiperRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [useVideo, setUseVideo] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // Handle user interaction to enable video autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      // Try to play video after user interaction
      if (videoRef.current && userInteracted === false) {
        videoRef.current.play().catch(error => {
          console.log('Video play after interaction failed:', error);
        });
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [userInteracted]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (swiperRef.current) {
        const scrolled = window.scrollY;
        const swiper = swiperRef.current.swiper;
        if (swiper && swiper.slides) {
          swiper.slides.forEach((slide: any) => {
            const img = slide.querySelector('img');
            if (img) {
              img.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
          });
        }
      }
    };

    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lenis]);

  return (
    <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden">
      {/* Premium Overlay Effects */}
      <div className="absolute inset-0 z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Video Background */}
      {useVideo ? (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => {
              console.log('Hero video loaded successfully:', mosqueVideoUrl);
              setIsVideoLoaded(true);
            }}
            onError={(e) => {
              console.error('Hero video error:', e);
              console.log('Video URL:', mosqueVideoUrl);
              console.log('Video file exists:', '/12081478_3840_2160_60fps.mp4');
              setUseVideo(false); // Fallback to image slider
            }}
            style={{
              transform: 'translateZ(0) scale(1.05)',
              willChange: 'transform',
            }}
          >
            <source src={mosqueVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video loading placeholder with premium animation */}
          {!isVideoLoaded && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-amber-900 to-slate-800"
              animate={{
                background: [
                  'linear-gradient(to bottom right, #1e293b, #92400e, #1e293b)',
                  'linear-gradient(to bottom right, #92400e, #1e293b, #92400e)',
                  'linear-gradient(to bottom right, #1e293b, #92400e, #1e293b)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      ) : (
        /* Fallback to Image Slider with premium effects */
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          autoplay={{ 
            delay: 5000, 
            disableOnInteraction: false 
          }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, delay: index * 0.2 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transform: 'translateZ(0) scale(1.05)',
                      willChange: 'transform',
                    }}
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Premium Floating Particles - Optimized */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const seed = i * 137.5; // Deterministic seed based on index
          const left = ((seed * 9.7) % 100);
          const top = ((seed * 13.3) % 100);
          const duration = 3 + ((seed * 7) % 5);
          const delay = ((seed * 11) % 3);
          const xMove = ((seed * 17) % 50) - 25;
          const scale = 0.5 + ((seed * 3) % 15) / 10;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, xMove, 0],
                opacity: [0, 0.8, 0],
                scale: [1, scale, 1]
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Premium Content */}
      <motion.div 
        className="absolute inset-0 z-30 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="text-center text-white px-4 sm:px-6 max-w-4xl sm:max-w-5xl mx-auto">
          {/* Animated Title */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-amiri)' }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                  "0 0 40px rgba(251, 191, 36, 0.8)",
                  "0 0 20px rgba(251, 191, 36, 0.5)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Welcome to
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Masjid Salman al Farsi
            </motion.span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 font-light text-amber-100 max-w-2xl sm:max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            Experience the beauty and tranquility of Islamic heritage
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 1.1,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.button
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 rounded-full font-semibold text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                Explore Mosque
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md text-white px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 rounded-full font-semibold text-sm sm:text-base lg:text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                Prayer Times
                <motion.div
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 ml-2 rounded-full bg-amber-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Premium Decorative Elements */}
          <motion.div
            className="absolute -bottom-10 left-10 text-4xl sm:text-5xl lg:text-6xl opacity-20 hidden sm:block"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🕌
          </motion.div>

          <motion.div
            className="absolute -bottom-10 right-10 text-3xl sm:text-4xl lg:text-5xl opacity-20 hidden sm:block"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🌙
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 lg:w-6 lg:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 sm:h-3 lg:h-3 bg-white/60 rounded-full mt-1 sm:mt-2 lg:mt-2"
            animate={{
              y: [0, 6, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
