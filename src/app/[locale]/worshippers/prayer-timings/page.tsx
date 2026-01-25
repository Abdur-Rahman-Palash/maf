import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Prayer Timings - Masjid Salman al Farsi',
  description: 'Daily prayer timings for Fajr, Dhuhr, Asr, Maghrib, and Isha at Masjid Salman al Farsi',
};

export default function PrayerTimingsPage() {
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
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Today's Prayer Times */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Today's Prayer Times</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                <span className="font-semibold text-slate-700">Fajr</span>
                <span className="text-xl font-bold text-amber-600">5:30 AM</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <span className="font-semibold text-slate-700">Dhuhr</span>
                <span className="text-xl font-bold text-blue-600">12:30 PM</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <span className="font-semibold text-slate-700">Asr</span>
                <span className="text-xl font-bold text-green-600">3:45 PM</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <span className="font-semibold text-slate-700">Maghrib</span>
                <span className="text-xl font-bold text-orange-600">6:15 PM</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                <span className="font-semibold text-slate-700">Isha</span>
                <span className="text-xl font-bold text-purple-600">7:30 PM</span>
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
                  <td className="p-3">5:30 AM</td>
                  <td className="p-3">12:30 PM</td>
                  <td className="p-3">3:45 PM</td>
                  <td className="p-3">6:15 PM</td>
                  <td className="p-3">7:30 PM</td>
                </tr>
                <tr className="border-b border-amber-100 hover:bg-amber-50">
                  <td className="p-3 font-semibold">Tomorrow</td>
                  <td className="p-3">5:31 AM</td>
                  <td className="p-3">12:30 PM</td>
                  <td className="p-3">3:46 PM</td>
                  <td className="p-3">6:16 PM</td>
                  <td className="p-3">7:31 PM</td>
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
