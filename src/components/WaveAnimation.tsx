'use client';

import { useEffect, useRef } from 'react';

interface WaveAnimationProps {
  className?: string;
  color?: string;
  opacity?: number;
  speed?: number;
  height?: number;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({
  className = "",
  color = "#10b981",
  opacity = 0.1,
  speed = 0.02,
  height = 100
}) => {
  const waveRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const svg = waveRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('path');
    let offset = 0;

    const animate = () => {
      offset += speed;
      
      paths.forEach((path, index) => {
        const d = path.getAttribute('d');
        if (d) {
          // Simple wave animation without complex string manipulation
          const time = Date.now() * 0.001;
          const yOffset = Math.sin(time + index) * 2;
          
          // Create a simple wave effect
          const newPath = d.replace(/(\d+\.?\d*)/g, (match) => {
            const num = parseFloat(match);
            if (num > 10 && num < 100) { // Only animate Y coordinates
              return (num + yOffset).toFixed(2);
            }
            return match;
          });
          
          path.setAttribute('d', newPath);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);

  return (
    <div 
      className={`absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      <svg
        ref={waveRef}
        className="relative block w-full h-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ height: `${height}px` }}
      >
        <path
          d="M0,50 C320,70 420,30 720,50 C1020,70 1120,30 1440,50 L1440,100 L0,100 Z"
          fill={color}
          fillOpacity={opacity}
        />
        <path
          d="M0,60 C320,40 420,80 720,60 C1020,40 1120,80 1440,60 L1440,100 L0,100 Z"
          fill={color}
          fillOpacity={opacity * 0.7}
        />
        <path
          d="M0,70 C320,90 420,50 720,70 C1020,90 1120,50 1440,70 L1440,100 L0,100 Z"
          fill={color}
          fillOpacity={opacity * 0.5}
        />
      </svg>
    </div>
  );
};

export default WaveAnimation;
