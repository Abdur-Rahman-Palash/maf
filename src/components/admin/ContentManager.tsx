'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contentManager, Content, initializeSampleData } from '@/lib/crudOperations';
import FileUpload from './FileUpload';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaBook, FaNewspaper,
  FaMicrophone, FaFileAlt, FaSave, FaTimes, FaEye, FaCalendarAlt,
  FaTag, FaUser, FaImage, FaVideo, FaPaperclip
} from 'react-icons/fa';

const ContentManager: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState<Partial<Content>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    initializeSampleData();
    loadContents();
  }, []);

  useEffect(() => {
    filterContents();
  }, [contents, searchTerm, statusFilter, typeFilter]);

  const loadContents = () => {
    const allContents = contentManager.readAll();
    setContents(allContents);
  };

  const filterContents = () => {
    let filtered = contents;

    if (searchTerm) {
      filtered = contentManager.search(searchTerm, ['title', 'content', 'author', 'tags']);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(content => content.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(content => content.type === typeFilter);
    }

    setFilteredContents(filtered);
  };

  const handleCreate = () => {
    const newContent = contentManager.create({
      title: formData.title || '',
      type: formData.type || 'blog',
      content: formData.content || '',
      author: formData.author || 'Admin',
      status: formData.status || 'draft',
      publishDate: formData.publishDate,
      tags: formData.tags || []
    });

    setContents([...contents, newContent]);
    setIsCreateModalOpen(false);
    setFormData({});
    setUploadedFiles([]);
  };

  const handleUpdate = () => {
    if (!selectedContent) return;

    const updatedContent = contentManager.update(selectedContent.id, formData);
    if (updatedContent) {
      setContents(contents.map(c => c.id === selectedContent.id ? updatedContent : c));
      setIsEditModalOpen(false);
      setSelectedContent(null);
      setFormData({});
      setUploadedFiles([]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      contentManager.delete(id);
      setContents(contents.filter(c => c.id !== id));
    }
  };

  const openEditModal = (content: Content) => {
    setSelectedContent(content);
    setFormData(content);
    setIsEditModalOpen(true);
  };

  const openViewModal = (content: Content) => {
    setSelectedContent(content);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sermon': return 'bg-purple-100 text-purple-800';
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'blog': return 'bg-green-100 text-green-800';
      case 'page': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sermon': return <FaMicrophone className="text-purple-500" />;
      case 'announcement': return <FaNewspaper className="text-blue-500" />;
      case 'blog': return <FaBook className="text-green-500" />;
      case 'page': return <FaFileAlt className="text-orange-500" />;
      default: return <FaFileAlt className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <FaPlus /> Add Content
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="sermon">Sermon</option>
          <option value="announcement">Announcement</option>
          <option value="blog">Blog</option>
          <option value="page">Page</option>
        </select>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredContents.map((content) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(content.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{content.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(content.status)}`}>
                          {content.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(content.type)}`}>
                          {content.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{content.content}</p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-blue-500" />
                    <span>{content.author}</span>
                  </div>
                  {content.publishDate && (
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-500" />
                      <span>{content.publishDate}</span>
                    </div>
                  )}
                  {content.tags && content.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <FaTag className="text-purple-500" />
                      <div className="flex flex-wrap gap-1">
                        {content.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {content.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{content.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => openViewModal(content)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => openEditModal(content)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(content.id)}
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
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">Create New Content</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Content Title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <select
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Content['type'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="sermon">Sermon</option>
                    <option value="announcement">Announcement</option>
                    <option value="blog">Blog</option>
                    <option value="page">Page</option>
                  </select>
                </div>

                <textarea
                  placeholder="Content"
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Author"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Publish Date"
                    value={formData.publishDate || ''}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Content['status'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={formData.tags?.join(', ') || ''}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* File Upload Section */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaPaperclip /> Attachments
                  </h4>
                  <FileUpload
                    onFilesChange={setUploadedFiles}
                    maxFiles={3}
                    maxSize={5}
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    multiple={true}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <FaSave className="inline mr-2" /> Create
                </button>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setFormData({});
                    setUploadedFiles([]);
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
        {isEditModalOpen && selectedContent && (
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
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">Edit Content</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Content Title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <select
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Content['type'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="sermon">Sermon</option>
                    <option value="announcement">Announcement</option>
                    <option value="blog">Blog</option>
                    <option value="page">Page</option>
                  </select>
                </div>

                <textarea
                  placeholder="Content"
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Author"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Publish Date"
                    value={formData.publishDate || ''}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Content['status'] })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={formData.tags?.join(', ') || ''}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* File Upload Section */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaPaperclip /> Attachments
                  </h4>
                  <FileUpload
                    onFilesChange={setUploadedFiles}
                    maxFiles={3}
                    maxSize={5}
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    multiple={true}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <FaSave className="inline mr-2" /> Update
                </button>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedContent(null);
                    setFormData({});
                    setUploadedFiles([]);
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
        {isViewModalOpen && selectedContent && (
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
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  {getTypeIcon(selectedContent.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedContent.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedContent.status)}`}>
                      {selectedContent.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(selectedContent.type)}`}>
                      {selectedContent.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Content</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{selectedContent.content}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Author</h4>
                    <p className="text-gray-600">{selectedContent.author}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Publish Date</h4>
                    <p className="text-gray-600">{selectedContent.publishDate || 'Not set'}</p>
                  </div>
                </div>

                {selectedContent.tags && selectedContent.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedContent.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Content ID</h4>
                  <p className="text-gray-600 text-sm">#{selectedContent.id}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setSelectedContent(null);
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

export default ContentManager;
