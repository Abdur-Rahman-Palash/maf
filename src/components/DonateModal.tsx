'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCreditCard, FiSmartphone, FiDollarSign, FiCalendar, FiUsers, FiHome, FiBook, FiCoffee } from 'react-icons/fi';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('card');
  const [isMonthly, setIsMonthly] = useState<boolean>(false);

  const predefinedAmounts = [
    { amount: '25', label: '$25', impact: 'Provides meals for 5 families' },
    { amount: '50', label: '$50', impact: 'Supports educational programs' },
    { amount: '100', label: '$100', impact: 'Funds community events' },
    { amount: '250', label: '$250', impact: 'Maintains mosque facilities' },
    { amount: '500', label: '$500', impact: 'Supports youth programs' },
    { amount: '1000', label: '$1000', impact: 'Major project contribution' },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: FiCreditCard, description: 'Visa, Mastercard, American Express' },
    { id: 'paypal', name: 'PayPal', icon: FiSmartphone, description: 'Fast and secure payment' },
    { id: 'bank', name: 'Bank Transfer', icon: FiDollarSign, description: 'Direct bank deposit' },
  ];

  const donationProjects = [
    { id: 'general', name: 'General Fund', icon: FiHome, description: 'Support mosque operations and maintenance' },
    { id: 'education', name: 'Education Programs', icon: FiBook, description: 'Islamic classes and youth education' },
    { id: 'community', name: 'Community Services', icon: FiUsers, description: 'Food bank and social services' },
    { id: 'iftar', name: 'Iftar Programs', icon: FiCoffee, description: 'Daily meals during Ramadan' },
  ];

  const handleDonate = () => {
    const amount = selectedAmount || customAmount;
    if (!amount) {
      alert('Please select or enter a donation amount');
      return;
    }
    
    // Here you would integrate with actual payment processor
    console.log('Processing donation:', {
      amount,
      paymentMethod: selectedPayment,
      isMonthly,
      project: 'general'
    });
    
    alert(`Thank you for your $${amount} ${isMonthly ? 'monthly' : 'one-time'} donation!`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                      Support Masjid Salman al Farsi
                    </h2>
                    <p className="text-amber-100">
                      Your generous donation helps us serve the community and spread the message of peace
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Donation Form */}
                  <div>
                    {/* Donation Type */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">Donation Type</h3>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsMonthly(false)}
                          className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                            !isMonthly 
                              ? 'border-amber-500 bg-amber-50 text-amber-700' 
                              : 'border-slate-300 text-slate-600 hover:border-slate-400'
                          }`}
                        >
                          One-time
                        </button>
                        <button
                          onClick={() => setIsMonthly(true)}
                          className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                            isMonthly 
                              ? 'border-amber-500 bg-amber-50 text-amber-700' 
                              : 'border-slate-300 text-slate-600 hover:border-slate-400'
                          }`}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>

                    {/* Amount Selection */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        Select Amount {isMonthly && <span className="text-amber-600">(per month)</span>}
                      </h3>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {predefinedAmounts.map((item) => (
                          <button
                            key={item.amount}
                            onClick={() => {
                              setSelectedAmount(item.amount);
                              setCustomAmount('');
                            }}
                            className={`p-3 rounded-lg border-2 transition-all text-center ${
                              selectedAmount === item.amount
                                ? 'border-amber-500 bg-amber-50 text-amber-700'
                                : 'border-slate-300 text-slate-600 hover:border-slate-400'
                            }`}
                          >
                            <div className="font-semibold">{item.label}</div>
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
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount('');
                            }}
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
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setSelectedPayment(method.id)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              selectedPayment === method.id
                                ? 'border-amber-500 bg-amber-50'
                                : 'border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <method.icon className="w-5 h-5 text-amber-600" />
                              <div>
                                <div className="font-medium text-slate-800">{method.name}</div>
                                <div className="text-sm text-slate-600">{method.description}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Projects & Impact */}
                  <div>
                    {/* Donation Projects */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">Support Specific Projects</h3>
                      <div className="space-y-3">
                        {donationProjects.map((project) => (
                          <div key={project.id} className="p-4 border border-slate-200 rounded-lg hover:border-amber-300 transition-colors">
                            <div className="flex items-start gap-3">
                              <project.icon className="w-5 h-5 text-amber-600 mt-1" />
                              <div>
                                <div className="font-medium text-slate-800">{project.name}</div>
                                <div className="text-sm text-slate-600">{project.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact Information */}
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h3 className="font-semibold text-amber-800 mb-2">Your Impact</h3>
                      <ul className="space-y-2 text-sm text-amber-700">
                        <li>• Support daily prayers and programs</li>
                        <li>• Provide Islamic education to youth</li>
                        <li>• Assist families in need</li>
                        <li>• Maintain our beautiful mosque</li>
                        <li>• Host community events and gatherings</li>
                      </ul>
                    </div>

                    {/* Tax Deduction Info */}
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">
                        <strong>Tax Deductible:</strong> Masjid Salman al Farsi is a registered 501(c)(3) non-profit organization. 
                        Your donation is tax-deductible to the extent allowed by law.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDonate}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
                  >
                    Proceed to Donate {selectedAmount || customAmount && `$${selectedAmount || customAmount}`}
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
