'use client';

// Media Storage System
export interface Media {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'video' | 'audio' | 'document';
  file_url: string;
  thumbnail_url?: string;
  category: string;
  tags: string[];
  file_size?: number;
  duration?: string;
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

class MediaStorage {
  private static readonly STORAGE_KEY = 'mosque_media';

  // Get all media from localStorage
  static getMedia(): Media[] {
    console.log('MediaStorage.getMedia() called');
    if (typeof window === 'undefined') {
      console.log('MediaStorage: window is undefined, returning empty array');
      return [];
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      console.log('MediaStorage: localStorage data exists:', !!stored);
      if (stored) {
        const media = JSON.parse(stored);
        console.log('MediaStorage: Loaded media from localStorage:', media.length);
        return media;
      } else {
        console.log('MediaStorage: No data in localStorage, loading defaults');
      }
    } catch (error) {
      console.error('Error loading media from storage:', error);
    }
    
    // Return default media if no stored data
    const defaultMedia = this.getDefaultMedia();
    console.log('MediaStorage: Returning default media:', defaultMedia.length);
    return defaultMedia;
  }

  // Save media to localStorage
  static saveMedia(media: Media[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(media));
      console.log('MediaStorage: Saved media to localStorage:', media.length);
    } catch (error) {
      console.error('Error saving media to storage:', error);
    }
  }

  // Add new media item
  static addMedia(mediaData: Omit<Media, 'id' | 'created_at' | 'updated_at'>): Media {
    const newMedia: Media = {
      ...mediaData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const currentMedia = this.getMedia();
    const updatedMedia = [...currentMedia, newMedia];
    this.saveMedia(updatedMedia);
    
    return newMedia;
  }

  // Update existing media item
  static updateMedia(id: string, updates: Partial<Media>): Media | null {
    const currentMedia = this.getMedia();
    const index = currentMedia.findIndex(media => media.id === id);
    
    if (index === -1) return null;

    const updatedMedia: Media = {
      ...currentMedia[index],
      ...updates,
      updated_at: new Date().toISOString()
    };

    currentMedia[index] = updatedMedia;
    this.saveMedia(currentMedia);
    
    return updatedMedia;
  }

  // Delete media item
  static deleteMedia(id: string): boolean {
    const currentMedia = this.getMedia();
    const filteredMedia = currentMedia.filter(media => media.id !== id);
    
    if (filteredMedia.length === currentMedia.length) return false;

    this.saveMedia(filteredMedia);
    return true;
  }

  // Get media by type
  static getMediaByType(type: Media['type']): Media[] {
    return this.getMedia().filter(media => media.type === type);
  }

  // Get featured media
  static getFeaturedMedia(): Media[] {
    return this.getMedia().filter(media => media.featured);
  }

  // Get media by category
  static getMediaByCategory(category: string): Media[] {
    return this.getMedia().filter(media => media.category === category);
  }

  // Clear all media (useful for testing)
  static clearMedia(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('MediaStorage: Cleared all media from localStorage');
    } catch (error) {
      console.error('Error clearing media:', error);
    }
  }

  // Get default media items
  static getDefaultMedia(): Media[] {
    return [
      {
        id: '1',
        title: 'Friday Jumu\'ah Prayer',
        description: 'Weekly congregational prayer with sermon',
        type: 'video',
        file_url: '/videos/friday-prayer.mp4',
        thumbnail_url: '/thumbnails/friday-prayer.jpg',
        category: 'sermon',
        tags: ['friday', 'prayer', 'jumuah', 'sermon'],
        file_size: 52428800,
        duration: '45:30',
        status: 'active',
        featured: true,
        created_at: '2026-05-09T00:00:00Z',
        updated_at: '2026-05-09T00:00:00Z'
      },
      {
        id: '2',
        title: 'Ramadan Iftar Dinner',
        description: 'Community iftar during Ramadan 2026',
        type: 'image',
        file_url: '/images/iftar-2026.jpg',
        thumbnail_url: '/thumbnails/iftar-2026.jpg',
        category: 'event',
        tags: ['ramadan', 'iftar', 'community', 'event'],
        file_size: 2097152,
        status: 'active',
        featured: true,
        created_at: '2026-05-15T00:00:00Z',
        updated_at: '2026-05-15T00:00:00Z'
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
        created_at: '2026-05-20T00:00:00Z',
        updated_at: '2026-05-20T00:00:00Z'
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
        featured: false,
        created_at: '2026-05-10T00:00:00Z',
        updated_at: '2026-05-10T00:00:00Z'
      },
      {
        id: '5',
        title: 'Islamic Lecture Series',
        description: 'Weekly educational lecture on Islamic topics',
        type: 'video',
        file_url: '/videos/islamic-lecture.mp4',
        thumbnail_url: '/thumbnails/islamic-lecture.jpg',
        category: 'education',
        tags: ['lecture', 'education', 'islamic', 'learning'],
        file_size: 104857600,
        duration: '1:15:30',
        status: 'active',
        featured: true,
        created_at: '2026-05-12T00:00:00Z',
        updated_at: '2026-05-12T00:00:00Z'
      },
      {
        id: '6',
        title: 'Surah Al-Fatiha - Mishari Rashid',
        description: 'Beautiful recitation of Surah Al-Fatiha by Mishari Rashid',
        type: 'audio',
        file_url: '/audio/surah-fatiha-mishari.mp3',
        thumbnail_url: '/thumbnails/quran-recitation.jpg',
        category: 'quran',
        tags: ['quran', 'surah', 'fatiha', 'mishari', 'recitation'],
        file_size: 3145728,
        duration: '3:45',
        status: 'active',
        featured: true,
        created_at: '2026-05-10T00:00:00Z',
        updated_at: '2026-05-10T00:00:00Z'
      },
      {
        id: '7',
        title: 'Surah Al-Baqarah - Abdul Rahman Al-Sudais',
        description: 'Recitation of Surah Al-Baqarah verses 1-10',
        type: 'audio',
        file_url: '/audio/surah-baqarah-sudais.mp3',
        thumbnail_url: '/thumbnails/quran-recitation.jpg',
        category: 'quran',
        tags: ['quran', 'surah', 'baqarah', 'sudais', 'recitation'],
        file_size: 5242880,
        duration: '6:20',
        status: 'active',
        featured: false,
        created_at: '2026-05-11T00:00:00Z',
        updated_at: '2026-05-11T00:00:00Z'
      },
      {
        id: '8',
        title: 'Surah Ar-Rahman - Saad Al-Ghamdi',
        description: 'Melodious recitation of Surah Ar-Rahman',
        type: 'audio',
        file_url: '/audio/surah-rahman-ghamdi.mp3',
        thumbnail_url: '/thumbnails/quran-recitation.jpg',
        category: 'quran',
        tags: ['quran', 'surah', 'rahman', 'ghamdi', 'recitation'],
        file_size: 8388608,
        duration: '8:15',
        status: 'active',
        featured: true,
        created_at: '2026-05-12T00:00:00Z',
        updated_at: '2026-05-12T00:00:00Z'
      },
      {
        id: '9',
        title: 'Surah Al-Fatiha - Verse 1',
        description: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ - In the name of Allah, the Most Gracious, the Most Merciful',
        type: 'document',
        file_url: '/verses/surah-fatiha-1.txt',
        thumbnail_url: '/thumbnails/quran-verse.jpg',
        category: 'quran-verse',
        tags: ['quran', 'verse', 'fatiha', 'arabic', 'translation'],
        file_size: 1024,
        duration: '0:00',
        status: 'active',
        featured: false,
        created_at: '2026-05-13T00:00:00Z',
        updated_at: '2026-05-13T00:00:00Z'
      },
      {
        id: '10',
        title: 'Surah Al-Ikhlas - Verse 1',
        description: 'قُلْ هُوَ اللَّهُ أَحَدٌ - Say, "He is Allah, [who is] One"',
        type: 'document',
        file_url: '/verses/surah-ikhlas-1.txt',
        thumbnail_url: '/thumbnails/quran-verse.jpg',
        category: 'quran-verse',
        tags: ['quran', 'verse', 'ikhlas', 'arabic', 'translation'],
        file_size: 1024,
        duration: '0:00',
        status: 'active',
        featured: false,
        created_at: '2026-05-13T00:00:00Z',
        updated_at: '2026-05-13T00:00:00Z'
      },
      {
        id: '11',
        title: 'Surah Al-Baqarah - Verse 255 (Ayat al-Kursi)',
        description: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ - Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence',
        type: 'document',
        file_url: '/verses/surah-baqarah-255.txt',
        thumbnail_url: '/thumbnails/quran-verse.jpg',
        category: 'quran-verse',
        tags: ['quran', 'verse', 'baqarah', 'kursi', 'arabic', 'translation'],
        file_size: 2048,
        duration: '0:00',
        status: 'active',
        featured: true,
        created_at: '2026-05-13T00:00:00Z',
        updated_at: '2026-05-13T00:00:00Z'
      },
      {
        id: '12',
        title: 'Shahadas',
        description: 'Whether you are just interested in Islam, have some questions or are ready to convert, we are happy to speak to you and guide you through the Shahada. Learn more and book here.',
        type: 'document',
        file_url: '/services/shahadas',
        thumbnail_url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800',
        category: 'service',
        tags: ['shahada', 'conversion', 'islam', 'guidance'],
        file_size: 1024,
        duration: '0:00',
        status: 'active',
        featured: true,
        created_at: '2026-05-13T00:00:00Z',
        updated_at: '2026-05-13T00:00:00Z'
      },
      {
        id: '13',
        title: 'Nikahs',
        description: 'Offering a unique & stunning yet economical & eco-friendly venue, getting married at Cambridge Central Mosque is the experience of a lifetime. Find out more here.',
        type: 'document',
        file_url: '/services/nikahs',
        thumbnail_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
        category: 'service',
        tags: ['nikah', 'marriage', 'wedding', 'venue'],
        file_size: 1024,
        duration: '0:00',
        status: 'active',
        featured: true,
        created_at: '2026-05-13T00:00:00Z',
        updated_at: '2026-05-13T00:00:00Z'
      },
      {
        id: '14',
        title: 'General Events',
        description: 'Host your general events at our mosque. We offer facilities for community gatherings, educational programs, and special occasions.',
        type: 'document',
        file_url: '/services/general-events',
        thumbnail_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800',
        category: 'service',
        tags: ['events', 'community', 'gatherings', 'programs'],
        file_size: 1024,
        duration: '0:00',
        status: 'active',
        featured: false,
        created_at: '2026-05-13T00:00:00Z',
        updated_at: '2026-05-13T00:00:00Z'
      },
      {
        id: '15',
        title: 'Funeral Services',
        description: 'We provide complete funeral services including prayer arrangements, burial preparation, and support for the bereaved families.',
        type: 'document',
        file_url: '/services/funeral',
        thumbnail_url: 'https://images.unsplash.com/photo-1528164344705-475ba2675314?auto=format&fit=crop&q=80&w=800',
        category: 'service',
        tags: ['funeral', 'burial', 'prayer', 'support'],
        file_size: 1024,
        duration: '0:00',
        status: 'active',
        featured: false,
        created_at: '2026-05-13T00:00:00Z',
        updated_at: '2026-05-13T00:00:00Z'
      },
      {
        id: '16',
        title: 'Educational Programs',
        description: 'Join our educational programs including Quran classes, Arabic language courses, and Islamic studies for all ages.',
        type: 'document',
        file_url: '/services/education',
        thumbnail_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
        category: 'service',
        tags: ['education', 'quran', 'arabic', 'classes'],
        file_size: 1024,
        duration: '0:00',
        status: 'active',
        featured: true,
        created_at: '2026-05-13T00:00:00Z',
        updated_at: '2026-05-13T00:00:00Z'
      }
    ];
  }

  // Reset to defaults
  static resetToDefaults(): void {
    this.clearMedia();
    const defaultMedia = this.getDefaultMedia();
    this.saveMedia(defaultMedia);
    console.log('MediaStorage: Reset to default media');
  }
}

export default MediaStorage;
