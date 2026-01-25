import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Friday Sermon & Minbar Al Jami - Masjid Salman al Farsi',
  description: 'Learn about the Friday Khutbah (sermon) and the magnificent Minbar Al Jami at Masjid Salman al Farsi',
};

export default function FridaySermonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Friday Sermon & Minbar Al Jami
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the spiritual Friday congregation and learn about our beautiful pulpit where inspiring sermons are delivered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Friday Sermon Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">The Friday Khutbah</h2>
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Schedule</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>First Adhan:</span>
                    <span className="font-bold text-amber-600">1:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Khutbah Begins:</span>
                    <span className="font-bold text-amber-600">1:15 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Jumuah Prayer:</span>
                    <span className="font-bold text-amber-600">1:45 PM</span>
                  </p>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Sermon Topics</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Islamic teachings and moral values
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Family and community guidance
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Contemporary issues from Islamic perspective
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Life of Prophet Muhammad (PBUH)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Minbar Al Jami Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Minbar Al Jami</h2>
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Architecture & Design</h3>
                <p className="text-slate-600 mb-3">
                  The Minbar Al Jami is a masterpiece of Islamic craftsmanship, featuring:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    Hand-carved mahogany wood
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    Intricate geometric patterns
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    Gold leaf calligraphy
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    Traditional Islamic motifs
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Historical Significance</h3>
                <p className="text-slate-600">
                  The minbar represents the platform from which the Prophet Muhammad (PBUH) delivered his sermons. 
                  Our Minbar Al Jami continues this tradition, serving as a symbol of knowledge and spiritual guidance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Imams */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Our Imams & Scholars</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-amber-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-700">IM</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Imam Muhammad</h3>
              <p className="text-slate-600 text-sm">Lead Imam & Khateeb</p>
              <p className="text-slate-500 text-xs mt-2">15 years of experience in Islamic scholarship</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-700">IS</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Sheikh Abdullah</h3>
              <p className="text-slate-600 text-sm">Resident Scholar</p>
              <p className="text-slate-500 text-xs mt-2">Expert in Islamic jurisprudence</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-700">IQ</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Qari Ahmed</h3>
              <p className="text-slate-600 text-sm">Quran Reciter</p>
              <p className="text-slate-500 text-xs mt-2">Master of Quranic tajweed</p>
            </div>
          </div>
        </div>

        {/* Guidelines for Attendees */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Guidelines for Friday Prayer</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Before Coming</h4>
              <ul className="space-y-1 text-slate-600 text-sm">
                <li>• Perform wudu (ablution) at home</li>
                <li>• Wear clean, modest clothing</li>
                <li>• Arrive 15-20 minutes early</li>
                <li>• Bring prayer mat if preferred</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">During the Sermon</h4>
              <ul className="space-y-1 text-slate-600 text-sm">
                <li>• Maintain silence and respect</li>
                <li>• No talking during khutbah</li>
                <li>• Listen attentively to the sermon</li>
                <li>• Make dua during the sermon</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
