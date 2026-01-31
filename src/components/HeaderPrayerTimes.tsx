'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PrayerTimes {
  jamaat: {
    fajr: string;
    zuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  begins: {
    fajr: string;
    zuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

const HeaderPrayerTimes: React.FC = () => {
  const [currentDate, setCurrentDate] = useState({
    english: '',
    hijri: ''
  });

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>({
    jamaat: {
      fajr: '06:15',
      zuhr: '13:30',
      asr: '16:00',
      maghrib: '18:15',
      isha: '20:00'
    },
    begins: {
      fajr: '05:45',
      zuhr: '13:00',
      asr: '15:30',
      maghrib: '18:15',
      isha: '19:30'
    }
  });

  useEffect(() => {
    // Set current date
    const updateDate = () => {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleDateString('en-US', { month: 'long' });
      const year = now.getFullYear();
      
      // Add ordinal suffix to day
      const getOrdinalSuffix = (day: number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = day % 100;
        return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
      };
      
      setCurrentDate({
        english: `${day}${getOrdinalSuffix(day)} ${month} ${year}`,
        hijri: '9 Shabaan 1447' // This would normally be calculated
      });
    };

    updateDate();
    const timer = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-3 lg:py-4">
          {/* Left Column - Date and Jum'a Info */}
          <motion.div 
            className="flex flex-col justify-center space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="hidden lg:block text-gray-700 font-medium text-sm lg:text-base">
              {currentDate.english} · {currentDate.hijri}
            </div>
            <div className="text-gray-700 text-sm lg:text-base" style={{ textTransform: 'uppercase', fontWeight: 500 }}>
              <motion.a 
                href="/worshippers/prayer-timings" 
                className="hover:text-amber-600 transition-colors duration-200 mr-2 inline-block"
                whileHover={{ y: -1 }}
              >
                JUM'A 12:30 & 13:15
              </motion.a>
              <span className="text-gray-400">·</span>
              <motion.a 
                href="https://cambridgecentralmosque.org/prayer-times/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-600 transition-colors duration-200 ml-2 inline-block"
                whileHover={{ y: -1 }}
              >
                PRAYER TIMES
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Prayer Times Table */}
          <motion.div 
            className="bg-white lg:border-l border-gray-200 lg:pl-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Prayer Names Header */}
            <div className="grid grid-cols-6 gap-1 mb-2 lg:mb-3" style={{ lineHeight: '20px', margin: '7px 0 5px 0' }}>
              <div className="col-span-1"></div>
              <div className="col-span-1 text-center">
                <span className="text-xs lg:text-sm font-semibold text-gray-700">FAJR</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-xs lg:text-sm font-semibold text-gray-700">ZUHR</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-xs lg:text-sm font-semibold text-gray-700">ASR</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-xs lg:text-sm font-semibold text-gray-700">MAGHRIB</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-xs lg:text-sm font-semibold text-gray-700">ISHA</span>
              </div>
            </div>

            {/* Jama'at Times */}
            <div className="grid grid-cols-6 gap-1 mb-1 lg:mb-2" style={{ lineHeight: '20px' }}>
              <div className="col-span-1">
                <span className="text-xs lg:text-sm font-bold text-gray-700">JAMA'AT</span>
              </div>
              {Object.entries(prayerTimes.jamaat).map(([prayer, time], index) => (
                <motion.div 
                  key={prayer}
                  className="col-span-1 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <span className="text-xs lg:text-sm font-medium text-gray-800 hover:text-amber-600 transition-colors cursor-pointer">
                    {time}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Begin Times */}
            <div className="grid grid-cols-6 gap-1" style={{ margin: '4px 0 2px', paddingBottom: 0, lineHeight: '20px' }}>
              <div className="col-span-1">
                <span className="text-xs lg:text-sm font-bold text-gray-700">BEGINS</span>
              </div>
              {Object.entries(prayerTimes.begins).map(([prayer, time], index) => (
                <motion.div 
                  key={prayer}
                  className="col-span-1 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <span className="text-xs lg:text-sm font-medium text-gray-800 hover:text-amber-600 transition-colors cursor-pointer">
                    {time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrayerTimes;
