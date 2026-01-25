'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';

interface UltraPremiumAnimationsProps {
  children: React.ReactNode;
}

export default function UltraPremiumAnimations({ children }: UltraPremiumAnimationsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Advanced mouse tracking with velocity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseVelocityX = useVelocity(mouseX);
  const mouseVelocityY = useVelocity(mouseY);
  
  // Smooth scroll progress with advanced spring physics
  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001
  });

  // Time-based animations with higher precision
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.005);
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  // Advanced mouse tracking with smoothing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x * 20);
        mouseY.set(y * 20);
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mouseX, mouseY]);

  // Performance optimization - reduce particle count on mobile
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  const particleCount = isMobile ? 8 : 20;

  // Ultra-premium floating particles with enhanced quantum effects
  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Quantum Golden particles with advanced physics */}
      {[...Array(particleCount)].map((_, i) => {
        const seed = i * 47.3;
        const left = ((seed * 7.1) % 100);
        const top = ((seed * 11.7) % 100);
        const duration = 25 + ((seed * 9) % 20);
        const delay = ((seed * 3) % 8);
        const size = 1.5 + ((seed * 2) % 4);
        const opacity = 0.15 + ((seed * 7) % 8) / 10;
        
        return (
          <motion.div
            key={`quantum-gold-${i}`}
            className="absolute rounded-full shadow-2xl"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, rgba(251, 191, 36, ${opacity}) 0%, rgba(245, 158, 11, ${opacity * 0.5}) 50%, transparent 100%)`,
              boxShadow: `0 0 ${size * 2}px rgba(251, 191, 36, 0.6), 0 0 ${size * 4}px rgba(251, 191, 36, 0.3), inset 0 0 ${size}px rgba(255, 255, 255, 0.2)`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              x: [0, ((seed * 19) % 120) - 60, ((seed * 23) % 80) - 40, 0],
              y: [0, -(((seed * 13) % 300) + 150), -(((seed * 17) % 200) + 100), 0],
              scale: [0, 1.2, 0.8, 1.5, 0],
              opacity: [0, opacity, opacity * 0.7, opacity * 1.3, 0],
              rotate: [0, 360, 720, 1080],
              filter: [
                'blur(0.5px) hue-rotate(0deg)',
                'blur(1px) hue-rotate(45deg)',
                'blur(0.8px) hue-rotate(90deg)',
                'blur(0.5px) hue-rotate(180deg)',
                'blur(0.5px) hue-rotate(360deg)'
              ],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.2, 0.4, 0.7, 1]
            }}
          />
        );
      })}
      
      {/* Neural Blue particles with AI-like movement */}
      {[...Array(Math.floor(particleCount * 0.8))].map((_, i) => {
        const seed = i * 31.7;
        const left = ((seed * 13.3) % 100);
        const top = ((seed * 9.1) % 100);
        const duration = 30 + ((seed * 7) % 15);
        const delay = ((seed * 5) % 12);
        const size = 1 + ((seed * 3) % 3);
        const opacity = 0.1 + ((seed * 5) % 7) / 10;
        
        return (
          <motion.div
            key={`neural-blue-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `conic-gradient(from ${time * 360}deg, rgba(59, 130, 246, ${opacity}), rgba(14, 165, 233, ${opacity * 0.8}), rgba(99, 102, 241, ${opacity * 0.6}), rgba(59, 130, 246, ${opacity}))`,
              boxShadow: `0 0 ${size * 3}px rgba(59, 130, 246, 0.5), 0 0 ${size * 6}px rgba(14, 165, 233, 0.3)`,
            }}
            animate={{
              x: [0, ((seed * 23) % 100) - 50, ((seed * 29) % 80) - 40, 0],
              y: [0, -(((seed * 17) % 250) + 120), -(((seed * 19) % 180) + 90), 0],
              scale: [0, 1.5, 0.5, 2, 0],
              opacity: [0, opacity, opacity * 0.8, opacity * 1.2, 0],
              rotate: [0, -180, -360, -540],
              borderRadius: ['50%', '20%', '80%', '30%', '50%'],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: [0.68, -0.55, 0.265, 1.55],
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          />
        );
      })}
      
      {/* Holographic Emerald particles */}
      {[...Array(Math.floor(particleCount * 0.6))].map((_, i) => {
        const seed = i * 67.9;
        const left = ((seed * 17.3) % 100);
        const top = ((seed * 13.7) % 100);
        const duration = 35 + ((seed * 11) % 25);
        const delay = ((seed * 7) % 15);
        const size = 2 + ((seed * 4) % 5);
        
        return (
          <motion.div
            key={`holographic-emerald-${i}`}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(45deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.6), rgba(20, 184, 166, 0.4))`,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))',
            }}
            animate={{
              x: [0, ((seed * 31) % 150) - 75, ((seed * 37) % 100) - 50, 0],
              y: [0, -(((seed * 23) % 400) + 200), -(((seed * 29) % 300) + 150), 0],
              scale: [0, 1, 0.3, 1.8, 0],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0, 0.8, 0.4, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1]
            }}
          />
        );
      })}
      
      {/* Premium sparkles with quantum effects */}
      {[...Array(Math.floor(particleCount * 0.4))].map((_, i) => {
        const seed = i * 73.9;
        const left = ((seed * 19.3) % 100);
        const top = ((seed * 15.7) % 100);
        const duration = 12 + ((seed * 13) % 18);
        const delay = ((seed * 9) % 10);
        
        return (
          <motion.div
            key={`quantum-sparkle-${i}`}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: '2px',
              height: '2px',
              background: 'white',
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(251, 191, 36, 0.6), 0 0 24px rgba(59, 130, 246, 0.4)',
              borderRadius: '50%',
            }}
            animate={{
              scale: [0, 1, 0.5, 2, 0],
              opacity: [0, 1, 0.7, 1.5, 0],
              rotate: [0, 180, 360],
              x: [0, ((seed * 41) % 50) - 25],
              y: [0, -(((seed * 31) % 100) + 50)],
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
  );

  // Ultra-premium gradient overlays with quantum field effects
  const GradientOverlay = () => (
    <>
      {/* Primary mouse-following quantum field */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: `radial-gradient(1200px circle at ${50 + mouseX.get()}% ${50 + mouseY.get()}%, 
            rgba(251, 191, 36, 0.08) 0%, 
            rgba(245, 158, 11, 0.05) 20%, 
            rgba(59, 130, 246, 0.06) 40%, 
            rgba(14, 165, 233, 0.04) 60%, 
            transparent 80%)`,
          filter: 'blur(1px)',
        }}
        animate={{
          filter: [
            'blur(1px) hue-rotate(0deg)',
            'blur(1.5px) hue-rotate(60deg)',
            'blur(1px) hue-rotate(120deg)',
            'blur(1px) hue-rotate(180deg)',
            'blur(1px) hue-rotate(240deg)',
            'blur(1px) hue-rotate(360deg)'
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Secondary counter-field with velocity influence */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-19"
        style={{
          background: `radial-gradient(800px circle at ${50 - mouseX.get() * 0.7}% ${50 - mouseY.get() * 0.7}%, 
            rgba(16, 185, 129, 0.06) 0%, 
            rgba(5, 150, 105, 0.04) 30%, 
            rgba(20, 184, 166, 0.05) 50%, 
            transparent 70%)`,
          filter: 'blur(0.8px)',
        }}
        animate={{
          scale: [1, 1.1, 0.9, 1.05, 1],
          opacity: [0.6, 0.8, 0.4, 0.9, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Dynamic rotating gradient fields */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-18 opacity-30"
        animate={{
          background: [
            `conic-gradient(from ${time * 180}deg at 20% 20%, rgba(251, 191, 36, 0.03) 0deg, transparent 90deg, rgba(59, 130, 246, 0.02) 180deg, transparent 270deg)`,
            `conic-gradient(from ${time * 180 + 90}deg at 80% 80%, rgba(59, 130, 246, 0.03) 0deg, transparent 90deg, rgba(16, 185, 129, 0.02) 180deg, transparent 270deg)`,
            `conic-gradient(from ${time * 180 + 180}deg at 50% 50%, rgba(16, 185, 129, 0.03) 0deg, transparent 90deg, rgba(251, 191, 36, 0.02) 180deg, transparent 270deg)`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Time-based holographic overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-17 opacity-40"
        animate={{
          background: [
            `linear-gradient(${time * 360}deg, rgba(251, 191, 36, 0.02) 0%, transparent 25%, rgba(59, 130, 246, 0.03) 50%, transparent 75%, rgba(16, 185, 129, 0.02) 100%)`,
            `linear-gradient(${time * 360 + 120}deg, rgba(59, 130, 246, 0.02) 0%, transparent 25%, rgba(16, 185, 129, 0.03) 50%, transparent 75%, rgba(251, 191, 36, 0.02) 100%)`,
            `linear-gradient(${time * 360 + 240}deg, rgba(16, 185, 129, 0.02) 0%, transparent 25%, rgba(251, 191, 36, 0.03) 50%, transparent 75%, rgba(59, 130, 246, 0.02) 100%)`,
          ],
        }}
        transition={{
          duration: 6,
          ease: "linear"
        }}
      />

      {/* Quantum interference patterns */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-16 opacity-20"
        animate={{
          background: [
            `repeating-linear-gradient(45deg, rgba(251, 191, 36, 0.01) 0px, rgba(251, 191, 36, 0.01) 2px, transparent 2px, transparent 10px)`,
            `repeating-linear-gradient(135deg, rgba(59, 130, 246, 0.01) 0px, rgba(59, 130, 246, 0.01) 2px, transparent 2px, transparent 10px)`,
            `repeating-linear-gradient(225deg, rgba(16, 185, 129, 0.01) 0px, rgba(16, 185, 129, 0.01) 2px, transparent 2px, transparent 10px)`,
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );

  // Ultra-premium scroll progress with holographic effects
  const ScrollProgress = () => (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 z-50 origin-left"
      style={{
        background: 'linear-gradient(90deg, #f59e0b, #3b82f6, #10b981, #8b5cf6, #f59e0b)',
        backgroundSize: '400% 100%',
        boxShadow: '0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(16, 185, 129, 0.2)',
        filter: 'blur(0.5px)',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        filter: [
          'blur(0.5px) brightness(1)',
          'blur(1px) brightness(1.2)',
          'blur(0.5px) brightness(1.5)',
          'blur(0.5px) brightness(1)'
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-amber-400 via-blue-500 via-emerald-500 via-purple-500 to-amber-400"
        style={{
          scaleX: smoothScrollY,
          backgroundSize: '300% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Holographic overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );

  // Ultra-premium ambient shapes with morphing effects
  const AmbientShapes = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {[...Array(isMobile ? 5 : 10)].map((_, i) => {
        const seed = i * 73.9;
        const left = ((seed * 11.3) % 100);
        const top = ((seed * 7.7) % 100);
        const size = 200 + ((seed * 5) % 300);
        const duration = 40 + ((seed * 7) % 30);
        const delay = ((seed * 9) % 20);
        
        return (
          <motion.div
            key={`ambient-shape-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              x: [0, ((seed * 13) % 200) - 100, ((seed * 17) % 150) - 75, 0],
              y: [0, -(((seed * 11) % 300) + 150), -(((seed * 19) % 250) + 125), 0],
              scale: [0.8, 1.2, 0.6, 1.5, 0.8],
              rotate: [0, 120, 240, 360],
              borderRadius: [
                '50% 30% 70% 40%',
                '30% 70% 40% 80%',
                '70% 40% 80% 30%',
                '40% 80% 30% 70%',
                '50% 30% 70% 40%'
              ],
              background: [
                `radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.1), transparent)`,
                `radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1), transparent)`,
                `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1), transparent)`,
                `radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1), transparent)`,
                `radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.1), transparent)`
              ],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          />
        );
      })}
    </div>
  );

  // Ultra-premium scroll-triggered reveal animation
  const ScrollRevealOverlay = () => (
    <>
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent z-15 pointer-events-none"
        style={{
          y: useTransform(smoothScrollY, [0, 1], [0, -100]),
        }}
      />
      <motion.div
        className="fixed inset-0 bg-gradient-to-t from-transparent via-blue-50/30 to-transparent z-14 pointer-events-none"
        style={{
          y: useTransform(smoothScrollY, [0, 1], [0, 100]),
        }}
      />
    </>
  );

  // Ultra-premium corner decorations with enhanced effects
  const CornerDecorations = () => (
    <>
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-400/15 via-transparent to-transparent z-5 pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="fixed top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/15 via-transparent to-transparent z-5 pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="fixed bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-400/15 via-transparent to-transparent z-5 pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/15 via-transparent to-transparent z-5 pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </>
  );

  return (
    <>
      <ScrollProgress />
      <CornerDecorations />
      <AmbientShapes />
      <FloatingParticles />
      <GradientOverlay />
      <ScrollRevealOverlay />
      
      <motion.div
        ref={containerRef}
        className="relative"
        style={{
          x: mouseX.get() * 0.1,
          y: mouseY.get() * 0.1,
        }}
      >
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </motion.div>

      {/* Ultra-premium page transition overlay */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-amber-50/20 via-white/30 to-blue-50/20 z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      
      {/* Ultra-premium loading shimmer effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-45 opacity-20"
        animate={{
          background: [
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </>
  );
}
