'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const PremiumAnimatedBackground: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    size: number; 
    delay: number;
    color: string;
    shape: 'circle' | 'square' | 'triangle';
  }>>([]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Mouse tracking for interactive effects
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
    const colors = [
      'rgba(251, 191, 36, 0.15)', // amber
      'rgba(59, 130, 246, 0.15)',  // blue
      'rgba(16, 185, 129, 0.15)',  // emerald
      'rgba(139, 92, 246, 0.15)',  // violet
      'rgba(236, 72, 153, 0.15)',  // pink
    ];
    
    const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
    
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    }));
    setParticles(newParticles);
  }, []);

  // Interactive gradient orbs that respond to mouse
  const orb1X = useTransform(mouseX, [0, 1], [10, 90]);
  const orb1Y = useTransform(mouseY, [0, 1], [10, 90]);
  const orb2X = useTransform(mouseX, [0, 1], [90, 10]);
  const orb2Y = useTransform(mouseY, [0, 1], [90, 10]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Interactive Gradient Orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: orb1X,
          top: orb1Y,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(245, 158, 11, 0.08) 30%, rgba(251, 191, 36, 0.04) 60%, transparent 80%)',
          filter: 'blur(100px)',
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: [1, 1.2, 0.8, 1.1, 1],
          opacity: [0.3, 0.6, 0.2, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: 2,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          left: orb2X,
          top: orb2Y,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(14, 165, 233, 0.08) 30%, rgba(59, 130, 246, 0.04) 60%, transparent 80%)',
          filter: 'blur(80px)',
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: [0.8, 1.3, 0.9, 1, 0.8],
          opacity: [0.4, 0.7, 0.3, 0.6, 0.4],
        }}
        transition={{
          duration: 25,
          repeat: 2,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Floating Particles with Different Shapes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: particle.shape === 'circle' ? '50%' : particle.shape === 'square' ? '0%' : undefined,
            clipPath: particle.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 150 - 75, 0],
            y: [0, -Math.random() * 300 - 100, -Math.random() * 200 - 50, 0],
            scale: [0, 1, 0.5, 1.2, 0],
            opacity: [0, 0.8, 0.4, 1, 0],
            rotate: particle.shape === 'triangle' ? [0, 120, 240, 360] : [0, 180, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: 2,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Holographic Grid Overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
        }}
        transition={{
          duration: 20,
          repeat: 2,
          ease: "linear"
        }}
      />

      {/* Pulsing Energy Rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: 2,
          ease: "easeInOut"
        }}
      >
        <div
          className="w-96 h-96 rounded-full border-2 border-amber-400/20"
          style={{
            boxShadow: '0 0 50px rgba(251, 191, 36, 0.1), inset 0 0 50px rgba(251, 191, 36, 0.05)'
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1.2, 1.8, 1.2],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: 2,
          ease: "easeInOut",
          delay: 3
        }}
      >
        <div
          className="w-80 h-80 rounded-full border-2 border-blue-400/20"
          style={{
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.1), inset 0 0 40px rgba(59, 130, 246, 0.05)'
          }}
        />
      </motion.div>
    </div>
  );
}

export default PremiumAnimatedBackground;
