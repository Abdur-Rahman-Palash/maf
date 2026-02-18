'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { donationManager, Donation, initializeSampleData } from '@/lib/crudOperations';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaDonate, FaEnvelope,
  FaMoneyBillWave, FaCalendarAlt, FaSave, FaTimes, FaEye, FaCreditCard,
  FaHandHoldingUsd, FaChartLine
} from 'react-icons/fa';

const DonationManager: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [formData, setFormData] = useState<Partial<Donation>>({});

  useEffect(() => {
    initializeSampleData();
    loadDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, searchTerm, statusFilter, typeFilter]);

  const loadDonations = () => {
    const allDonations = donationManager.readAll();
    setDonations(allDonations);
  };

  const filterDonations = () => {
    let filtered = donations;

    if (searchTerm) {
      filtered = donationManager.search(searchTerm, ['donorName', 'email', 'purpose', 'paymentMethod']);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(donation => donation.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(donation => donation.type === typeFilter);
    }

    setFilteredDonations(filtered);
  };

  const handleCreate = () => {
    const newDonation = donationManager.create({
      donorName: formData.donorName || '',
      email: formData.email || '',
      amount: formData.amount || 0,
      type: formData.type || 'one-time',
      purpose: formData.purpose || '',
      status: formData.status || 'pending',
      paymentMethod: formData.paymentMethod || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      recurring: formData.recurring || false
    });

    setDonations([...donations, newDonation]);
    setIsCreateModalOpen(false);
    setFormData({});
  };

  const handleUpdate = () => {
    if (!selectedDonation) return;

    const updatedDonation = donationManager.update(selectedDonation.id, formData);
    if (updatedDonation) {
      setDonations(donations.map(d => d.id === selectedDonation.id ? updatedDonation : d));
      setIsEditModalOpen(false);
      setSelectedDonation(null);
      setFormData({});
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this donation record?')) {
      donationManager.delete(id);
      setDonations(donations.filter(d => d.id !== id));
    }
  };

  const openEditModal = (donation: Donation) => {
    setSelectedDonation(donation);
    setFormData(donation);
    setIsEditModalOpen(true);
  };

  const openViewModal = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'zakat': return 'bg-purple-100 text-purple-800';
      case 'sadaqa': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-green-100 text-green-800';
      case 'one-time': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalAmount = () => {
    return filteredDonations
      .filter(d => d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
  };

  const getMonthlyTotal = () => {
    const now = new Date();
    return filteredDonations
      .filter(d => {
        const donationDate = new Date(d.date);
        return d.status === 'completed' && 
               donationDate.getMonth() === now.getMonth() && 
               donationDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, d) => sum + d.amount, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Donation Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FaPlus /> Add Donation
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">${getTotalAmount().toLocaleString()}</p>
            </div>
            <FaMoneyBillWave className="text-3xl text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">${getMonthlyTotal().toLocaleString()}</p>
            </div>
            <FaChartLine className="text-3xl text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{filteredDonations.length}</p>
            </div>
            <FaDonate className="text-3xl text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="one-time">One-time</option>
          <option value="monthly">Monthly</option>
          <option value="zakat">Zakat</option>
          <option value="sadaqa">Sadaqa</option>
        </select>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredDonations.map((donation) => (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{donation.donorName}</div>
                        <div className="text-sm text-gray-500">{donation.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">${donation.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{donation.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(donation.type)}`}>
                        {donation.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(donation.status)}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openViewModal(donation)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openEditModal(donation)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(donation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">Add New Donation</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Donor Name"
                  value={formData.donorName || ''}
                  onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Donation['type'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="one-time">One-time</option>
                    <option value="monthly">Monthly</option>
                    <option value="zakat">Zakat</option>
                    <option value="sadaqa">Sadaqa</option>
                  </select>
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Donation['status'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Purpose"
                  value={formData.purpose || ''}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Payment Method"
                  value={formData.paymentMethod || ''}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={formData.recurring || false}
                    onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="recurring" className="text-sm text-gray-700">
                    Recurring Donation
                  </label>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaSave className="inline mr-2" /> Create
                </button>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setFormData({});
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FaTimes className="inline mr-2" /> Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedDonation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">Edit Donation</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Donor Name"
                  value={formData.donorName || ''}
                  onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Donation['type'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="one-time">One-time</option>
                    <option value="monthly">Monthly</option>
                    <option value="zakat">Zakat</option>
                    <option value="sadaqa">Sadaqa</option>
                  </select>
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Donation['status'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Purpose"
                  value={formData.purpose || ''}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Payment Method"
                  value={formData.paymentMethod || ''}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaSave className="inline mr-2" /> Update
                </button>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedDonation(null);
                    setFormData({});
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FaTimes className="inline mr-2" /> Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedDonation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaDonate className="text-purple-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedDonation.donorName}</h3>
                  <p className="text-gray-600">{selectedDonation.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Amount</h4>
                    <p className="text-2xl font-bold text-purple-600">${selectedDonation.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Status</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedDonation.status)}`}>
                      {selectedDonation.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Type</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(selectedDonation.type)}`}>
                      {selectedDonation.type}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Date</h4>
                    <p className="text-gray-600">{selectedDonation.date}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Purpose</h4>
                  <p className="text-gray-600">{selectedDonation.purpose}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Payment Method</h4>
                  <p className="text-gray-600">{selectedDonation.paymentMethod}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Recurring</h4>
                  <p className="text-gray-600">{selectedDonation.recurring ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Donation ID</h4>
                  <p className="text-gray-600 text-sm">#{selectedDonation.id}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setSelectedDonation(null);
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationManager;
