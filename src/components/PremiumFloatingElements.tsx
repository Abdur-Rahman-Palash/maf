'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const PremiumFloatingElements: React.FC = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    symbol: string;
    x: number;
    y: number;
    delay: number;
    duration: number;
    size: number;
    color: string;
    trail: boolean;
  }>>([]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse interaction for enhanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const symbols = ['🕌', '🌙', '⭐', '☪', '📖', '🤲', '🕋', '💫', '✨', '🌟', '🔯', '☯️'];
    const colors = [
      'text-amber-400/20',
      'text-blue-400/20',
      'text-emerald-400/20',
      'text-purple-400/20',
      'text-pink-400/20',
      'text-indigo-400/20'
    ];

    const newElements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 15,
      duration: Math.random() * 20 + 25,
      size: Math.random() * 1.5 + 0.5, // 0.5 to 2rem
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: Math.random() > 0.7 // 30% chance of having a trail
    }));
    setElements(newElements);
  }, []);

  // Performance optimization - reduce count on mobile
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  const displayElements = isMobile ? elements.slice(0, 6) : elements;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {displayElements.map((element) => (
        <div key={element.id} className="relative">
          {/* Trail effect for some elements */}
          {element.trail && (
            <motion.div
              className={`absolute text-3xl ${element.color} blur-sm`}
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                fontSize: `${element.size}rem`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, 40, -40, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: element.duration * 1.2,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {element.symbol}
            </motion.div>
          )}

          {/* Main floating element */}
          <motion.div
            className={`absolute text-3xl ${element.color} select-none`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              fontSize: `${element.size}rem`,
              textShadow: '0 0 10px currentColor',
              filter: 'drop-shadow(0 0 8px currentColor)',
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, 60, -60, 20, 0],
              rotate: [0, 180, 360, 540, 720],
              scale: [1, 1.3, 0.7, 1.5, 1],
              opacity: [0.1, 0.25, 0.15, 0.3, 0.1],
              filter: [
                'drop-shadow(0 0 8px currentColor) hue-rotate(0deg)',
                'drop-shadow(0 0 12px currentColor) hue-rotate(60deg)',
                'drop-shadow(0 0 6px currentColor) hue-rotate(120deg)',
                'drop-shadow(0 0 10px currentColor) hue-rotate(180deg)',
                'drop-shadow(0 0 8px currentColor) hue-rotate(360deg)'
              ]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: [0.68, -0.55, 0.265, 1.55],
              times: [0, 0.2, 0.5, 0.8, 1]
            }}
            whileHover={{
              scale: 1.5,
              opacity: 0.4,
              transition: { duration: 0.3 }
            }}
          >
            {element.symbol}
          </motion.div>

          {/* Energy pulse effect */}
          <motion.div
            className={`absolute rounded-full`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size * 2}rem`,
              height: `${element.size * 2}rem`,
              background: `radial-gradient(circle, ${element.color.replace('/20', '/5')} 0%, transparent 70%)`,
              filter: 'blur(4px)',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: element.duration * 0.8,
              delay: element.delay + element.duration * 0.1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
      ))}

      {/* Interactive mouse follower */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: mouseX,
          top: mouseY,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-radial from-amber-400/10 via-blue-400/5 to-transparent"
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default PremiumFloatingElements;
