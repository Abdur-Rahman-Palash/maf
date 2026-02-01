import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'The Courtyard - Masjid Salman al Farsi',
  description: 'Explore the beautiful courtyard of Masjid Salman al Farsi',
};

export default function CourtyardPage() {


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070')] bg-cover bg-center" />

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              The Courtyard
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              A serene space for reflection and community gathering
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Architectural Excellence
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6 leading-relaxed">
                The courtyard of Masjid Salman al Farsi represents the perfect blend of traditional Islamic architecture
                and modern design principles. This expansive open space serves as the heart of our mosque community,
                providing a tranquil environment for worshipers to gather, reflect, and connect with their faith.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Design Features</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Spacious open-air design</li>
                    <li>• Traditional geometric patterns</li>
                    <li>• Reflective water features</li>
                    <li>• Shaded seating areas</li>
                    <li>• Beautiful landscaping</li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Spiritual Significance</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Space for community gathering</li>
                    <li>• Area for contemplation</li>
                    <li>• Connection to nature</li>
                    <li>• Symbolic purification space</li>
                    <li>• Architectural harmony</li>
                  </ul>
                </div>
              </div>

              <p className="text-slate-600 mb-6 leading-relaxed">
                The courtyard&apos;s design incorporates elements from classical Islamic architecture while embracing
                contemporary functionality. The careful arrangement of spaces creates a natural flow that guides
                visitors from the bustling outside world into a realm of peace and spiritual reflection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
