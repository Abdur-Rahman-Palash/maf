import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Clocks - Masjid Salman al Farsi',
  description: 'Discover the elegant clocks of Masjid Salman al Farsi',
};

export default function ClocksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              The Clocks
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Marking the rhythm of daily prayers and community life
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Timeless Precision
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6 leading-relaxed">
                The clocks of Masjid Salman al Farsi serve both practical and spiritual purposes, 
                helping the community organize their daily prayers while adding to the architectural 
                beauty of our sacred space.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Design Features</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Arabic numeral displays</li>
                    <li>• Prayer time indicators</li>
                    <li>• Traditional craftsmanship</li>
                    <li>• Gold-plated accents</li>
                    <li>• Synchronized time systems</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Religious Significance</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Prayer time coordination</li>
                    <li>• Community organization</li>
                    <li>• Symbol of order and discipline</li>
                    <li>• Connection to daily rhythms</li>
                    <li>• Reminder of temporal nature</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
