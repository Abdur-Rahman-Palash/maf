'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDonations } from '@/hooks/useApiData';
import { Donation } from '@/lib/crudOperations';
import { FaDonate, FaChartLine, FaUsers, FaBullseye } from 'react-icons/fa';

const DynamicDonations: React.FC = () => {
  const { data: donations, loading, error } = useDonations();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load donation data. Please try again later.</p>
      </div>
    );
  }

  // Calculate statistics
  const completedDonations = (donations as Donation[]).filter(d => d.status === 'completed');
  const totalAmount = completedDonations.reduce((sum, d) => sum + d.amount, 0);
  const donorCount = new Set(completedDonations.map(d => d.email)).size;
  
  // Monthly donations
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyDonations = completedDonations.filter(d => {
    const donationDate = new Date(d.date);
    return donationDate.getMonth() === currentMonth && donationDate.getFullYear() === currentYear;
  });
  const monthlyTotal = monthlyDonations.reduce((sum, d) => sum + d.amount, 0);

  // Recent donations
  const recentDonations = completedDonations
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Donation Impact</h2>
          <p className="text-lg text-gray-600">See how your contributions are making a difference</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <FaDonate className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</h3>
            <p className="text-gray-600">Total Raised</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <FaChartLine className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">${monthlyTotal.toLocaleString()}</h3>
            <p className="text-gray-600">This Month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">{donorCount}</h3>
            <p className="text-gray-600">Donors</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <FaBullseye className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">{completedDonations.length}</h3>
            <p className="text-gray-600">Donations</p>
          </motion.div>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Donations</h3>
          
          {recentDonations.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No donations recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {recentDonations.map((donation: Donation, index) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <FaDonate className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{donation.donorName}</p>
                      <p className="text-sm text-gray-600">{donation.purpose}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${donation.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{new Date(donation.date).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Make a Donation
          </button>
        </div>
      </div>
    </section>
  );
};

export default DynamicDonations;
