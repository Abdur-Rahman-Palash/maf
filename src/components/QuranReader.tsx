'use client';

import { motion } from 'framer-motion';
import { FaBook, FaMosque } from 'react-icons/fa';
import WaveAnimation from '@/components/WaveAnimation';

const QuranReader: React.FC = () => {
  return (
    <section className="relative min-h-[20vh] bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
      {/* Subtle Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIzA0NzY1MSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSIjMDQ3NjUxIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiMwNDc2NTEiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI1MCIgcj0iMSIgZmlsbD0iIzA0NzY1MSIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjMDQ3NjUxIi8+CjwvZGlnPgo=')] bg-repeat" />
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600" />

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        {/* Islamic Greeting Display */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Arabic Greeting */}
          <motion.p
            className="text-4xl lg:text-6xl font-bold text-gray-800 leading-relaxed mb-8"
            style={{ fontFamily: 'Amiri, Georgia, serif', direction: 'rtl', textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ
          </motion.p>

          {/* English Translation */}
          <motion.p
            className="text-xl lg:text-2xl text-gray-700 font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Assalamu Alaykum owa Rahmatullah
          </motion.p>
        
        </motion.div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600" />
      
      {/* Wave Animation */}
      <WaveAnimation 
        color="#059669" 
        opacity={0.08} 
        speed={0.015} 
        height={60}
      />
    </section>
  );
};

export default QuranReader;
