'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

interface PremiumScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  intensity?: number;
}

const PremiumScrollAnimation: React.FC<PremiumScrollProps> = ({ 
  children, 
  className = '', 
  direction = 'up', 
  delay = 0, 
  intensity = 1 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.3 
  });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  // Get initial animation values based on direction
  const getInitialValues = () => {
    const baseDistance = 80 * intensity;
    switch (direction) {
      case 'up':
        return { opacity: 0, y: baseDistance, scale: 0.9 };
      case 'down':
        return { opacity: 0, y: -baseDistance, scale: 0.9 };
      case 'left':
        return { opacity: 0, x: baseDistance, scale: 0.9 };
      case 'right':
        return { opacity: 0, x: -baseDistance, scale: 0.9 };
      case 'scale':
        return { opacity: 0, scale: 0.8 * intensity };
      case 'rotate':
        return { opacity: 0, rotate: -180 * intensity, scale: 0.8 };
      default:
        return { opacity: 0, y: baseDistance, scale: 0.9 };
    }
  };

  const getAnimateValues = () => {
    switch (direction) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        return { opacity: 1, y: 0, x: 0, scale: 1 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'rotate':
        return { opacity: 1, rotate: 0, scale: 1 };
      default:
        return { opacity: 1, y: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialValues()}
      animate={isInView ? getAnimateValues() : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ 
        scale: isInView ? undefined : scale,
        opacity: isInView ? undefined : opacity,
        y: isInView ? undefined : y
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PremiumScrollAnimation;
