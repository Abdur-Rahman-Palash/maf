import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Interior Walls - Masjid Salman al Farsi',
  description: 'Explore the magnificent interior walls of Masjid Salman al Farsi',
};

export default function InteriorWallsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              The Interior Walls
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Canvas of Islamic art and spirituality
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Artistic Expression
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6 leading-relaxed">
                The interior walls of Masjid Salman al Farsi serve as a magnificent canvas for 
                Islamic artistic expression. Every surface tells a story through intricate patterns, 
                calligraphy, and architectural details that inspire devotion and contemplation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Artistic Elements</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Quranic calligraphy panels</li>
                    <li>• Geometric pattern mosaics</li>
                    <li>• Traditional arabesque designs</li>
                    <li>• Marble inlay work</li>
                    <li>• Illuminated alcoves</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Spiritual Purpose</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Divine word display</li>
                    <li>• Spiritual atmosphere creation</li>
                    <li>• Educational value</li>
                    <li>• Cultural preservation</li>
                    <li>• Meditation focus points</li>
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
