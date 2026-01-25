import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services and Facilities - Masjid Salman al Farsi',
  description: 'Comprehensive facilities and services available for worshippers at Masjid Salman al Farsi',
};

export default function ServicesFacilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Services and Facilities
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the comprehensive range of services and facilities designed to enhance your worship experience.
          </p>
        </div>

        {/* Main Prayer Facilities */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Prayer Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🕌</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Main Prayer Hall</h3>
              <p className="text-slate-600 text-sm text-center mb-3">Spacious hall accommodating 2,000 worshippers</p>
              <ul className="space-y-1 text-slate-600 text-xs">
                <li>• Air-conditioned</li>
                <li>• Wheelchair accessible</li>
                <li>• Audio system</li>
                <li>• Prayer mats provided</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-pink-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">👩</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Women's Prayer Area</h3>
              <p className="text-slate-600 text-sm text-center mb-3">Dedicated space for 500 female worshippers</p>
              <ul className="space-y-1 text-slate-600 text-xs">
                <li>• Private entrance</li>
                <li>• Separate ablution facilities</li>
                <li>• Children's corner</li>
                <li>• Nursing room available</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">🚿</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Ablution Facilities</h3>
              <p className="text-slate-600 text-sm text-center mb-3">Modern wudu areas for men and women</p>
              <ul className="space-y-1 text-slate-600 text-xs">
                <li>• Hot & cold water</li>
                <li>• 50+ wudu stations</li>
                <li>• Shower facilities</li>
                <li>• Prayer shoe storage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Facilities */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Educational Facilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Library & Resource Center</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500">📚</span>
                  <span className="text-slate-600">10,000+ Islamic books</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500">💻</span>
                  <span className="text-slate-600">Computer stations with Islamic software</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500">🌐</span>
                  <span className="text-slate-600">Digital Quran and Hadith database</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500">📖</span>
                  <span className="text-slate-600">Study rooms and reading areas</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Classroom Facilities</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">🎓</span>
                  <span className="text-slate-600">15 modern classrooms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">📺</span>
                  <span className="text-slate-600">Multimedia equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">🪑</span>
                  <span className="text-slate-600">Comfortable seating for 30+ students</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">📝</span>
                  <span className="text-slate-600">Whiteboards and projectors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Services */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Community Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-amber-600">💍</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Marriage Services</h4>
              <p className="text-xs text-slate-600 mt-1">Nikah ceremonies & counseling</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-green-600">🍼</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Baby Naming</h4>
              <p className="text-xs text-slate-600 mt-1">Aqiqah ceremonies</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-blue-600">🤝</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Counseling</h4>
              <p className="text-xs text-slate-600 mt-1">Family & individual support</p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-purple-600">📋</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Documentation</h4>
              <p className="text-xs text-slate-600 mt-1">Islamic certificates</p>
            </div>
          </div>
        </div>

        {/* Support Facilities */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Support Facilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Parking & Transportation</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="text-orange-500">🚗</span>
                  <span>500+ parking spaces</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-orange-500">♿</span>
                  <span>Disabled parking available</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-orange-500">🚌</span>
                  <span>Shuttle service from public transport</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-orange-500">🚲</span>
                  <span>Bicycle parking area</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Food & Refreshments</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">☕</span>
                  <span>Cafeteria with halal food</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">💧</span>
                  <span>Water coolers throughout mosque</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">🍽️</span>
                  <span>Community dining hall</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">🥘</span>
                  <span>Iftar facilities during Ramadan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Special Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Special Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-indigo-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">🎙️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Live Broadcasting</h3>
              <p className="text-slate-600 text-sm">Friday prayers and special events streamed live</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-rose-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">🏥</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">First Aid Center</h3>
              <p className="text-slate-600 text-sm">Medical assistance available during prayer times</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">🛍️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Islamic Gift Shop</h3>
              <p className="text-slate-600 text-sm">Books, prayer mats, Islamic items and souvenirs</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Facility Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Operating Hours</h3>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Mosque Open:</span>
                  <span className="font-semibold">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Office Hours:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Library:</span>
                  <span className="font-semibold">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Gift Shop:</span>
                  <span className="font-semibold">10:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Contact Information</h3>
              <div className="space-y-2 text-slate-600">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>Main Office: +123 456 7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>Email: info@masjidsalman.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>123 Mosque Street, City, Country</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🌐</span>
                  <span>Website: www.masjidsalman.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
