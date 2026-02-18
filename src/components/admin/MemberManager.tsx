'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memberManager, Member, initializeSampleData } from '@/lib/crudOperations';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaUser, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaSave, FaTimes, FaEye,
  FaUserCheck, FaUserTimes, FaGraduationCap
} from 'react-icons/fa';

const MemberManager: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<Partial<Member>>({});

  useEffect(() => {
    initializeSampleData();
    loadMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, statusFilter, roleFilter]);

  const loadMembers = () => {
    const allMembers = memberManager.readAll();
    setMembers(allMembers);
  };

  const filterMembers = () => {
    let filtered = members;

    if (searchTerm) {
      filtered = memberManager.search(searchTerm, ['name', 'email', 'phone', 'address']);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter);
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    setFilteredMembers(filtered);
  };

  const handleCreate = () => {
    const newMember = memberManager.create({
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      address: formData.address || '',
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
      status: formData.status || 'pending',
      role: formData.role || 'member',
      skills: formData.skills || [],
      notes: formData.notes || ''
    });

    setMembers([...members, newMember]);
    setIsCreateModalOpen(false);
    setFormData({});
  };

  const handleUpdate = () => {
    if (!selectedMember) return;

    const updatedMember = memberManager.update(selectedMember.id, formData);
    if (updatedMember) {
      setMembers(members.map(m => m.id === selectedMember.id ? updatedMember : m));
      setIsEditModalOpen(false);
      setSelectedMember(null);
      setFormData({});
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      memberManager.delete(id);
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const openEditModal = (member: Member) => {
    setSelectedMember(member);
    setFormData(member);
    setIsEditModalOpen(true);
  };

  const openViewModal = (member: Member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'volunteer': return 'bg-blue-100 text-blue-800';
      case 'member': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Member Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FaPlus /> Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Roles</option>
          <option value="member">Member</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(member.role)}`}>
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-500" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-green-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="truncate">{member.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-purple-500" />
                    <span>Joined {member.joinDate}</span>
                  </div>
                </div>

                {member.skills && member.skills.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => openViewModal(member)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => openEditModal(member)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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
              <h3 className="text-xl font-bold mb-4">Add New Member</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Member['status'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                  <select
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as Member['role'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Role</option>
                    <option value="member">Member</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <input
                  type="date"
                  placeholder="Join Date"
                  value={formData.joinDate || ''}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={formData.skills?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Notes (optional)"
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
        {isEditModalOpen && selectedMember && (
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
              <h3 className="text-xl font-bold mb-4">Edit Member</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Member['status'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                  <select
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as Member['role'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="member">Member</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={formData.skills?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Notes (optional)"
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaSave className="inline mr-2" /> Update
                </button>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedMember(null);
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
        {isViewModalOpen && selectedMember && (
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
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedMember.status)}`}>
                      {selectedMember.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(selectedMember.role)}`}>
                      {selectedMember.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Email</h4>
                    <p className="text-gray-600 text-sm">{selectedMember.email}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Phone</h4>
                    <p className="text-gray-600 text-sm">{selectedMember.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Address</h4>
                  <p className="text-gray-600 text-sm">{selectedMember.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Join Date</h4>
                    <p className="text-gray-600 text-sm">{selectedMember.joinDate}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Member ID</h4>
                    <p className="text-gray-600 text-sm">#{selectedMember.id}</p>
                  </div>
                </div>
                {selectedMember.skills && selectedMember.skills.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedMember.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Notes</h4>
                    <p className="text-gray-600 text-sm">{selectedMember.notes}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setSelectedMember(null);
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

export default MemberManager;
