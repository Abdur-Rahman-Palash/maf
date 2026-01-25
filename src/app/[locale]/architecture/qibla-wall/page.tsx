import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Qibla Wall - Masjid Salman al Farsi',
  description: 'Experience the sacred Qibla wall of Masjid Salman al Farsi',
};

export default function QiblaWallPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              The Qibla Wall
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              The sacred wall facing Mecca, direction of prayer
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Sacred Orientation
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6 leading-relaxed">
                The Qibla wall of Masjid Salman al Farsi represents the most sacred architectural 
                element in our mosque. This wall, perfectly aligned with the Kaaba in Mecca, 
                serves as the spiritual compass that unites all worshipers in a single direction.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Architectural Elements</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Precise directional alignment</li>
                    <li>• Central Mihrab niche</li>
                    <li>• Quranic inscription panels</li>
                    <li>• Decorative geometric patterns</li>
                    <li>• Enhanced acoustic design</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Spiritual Significance</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Direction of Islamic prayer</li>
                    <li>• Unity of Muslim community</li>
                    <li>• Connection to Mecca</li>
                    <li>• Symbol of divine presence</li>
                    <li>• Focus for spiritual concentration</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                Every element of the Qibla wall is designed to enhance the spiritual experience 
                of prayer. The intricate calligraphy and geometric patterns not only beautify the 
                space but also serve as reminders of divine unity and the eternal nature of Islamic faith.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
