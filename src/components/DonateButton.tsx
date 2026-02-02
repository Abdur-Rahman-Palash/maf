'use client';

import { motion } from 'framer-motion';

interface DonateButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({ 
  children = "Donate", 
  className = "",
  onClick,
  href 
}) => {
  const baseClasses = "btn btn-primary icon-right relative inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 border-4 border-[#8C7C4E] bg-[#8C7C4E] text-white font-bold text-base md:text-lg lg:text-xl rounded-lg transition-all duration-300 ease-in-out group overflow-hidden my-2";

  const hoverClasses = "hover:bg-transparent hover:text-black";
  
  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`;

  const content = (
    <>
      {children}
      <span className="btn-icon pe-7s-right-arrow ml-2 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
      {/* Hover effect overlay - fills from left to right */}
      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left"></div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClasses}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.button>
  );
};

export default DonateButton;
