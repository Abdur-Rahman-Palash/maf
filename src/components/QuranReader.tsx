'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaMosque } from 'react-icons/fa';

interface Ayah {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

const QuranReader: React.FC = () => {
  const [currentAyah, setCurrentAyah] = useState<Ayah | null>(null);
  const [ayahNumber, setAyahNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAyah = async (number: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/ayah/${number}/ar.alafasy`);
      const data = await response.json();
      
      if (data.code === 200) {
        setCurrentAyah(data.data);
      } else {
        setError('Failed to load ayah');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAyah(ayahNumber);
  }, [ayahNumber]);

  // Auto-progression like marquee
  useEffect(() => {
    const timer = setInterval(() => {
      setAyahNumber(prev => prev + 1);
    }, 4000); // Change ayah every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[40vh] bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
      {/* Subtle Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIzA0NzY1MSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSIjMDQ3NjUxIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiMwNDc2NTEiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI1MCIgcj0iMSIgZmlsbD0iIzA0NzY1MSIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjMDQ3NjUxIi8+CjwvZGlnPgo=')] bg-repeat" />
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600" />

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        {/* Ayah Display - Marquee Style */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="inline-flex items-center gap-2 text-emerald-600">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-lg font-medium">Loading Ayah...</span>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-red-600 text-lg">{error}</div>
            </motion.div>
          ) : currentAyah ? (
            <motion.div
              key={currentAyah.number}
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Arabic Ayah Text */}
              <div className="relative bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-8 border-2 border-emerald-100">
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg" />

                <p
                  className="text-3xl lg:text-5xl font-bold text-gray-800 leading-relaxed"
                  style={{ fontFamily: 'Amiri, Georgia, serif', direction: 'rtl', textAlign: 'right' }}
                >
                  {currentAyah.text}
                </p>

                {/* Ayah Number Badge */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">{currentAyah.number}</span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600" />
    </section>
  );
};

export default QuranReader;
