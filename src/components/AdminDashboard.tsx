'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventSync, EVENT_TYPES } from '@/lib/eventSync';
import SermonStorage from '@/lib/sermonStorage';
import EventStorage from '@/lib/eventStorage';
import MediaStorage, { Media } from '@/lib/mediaStorage';
import QuranStorage, { QuranRecitation, QuranVerse } from '@/lib/quranStorage';
import AnnouncementStorage, { AnnouncementItem } from '@/lib/announcementStorage';
import { 
  FaUsers, FaCalendarAlt, FaChartBar, FaCog, FaBell, FaMosque, 
  FaBook, FaComments, FaClock, FaChartLine, FaEye,
  FaEdit, FaTrash, FaPlus, FaDownload, FaUpload, FaSignOutAlt,
  FaUserCheck, FaUserTimes, FaEnvelope, FaFileAlt, FaImage,
  FaVideo, FaMicrophone, FaNewspaper, FaHandsHelping, FaPray,
  FaGraduationCap, FaCheck, FaMapMarkerAlt, FaUser, FaPlay, FaStar, FaTimes
} from 'react-icons/fa';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  permissions: string[];
}

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  totalSermons: number;
  recentSermons: number;
  communityPosts: number;
  activeDiscussions: number;
  volunteers: number;
  pendingRequests: number;
}

interface Activity {
  id: string;
  type: 'user' | 'event' | 'sermon' | 'post';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'warning';
}

const AdminDashboard: React.FC<{ user: AdminUser | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      role: 'Member',
      status: 'Active',
      joined: 'Jan 15, 2024',
      phone: '+1 234-567-8901',
      address: '123 Main St, Atlanta, GA'
    },
    {
      id: 2,
      name: 'Fatima Rahman',
      email: 'fatima@example.com',
      role: 'Volunteer',
      status: 'Active',
      joined: 'Feb 20, 2024',
      phone: '+1 234-567-8902',
      address: '456 Oak Ave, Tucker, GA'
    },
    {
      id: 3,
      name: 'Mohammed Khan',
      email: 'mohammed@example.com',
      role: 'Donor',
      status: 'Active',
      joined: 'Mar 10, 2024',
      phone: '+1 234-567-8903',
      address: '789 Pine Rd, Doraville, GA'
    }
  ]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventFilter, setEventFilter] = useState('all');
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showEditContentModal, setShowEditContentModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [contentFilter, setContentFilter] = useState('all');
  const [showAddSermonModal, setShowAddSermonModal] = useState(false);
  const [showEditSermonModal, setShowEditSermonModal] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<any>(null);
  const [sermonFilter, setSermonFilter] = useState('all');
  
  // Announcement States
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [showAddAnnouncementModal, setShowAddAnnouncementModal] = useState(false);
  const [showEditAnnouncementModal, setShowEditAnnouncementModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);
  const [announcementFilter, setAnnouncementFilter] = useState('all');

  useEffect(() => {
    setAnnouncements(AnnouncementStorage.getAnnouncements());
  }, []);
  
  // Quran States
  const [showAddQuranRecitationModal, setShowAddQuranRecitationModal] = useState(false);
  const [showEditQuranRecitationModal, setShowEditQuranRecitationModal] = useState(false);
  const [selectedQuranRecitation, setSelectedQuranRecitation] = useState<QuranRecitation | null>(null);
  const [quranRecitationFilter, setQuranRecitationFilter] = useState('all');
  const [showAddQuranVerseModal, setShowAddQuranVerseModal] = useState(false);
  const [showEditQuranVerseModal, setShowEditQuranVerseModal] = useState(false);
  const [selectedQuranVerse, setSelectedQuranVerse] = useState<Media | null>(null);
  const [quranVerseFilter, setQuranVerseFilter] = useState('all');
  
  const [sermons, setSermons] = useState(SermonStorage.getSermons());
  const [quranRecitations, setQuranRecitations] = useState(QuranStorage.getRecitations());
  const [quranVerses, setQuranVerses] = useState(MediaStorage.getMedia().filter(m => m.category === 'quran-verse'));
  
  // Services States
  const [services, setServices] = useState(() => {
    const servicesData = MediaStorage.getMedia().filter(m => m.category === 'service');
    // If no services found, reset to defaults
    if (servicesData.length === 0) {
      console.log('AdminDashboard: No services found, resetting to defaults...');
      MediaStorage.resetToDefaults();
      return MediaStorage.getMedia().filter(m => m.category === 'service');
    }
    return servicesData;
  });
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Media | null>(null);
  const [showAllServices, setShowAllServices] = useState(false);

  // Set up real-time sync for data updates
  useEffect(() => {
    // Listen for media updates (includes Quran verses and services)
    const unsubscribeMedia = eventSync.subscribe(EVENT_TYPES.MEDIA_UPDATED, () => {
      setQuranVerses(MediaStorage.getMedia().filter(m => m.category === 'quran-verse'));
      setServices(MediaStorage.getMedia().filter(m => m.category === 'service'));
    });

    const unsubscribeEvents = eventSync.subscribe(EVENT_TYPES.EVENTS_UPDATED, () => {
      setEvents(EventStorage.getEvents());
    });

    return () => {
      unsubscribeMedia();
      unsubscribeEvents();
    };
  }, []);
  const [contents, setContents] = useState([
    {
      id: 1,
      title: 'Surah Al-Fatiha with Bangla Translation',
      type: 'Quran',
      category: 'Quranic Verses',
      description: 'Complete recitation of Surah Al-Fatiha with Bangla translation and tafsir',
      author: 'Sheikh Abdul Rahman',
      date: '2024-02-01',
      status: 'Published',
      views: 15420,
      downloads: 892,
      duration: '5:30',
      fileSize: '12.5 MB',
      thumbnail: '/content/quran-fatiha.jpg'
    },
    {
      id: 2,
      title: 'Sahih Bukhari - Book of Faith',
      type: 'Hadith',
      category: 'Hadith Collection',
      description: 'Complete collection of hadiths about faith from Sahih Bukhari',
      author: 'Imam Bukhari',
      date: '2024-01-28',
      status: 'Published',
      views: 8934,
      downloads: 456,
      duration: '2:45:00',
      fileSize: '45.8 MB',
      thumbnail: '/content/bukhari-faith.jpg'
    },
    {
      id: 3,
      title: 'Five Pillars of Islam Explained',
      type: 'Article',
      category: 'Islamic Articles',
      description: 'Comprehensive guide to understanding the five pillars of Islam',
      author: 'Dr. Mohammed Hassan',
      date: '2024-02-03',
      status: 'Published',
      views: 6789,
      downloads: 234,
      duration: '15:20',
      fileSize: '8.2 MB',
      thumbnail: '/content/pillars-islam.jpg'
    },
    {
      id: 4,
      title: 'Friday Khutbah - The Importance of Prayer',
      type: 'Sermon',
      category: 'Sermons & Lectures',
      description: 'Powerful Friday sermon about the importance and benefits of prayer',
      author: 'Imam Abdullah Khan',
      date: '2024-02-02',
      status: 'Published',
      views: 3456,
      downloads: 123,
      duration: '25:15',
      fileSize: '18.7 MB',
      thumbnail: '/content/friday-khutbah.jpg'
    },
    {
      id: 5,
      title: 'Ramadan Preparation Guide',
      type: 'Article',
      category: 'Islamic Articles',
      description: 'Complete guide for preparing for the holy month of Ramadan',
      author: 'Sheikh Khalid Al-Mansoor',
      date: '2024-01-25',
      status: 'Draft',
      views: 2345,
      downloads: 89,
      duration: '12:45',
      fileSize: '6.3 MB',
      thumbnail: '/content/ramadan-guide.jpg'
    },
    {
      id: 6,
      title: 'Quran Recitation - Surah Ar-Rahman',
      type: 'Quran',
      category: 'Quranic Verses',
      description: 'Beautiful recitation of Surah Ar-Rahman with translation',
      author: 'Qari Ahmed Ali',
      date: '2024-01-30',
      status: 'Published',
      views: 12890,
      downloads: 678,
      duration: '18:20',
      fileSize: '22.1 MB',
      thumbnail: '/content/surah-rahman.jpg'
    }
  ]);
  const initialEvents = EventStorage.getEvents();
  console.log('AdminDashboard: Initial events loaded:', initialEvents.length);
  console.log('AdminDashboard: Events data:', initialEvents.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date,
    status: e.status
  })));
  const [events, setEvents] = useState(initialEvents);

  // Member Management Functions
  const handleAddMember = (newMember: any) => {
    const member = {
      ...newMember,
      id: Math.max(...members.map(m => m.id)) + 1,
      joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    setMembers([...members, member]);
    setShowAddMemberModal(false);
  };

  const handleEditMember = (updatedMember: any) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
    setShowEditMemberModal(false);
    setSelectedMember(null);
  };

  const handleDeleteMember = (memberId: number) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const openEditModal = (member: any) => {
    setSelectedMember(member);
    setShowEditMemberModal(true);
  };

  // Event Management Functions
  const handleAddEvent = (newEvent: any) => {
    const event = EventStorage.addEvent(newEvent);
    setEvents(EventStorage.getEvents());
    setShowAddEventModal(false);
    // Emit real-time sync event (temporarily disabled)
    // eventSync.emit(EVENT_TYPES.EVENTS_UPDATED);
  };

  const handleEditEvent = (updatedEvent: any) => {
    EventStorage.updateEvent(updatedEvent.id, updatedEvent);
    setEvents(EventStorage.getEvents());
    setShowEditEventModal(false);
    setSelectedEvent(null);
    // Emit real-time sync event (temporarily disabled)
    // eventSync.emit(EVENT_TYPES.EVENTS_UPDATED);
  };

  const handleDeleteEvent = (eventId: string | number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      EventStorage.deleteEvent(eventId.toString());
      setEvents(EventStorage.getEvents());
      // Emit real-time sync event (temporarily disabled)
      // eventSync.emit(EVENT_TYPES.EVENTS_UPDATED);
    }
  };

  const openEditEventModal = (event: any) => {
    setSelectedEvent(event);
    setShowEditEventModal(true);
  };

  // Content Management Functions
  const handleAddContent = (newContent: any) => {
    const content = {
      ...newContent,
      id: Math.max(...contents.map(c => c.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
      views: 0,
      downloads: 0
    };
    setContents([...contents, content]);
    setShowAddContentModal(false);
  };

  const handleEditContent = (updatedContent: any) => {
    setContents(contents.map(c => c.id === updatedContent.id ? updatedContent : c));
    setShowEditContentModal(false);
    setSelectedContent(null);
  };

  const handleDeleteContent = (contentId: number) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContents(contents.filter(c => c.id !== contentId));
    }
  };

  const openEditContentModal = (content: any) => {
    setSelectedContent(content);
    setShowEditContentModal(true);
  };

  const handleUploadContent = (file: File) => {
    // Simulate file upload
    const newContent = {
      id: Math.max(...contents.map(c => c.id)) + 1,
      title: file.name.replace(/\.[^/.]+$/, ""),
      type: file.type.includes('video') ? 'Video' : file.type.includes('audio') ? 'Audio' : 'Document',
      category: 'Media Files',
      description: `Uploaded file: ${file.name}`,
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
      views: 0,
      downloads: 0,
      duration: '0:00',
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      thumbnail: '/content/default.jpg'
    };
    setContents([...contents, newContent]);
  };

  // Sermon Management Functions
  const handleAddSermon = (newSermon: any) => {
    const sermon = SermonStorage.addSermon({
      ...newSermon,
      type: 'video'
    });
    setSermons(SermonStorage.getSermons());
    setShowAddSermonModal(false);
    // Emit real-time sync event (temporarily disabled)
    // eventSync.emit(EVENT_TYPES.SERMONS_UPDATED);
  };

  const handleEditSermon = (updatedSermon: any) => {
    SermonStorage.updateSermon(updatedSermon.id, updatedSermon);
    setSermons(SermonStorage.getSermons());
    setShowEditSermonModal(false);
    setSelectedSermon(null);
    // Emit real-time sync event (temporarily disabled)
    // eventSync.emit(EVENT_TYPES.SERMONS_UPDATED);
  };

  const handleDeleteSermon = (sermonId: string | number) => {
    if (window.confirm('Are you sure you want to delete this sermon?')) {
      SermonStorage.deleteSermon(sermonId.toString());
      setSermons(SermonStorage.getSermons());
      // Emit real-time sync event (temporarily disabled)
      // eventSync.emit(EVENT_TYPES.SERMONS_UPDATED);
    }
  };

  const openEditSermonModal = (sermon: any) => {
    setSelectedSermon(sermon);
    setShowEditSermonModal(true);
  };

  // Quran Recitation Management Functions
  const handleAddQuranRecitation = (newRecitation: Omit<QuranRecitation, 'id'>) => {
    const recitation = QuranStorage.addRecitation(newRecitation);
    setQuranRecitations(QuranStorage.getRecitations());
    setShowAddQuranRecitationModal(false);
    // Emit real-time sync event (temporarily disabled)
    // eventSync.emit(EVENT_TYPES.QURAN_RECITATIONS_UPDATED);
  };

  const handleEditQuranRecitation = (updatedRecitation: QuranRecitation) => {
    QuranStorage.updateRecitation(updatedRecitation.id, updatedRecitation);
    setQuranRecitations(QuranStorage.getRecitations());
    setShowEditQuranRecitationModal(false);
    setSelectedQuranRecitation(null);
    // Emit real-time sync event (temporarily disabled)
    // eventSync.emit(EVENT_TYPES.QURAN_RECITATIONS_UPDATED);
  };

  const handleDeleteQuranRecitation = (recitationId: string) => {
    if (window.confirm('Are you sure you want to delete this Quran recitation?')) {
      QuranStorage.deleteRecitation(recitationId);
      setQuranRecitations(QuranStorage.getRecitations());
      // Emit real-time sync event (temporarily disabled)
      // eventSync.emit(EVENT_TYPES.QURAN_RECITATIONS_UPDATED);
    }
  };

  const openEditQuranRecitationModal = (recitation: QuranRecitation) => {
    setSelectedQuranRecitation(recitation);
    setShowEditQuranRecitationModal(true);
  };

  // Quran Verse Management Functions
  const handleAddQuranVerse = (newVerse: Omit<Media, 'id' | 'created_at' | 'updated_at'>) => {
    const verse = MediaStorage.addMedia({
      ...newVerse,
      category: 'quran-verse',
      type: 'document'
    });
    setQuranVerses(MediaStorage.getMedia().filter(m => m.category === 'quran-verse'));
    setShowAddQuranVerseModal(false);
    // Emit real-time sync event
    eventSync.emit(EVENT_TYPES.MEDIA_UPDATED);
  };

  const handleEditQuranVerse = (updatedVerse: Media) => {
    MediaStorage.updateMedia(updatedVerse.id, updatedVerse);
    setQuranVerses(MediaStorage.getMedia().filter(m => m.category === 'quran-verse'));
    setShowEditQuranVerseModal(false);
    setSelectedQuranVerse(null);
    // Emit real-time sync event
    eventSync.emit(EVENT_TYPES.MEDIA_UPDATED);
  };

  const handleDeleteQuranVerse = (verseId: string) => {
    if (window.confirm('Are you sure you want to delete this Quran verse?')) {
      MediaStorage.deleteMedia(verseId);
      setQuranVerses(MediaStorage.getMedia().filter(m => m.category === 'quran-verse'));
      // Emit real-time sync event
      eventSync.emit(EVENT_TYPES.MEDIA_UPDATED);
    }
  };

  const openEditQuranVerseModal = (verse: Media) => {
    setSelectedQuranVerse(verse);
    setShowEditQuranVerseModal(true);
  };

  // Services Management Functions
  const handleAddService = (newService: Omit<Media, 'id' | 'created_at' | 'updated_at'>) => {
    const service = MediaStorage.addMedia({
      ...newService,
      category: 'service',
      type: 'document'
    });
    setServices(MediaStorage.getMedia().filter(m => m.category === 'service'));
    setShowAddServiceModal(false);
    // Emit real-time sync event
    eventSync.emit(EVENT_TYPES.MEDIA_UPDATED);
  };

  const handleEditService = (updatedService: Media) => {
    MediaStorage.updateMedia(updatedService.id, updatedService);
    setServices(MediaStorage.getMedia().filter(m => m.category === 'service'));
    setShowEditServiceModal(false);
    setSelectedService(null);
    // Emit real-time sync event
    eventSync.emit(EVENT_TYPES.MEDIA_UPDATED);
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      MediaStorage.deleteMedia(serviceId);
      setServices(MediaStorage.getMedia().filter(m => m.category === 'service'));
      // Emit real-time sync event
      eventSync.emit(EVENT_TYPES.MEDIA_UPDATED);
    }
  };

  const openEditServiceModal = (service: Media) => {
    setSelectedService(service);
    setShowEditServiceModal(true);
  };

  const handleUploadSermonVideo = (file: File) => {
    console.log('=== UPLOAD START ===');
    console.log('Uploading video file:', file.name, file.type, file.size);
    
    // Validate file type
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/wmv'];
    const validAudioTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'];
    
    if (!validVideoTypes.includes(file.type) && !validAudioTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      alert(`Invalid file type: ${file.type}. Please upload a valid video (MP4, WebM, AVI, MOV) or audio (MP3, WAV) file.`);
      return;
    }
    
    // Validate file size (max 500MB)
    const maxSize = 500 * 1024 * 1024; // 500MB in bytes
    if (file.size > maxSize) {
      console.error('File too large:', file.size);
      alert(`File too large: ${(file.size / (1024 * 1024)).toFixed(1)} MB. Maximum size is 500 MB.`);
      return;
    }
    
    try {
      console.log('Creating object URL...');
      // Create object URL for the video file (for immediate preview)
      const videoUrl = URL.createObjectURL(file);
      console.log('Created video URL:', videoUrl);
      
      // Store the actual file in a Map for better persistence
      const fileMap = JSON.parse(localStorage.getItem('uploadedSermonFiles') || '{}');
      fileMap[Date.now().toString()] = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        blobUrl: videoUrl
      };
      localStorage.setItem('uploadedSermonFiles', JSON.stringify(fileMap));
      
      // Create a thumbnail path
      const thumbnail = '/sermons/thumbnails/default.jpg';
      
      const newSermon = {
        title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        description: `Uploaded sermon video: ${file.name}`,
        speaker: 'Admin',
        date: new Date().toISOString().split('T')[0],
        duration: '0:00',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        videoUrl: videoUrl,
        thumbnail: thumbnail,
        category: 'Uploaded',
        status: 'Draft',
        language: 'English',
        topic: 'General',
        type: 'video' as const,
        views: 0,
        downloads: 0
      };
      
      console.log('New sermon data:', newSermon);
      
      console.log('Adding sermon to storage...');
      const sermon = SermonStorage.addSermon(newSermon);
      console.log('Sermon added:', sermon);
      
      console.log('Updating sermons state...');
      setSermons(SermonStorage.getSermons());
      
      // Store the file reference for later use
      const sermonFiles = JSON.parse(localStorage.getItem('sermonFiles') || '{}');
      sermonFiles[sermon.id] = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        objectUrl: videoUrl // Store the object URL for immediate use
      };
      localStorage.setItem('sermonFiles', JSON.stringify(sermonFiles));
      
      console.log('Sermon uploaded successfully:', sermon);
      console.log('=== UPLOAD COMPLETE ===');
      
      // Emit real-time sync event for sermon upload (temporarily disabled)
      // eventSync.emit(EVENT_TYPES.SERMONS_UPDATED);
      
      // Show success message
      alert(`Sermon "${file.name}" uploaded successfully! It will appear in the homepage.`);
    } catch (error) {
      console.error('Error uploading sermon:', error);
      alert('Error uploading sermon. Please try again.');
    }
  };


  const handleResetSermonStorage = () => {
    if (confirm('Are you sure you want to reset sermon storage? This will load working sample videos.')) {
      SermonStorage.clearAndReset();
      setSermons(SermonStorage.getSermons());
      alert('Sermon storage reset! Working sample videos are now loaded.');
    }
  };

  // Filter events based on selected filter
  const filteredEvents = events.filter(event => {
    if (eventFilter === 'all') return true;
    if (eventFilter === 'upcoming') return event.status === 'Upcoming';
    if (eventFilter === 'completed') return event.status === 'Completed';
    if (eventFilter === 'cancelled') return event.status === 'Cancelled';
    return true;
  });

  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 1247,
    activeMembers: 892,
    totalEvents: 45,
    upcomingEvents: 8,
    totalSermons: 234,
    recentSermons: 12,
    communityPosts: 156,
    activeDiscussions: 23,
    volunteers: 67,
    pendingRequests: 8
  });

  const [recentActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'user',
      title: 'New Member Registration',
      description: 'Ahmed Hassan joined the community',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'event',
      title: 'Event Registration',
      description: '45 people registered for Ramadan Iftar',
      timestamp: '3 hours ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'sermon',
      title: 'Sermon Uploaded',
      description: 'Friday Khutbah video uploaded successfully',
      timestamp: '6 hours ago',
      status: 'success'
    },
    {
      id: '5',
      type: 'post',
      title: 'Community Post',
      description: 'New discussion started in community board',
      timestamp: '8 hours ago',
      status: 'pending'
    }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FaChartBar },
    { id: 'events', name: 'Events', icon: FaCalendarAlt },
    { id: 'sermons', name: 'Sermons', icon: FaMicrophone },
    { id: 'announcements', name: 'Announcements', icon: FaBell },
    { id: 'quran-recitations', name: 'Quran Recitations', icon: FaBook },
    { id: 'quran-verses', name: 'Quran Verses', icon: FaPray },
    { id: 'services', name: 'Services', icon: FaCog },
        { id: 'community', name: 'Community', icon: FaComments },
    { id: 'volunteers', name: 'Volunteers', icon: FaHandsHelping },
    { id: 'settings', name: 'Settings', icon: FaCog }
  ];

  const activityIcons = {
    user: FaUserCheck,
    event: FaCalendarAlt,
    sermon: FaMicrophone,
    post: FaComments,
    'quran-recitation': FaBook,
    'quran-verse': FaPray
  };

  const statusColors = {
    success: 'bg-green-100 text-green-600',
    pending: 'bg-yellow-100 text-yellow-600',
    warning: 'bg-red-100 text-red-600'
  };

  const StatCard = ({ title, value, icon: Icon, trend, color }: {
    title: string;
    value: string | number;
    icon: any;
    trend?: number;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white`}>
          <Icon className="text-xl" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            <FaChartLine className={trend < 0 ? 'rotate-180' : ''} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </motion.div>
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Events"
          value={stats.totalEvents.toLocaleString()}
          icon={FaCalendarAlt}
          trend={12}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Sermons"
          value={stats.totalSermons.toLocaleString()}
          icon={FaMicrophone}
          trend={8}
          color="bg-purple-500"
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={FaCalendarAlt}
          color="bg-purple-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 ${statusColors[activity.status]} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.timestamp}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your mosque community</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="text-lg" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'sermons' && (
                <div className="space-y-6">
                  {/* Sermon Library Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Total Sermons</p>
                          <p className="text-2xl font-bold text-gray-800">{sermons.length}</p>
                          <p className="text-xs text-emerald-600 mt-1">All Categories</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <FaMicrophone className="text-amber-600 text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Published</p>
                          <p className="text-2xl font-bold text-gray-800">{sermons.filter(s => s.status === 'Published').length}</p>
                          <p className="text-xs text-green-600 mt-1">Live Content</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <FaCheck className="text-green-600 text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Total Views</p>
                          <p className="text-2xl font-bold text-gray-800">{sermons.reduce((sum, s) => sum + s.views, 0).toLocaleString()}</p>
                          <p className="text-xs text-blue-600 mt-1">All Time</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaEye className="text-blue-600 text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Storage Used</p>
                          <p className="text-2xl font-bold text-gray-800">{(sermons.reduce((sum, s) => sum + parseFloat(s.fileSize), 0)).toFixed(1)} GB</p>
                          <p className="text-xs text-purple-600 mt-1">Video Files</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FaVideo className="text-purple-600 text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sermon Library Management */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Sermon Library</h3>
                        <p className="text-gray-600 text-sm mt-1">Manage sermon videos and audio recordings</p>
                      </div>
                      <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          console.log('Upload button clicked');
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'video/*,audio/*';
                          input.onchange = (e) => {
                            console.log('File input change event triggered');
                            const file = (e.target as HTMLInputElement).files?.[0];
                            console.log('Selected file:', file);
                            if (file) {
                              console.log('Calling handleUploadSermonVideo');
                              handleUploadSermonVideo(file);
                            } else {
                              console.log('No file selected');
                            }
                          };
                          input.oncancel = () => {
                            console.log('File selection cancelled');
                          };
                          input.click();
                        }}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 flex items-center gap-2"
                      >
                        <FaUpload />
                        Upload Video
                      </button>
                      <button 
                        onClick={() => setShowAddSermonModal(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center gap-2"
                      >
                        <FaPlus />
                        Add Sermon
                      </button>
                    </div>
                  </div>
                  
                  {/* Sermon Filter Tabs */}
                  <div className="flex gap-2 mb-6 border-b border-gray-200">
                    <button 
                      onClick={() => setSermonFilter('all')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        sermonFilter === 'all' 
                          ? 'text-emerald-600 border-b-2 border-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      All Sermons ({sermons.length})
                    </button>
                    <button 
                      onClick={() => setSermonFilter('published')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        sermonFilter === 'published' 
                          ? 'text-emerald-600 border-b-2 border-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Published ({sermons.filter(s => s.status === 'Published').length})
                    </button>
                    <button 
                      onClick={() => setSermonFilter('draft')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        sermonFilter === 'draft' 
                          ? 'text-emerald-600 border-b-2 border-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Draft ({sermons.filter(s => s.status === 'Draft').length})
                    </button>
                  </div>
                  
                  {/* Sermons Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sermons.filter(sermon => {
                      if (sermonFilter === 'all') return true;
                      if (sermonFilter === 'published') return sermon.status === 'Published';
                      if (sermonFilter === 'draft') return sermon.status === 'Draft';
                      return true;
                    }).map((sermon) => (
                      <div key={sermon.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Sermon Thumbnail */}
                        <div className="h-48 bg-gradient-to-br from-amber-400 to-red-500 relative">
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                              <FaPlay className="text-amber-600 text-2xl ml-1" />
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              sermon.status === 'Published' ? 'bg-green-100 text-green-600' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              {sermon.status}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
                            {sermon.duration}
                          </div>
                          <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
                            {sermon.language}
                          </div>
                        </div>
                        
                        {/* Sermon Details */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              sermon.category === 'Friday Khutbah' ? 'bg-emerald-100 text-emerald-600' :
                              sermon.category === 'Lecture' ? 'bg-blue-100 text-blue-600' :
                              sermon.category === 'Family Lecture' ? 'bg-purple-100 text-purple-600' :
                              sermon.category === 'Educational' ? 'bg-amber-100 text-amber-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {sermon.category}
                            </span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openEditSermonModal(sermon)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit Sermon"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => handleDeleteSermon(sermon.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete Sermon"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          
                          <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">{sermon.title}</h4>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sermon.description}</p>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <FaUser className="text-gray-400" />
                                {sermon.speaker}
                              </span>
                              <span className="flex items-center gap-2">
                                <FaEye className="text-gray-400" />
                                {sermon.views.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <FaCalendarAlt className="text-gray-400" />
                                {sermon.date}
                              </span>
                              <span className="flex items-center gap-2">
                                <FaDownload className="text-gray-400" />
                                {sermon.downloads}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{sermon.fileSize}</span>
                              <span className="text-xs text-gray-500">Topic: {sermon.topic}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {sermon.videoUrl ? 'Video Available' : 'Audio Only'}
                              </span>
                              <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                                Watch Now →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {sermons.filter(sermon => {
                    if (sermonFilter === 'all') return true;
                    if (sermonFilter === 'published') return sermon.status === 'Published';
                    if (sermonFilter === 'draft') return sermon.status === 'Draft';
                    return true;
                  }).length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaMicrophone className="text-gray-400 text-2xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No sermons found</h3>
                      <p className="text-gray-600 mb-4">No sermons match the current filter criteria</p>
                      <div className="flex gap-3 justify-center">
                        <button 
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'video/*,audio/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) handleUploadSermonVideo(file);
                            };
                            input.click();
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                        >
                          Upload Video
                        </button>
                        <button 
                          onClick={() => setShowAddSermonModal(true)}
                          className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                        >
                          Add First Sermon
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'events' && (
              <div className="space-y-6">
                {/* Events Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Events</p>
                        <p className="text-2xl font-bold text-gray-800">{events.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-blue-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Upcoming</p>
                        <p className="text-2xl font-bold text-gray-800">{events.filter(e => e.status === 'Upcoming').length}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <FaClock className="text-yellow-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Completed</p>
                        <p className="text-2xl font-bold text-gray-800">{events.filter(e => e.status === 'Completed').length}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaCheck className="text-green-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Attendees</p>
                        <p className="text-2xl font-bold text-gray-800">{events.reduce((sum, e) => sum + e.currentAttendees, 0)}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-purple-600 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Events Management */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 flex items-center gap-2">
                        <FaDownload />
                        Export
                      </button>
                      <button 
                        onClick={() => setShowAddEventModal(true)}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 flex items-center gap-2"
                      >
                        <FaPlus />
                        Add Event
                      </button>
                    </div>
                  </div>
                  
                  {/* Filter Tabs */}
                  <div className="flex gap-2 mb-6 border-b border-gray-200">
                    <button 
                      onClick={() => setEventFilter('all')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        eventFilter === 'all' 
                          ? 'text-emerald-600 border-b-2 border-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      All Events ({events.length})
                    </button>
                    <button 
                      onClick={() => setEventFilter('upcoming')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        eventFilter === 'upcoming' 
                          ? 'text-emerald-600 border-b-2 border-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Upcoming ({events.filter(e => e.status === 'Upcoming').length})
                    </button>
                    <button 
                      onClick={() => setEventFilter('completed')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        eventFilter === 'completed' 
                          ? 'text-emerald-600 border-b-2 border-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Completed ({events.filter(e => e.status === 'Completed').length})
                    </button>
                    <button 
                      onClick={() => setEventFilter('cancelled')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        eventFilter === 'cancelled' 
                          ? 'text-emerald-600 border-b-2 border-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Cancelled ({events.filter(e => e.status === 'Cancelled').length})
                    </button>
                  </div>
                  
                  {/* Events Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Event Image */}
                        <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-500 relative">
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className={`w-16 h-16 rounded-full bg-white/90 flex items-center justify-center ${
                              event.category === 'Prayer' ? 'text-emerald-600' :
                              event.category === 'Education' ? 'text-blue-600' :
                              event.category === 'Community' ? 'text-purple-600' :
                              event.category === 'Celebration' ? 'text-amber-600' :
                              'text-gray-600'
                            }`}>
                              {event.category === 'Prayer' && <FaPray className="text-2xl" />}
                              {event.category === 'Education' && <FaGraduationCap className="text-2xl" />}
                              {event.category === 'Community' && <FaUsers className="text-2xl" />}
                              {event.category === 'Celebration' && <FaCalendarAlt className="text-2xl" />}
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              event.status === 'Completed' ? 'bg-green-100 text-green-600' :
                              event.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                        
                        {/* Event Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.category === 'Prayer' ? 'bg-emerald-100 text-emerald-600' :
                              event.category === 'Education' ? 'bg-blue-100 text-blue-600' :
                              event.category === 'Community' ? 'bg-purple-100 text-purple-600' :
                              event.category === 'Celebration' ? 'bg-amber-100 text-amber-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {event.category}
                            </span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openEditEventModal(event)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit Event"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete Event"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          
                          <h4 className="font-bold text-gray-800 mb-2">{event.title}</h4>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-gray-400" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaClock className="text-gray-400" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-gray-400" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaUsers className="text-gray-400" />
                              <span>{event.currentAttendees}/{event.maxAttendees} attendees</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Organized by {event.organizer}</span>
                              <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                                View Details →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCalendarAlt className="text-gray-400 text-2xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No events found</h3>
                      <p className="text-gray-600 mb-4">No events match the current filter criteria</p>
                      <button 
                        onClick={() => setShowAddEventModal(true)}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                      >
                        Add First Event
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                {/* Announcement Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Announcements</p>
                        <p className="text-2xl font-bold text-gray-800">{announcements.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <FaBell className="text-yellow-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Active</p>
                        <p className="text-2xl font-bold text-green-600">
                          {announcements.filter(a => a.status === 'active').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaCheck className="text-green-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">High Priority</p>
                        <p className="text-2xl font-bold text-red-600">
                          {announcements.filter(a => a.priority === 'high').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FaBell className="text-red-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Expired</p>
                        <p className="text-2xl font-bold text-gray-600">
                          {announcements.filter(a => new Date(a.expiresAt) < new Date()).length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FaClock className="text-gray-600 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Announcement Management */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Announcement Management</h2>
                    <div className="flex gap-3">
                      <select
                        value={announcementFilter}
                        onChange={(e) => setAnnouncementFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="all">All Announcements</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="high">High Priority</option>
                      </select>
                      <button
                        onClick={() => setShowAddAnnouncementModal(true)}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 flex items-center gap-2"
                      >
                        <FaPlus />
                        Add Announcement
                      </button>
                    </div>
                  </div>

                  {/* Announcements List */}
                  <div className="space-y-4">
                    {announcements
                      .filter(announcement => {
                        if (announcementFilter === 'all') return true;
                        if (announcementFilter === 'active') return announcement.status === 'active';
                        if (announcementFilter === 'expired') return new Date(announcement.expiresAt) < new Date();
                        if (announcementFilter === 'high') return announcement.priority === 'high';
                        return true;
                      })
                      .map((announcement) => (
                        <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  announcement.priority === 'high' 
                                    ? 'bg-red-100 text-red-600'
                                    : announcement.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {announcement.priority}
                                </span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  announcement.status === 'active'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {announcement.status}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-2">{announcement.content}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Type: {announcement.type}</span>
                                <span>Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                                <span>Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedAnnouncement(announcement);
                                  setShowEditAnnouncementModal(true);
                                }}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this announcement?')) {
                                    const updatedList = announcements.filter(a => a.id !== announcement.id);
                                    AnnouncementStorage.saveAnnouncements(updatedList);
                                    setAnnouncements(updatedList);
                                  }
                                }}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'quran-recitations' && (
            <div className="space-y-6">
              {/* Quran Recitations Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Recitations</p>
                      <p className="text-2xl font-bold text-gray-800">{quranRecitations.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <FaBook className="text-emerald-600 text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Published</p>
                      <p className="text-2xl font-bold text-gray-800">{quranRecitations.filter(r => r.status === 'Published').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaCheck className="text-green-600 text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Plays</p>
                      <p className="text-2xl font-bold text-gray-800">{quranRecitations.reduce((sum, r) => sum + r.views, 0).toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaPlay className="text-blue-600 text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Downloads</p>
                      <p className="text-2xl font-bold text-gray-800">{quranRecitations.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FaDownload className="text-purple-600 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

                {/* Quran Recitations Management */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Quran Recitations</h3>
                      <p className="text-gray-600 text-sm mt-1">Manage Quran audio and video recitations</p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setShowAddQuranRecitationModal(true)}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 flex items-center gap-2"
                      >
                        <FaPlus />
                        Add Recitation
                      </button>
                    </div>
                  </div>
                  
                  {/* Recitations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quranRecitations.filter(recitation => {
                      if (quranRecitationFilter === 'all') return true;
                      if (quranRecitationFilter === 'published') return recitation.status === 'Published';
                      if (quranRecitationFilter === 'draft') return recitation.status === 'Draft';
                      return true;
                    }).map((recitation) => (
                      <div key={recitation.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Recitation Thumbnail */}
                        <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-500 relative">
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                              <FaPlay className="text-emerald-600 text-2xl ml-1" />
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              recitation.status === 'Published' ? 'bg-green-100 text-green-600' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              {recitation.status}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
                            {recitation.duration}
                          </div>
                        </div>
                        
                        {/* Recitation Details */}
                        <div className="p-6">
                          <h4 className="font-bold text-gray-800 mb-2">{recitation.title}</h4>
                          <p className="text-gray-600 text-sm mb-4">{recitation.description}</p>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Reciter:</span>
                              <span className="font-medium">{recitation.reciter}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Surah:</span>
                              <span className="font-medium">{recitation.surahName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Views:</span>
                              <span className="font-medium">{recitation.views}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <button 
                              onClick={() => openEditQuranRecitationModal(recitation)}
                              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2"
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteQuranRecitation(recitation.id)}
                              className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2"
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'quran-verses' && (
              <div className="space-y-6">
                {/* Quran Verses Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Verses</p>
                        <p className="text-2xl font-bold text-gray-800">{quranVerses.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FaPray className="text-indigo-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Active</p>
                        <p className="text-2xl font-bold text-gray-800">{quranVerses.filter(v => v.status === 'active').length}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaCheck className="text-green-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Featured</p>
                        <p className="text-2xl font-bold text-gray-800">{quranVerses.filter(v => v.featured).length}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <FaStar className="text-yellow-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Active</p>
                        <p className="text-2xl font-bold text-gray-800">{quranVerses.filter(v => v.status === 'active').length}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FaBook className="text-red-600 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quran Verses Management */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Quran Verses</h3>
                      <p className="text-gray-600 text-sm mt-1">Manage Quran verses with translations and tafsir</p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setShowAddQuranVerseModal(true)}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 flex items-center gap-2"
                      >
                        <FaPlus />
                        Add Verse
                      </button>
                    </div>
                  </div>
                  
                  {/* Verses Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quranVerses.map((verse) => (
                      <div key={verse.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Verse Header */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                          <h4 className="font-bold text-lg mb-2">{verse.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              verse.status === 'active' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {verse.status}
                            </span>
                            {verse.featured && (
                              <FaStar className="text-yellow-300 text-sm" />
                            )}
                          </div>
                        </div>
                        
                        {/* Verse Content */}
                        <div className="p-4">
                          <div className="mb-4">
                            <p 
                              className="text-lg font-arabic text-right mb-2" 
                              style={{ fontFamily: 'Amiri, Georgia, serif', direction: 'rtl' }}
                            >
                              {verse.description?.split(' - ')[0] || 'Arabic text'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {verse.description?.split(' - ')[1] || 'Translation'}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                            <span>Category: {verse.category}</span>
                            <span>•</span>
                            <span>Type: {verse.type}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => openEditQuranVerseModal(verse)}
                              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2"
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteQuranVerse(verse.id)}
                              className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2"
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'services' && (
              <div className="space-y-6">
                {/* Services Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Services</p>
                        <p className="text-2xl font-bold text-gray-800">{services.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaCog className="text-blue-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Active</p>
                        <p className="text-2xl font-bold text-gray-800">{services.filter(s => s.status === 'active').length}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaCheck className="text-green-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Featured</p>
                        <p className="text-2xl font-bold text-gray-800">{services.filter(s => s.featured).length}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <FaStar className="text-yellow-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Draft</p>
                        <p className="text-2xl font-bold text-gray-800">{services.filter(s => s.status === 'draft').length}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FaFileAlt className="text-red-600 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Management */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Services</h3>
                      <p className="text-gray-600 text-sm mt-1">Manage mosque services and programs</p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setShowAddServiceModal(true)}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 flex items-center gap-2"
                      >
                        <FaPlus />
                        Add Service
                      </button>
                    </div>
                  </div>
                  
                  {/* Debug Services Info */}
                  <div className="text-center mb-4 p-4 bg-yellow-100 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Debug: Services loaded: {services.length} | 
                      Showing: {services.slice(0, 3).length} | 
                      {services.length === 0 && 'No services found!'}
                    </p>
                    {services.length > 0 && (
                      <div className="mt-2 text-xs text-gray-600">
                        Services: {services.slice(0, 3).map(s => s.title).join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Services Grid - Limited to 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-red-100 p-4 rounded-lg">
                    {/* Test Text */}
                    <div className="col-span-full text-center mb-4 p-4 bg-white rounded-lg">
                      <p className="text-lg font-bold">TEST: Services Grid Rendering</p>
                      <p className="text-sm">Should see 3 service cards below</p>
                    </div>
                    {services.slice(0, 3).map((service) => (
                      <div key={service.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Service Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                          <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              service.status === 'active' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {service.status}
                            </span>
                            {service.featured && (
                              <FaStar className="text-yellow-300 text-sm" />
                            )}
                          </div>
                        </div>
                        
                        {/* Service Content */}
                        <div className="p-4">
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                              {service.description?.split(' - ')[0] || 'Service description'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {service.description?.split(' - ')[1] || 'Service details'}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                            <span>Category: {service.category}</span>
                            <span>•</span>
                            <span>Type: {service.type}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => openEditServiceModal(service)}
                              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2"
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteService(service.id)}
                              className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2"
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View All Services Button */}
                  {services.length > 3 && (
                    <div className="text-center mt-6">
                      <button 
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                        onClick={() => setShowAllServices(!showAllServices)}
                      >
                        {showAllServices ? 'Show Less Services' : 'View All Services'} ({services.length} total)
                      </button>
                    </div>
                  )}

                  {/* All Services Grid */}
                  {showAllServices && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {services.map((service) => (
                        <div key={service.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                          {/* Service Header */}
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                            <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                service.status === 'active' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {service.status}
                              </span>
                              {service.featured && (
                                <FaStar className="text-yellow-300 text-sm" />
                              )}
                            </div>
                          </div>
                          
                          {/* Service Content */}
                          <div className="p-4">
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-2">
                                {service.description?.split(' - ')[0] || 'Service description'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {service.description?.split(' - ')[1] || 'Service details'}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                              <span>Category: {service.category}</span>
                              <span>•</span>
                              <span>Type: {service.type}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openEditServiceModal(service)}
                                className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2"
                              >
                                <FaEdit />
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteService(service.id)}
                                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2"
                              >
                                <FaTrash />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'community' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Community Management</h3>
                <p className="text-gray-600">Community management features coming soon...</p>
              </div>
            )}
            {activeTab === 'volunteers' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Volunteer Management</h3>
                <p className="text-gray-600">Volunteer management features coming soon...</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Settings</h3>
                <p className="text-gray-600">Settings configuration coming soon...</p>
              </div>
            )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

        {/* Event Modals */}
        <div>
        {/* Add Event Modal */}
        <AnimatePresence>
          {showAddEventModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowAddEventModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Event</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const newEvent = {
                      title: formData.get('title') as string,
                      description: formData.get('description') as string,
                      date: formData.get('date') as string,
                      time: formData.get('time') as string,
                      location: formData.get('location') as string,
                      category: formData.get('category') as string,
                      organizer: formData.get('organizer') as string,
                      maxAttendees: parseInt(formData.get('maxAttendees') as string),
                      image: formData.get('image') as string
                    };
                    handleAddEvent(newEvent);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter event title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      required
                      className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter event description"
                    />
                  </div>
                  
                  <div className="grid grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        name="time"
                        required
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        required
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Enter event location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        required
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Prayer">Prayer</option>
                        <option value="Education">Education</option>
                        <option value="Community">Community</option>
                        <option value="Celebration">Celebration</option>
                        <option value="Fundraising">Fundraising</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                      <input
                        type="text"
                        name="organizer"
                        required
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Enter organizer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                      <input
                        type="number"
                        name="maxAttendees"
                        min="1"
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Maximum attendees"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Image URL</label>
                    <input
                      type="url"
                      name="image"
                      className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter image URL (optional)"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddEventModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Add Event
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Event Modal */}
        <AnimatePresence>
          {showEditEventModal && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowEditEventModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Event</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const updatedEvent = {
                      ...selectedEvent,
                      title: formData.get('title') as string,
                      description: formData.get('description') as string,
                      date: formData.get('date') as string,
                      time: formData.get('time') as string,
                      location: formData.get('location') as string,
                      category: formData.get('category') as string,
                      organizer: formData.get('organizer') as string,
                      maxAttendees: parseInt(formData.get('maxAttendees') as string),
                      image: formData.get('image') as string
                    };
                    handleEditEvent(updatedEvent);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={selectedEvent.title}
                      className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter event title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={selectedEvent.description}
                      className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter event description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        defaultValue={selectedEvent.date}
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        name="time"
                        defaultValue={selectedEvent.time}
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        defaultValue={selectedEvent.location}
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Enter event location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        defaultValue={selectedEvent.category}
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Prayer">Prayer</option>
                        <option value="Education">Education</option>
                        <option value="Community">Community</option>
                        <option value="Celebration">Celebration</option>
                        <option value="Fundraising">Fundraising</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                      <input
                        type="text"
                        name="organizer"
                        defaultValue={selectedEvent.organizer}
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Enter organizer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                      <input
                        type="number"
                        name="maxAttendees"
                        min="1"
                        defaultValue={selectedEvent.maxAttendees}
                        className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Maximum attendees"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Image URL</label>
                    <input
                      type="url"
                      name="image"
                      defaultValue={selectedEvent.image}
                      className="w-full px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter image URL (optional)"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowEditEventModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Update Event
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Member Modal */}
        <AnimatePresence>
          {showAddMemberModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowAddMemberModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Member</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const newMember = {
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
                      role: formData.get('role') as string,
                      status: 'Active',
                      phone: formData.get('phone') as string,
                      address: formData.get('address') as string
                    };
                    handleAddMember(newMember);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter member name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      name="role"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Member">Member</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Donor">Donor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter address"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddMemberModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Add Member
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Member Modal */}
        <AnimatePresence>
          {showEditMemberModal && selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowEditMemberModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Member</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const updatedMember = {
                      ...selectedMember,
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
                      role: formData.get('role') as string,
                      phone: formData.get('phone') as string,
                      address: formData.get('address') as string
                    };
                    handleEditMember(updatedMember);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={selectedMember.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter member name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={selectedMember.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      name="role"
                      defaultValue={selectedMember.role}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Member">Member</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Donor">Donor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={selectedMember.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={selectedMember.address}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter address"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowEditMemberModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Update Member
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Content Modal */}
        <AnimatePresence>
          {showAddContentModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowAddContentModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Content</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const newContent = {
                      title: formData.get('title') as string,
                      type: formData.get('type') as string,
                      category: formData.get('category') as string,
                      description: formData.get('description') as string,
                      author: formData.get('author') as string,
                      duration: formData.get('duration') as string,
                      fileSize: formData.get('fileSize') as string
                    };
                    handleAddContent(newContent);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter content title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter content description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                      <select
                        name="type"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Quran">Quran</option>
                        <option value="Hadith">Hadith</option>
                        <option value="Article">Article</option>
                        <option value="Sermon">Sermon</option>
                        <option value="Video">Video</option>
                        <option value="Audio">Audio</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Quranic Verses">Quranic Verses</option>
                        <option value="Hadith Collection">Hadith Collection</option>
                        <option value="Islamic Articles">Islamic Articles</option>
                        <option value="Sermons & Lectures">Sermons & Lectures</option>
                        <option value="Media Files">Media Files</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <input
                        type="text"
                        name="author"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Enter author name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 15:30"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
                    <input
                      type="text"
                      name="fileSize"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="e.g., 12.5 MB"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddContentModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Add Content
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Content Modal */}
        <AnimatePresence>
          {showEditContentModal && selectedContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowEditContentModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Content</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const updatedContent = {
                      ...selectedContent,
                      title: formData.get('title') as string,
                      type: formData.get('type') as string,
                      category: formData.get('category') as string,
                      description: formData.get('description') as string,
                      author: formData.get('author') as string,
                      duration: formData.get('duration') as string,
                      fileSize: formData.get('fileSize') as string,
                      status: formData.get('status') as string
                    };
                    handleEditContent(updatedContent);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={selectedContent.title}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter content title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={selectedContent.description}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter content description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                      <select
                        name="type"
                        defaultValue={selectedContent.type}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Quran">Quran</option>
                        <option value="Hadith">Hadith</option>
                        <option value="Article">Article</option>
                        <option value="Sermon">Sermon</option>
                        <option value="Video">Video</option>
                        <option value="Audio">Audio</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        defaultValue={selectedContent.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Quranic Verses">Quranic Verses</option>
                        <option value="Hadith Collection">Hadith Collection</option>
                        <option value="Islamic Articles">Islamic Articles</option>
                        <option value="Sermons & Lectures">Sermons & Lectures</option>
                        <option value="Media Files">Media Files</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <input
                        type="text"
                        name="author"
                        defaultValue={selectedContent.author}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Enter author name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        defaultValue={selectedContent.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        defaultValue={selectedContent.duration}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 15:30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
                      <input
                        type="text"
                        name="fileSize"
                        defaultValue={selectedContent.fileSize}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 12.5 MB"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowEditContentModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Update Content
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Sermon Modal */}
        <AnimatePresence>
          {showAddSermonModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowAddSermonModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Sermon</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const newSermon = {
                      title: formData.get('title') as string,
                      description: formData.get('description') as string,
                      speaker: formData.get('speaker') as string,
                      category: formData.get('category') as string,
                      duration: formData.get('duration') as string,
                      fileSize: formData.get('fileSize') as string,
                      language: formData.get('language') as string,
                      topic: formData.get('topic') as string
                    };
                    handleAddSermon(newSermon);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sermon Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter sermon title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter sermon description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Speaker</label>
                      <input
                        type="text"
                        name="speaker"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Enter speaker name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Friday Khutbah">Friday Khutbah</option>
                        <option value="Lecture">Lecture</option>
                        <option value="Family Lecture">Family Lecture</option>
                        <option value="Educational">Educational</option>
                        <option value="Special Event">Special Event</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 25:15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
                      <input
                        type="text"
                        name="fileSize"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 45.8 MB"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        name="language"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="English">English</option>
                        <option value="Bangla">Bangla</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Urdu">Urdu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                      <input
                        type="text"
                        name="topic"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., Prayer, Ramadan"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddSermonModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Add Sermon
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Sermon Modal */}
        <AnimatePresence>
          {showEditSermonModal && selectedSermon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowEditSermonModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Sermon</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const updatedSermon = {
                      ...selectedSermon,
                      title: formData.get('title') as string,
                      description: formData.get('description') as string,
                      speaker: formData.get('speaker') as string,
                      category: formData.get('category') as string,
                      duration: formData.get('duration') as string,
                      fileSize: formData.get('fileSize') as string,
                      language: formData.get('language') as string,
                      topic: formData.get('topic') as string,
                      status: formData.get('status') as string
                    };
                    handleEditSermon(updatedSermon);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sermon Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={selectedSermon.title}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter sermon title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={selectedSermon.description}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter sermon description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Speaker</label>
                      <input
                        type="text"
                        name="speaker"
                        defaultValue={selectedSermon.speaker}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Enter speaker name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        defaultValue={selectedSermon.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        defaultValue={selectedSermon.duration}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 25:15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
                      <input
                        type="text"
                        name="fileSize"
                        defaultValue={selectedSermon.fileSize}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 45.8 MB"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        name="language"
                        defaultValue={selectedSermon.language}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="English">English</option>
                        <option value="Bangla">Bangla</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Urdu">Urdu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                      <input
                        type="text"
                        name="topic"
                        defaultValue={selectedSermon.topic}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., Prayer, Ramadan"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowEditSermonModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Update Sermon
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quran Recitations Modals */}
        {/* Add Quran Recitation Modal */}
        <AnimatePresence>
          {showAddQuranRecitationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowAddQuranRecitationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Quran Recitation</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const newRecitation = {
                      title: formData.get('title') as string,
                      description: formData.get('description') as string,
                      reciter: formData.get('reciter') as string,
                      surah: parseInt(formData.get('surah') as string),
                      ayah: parseInt(formData.get('ayah') as string),
                      surahName: formData.get('surahName') as string,
                      audioUrl: formData.get('audioUrl') as string,
                      duration: formData.get('duration') as string,
                      fileSize: formData.get('fileSize') as string,
                      thumbnail: formData.get('thumbnail') as string,
                      category: formData.get('category') as string,
                      status: formData.get('status') as 'Published' | 'Draft' | 'Archived',
                      views: 0,
                      downloads: 0,
                      language: formData.get('language') as string,
                      uploadDate: new Date().toISOString().split('T')[0],
                      type: formData.get('type') as 'audio' | 'video'
                    };
                    handleAddQuranRecitation(newRecitation);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="e.g., Surah Al-Fatiha Recitation"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Brief description of the recitation"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reciter</label>
                      <input
                        type="text"
                        name="reciter"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., Sheikh Mishary Rashid"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        name="language"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Arabic">Arabic</option>
                        <option value="English">English</option>
                        <option value="Bangla">Bangla</option>
                        <option value="Urdu">Urdu</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Surah</label>
                      <input
                        type="number"
                        name="surah"
                        required
                        min="1"
                        max="114"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ayah</label>
                      <input
                        type="number"
                        name="ayah"
                        required
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="7"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Surah Name</label>
                      <input
                        type="text"
                        name="surahName"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="Al-Fatiha"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 3:45"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
                      <input
                        type="text"
                        name="fileSize"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="e.g., 2.8 MB"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Audio URL</label>
                    <input
                      type="url"
                      name="audioUrl"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="https://example.com/audio.mp3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Daily Recitation">Daily Recitation</option>
                        <option value="Memorization">Memorization</option>
                        <option value="Special Event">Special Event</option>
                        <option value="Educational">Educational</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        name="type"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
                    <input
                      type="text"
                      name="thumbnail"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="/quran/thumbnails/al-fatiha.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddQuranRecitationModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Add Recitation
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Quran Verse Modal */}
        <AnimatePresence>
          {showAddQuranVerseModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowAddQuranVerseModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Quran Verse</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const arabicText = formData.get('arabicText') as string;
                    const translation = formData.get('translation') as string;
                    const newVerse = {
                      title: formData.get('title') as string,
                      description: `${arabicText} - ${translation}`,
                      type: 'document' as const,
                      file_url: formData.get('fileUrl') as string,
                      thumbnail_url: formData.get('thumbnailUrl') as string,
                      category: 'quran-verse',
                      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(tag => tag),
                      status: (formData.get('status') as 'active' | 'inactive' | 'draft') || 'active',
                      featured: formData.get('featured') === 'on'
                    };
                    handleAddQuranVerse(newVerse);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Surah Al-Fatiha - Verse 1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arabic Text</label>
                    <textarea
                      name="arabicText"
                      required
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 font-arabic text-right"
                      style={{ fontFamily: 'var(--font-amiri), sans-serif' }}
                      placeholder="بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Translation</label>
                    <textarea
                      name="translation"
                      required
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="In the name of Allah, the Entirely Merciful, the Especially Merciful."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
                      <input
                        type="url"
                        name="fileUrl"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        placeholder="https://example.com/file.txt"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                    <input
                      type="url"
                      name="thumbnailUrl"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="quran, verse, mercy, faith"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Featured Verse
                    </label>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddQuranVerseModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Save Verse
                    </button>
                  </div>

                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Announcement Modal */}
        <AnimatePresence>
          {showAddAnnouncementModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowAddAnnouncementModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Announcement</h3>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newAnnouncement = AnnouncementStorage.addAnnouncement({
                      title: formData.get('title') as string,
                      content: formData.get('content') as string,
                      type: formData.get('type') as string,
                      priority: formData.get('priority') as 'low' | 'medium' | 'high',
                      status: 'active',
                      expiresAt: formData.get('expiresAt') as string
                    });
                    setAnnouncements((prev) => [...prev, newAnnouncement]);
                    setShowAddAnnouncementModal(false);
                    e.currentTarget.reset();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter announcement title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      name="content"
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      placeholder="Enter announcement content"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        name="type"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="prayer">Prayer</option>
                        <option value="event">Event</option>
                        <option value="education">Education</option>
                        <option value="general">General</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        name="priority"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="datetime-local"
                      name="expiresAt"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddAnnouncementModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                    >
                      Add Announcement
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

          {/* Edit Announcement Modal */}
          <AnimatePresence>
            {showEditAnnouncementModal && selectedAnnouncement && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setShowEditAnnouncementModal(false)}
              >
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Edit Announcement</h3>
                    <button
                      onClick={() => setShowEditAnnouncementModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      if (!selectedAnnouncement) return;

                      const updatedAnnouncement = AnnouncementStorage.updateAnnouncement(selectedAnnouncement.id, {
                        title: formData.get('title') as string,
                        content: formData.get('content') as string,
                        type: formData.get('type') as string,
                        priority: formData.get('priority') as 'low' | 'medium' | 'high',
                        expiresAt: formData.get('expiresAt') as string
                      });

                      if (updatedAnnouncement) {
                        setAnnouncements(announcements.map(a => a.id === selectedAnnouncement.id ? updatedAnnouncement : a));
                      }

                      setShowEditAnnouncementModal(false);
                      setSelectedAnnouncement(null);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        required
                        defaultValue={selectedAnnouncement.title}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                      <textarea
                        name="content"
                        required
                        rows={4}
                        defaultValue={selectedAnnouncement.content}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select
                          name="type"
                          required
                          defaultValue={selectedAnnouncement.type}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        >
                          <option value="prayer">Prayer</option>
                          <option value="event">Event</option>
                          <option value="education">Education</option>
                          <option value="general">General</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <select
                          name="priority"
                          required
                          defaultValue={selectedAnnouncement.priority}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="datetime-local"
                        name="expiresAt"
                        required
                        defaultValue={selectedAnnouncement.expiresAt}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setShowEditAnnouncementModal(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600"
                      >
                        Update Announcement
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
