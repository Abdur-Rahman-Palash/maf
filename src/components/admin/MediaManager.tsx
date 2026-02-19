'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaSave, FaTimes, FaEye,
  FaImage, FaVideo, FaMusic, FaFile, FaPlay, FaPause, FaVolumeUp,
  FaCalendar, FaClock, FaTag, FaDownload, FaStar
} from 'react-icons/fa';

interface Media {
  id: string;
  title: string;
  description?: string;
  type: string;
  file_url: string;
  thumbnail_url?: string;
  category: string;
  tags: string[];
  file_size?: number;
  duration?: string;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const MediaManager: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<Media[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'image',
    file_url: '',
    thumbnail_url: '',
    category: 'gallery',
    tags: '',
    status: 'active',
    featured: false
  });

  // Sample data for demonstration
  useEffect(() => {
    const sampleMedia: Media[] = [
      {
        id: '1',
        title: 'Friday Prayer - Jumuah',
        description: 'Weekly Friday congregation prayer with sermon',
        type: 'video',
        file_url: '/videos/friday-prayer.mp4',
        thumbnail_url: '/thumbnails/friday-prayer.jpg',
        category: 'sermon',
        tags: ['friday', 'prayer', 'jumuah', 'sermon'],
        file_size: 52428800,
        duration: '45:30',
        status: 'active',
        featured: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        title: 'Ramadan Iftar',
        description: 'Community iftar during Ramadan 2024',
        type: 'image',
        file_url: '/images/iftar-2024.jpg',
        thumbnail_url: '/thumbnails/iftar-2024.jpg',
        category: 'event',
        tags: ['ramadan', 'iftar', 'community', 'event'],
        file_size: 2097152,
        status: 'active',
        featured: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        title: 'Eid Mubarak Celebration',
        description: 'Eid prayer and celebration highlights',
        type: 'video',
        file_url: '/videos/eid-celebration.mp4',
        thumbnail_url: '/thumbnails/eid-celebration.jpg',
        category: 'announcement',
        tags: ['eid', 'celebration', 'prayer', 'festival'],
        file_size: 78643200,
        duration: '12:15',
        status: 'active',
        featured: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '4',
        title: 'Quran Recitation - Surah Al-Fatiha',
        description: 'Beautiful recitation of Surah Al-Fatiha',
        type: 'audio',
        file_url: '/audio/surah-fatiha.mp3',
        thumbnail_url: '/thumbnails/quran-recitation.jpg',
        category: 'sermon',
        tags: ['quran', 'recitation', 'surah', 'fatiha'],
        file_size: 3145728,
        duration: '3:45',
        status: 'active',
        featured: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];
    setMediaItems(sampleMedia);
    setFilteredMedia(sampleMedia);
  }, []);

  useEffect(() => {
    let filtered = mediaItems;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(media => 
        media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        media.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        media.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        media.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(media => media.type === typeFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(media => media.category === categoryFilter);
    }

    setFilteredMedia(filtered);
  }, [mediaItems, searchTerm, typeFilter, categoryFilter]);

  const handleCreate = () => {
    const newMedia: Media = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      file_url: formData.file_url,
      thumbnail_url: formData.thumbnail_url,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: formData.status,
      featured: formData.featured,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setMediaItems([...mediaItems, newMedia]);
    setIsCreateModalOpen(false);
    setFormData({
      title: '',
      description: '',
      type: 'image',
      file_url: '',
      thumbnail_url: '',
      category: 'gallery',
      tags: '',
      status: 'active',
      featured: false
    });
  };

  const handleUpdate = () => {
    if (!selectedMedia) return;

    const updatedMedia: Media = {
      ...selectedMedia,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      file_url: formData.file_url,
      thumbnail_url: formData.thumbnail_url,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: formData.status,
      featured: formData.featured,
      updated_at: new Date().toISOString()
    };

    setMediaItems(mediaItems.map(media => media.id === selectedMedia.id ? updatedMedia : media));
    setIsEditModalOpen(false);
    setSelectedMedia(null);
    setFormData({
      title: '',
      description: '',
      type: 'image',
      file_url: '',
      thumbnail_url: '',
      category: 'gallery',
      tags: '',
      status: 'active',
      featured: false
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this media file?')) {
      setMediaItems(mediaItems.filter(media => media.id !== id));
    }
  };

  const openEditModal = (media: Media) => {
    setSelectedMedia(media);
    setFormData({
      title: media.title,
      description: media.description || '',
      type: media.type,
      file_url: media.file_url,
      thumbnail_url: media.thumbnail_url || '',
      category: media.category,
      tags: media.tags.join(', '),
      status: media.status,
      featured: media.featured
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (media: Media) => {
    setSelectedMedia(media);
    setIsViewModalOpen(true);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
    return size + ' ' + sizes[i];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <FaImage className="text-green-600" />;
      case 'video': return <FaVideo className="text-blue-600" />;
      case 'audio': return <FaMusic className="text-purple-600" />;
      case 'document': return <FaFile className="text-orange-600" />;
      default: return <FaFile className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      case 'document': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Media Management</h1>
        <p className="text-gray-600">Manage images, videos, audio files, and documents</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="document">Documents</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="gallery">Gallery</option>
              <option value="sermon">Sermon</option>
              <option value="event">Event</option>
              <option value="announcement">Announcement</option>
            </select>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add Media
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((media) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Media Preview */}
              <div className="relative group cursor-pointer" onClick={() => openViewModal(media)}>
                {media.type === 'image' && (
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={media.thumbnail_url || media.file_url}
                      alt={media.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {media.type === 'video' && (
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={media.thumbnail_url || '/video-placeholder.jpg'}
                      alt={media.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <FaPlay className="text-white text-2xl" />
                    </div>
                  </div>
                )}
                {media.type === 'audio' && (
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <FaMusic className="text-purple-600 text-4xl" />
                  </div>
                )}
                {media.type === 'document' && (
                  <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <FaFile className="text-orange-600 text-4xl" />
                  </div>
                )}

                {/* Featured Badge */}
                {media.featured && (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
                      <FaStar className="mr-1" /> Featured
                    </span>
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(media.type)}`}>
                    {media.type}
                  </span>
                </div>
              </div>

              {/* Media Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 truncate">{media.title}</h3>
                
                {media.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{media.description}</p>
                )}

                {/* Tags */}
                {media.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {media.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                        <FaTag className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Metadata */}
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      {getTypeIcon(media.type)}
                      {media.type}
                    </span>
                    <span>•</span>
                    <span>{media.category}</span>
                  </div>
                  
                  {(media.file_size || media.duration) && (
                    <div className="flex items-center gap-4">
                      {media.file_size && <span>{formatFileSize(media.file_size)}</span>}
                      {media.duration && <span>{media.duration}</span>}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <FaCalendar />
                    <span>{new Date(media.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openViewModal(media)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    <FaEye className="mr-1" /> View
                  </button>
                  <button
                    onClick={() => openEditModal(media)}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(media.id)}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Add New Media</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Media Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="document">Document</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Media description..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
                    <input
                      type="url"
                      value={formData.file_url}
                      onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/media.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                    <input
                      type="url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="gallery">Gallery</option>
                      <option value="sermon">Sermon</option>
                      <option value="event">Event</option>
                      <option value="announcement">Announcement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Featured Media
                    </label>
                  </div>
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
                  Save Media
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
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Edit Media</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="document">Document</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
                    <input
                      type="url"
                      value={formData.file_url}
                      onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                    <input
                      type="url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="gallery">Gallery</option>
                      <option value="sermon">Sermon</option>
                      <option value="event">Event</option>
                      <option value="announcement">Announcement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Featured Media
                    </label>
                  </div>
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
                  Update Media
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedMedia && (
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
                <h2 className="text-2xl font-bold">Media Details</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Media Preview */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedMedia.type === 'image' && (
                      <img
                        src={selectedMedia.file_url}
                        alt={selectedMedia.title}
                        className="w-full rounded-lg shadow-md"
                      />
                    )}
                    {selectedMedia.type === 'video' && (
                      <div className="relative">
                        <img
                          src={selectedMedia.thumbnail_url}
                          alt={selectedMedia.title}
                          className="w-full rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                          <FaPlay className="text-white text-4xl" />
                        </div>
                      </div>
                    )}
                    {selectedMedia.type === 'audio' && (
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-8 flex items-center justify-center">
                        <FaMusic className="text-purple-600 text-6xl" />
                      </div>
                    )}
                    {selectedMedia.type === 'document' && (
                      <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-8 flex items-center justify-center">
                        <FaFile className="text-orange-600 text-6xl" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Media Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Title:</span>
                        <span className="text-gray-900">{selectedMedia.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Type:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getTypeColor(selectedMedia.type)}`}>
                          {selectedMedia.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Category:</span>
                        <span className="text-gray-900">{selectedMedia.category}</span>
                      </div>
                    </div>
                  </div>

                  {selectedMedia.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {selectedMedia.description}
                      </p>
                    </div>
                  )}

                  {selectedMedia.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedia.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            <FaTag className="mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold mb-2">Metadata</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {selectedMedia.file_size && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">File Size:</span>
                          <span className="text-gray-900">{formatFileSize(selectedMedia.file_size)}</span>
                        </div>
                      )}
                      {selectedMedia.duration && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Duration:</span>
                          <span className="text-gray-900">{selectedMedia.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">Created:</span>
                        <span className="text-gray-900">{new Date(selectedMedia.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          selectedMedia.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedMedia.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedMedia.featured && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-600" />
                        <span className="text-yellow-800 font-medium">Featured Media</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <a
                      href={selectedMedia.file_url}
                      download
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                    >
                      <FaDownload className="mr-2" />
                      Download
                    </a>
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaManager;
