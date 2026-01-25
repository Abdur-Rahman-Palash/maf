import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reflective Pools - Masjid Salman al Farsi',
  description: 'Experience the serene reflective pools of Masjid Salman al Farsi',
};

export default function ReflectivePoolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Reflective Pools
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Mirrors of tranquility and spiritual reflection
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Serene Water Features
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6 leading-relaxed">
                The reflective pools of Masjid Salman al Farsi create a serene atmosphere that 
                enhances the spiritual experience of visitors. These carefully designed water features 
                serve both aesthetic and symbolic purposes in Islamic architecture.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Design Elements</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Crystal clear water surfaces</li>
                    <li>• Geometric pool shapes</li>
                    <li>• Subtle water circulation</li>
                    <li>• Ambient lighting effects</li>
                    <li>• Natural stone surrounds</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Symbolic Meaning</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Spiritual purification</li>
                    <li>• Reflection and contemplation</li>
                    <li>• Divine clarity</li>
                    <li>• Life and purity</li>
                    <li>• Harmony with nature</li>
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
