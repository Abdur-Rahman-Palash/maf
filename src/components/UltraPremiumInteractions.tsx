'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface UltraPremiumInteractionsProps {
  children: React.ReactNode;
}

export default function UltraPremiumInteractions({ children }: UltraPremiumInteractionsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Advanced mouse tracking with physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target !== hoveredElement) {
        setHoveredElement(target);
      }
    };

    const handleMouseLeave = () => {
      setHoveredElement(null);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter, true);
      container.addEventListener('mouseleave', handleMouseLeave, true);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter, true);
        container.removeEventListener('mouseleave', handleMouseLeave, true);
      }
    };
  }, [mouseX, mouseY, hoveredElement]);

  // Magnetic effect for interactive elements
  const magneticX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const magneticY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // Ripple effect component
  const RippleEffect = ({ x, y }: { x: number; y: number }) => (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: x,
        top: y,
        x: '-50%',
        y: '-50%',
      }}
    >
      <motion.div
        className="w-2 h-2 bg-amber-400/60 rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 20, 40],
          opacity: [1, 0.5, 0],
        }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute inset-0 w-2 h-2 bg-blue-400/40 rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 15, 30],
          opacity: [1, 0.6, 0],
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.1
        }}
      />
    </motion.div>
  );

  // Cursor glow effect
  const CursorGlow = () => (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{
        left: mouseX,
        top: mouseY,
        x: '-50%',
        y: '-50%',
      }}
    >
      <motion.div
        className="w-8 h-8 rounded-full bg-gradient-radial from-amber-400/20 via-blue-400/10 to-transparent blur-sm"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );

  // Interactive element highlighting
  const ElementHighlight = () => {
    if (!hoveredElement) return null;

    const rect = hoveredElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return null;

    const relativeX = rect.left - containerRect.left;
    const relativeY = rect.top - containerRect.top;

    return (
      <motion.div
        className="fixed pointer-events-none z-30 border-2 border-amber-400/50 rounded-lg"
        style={{
          left: relativeX,
          top: relativeY,
          width: rect.width,
          height: rect.height,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: [0, 0.5, 0],
          scale: [0.95, 1.02, 0.98],
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
      />
    );
  };

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Advanced interaction effects */}
      <CursorGlow />
      <ElementHighlight />

      {/* Magnetic field effect for buttons and links */}
      <motion.div
        className="fixed pointer-events-none z-20"
        style={{
          left: magneticX,
          top: magneticY,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-radial from-amber-400/5 via-transparent to-transparent"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Particle trail effect */}
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
            style={{
              left: -i * 3,
              top: -i * 3,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              x: [0, -10, -20],
              y: [0, -10, -20],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}