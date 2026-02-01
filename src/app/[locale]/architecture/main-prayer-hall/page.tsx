import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Main Prayer Hall - Masjid Salman al Farsi',
  description: 'Experience the spiritual grandeur of the main prayer hall at Masjid Salman al Farsi, featuring stunning Islamic architecture and serene atmosphere',
};

export default function MainPrayerHallPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            The Main Prayer Hall
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Step into the sacred space where thousands gather daily for prayer, reflection, and spiritual connection.
          </p>
        </div>

        {/* Hall Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Sacred Space Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <span className="text-6xl text-blue-600">🕌</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">A Spiritual Sanctuary</h3>
              <p className="text-slate-600">
                The main prayer hall spans an impressive 3,000 square meters, accommodating up to 2,000 worshippers.
                Designed with profound spiritual significance, every element serves to enhance the prayer experience
                and create an atmosphere of tranquility and devotion.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-700 mb-2">Hall Specifications</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Area: 3,000 square meters</li>
                  <li>• Capacity: 2,000 worshippers</li>
                  <li>• Ceiling Height: 25 meters</li>
                  <li>• Prayer Lines: 40 rows</li>
                  <li>• Carpet Area: 2,800 square meters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Architectural Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Central Dome</h3>
              <p className="text-slate-600 text-sm text-center mb-3">
                The magnificent dome creates perfect acoustics for prayers and sermons
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Natural lighting</li>
                <li>• Acoustic perfection</li>
                <li>• Quranic calligraphy</li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🏛️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Marble Columns</h3>
              <p className="text-slate-600 text-sm text-center mb-3">
                48 majestic marble columns support the structure with Islamic geometric designs
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Turkish marble</li>
                <li>• Gold inlay work</li>
                <li>• Geometric patterns</li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">Islamic Art</h3>
              <p className="text-slate-600 text-sm text-center mb-3">
                Intricate Islamic artwork and calligraphy adorn every surface
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Hand-painted tiles</li>
                <li>• Quranic verses</li>
                <li>• Traditional motifs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Mihrab */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">The Mihrab (Prayer Niche)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                <span className="text-6xl text-amber-600">🧭</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Direction of Prayer</h3>
              <p className="text-slate-600">
                The mihrab is a semi-circular niche in the wall that indicates the qibla, the direction of the Kaaba in Mecca.
                Our mihrab is a masterpiece of Islamic art, crafted from rare marble and adorned with gold leaf calligraphy.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-700 mb-2">Mihrab Features</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Carved from single marble block</li>
                  <li>• Gold leaf calligraphy</li>
                  <li>• Quranic verse: &quot;Face the direction of the Sacred Mosque&quot;</li>
                  <li>• Illuminated from within</li>
                  <li>• Acoustic enhancement for Imam&apos;s voice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* The Minbar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">The Minbar (Pulpit)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Platform of Knowledge</h3>
              <p className="text-slate-600">
                The minbar stands to the right of the mihrab, serving as the platform from which the Imam delivers
                the Friday sermon (khutbah) and other religious lectures. Our minbar is a work of art, featuring
                intricate woodwork and Islamic geometric patterns.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-700 mb-2">Craftsmanship Details</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Hand-carved teak wood</li>
                  <li>• 12 steps representing Islamic knowledge</li>
                  <li>• Mother-of-pearl inlay</li>
                  <li>• Arabic calligraphy panels</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <span className="text-6xl text-green-600">📢</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Facilities */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Prayer Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">📿</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Prayer Mats</h4>
              <p className="text-xs text-slate-600 mt-1">High-quality Turkish prayer mats</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-green-600">📖</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Quran Stands</h4>
              <p className="text-xs text-slate-600 mt-1">Wooden rihal for Quran reading</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-purple-600">🎤</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Sound System</h4>
              <p className="text-xs text-slate-600 mt-1">Crystal clear audio throughout</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-amber-600">💡</span>
              </div>
              <h4 className="font-semibold text-slate-700 text-sm">Lighting</h4>
              <p className="text-xs text-slate-600 mt-1">Soft, warm lighting for focus</p>
            </div>
          </div>
        </div>

        {/* Special Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Special Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Acoustic Design</h3>
              <p className="text-slate-600 mb-3">
                The prayer hall is engineered for perfect acoustics, ensuring the Imam&apos;s voice reaches
                every corner without distortion. The dome and walls are designed to minimize echo
                while enhancing vocal clarity.
              </p>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Sound-absorbing materials</li>
                <li>• Strategic speaker placement</li>
                <li>• Natural echo control</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Climate Control</h3>
              <p className="text-slate-600 mb-3">
                Advanced climate systems maintain comfortable temperatures year-round, with
                specialized ventilation that respects Islamic prayer requirements while ensuring
                optimal air quality.
              </p>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Silent air conditioning</li>
                <li>• Fresh air circulation</li>
                <li>• Humidity control</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visiting Guidelines */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Visiting the Prayer Hall</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Etiquette & Guidelines</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Maintain silence and respect during prayer times
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Dress modestly and remove shoes before entering
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Photography permitted outside prayer times only
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Follow the guidance of mosque staff
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Best Times to Visit</h3>
              <div className="space-y-2 text-slate-600 text-sm">
                <div className="flex justify-between">
                  <span>Morning:</span>
                  <span className="font-semibold">9:00 AM - 11:00 AM (quiet)</span>
                </div>
                <div className="flex justify-between">
                  <span>Afternoon:</span>
                  <span className="font-semibold">2:00 PM - 4:00 PM (moderate)</span>
                </div>
                <div className="flex justify-between">
                  <span>Evening:</span>
                  <span className="font-semibold">After Isha prayer (peaceful)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg">
            <p className="text-center text-sm text-slate-600">
              <strong>Guided Tours:</strong> Available daily. Experience the spiritual atmosphere and learn about
              the architectural significance. Advance booking recommended for groups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
