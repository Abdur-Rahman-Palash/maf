'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface UltraPremiumPageTransitionsProps {
  children: React.ReactNode;
}

export default function UltraPremiumPageTransitions({ children }: UltraPremiumPageTransitionsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Smooth loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll for page transition effects
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(setScrollProgress);
    return unsubscribe;
  }, [scrollYProgress]);

  // Ultra-premium loading screen
  const LoadingScreen = () => (
    <motion.div
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-amber-900 to-slate-800 flex items-center justify-center"
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Animated Islamic geometric pattern */}
      <div className="relative">
        {/* Central star pattern */}
        <motion.div
          className="relative w-32 h-32"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: 2,
            ease: "linear"
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border-4 border-amber-400/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: 2,
              ease: "easeInOut"
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 border-2 border-blue-400/40 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: 2,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          {/* Inner star */}
          <motion.div
            className="absolute inset-8 flex items-center justify-center"
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 15,
              repeat: 2,
              ease: "linear"
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full shadow-lg shadow-amber-400/50" />
          </motion.div>

          {/* Floating particles around the pattern */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/60 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: 2,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Loading text with typewriter effect */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h1
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-amiri)' }}
          >
            Masjid Salman al Farsi
          </motion.h1>
          <motion.div
            className="text-amber-300 text-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: 2,
              ease: "easeInOut"
            }}
          >
            Loading Experience...
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mt-6 w-64 h-1 bg-white/20 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-blue-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );

  // Page transition effects based on scroll
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageTransform = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 5, -5, 0]);
  const pageOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 0.95, 0.95, 1]);
  const pageScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.98, 0.98, 1]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          ref={containerRef}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          style={{
            y: pageTransform,
            opacity: pageOpacity,
            scale: pageScale,
          }}
        >
          {children}

          {/* Subtle page transition overlay */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            style={{
              background: `linear-gradient(to bottom,
                rgba(251, 191, 36, ${scrollProgress * 0.02}) 0%,
                transparent 20%,
                transparent 80%,
                rgba(59, 130, 246, ${scrollProgress * 0.02}) 100%)`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}