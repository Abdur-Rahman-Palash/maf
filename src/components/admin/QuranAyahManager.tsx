'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quranAyahApi } from '@/lib/apiService';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaSave, FaTimes, FaEye,
  FaBook, FaLanguage, FaPlay, FaPause, FaVolumeUp
} from 'react-icons/fa';

interface QuranAyah {
  id: string;
  surah_number: number;
  ayah_number: number;
  arabic_text: string;
  english_translation: string;
  bengali_translation: string;
  urdu_translation?: string;
  audio_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const QuranAyahManager: React.FC = () => {
  const [ayahs, setAyahs] = useState<QuranAyah[]>([]);
  const [filteredAyahs, setFilteredAyahs] = useState<QuranAyah[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [surahFilter, setSurahFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAyah, setSelectedAyah] = useState<QuranAyah | null>(null);
  const [formData, setFormData] = useState({
    surah_number: '',
    ayah_number: '',
    arabic_text: '',
    english_translation: '',
    bengali_translation: '',
    urdu_translation: '',
    audio_url: '',
    status: 'active'
  });

  // Load ayahs from API
  useEffect(() => {
    const loadAyahs = async () => {
      try {
        const response = await quranAyahApi.getAll();
        if (response.success && response.data) {
          setAyahs(response.data);
        }
      } catch (error) {
        console.error('Failed to load ayahs:', error);
        // Fallback to sample data
        const sampleAyahs: QuranAyah[] = [
          {
            id: '1',
            surah_number: 1,
            ayah_number: 1,
            arabic_text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
            english_translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
            bengali_translation: 'পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি',
            urdu_translation: 'اللہ کے نام سے جو بہت مہربان اور نہایت رحم فرمانے والا ہے',
            status: 'active',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          }
        ];
        setAyahs(sampleAyahs);
      }
    };

    loadAyahs();
  }, []);

  useEffect(() => {
    let filtered = ayahs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ayah => 
        ayah.arabic_text.includes(searchTerm) ||
        ayah.english_translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ayah.bengali_translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ayah.urdu_translation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ayah.surah_number.toString().includes(searchTerm) ||
        ayah.ayah_number.toString().includes(searchTerm)
      );
    }

    // Surah filter
    if (surahFilter) {
      filtered = filtered.filter(ayah => ayah.surah_number.toString() === surahFilter);
    }

    setFilteredAyahs(filtered);
  }, [ayahs, searchTerm, surahFilter]);

  const handleCreate = async () => {
    try {
      const newAyah = {
        surah_number: parseInt(formData.surah_number),
        ayah_number: parseInt(formData.ayah_number),
        arabic_text: formData.arabic_text,
        english_translation: formData.english_translation,
        bengali_translation: formData.bengali_translation,
        urdu_translation: formData.urdu_translation || undefined,
        audio_url: formData.audio_url || undefined,
        status: formData.status
      };

      const response = await quranAyahApi.create(newAyah);
      if (response.success && response.data) {
        setAyahs([...ayahs, response.data]);
        setIsCreateModalOpen(false);
        setFormData({
          surah_number: '',
          ayah_number: '',
          arabic_text: '',
          english_translation: '',
          bengali_translation: '',
          urdu_translation: '',
          audio_url: '',
          status: 'active'
        });
      }
    } catch (error) {
      console.error('Failed to create ayah:', error);
      alert('Failed to create ayah. Please try again.');
    }
  };

  const handleUpdate = () => {
    if (!selectedAyah) return;

    const updatedAyah: QuranAyah = {
      ...selectedAyah,
      surah_number: parseInt(formData.surah_number),
      ayah_number: parseInt(formData.ayah_number),
      arabic_text: formData.arabic_text,
      english_translation: formData.english_translation,
      bengali_translation: formData.bengali_translation,
      urdu_translation: formData.urdu_translation || undefined,
      audio_url: formData.audio_url || undefined,
      status: formData.status,
      updated_at: new Date().toISOString()
    };

    setAyahs(ayahs.map(ayah => ayah.id === selectedAyah.id ? updatedAyah : ayah));
    setIsEditModalOpen(false);
    setSelectedAyah(null);
    setFormData({
      surah_number: '',
      ayah_number: '',
      arabic_text: '',
      english_translation: '',
      bengali_translation: '',
      urdu_translation: '',
      audio_url: '',
      status: 'active'
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this Ayah?')) {
      setAyahs(ayahs.filter(ayah => ayah.id !== id));
    }
  };

  const openEditModal = (ayah: QuranAyah) => {
    setSelectedAyah(ayah);
    setFormData({
      surah_number: ayah.surah_number.toString(),
      ayah_number: ayah.ayah_number.toString(),
      arabic_text: ayah.arabic_text,
      english_translation: ayah.english_translation,
      bengali_translation: ayah.bengali_translation,
      urdu_translation: ayah.urdu_translation || '',
      audio_url: ayah.audio_url || '',
      status: ayah.status
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (ayah: QuranAyah) => {
    setSelectedAyah(ayah);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quran Ayah Management</h1>
        <p className="text-gray-600">Add, edit, and manage Quran verses for the reader section</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search ayahs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Surah No."
              value={surahFilter}
              onChange={(e) => setSurahFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add Ayah
            </button>
          </div>
        </div>
      </div>

      {/* Ayahs List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Surah:Ayah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arabic Text
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  English
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bengali
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAyahs.map((ayah) => (
                <tr key={ayah.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {ayah.surah_number}:{ayah.ayah_number}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-arabic" style={{ direction: 'rtl' }}>
                      {ayah.arabic_text.substring(0, 50)}...
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {ayah.english_translation.substring(0, 50)}...
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {ayah.bengali_translation.substring(0, 50)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ayah.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ayah.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openViewModal(ayah)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openEditModal(ayah)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(ayah.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Add New Ayah</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Surah Number</label>
                  <input
                    type="number"
                    value={formData.surah_number}
                    onChange={(e) => setFormData({...formData, surah_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ayah Number</label>
                  <input
                    type="number"
                    value={formData.ayah_number}
                    onChange={(e) => setFormData({...formData, ayah_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arabic Text</label>
                  <textarea
                    value={formData.arabic_text}
                    onChange={(e) => setFormData({...formData, arabic_text: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-arabic"
                    rows={3}
                    style={{ direction: 'rtl' }}
                    placeholder="بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">English Translation</label>
                  <textarea
                    value={formData.english_translation}
                    onChange={(e) => setFormData({...formData, english_translation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="In the name of Allah, the Entirely Merciful, the Especially Merciful."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bengali Translation</label>
                  <textarea
                    value={formData.bengali_translation}
                    onChange={(e) => setFormData({...formData, bengali_translation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urdu Translation (Optional)</label>
                  <textarea
                    value={formData.urdu_translation}
                    onChange={(e) => setFormData({...formData, urdu_translation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="اللہ کے نام سے جو بہت مہربان اور نہایت رحم فرمانے والا ہے"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.audio_url}
                    onChange={(e) => setFormData({...formData, audio_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/audio.mp3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <FaSave className="inline mr-2" />
                  Save Ayah
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Edit Ayah</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Surah Number</label>
                  <input
                    type="number"
                    value={formData.surah_number}
                    onChange={(e) => setFormData({...formData, surah_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ayah Number</label>
                  <input
                    type="number"
                    value={formData.ayah_number}
                    onChange={(e) => setFormData({...formData, ayah_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arabic Text</label>
                  <textarea
                    value={formData.arabic_text}
                    onChange={(e) => setFormData({...formData, arabic_text: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-arabic"
                    rows={3}
                    style={{ direction: 'rtl' }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">English Translation</label>
                  <textarea
                    value={formData.english_translation}
                    onChange={(e) => setFormData({...formData, english_translation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bengali Translation</label>
                  <textarea
                    value={formData.bengali_translation}
                    onChange={(e) => setFormData({...formData, bengali_translation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urdu Translation (Optional)</label>
                  <textarea
                    value={formData.urdu_translation}
                    onChange={(e) => setFormData({...formData, urdu_translation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.audio_url}
                    onChange={(e) => setFormData({...formData, audio_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FaSave className="inline mr-2" />
                  Update Ayah
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedAyah && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Ayah Details</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Reference</h3>
                  <p className="text-gray-700">Surah {selectedAyah.surah_number}, Ayah {selectedAyah.ayah_number}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <FaLanguage className="text-blue-600" />
                    Arabic Text
                  </h3>
                  <p className="text-gray-900 text-xl font-arabic leading-relaxed" style={{ direction: 'rtl' }}>
                    {selectedAyah.arabic_text}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">English Translation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedAyah.english_translation}
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Bengali Translation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedAyah.bengali_translation}
                  </p>
                </div>

                {selectedAyah.urdu_translation && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Urdu Translation</h3>
                    <p className="text-gray-700 leading-relaxed" style={{ direction: 'rtl' }}>
                      {selectedAyah.urdu_translation}
                    </p>
                  </div>
                )}

                {selectedAyah.audio_url && (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <FaVolumeUp className="text-indigo-600" />
                      Audio
                    </h3>
                    <audio controls className="w-full">
                      <source src={selectedAyah.audio_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Status</h3>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedAyah.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedAyah.status}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuranAyahManager;
