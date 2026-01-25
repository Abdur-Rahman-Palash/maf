import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Domes - Masjid Salman al Farsi',
  description: 'Explore the magnificent domes of Masjid Salman al Farsi, featuring stunning Islamic architecture and spiritual symbolism',
};

export default function DomesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
            The Domes
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the architectural splendor and spiritual significance of the magnificent domes that crown Masjid Salman al Farsi.
          </p>
        </div>

        {/* Main Dome Feature */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">The Central Dome</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                <span className="text-6xl text-amber-600">🕌</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Architectural Marvel</h3>
              <p className="text-slate-600">
                The central dome of Masjid Salman al Farsi stands as a testament to Islamic architectural excellence, 
                soaring 45 meters above the main prayer hall with a diameter of 25 meters. Its golden exterior catches 
                the sunlight, creating a beacon that can be seen from miles around.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-700 mb-2">Key Specifications</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Height: 45 meters (147 feet)</li>
                  <li>• Diameter: 25 meters (82 feet)</li>
                  <li>• Weight: 1,200 tons</li>
                  <li>• Material: Gold-leaf covered copper</li>
                  <li>• Construction: Traditional Islamic techniques</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Dome Collection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Dome Collection</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl text-blue-600">🌙</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Main Prayer Dome</h3>
              <p className="text-slate-600 text-sm mb-3">
                The largest dome covering the main prayer hall, designed to enhance acoustics for prayers and sermons.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Acoustic engineering</li>
                <li>• Natural lighting system</li>
                <li>• Ventilation design</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-lg">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl text-green-600">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Entrance Domes</h3>
              <p className="text-slate-600 text-sm mb-3">
                Five smaller domes marking the main entrances, each with unique geometric patterns and calligraphy.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• 15 meters diameter each</li>
                <li>• Quranic inscriptions</li>
                <li>• Blue mosaic tiles</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-purple-50 to-white p-6 rounded-lg">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl text-purple-600">💎</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Courtyard Domes</h3>
              <p className="text-slate-600 text-sm mb-3">
                Eight decorative domes surrounding the courtyard, creating a harmonious architectural composition.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• 10 meters diameter each</li>
                <li>• Stained glass windows</li>
                <li>• Night illumination</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Design Elements */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Design Elements & Symbolism</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Islamic Geometry</h3>
              <p className="text-slate-600">
                The domes feature intricate geometric patterns based on sacred Islamic mathematics. 
                The designs incorporate the golden ratio and complex star patterns that have been used 
                in Islamic architecture for centuries.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-700 mb-2">Geometric Patterns</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Eight-pointed stars (symbolizing paradise)</li>
                  <li>• Hexagonal patterns (representing unity)</li>
                  <li>• Interlacing circles (eternal life)</li>
                  <li>• Sacred geometry proportions</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-700">Calligraphy & Inscriptions</h3>
              <p className="text-slate-600">
                Quranic verses and Islamic calligraphy adorn the dome interiors and exteriors, 
                created by master calligraphers using traditional techniques passed down through generations.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-700 mb-2">Notable Inscriptions</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Ayat al-Kursi (Throne Verse)</li>
                  <li>• 99 Names of Allah</li>
                  <li>• Surah Al-Ikhlas</li>
                  <li>• Prophet's traditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Construction & Engineering */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Engineering Excellence</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Modern Engineering</h3>
              <p className="text-slate-600 text-sm">
                Combining traditional Islamic architecture with modern seismic engineering and climate control systems.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🌡️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Climate Control</h3>
              <p className="text-slate-600 text-sm">
                Advanced ventilation and cooling systems maintain comfortable temperatures year-round.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Lighting Design</h3>
              <p className="text-slate-600 text-sm">
                Natural and artificial lighting systems create a spiritual atmosphere day and night.
              </p>
            </div>
          </div>
        </div>

        {/* Virtual Experience */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Experience the Domes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl">🎥</span>
                  </div>
                  <p className="text-white">360° Dome Tour</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Virtual Tour</h3>
              <p className="text-slate-600 text-sm">
                Explore the domes in stunning 360° detail from the comfort of your home
              </p>
            </div>
            
            <div className="text-center">
              <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl">🎧</span>
                  </div>
                  <p className="text-white">Audio Guide</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Audio Experience</h3>
              <p className="text-slate-600 text-sm">
                Listen to the acoustic perfection and spiritual ambiance within the domes
              </p>
            </div>
          </div>
        </div>

        {/* Visiting Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-amber-600">Visiting the Domes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Best Viewing Times</h3>
              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Sunrise:</span>
                  <span className="font-semibold">Golden glow on domes</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunset:</span>
                  <span className="font-semibold">Spectacular colors</span>
                </div>
                <div className="flex justify-between">
                  <span>Night:</span>
                  <span className="font-semibold">Illuminated beauty</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Photography Guidelines</h3>
              <div className="space-y-2 text-slate-600 text-sm">
                <p>• Exterior photography: Permitted</p>
                <p>• Interior photography: With permission</p>
                <p>• Professional shoots: Prior approval required</p>
                <p>• Drone photography: Not permitted</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <p className="text-center text-sm text-slate-600">
              <strong>Guided Architecture Tours:</strong> Available daily at 10:00 AM, 2:00 PM, and 4:00 PM. 
              Book in advance for group visits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
