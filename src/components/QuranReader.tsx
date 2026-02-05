'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaMosque, FaSyncAlt, FaVolumeUp } from 'react-icons/fa';
import WaveAnimation from '@/components/WaveAnimation';

interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
  translations: Array<{
    text: string;
    language_name: string;
  }>;
  audio: string;
}

const QuranReader: React.FC = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSurah, setCurrentSurah] = useState(1);
  const [currentAyah, setCurrentAyah] = useState(1);

  const fetchNextVerse = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const ayahsInSurah = [7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6];
      
      let nextSurah = currentSurah;
      let nextAyah = currentAyah;
      
      // Move to next verse
      if (currentAyah >= ayahsInSurah[currentSurah - 1]) {
        // Move to next surah
        if (currentSurah < 114) {
          nextSurah = currentSurah + 1;
          nextAyah = 1;
        } else {
          // Reset to beginning
          nextSurah = 1;
          nextAyah = 1;
        }
      } else {
        nextAyah = currentAyah + 1;
      }
      
      await fetchVerse(nextSurah, nextAyah);
    } catch (err) {
      setError('Failed to load Quran verse. Please try again.');
      console.error('Quran API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousVerse = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const ayahsInSurah = [7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6];
      
      let prevSurah = currentSurah;
      let prevAyah = currentAyah;
      
      // Move to previous verse
      if (currentAyah <= 1) {
        // Move to previous surah
        if (currentSurah > 1) {
          prevSurah = currentSurah - 1;
          prevAyah = ayahsInSurah[prevSurah - 1];
        } else {
          // Go to last verse of Quran
          prevSurah = 114;
          prevAyah = 6;
        }
      } else {
        prevAyah = currentAyah - 1;
      }
      
      await fetchVerse(prevSurah, prevAyah);
    } catch (err) {
      setError('Failed to load Quran verse. Please try again.');
      console.error('Quran API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVerse = async (surah: number, ayah: number) => {
      const response = await fetch(
        `/api/quran?surah=${surah}&ayah=${ayah}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch verse');
      }
      
      const data = await response.json();
      
      // Transform the data to match our interface
      const transformedVerse: Verse = {
        id: data.data[0].number,
        verse_key: data.data[0].surah.number + ':' + data.data[0].numberInSurah,
        text_uthmani: data.data[0].text,
        translations: [{
          text: data.data[1]?.text || 'Translation not available',
          language_name: 'en'
        }],
        audio: data.data[0].audio || ''
      };
      
      setVerse(transformedVerse);
      setCurrentSurah(surah);
      setCurrentAyah(ayah);
  };

  useEffect(() => {
    // Only fetch on client-side to prevent hydration issues
    if (typeof window !== 'undefined') {
      fetchNextVerse();
    }
  }, []);

  const playAudio = () => {
    if (verse?.audio) {
      const audio = new Audio(verse.audio);
      audio.play().catch(err => console.error('Audio playback failed:', err));
    }
  };

  return (
    <section className="relative min-h-[20vh] bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
      {/* Subtle Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">

        {/* Additional Floating Orbs */}
        <div className="absolute top-2/3 left-1/6 w-20 h-20">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/15 to-emerald-400/15"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.08, 0.2],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute bottom-1/4 right-1/6 w-16 h-16">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-teal-400/10 to-cyan-400/10"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.15, 0.06, 0.15],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaBook className="text-emerald-600 text-2xl" />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-philosopher), sans-serif' }}>
              Quran Reader
            </h2>
            <FaMosque className="text-emerald-600 text-2xl" />
          </div>
        </motion.div>

        {/* Verse Display */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {loading && typeof window !== 'undefined' ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <p className="text-gray-600 mt-4">Loading Quran verse...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchNextVerse}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : verse ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-emerald-100">
              {/* Arabic Verse */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p
                  className="text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed mb-4"
                  style={{ fontFamily: 'Amiri, Georgia, serif', direction: 'rtl', textAlign: 'center' }}
                >
                  {verse.text_uthmani}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {verse.verse_key}
                </p>
              </motion.div>

              {/* English Translation */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  {verse.translations?.[0]?.text || 'Translation not available'}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button
                  onClick={fetchPreviousVerse}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FaSyncAlt className="rotate-180" />
                  Previous Verse
                </button>
                <button
                  onClick={fetchNextVerse}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <FaSyncAlt />
                  Next Verse
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Click the button below to load a Quran verse</p>
              <button
                onClick={fetchNextVerse}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Load Quran Verse
              </button>
            </div>
          )}
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
