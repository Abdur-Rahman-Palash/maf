import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mosque Manners - Masjid Salman al Farsi',
  description: 'Essential etiquette and guidelines for worshippers at Masjid Salman al Farsi',
};

export default function MosqueMannersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            Mosque Manners & Etiquette
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Learn the proper etiquette and conduct for visiting and praying at Masjid Salman al Farsi.
          </p>
        </div>

        {/* Before Entering the Mosque */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Before Entering the Mosque</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Perform Wudu (Ablution)</h3>
                  <p className="text-slate-600 text-sm">Cleanse yourself before entering the house of Allah</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Dress Modestly</h3>
                  <p className="text-slate-600 text-sm">Wear clean, modest clothing covering the body appropriately</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Remove Shoes</h3>
                  <p className="text-slate-600 text-sm">Leave shoes in the designated areas before entering</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Enter with Right Foot</h3>
                  <p className="text-slate-600 text-sm">Enter the mosque with your right foot first</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Recite Du'a</h3>
                  <p className="text-slate-600 text-sm">Make du'a upon entering: "Allahumma aftah li abwaba rahmatik"</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-600 font-bold">6</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">Pray Two Rak'ah</h3>
                  <p className="text-slate-600 text-sm">Perform Tahiyyatul masjid (greeting prayer) before sitting</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inside the Mosque */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Inside the Mosque</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg">
              <h3 className="font-semibold text-slate-700 mb-3 text-blue-600">Prayer Etiquette</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Fill front rows first
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Straighten prayer lines
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Stand shoulder to shoulder
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Focus in prayer
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-lg">
              <h3 className="font-semibold text-slate-700 mb-3 text-green-600">General Conduct</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Maintain silence
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  No loud conversations
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Respect worshippers
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Keep phone silent
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-purple-50 to-white p-6 rounded-lg">
              <h3 className="font-semibold text-slate-700 mb-3 text-purple-600">Remembrance</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Engage in dhikr
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Read Quran quietly
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Make personal du'a
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Reflect on blessings
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Special Guidelines */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Special Guidelines</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
              <h3 className="font-semibold text-slate-700 mb-4 text-pink-600">For Sisters</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Use designated prayer areas
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Wear modest hijab and loose clothing
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Avoid strong perfumes
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Maintain privacy and modesty
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="font-semibold text-slate-700 mb-4 text-blue-600">For Children</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Teach them mosque etiquette early
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Keep them quiet during prayers
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Bring quiet activities if needed
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Encourage participation in age-appropriate ways
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prohibited Actions */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-red-600">What to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Inside Prayer Hall</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Eating or drinking
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Loud talking or laughing
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Using mobile phones
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Sleeping unless necessary
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">General Conduct</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Rushing through prayers
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Disturbing others
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Leaving during khutbah without reason
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Crossing in front of praying people
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rewards and Benefits */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Rewards of Proper Mosque Etiquette</h2>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Spiritual Benefits</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    Increased reward for prayers
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    Peace and tranquility
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    Stronger connection with Allah
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    Blessings for the community
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Community Benefits</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    Harmonious atmosphere
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    Respect for all worshippers
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    Positive example for others
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    Preserved sanctity of the mosque
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
