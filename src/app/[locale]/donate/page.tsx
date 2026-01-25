import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate - Masjid Salman al Farsi',
  description: 'Support Masjid Salman al Farsi with your generous donation. Help us serve the community and spread the message of peace.',
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-slate-900/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070')] bg-cover bg-center" />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
              Support Our Masjid
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Your generous donation helps us serve the community and spread the message of peace
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Donation Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'var(--font-amiri)' }}>
                  Make Your Donation
                </h2>

                {/* Donation Type */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Donation Type</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 px-4 rounded-lg border-2 border-amber-500 bg-amber-50 text-amber-700">
                      One-time
                    </button>
                    <button className="flex-1 py-2 px-4 rounded-lg border-2 border-slate-300 text-slate-600 hover:border-slate-400">
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Select Amount</h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { amount: '25', label: '$25', impact: 'Provides meals for 5 families' },
                      { amount: '50', label: '$50', impact: 'Supports educational programs' },
                      { amount: '100', label: '$100', impact: 'Funds community events' },
                      { amount: '250', label: '$250', impact: 'Maintains mosque facilities' },
                      { amount: '500', label: '$500', impact: 'Supports youth programs' },
                      { amount: '1000', label: '$1000', impact: 'Major project contribution' },
                    ].map((item) => (
                      <button
                        key={item.amount}
                        className="p-3 rounded-lg border-2 border-slate-300 text-center hover:border-amber-500 hover:bg-amber-50 transition-all"
                      >
                        <div className="font-semibold text-slate-800">{item.label}</div>
                        <div className="text-xs text-slate-500 mt-1">{item.impact}</div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Payment Method</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Credit/Debit Card', desc: 'Visa, Mastercard, American Express' },
                      { name: 'PayPal', desc: 'Fast and secure payment' },
                      { name: 'Bank Transfer', desc: 'Direct bank deposit' },
                    ].map((method) => (
                      <button
                        key={method.name}
                        className="w-full p-4 rounded-lg border-2 border-slate-300 text-left hover:border-amber-500 hover:bg-amber-50 transition-all"
                      >
                        <div className="font-medium text-slate-800">{method.name}</div>
                        <div className="text-sm text-slate-600">{method.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donate Button */}
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg">
                  Proceed to Donate
                </button>
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="space-y-8">
              {/* Impact Section */}
              <div className="bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-amber-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                  Your Impact
                </h3>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Support daily prayers and Islamic programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Provide Islamic education to youth and children</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Assist families in need through our food bank</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Maintain our beautiful mosque facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Host community events and religious gatherings</span>
                  </li>
                </ul>
              </div>

              {/* Current Campaigns */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                  Current Campaigns
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Ramadan Iftar Program', goal: '$10,000', raised: '$7,500', progress: 75 },
                    { title: 'Youth Education Center', goal: '$25,000', raised: '$15,000', progress: 60 },
                    { title: 'Mosque Maintenance', goal: '$5,000', raised: '$3,000', progress: 60 },
                  ].map((campaign) => (
                    <div key={campaign.title} className="border border-slate-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">{campaign.title}</h4>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-slate-600 mb-1">
                          <span>${campaign.raised} raised</span>
                          <span>{campaign.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">Goal: ${campaign.goal}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Information */}
              <div className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Tax Information</h3>
                <p className="text-slate-600 mb-3">
                  Masjid Salman al Farsi is a registered 501(c)(3) non-profit organization. 
                  Your donation is tax-deductible to the extent allowed by law.
                </p>
                <p className="text-sm text-slate-500">
                  Tax ID: XX-XXXXXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12" style={{ fontFamily: 'var(--font-amiri)' }}>
            What Our Supporters Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Mohamed",
                text: "Supporting our masjid has been incredibly rewarding. Seeing the community grow and thrive brings joy to my heart.",
                amount: "$100/month"
              },
              {
                name: "Fatima Al-Rashid",
                text: "The educational programs for our children are amazing. I'm proud to contribute to such a noble cause.",
                amount: "$250/month"
              },
              {
                name: "Omar Hassan",
                text: "The masjid is the heart of our community. Every donation helps keep our traditions alive for future generations.",
                amount: "$50/month"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-amber-600">{testimonial.amount}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12" style={{ fontFamily: 'var(--font-amiri)' }}>
              Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How is my donation used?",
                a: "Your donation supports mosque operations, educational programs, community services, and facility maintenance. We ensure transparency in fund usage."
              },
              {
                q: "Is my donation tax-deductible?",
                a: "Yes, Masjid Salman al Farsi is a registered 501(c)(3) organization. You will receive a tax receipt for your donation."
              },
              {
                q: "Can I donate to a specific program?",
                a: "Yes, you can specify which program you'd like to support, or contribute to our general fund for maximum impact."
              },
              {
                q: "How do I set up monthly donations?",
                a: "You can set up recurring monthly donations through our secure payment system. Monthly donations provide consistent support for our programs."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
