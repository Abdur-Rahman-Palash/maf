'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function PrayerTimingsPage() {
  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: '5:30 AM',
    Sunrise: '6:30 AM',
    Dhuhr: '12:30 PM',
    Asr: '3:45 PM',
    Maghrib: '6:15 PM',
    Isha: '7:30 PM'
  });

  const [hijriDate, setHijriDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Using Islamic prayer times API for Georgia, USA
        const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Atlanta&country=US&method=2');
        const data = await response.json();
        
        if (data.code === 200 && data.data) {
          const timings = data.data.timings;
          const hijri = data.data.date.hijri;
          
          // Convert 24-hour to 12-hour format
          const convertTo12Hour = (time: string) => {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            return `${hour12}:${minutes} ${ampm}`;
          };

          setPrayerTimes({
            Fajr: convertTo12Hour(timings.Fajr),
            Sunrise: convertTo12Hour(timings.Sunrise),
            Dhuhr: convertTo12Hour(timings.Dhuhr),
            Asr: convertTo12Hour(timings.Asr),
            Maghrib: convertTo12Hour(timings.Maghrib),
            Isha: convertTo12Hour(timings.Isha)
          });

          setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
        }
      } catch (error) {
        console.log('Using fallback prayer times');
        setHijriDate('9 Shabaan 1447');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
    
    // Update every hour
    const interval = setInterval(fetchPrayerTimes, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading prayer times...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Prayer Timings
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Daily prayer schedule for Masjid Salman al Farsi. Times are updated regularly according to the Islamic calendar.
          </p>
          {hijriDate && (
            <p className="text-amber-600 font-semibold mt-2">
              Hijri Date: {hijriDate}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Today's Prayer Times */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Today's Prayer Times</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                <span className="font-semibold text-slate-700">Fajr</span>
                <span className="text-xl font-bold text-amber-600">{prayerTimes.Fajr}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <span className="font-semibold text-slate-700">Dhuhr</span>
                <span className="text-xl font-bold text-blue-600">{prayerTimes.Dhuhr}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <span className="font-semibold text-slate-700">Asr</span>
                <span className="text-xl font-bold text-green-600">{prayerTimes.Asr}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <span className="font-semibold text-slate-700">Maghrib</span>
                <span className="text-xl font-bold text-orange-600">{prayerTimes.Maghrib}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                <span className="font-semibold text-slate-700">Isha</span>
                <span className="text-xl font-bold text-purple-600">{prayerTimes.Isha}</span>
              </div>
            </div>
          </div>

          {/* Jumuah Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Jumuah (Friday) Prayer</h2>
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold text-slate-700 mb-2">Khutbah (Sermon)</p>
                  <p className="text-2xl font-bold text-amber-600">1:15 PM</p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold text-slate-700 mb-2">Jumuah Prayer</p>
                  <p className="text-2xl font-bold text-amber-600">1:45 PM</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  <strong>Note:</strong> Please arrive 15 minutes early for Jumuah prayer as the mosque gets crowded.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Calendar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Monthly Prayer Calendar</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b-2 border-amber-200">
                  <th className="p-3 text-slate-700">Date</th>
                  <th className="p-3 text-slate-700">Fajr</th>
                  <th className="p-3 text-slate-700">Dhuhr</th>
                  <th className="p-3 text-slate-700">Asr</th>
                  <th className="p-3 text-slate-700">Maghrib</th>
                  <th className="p-3 text-slate-700">Isha</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-amber-100 hover:bg-amber-50">
                  <td className="p-3 font-semibold">Today</td>
                  <td className="p-3">{prayerTimes.Fajr}</td>
                  <td className="p-3">{prayerTimes.Dhuhr}</td>
                  <td className="p-3">{prayerTimes.Asr}</td>
                  <td className="p-3">{prayerTimes.Maghrib}</td>
                  <td className="p-3">{prayerTimes.Isha}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Important Notes</h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              Prayer times are calculated based on the location of Masjid Salman al Farsi
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              Times may vary by 1-2 minutes due to geographical calculations
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              Ramadan timings will be announced separately
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              Please follow the Adhan (call to prayer) for exact prayer times
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
