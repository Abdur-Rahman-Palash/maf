'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaMapMarkerAlt, FaMosque, FaSun, FaCloudSun, FaCloudMoon, FaMoon } from 'react-icons/fa';

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PrayerTimesBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>({
    Fajr: '5:45 AM',
    Sunrise: '7:03 AM',
    Dhuhr: '12:44 PM',
    Asr: '3:58 PM',
    Maghrib: '6:25 PM',
    Isha: '7:45 PM'
  });
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string }>({ name: 'DHUHR', time: '12:44 PM' });
  const [location, setLocation] = useState('TUCKER, GA');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { 
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit'
  }));

  // Update current time every minute and calculate next prayer
  useEffect(() => {
    const updatePrayerInfo = () => {
      const now = new Date();
      const currentTimeStr = now.toLocaleTimeString('en-US', { 
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      setCurrentTime(currentTimeStr);
      
      // Convert current time to minutes for comparison
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      // Prayer times in minutes (24-hour format)
      const prayerTimesMinutes = {
        Fajr: 5 * 60 + 45,      // 5:45 AM
        Sunrise: 7 * 60 + 3,    // 7:03 AM
        Dhuhr: 12 * 60 + 44,    // 12:44 PM
        Asr: 15 * 60 + 58,      // 3:58 PM
        Maghrib: 18 * 60 + 25,  // 6:25 PM
        Isha: 19 * 60 + 45      // 7:45 PM
      };
      
      // Find next prayer
      let nextPrayerName = 'Fajr';
      let nextPrayerTime = prayerTimes.Fajr;
      
      for (const [prayer, minutes] of Object.entries(prayerTimesMinutes)) {
        if (minutes > currentMinutes) {
          nextPrayerName = prayer;
          nextPrayerTime = prayerTimes[prayer as keyof PrayerTimes];
          break;
        }
      }
      
      setNextPrayer({ name: nextPrayerName.toUpperCase(), time: nextPrayerTime });
    };
    
    updatePrayerInfo();
    const timer = setInterval(updatePrayerInfo, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Prayer icons mapping
  const prayerIcons: { [key: string]: React.ReactNode } = {
    Fajr: <FaMoon className="text-blue-600" />,
    Sunrise: <FaSun className="text-orange-500" />,
    Dhuhr: <FaSun className="text-yellow-500" />,
    Asr: <FaCloudSun className="text-orange-400" />,
    Maghrib: <FaCloudMoon className="text-purple-500" />,
    Isha: <FaMoon className="text-indigo-600" />
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden cursor-pointer"
        initial={{ width: 80, height: 200 }}
        animate={{ 
          width: isOpen ? 320 : 80,
          height: isOpen ? 'auto' : 200
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Collapsed State */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="flex flex-col items-center justify-center h-full p-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaMapMarkerAlt className="text-amber-500 text-xl mb-2" />
              <div className="text-xs font-bold text-slate-700 mb-1 leading-tight">
                TUCKER, GA
              </div>
              <div className="text-xs font-bold text-slate-700 mb-1 leading-tight">
                PRAYER
              </div>
              <div className="text-xs font-bold text-slate-700 mb-2 leading-tight">
                TIMINGS
              </div>
              <FaMosque className="text-amber-500 text-xl mb-2" />
              <FaChevronDown className="text-amber-500 text-sm animate-bounce" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded State */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-amber-500" />
                  <span className="text-sm font-bold text-slate-700">{location}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">EST</div>
                  <div className="text-sm font-bold text-slate-700">{currentTime}</div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">PRAYER TIMINGS</h3>

              {/* Next Prayer */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg p-3 mb-4">
                <div className="text-xs opacity-90">NEXT PRAYER</div>
                <div className="text-lg font-bold">{nextPrayer.time}</div>
                <div className="text-sm">{nextPrayer.name}</div>
              </div>

              {/* Prayer Times List */}
              <div className="space-y-2">
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                  <motion.div
                    key={prayer}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Object.keys(prayerTimes).indexOf(prayer) * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {prayerIcons[prayer]}
                      </div>
                      <span className="text-sm font-semibold text-slate-700 capitalize">
                        {prayer}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {time}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Mosque Icon and Close Button */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex-1 flex justify-center">
                  <FaMosque className="text-amber-500 text-3xl" />
                </div>
                <div className="flex justify-end">
                  <FaChevronUp className="text-amber-500 text-sm" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PrayerTimesBanner;
