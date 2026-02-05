'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const recitations = [
  { id: 1, surah: 'Al-Fatiha', reciter: 'Abdul Basit Abdul Samad', url: 'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/001.mp3', arabic: 'الفاتحة' },
  { id: 2, surah: 'Al-Ikhlas', reciter: 'Abdul Basit Abdul Samad', url: 'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/112.mp3', arabic: 'الإخلاص' },
  { id: 3, surah: 'Al-Falaq', reciter: 'Abdul Basit Abdul Samad', url: 'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/113.mp3', arabic: 'الفلق' },
  { id: 4, surah: 'An-Nas', reciter: 'Abdul Basit Abdul Samad', url: 'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/114.mp3', arabic: 'الناس' },
];

export default function QuranSection() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(recitations[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (waveformRef.current) {
      setIsLoading(true);
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#D4AF37',
        progressColor: '#b5952f',
        cursorColor: '#1e293b',
        barWidth: 3,
        barGap: 2,
        height: 80,
        normalize: true,
      });

      wavesurfer.current.load(currentTrack.url);

      wavesurfer.current.on('finish', () => {
        setIsPlaying(false);
        // Auto-play next track
        const currentIndex = recitations.findIndex(t => t.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % recitations.length;
        setCurrentTrack(recitations[nextIndex]);
      });

      wavesurfer.current.on('play', () => setIsPlaying(true));
      wavesurfer.current.on('pause', () => setIsPlaying(false));
      wavesurfer.current.on('ready', () => setIsLoading(false));

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const changeTrack = (track: typeof recitations[0]) => {
    setCurrentTrack(track);
    setIsLoading(true);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-amber-50 to-slate-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Islamic Patterns */}
          <motion.div
            className="absolute top-20 left-10 text-8xl opacity-5"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: 2,
              ease: "linear"
            }}
          >
            ☪
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 right-10 text-6xl opacity-5"
            animate={{ 
              rotate: [360, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: 2,
              ease: "linear"
            }}
          >
            🕌
          </motion.div>

          {/* Animated Dots Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => {
              const seed = i * 23.7; // Deterministic seed based on index
              const left = ((seed * 5.3) % 100);
              const top = ((seed * 7.9) % 100);
              const duration = 3 + ((seed * 3) % 2);
              const delay = ((seed * 4.1) % 2);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration,
                    repeat: 2,
                    delay,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                <motion.h2 
                  className="text-5xl font-bold text-slate-800 mb-6"
                  style={{ fontFamily: 'var(--font-philosopher), sans-serif' }}
                >
                  Quran Recitations
                  <motion.span
                    className="inline-block ml-3 text-amber-500"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: 2 
                    }}
                  >
                    📖
                  </motion.span>
                </motion.h2>
                
                <motion.div 
                  className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 128 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
            </motion.div>

            {/* Main Player */}
            <motion.div 
              className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
                {/* Header with Current Track */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-8 text-white">
                    <motion.div
                      key={currentTrack.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-3xl font-bold mb-2">{currentTrack.surah}</h3>
                        <p className="text-amber-100 text-lg mb-1">{currentTrack.arabic}</p>
                        <p className="text-amber-200">{currentTrack.reciter}</p>
                    </motion.div>
                </div>

                {/* Waveform and Controls */}
                <div className="p-8">
                    <div className="flex items-center gap-6 mb-8">
                        {/* Play Button */}
                        <motion.button
                            onClick={togglePlay}
                            className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center text-xl shadow-lg hover:shadow-amber-500/50 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                        >
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 360 }}
                                        exit={{ rotate: 0 }}
                                        transition={{ duration: 1, repeat: 2 }}
                                    >
                                        <FaVolumeUp />
                                    </motion.div>
                                ) : isPlaying ? (
                                    <motion.div
                                        key="pause"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <FaPause />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="play"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <FaPlay className="ml-1" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Waveform */}
                        <div className="flex-1 relative">
                            <div ref={waveformRef} className="w-full" />
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: 2 }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Track Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recitations.map((track, index) => (
                            <motion.button
                                key={track.id}
                                onClick={() => changeTrack(track)}
                                className={`p-4 rounded-xl text-left transition-all border-2 ${
                                    currentTrack.id === track.id 
                                        ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-400 shadow-md' 
                                        : 'bg-slate-50 border-transparent hover:bg-slate-100 hover:border-amber-200'
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-left">
                                        <span className="font-bold block text-slate-800 text-lg">{track.surah}</span>
                                        <span className="text-amber-600 text-sm">{track.arabic}</span>
                                        <span className="text-slate-500 text-xs block">Beautiful Recitation</span>
                                    </div>
                                    {currentTrack.id === track.id && (
                                        <motion.div
                                            className="w-3 h-3 bg-amber-500 rounded-full"
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ duration: 1, repeat: 2 }}
                                        />
                                    )}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
  );
}
