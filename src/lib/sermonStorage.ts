'use client';

// Sermon Storage System
export interface Sermon {
  id: string;
  title: string;
  description: string;
  speaker: string;
  date: string;
  duration: string;
  fileSize: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  status: string;
  views: number;
  downloads: number;
  language: string;
  topic: string;
  type: 'video' | 'audio';
}

class SermonStorage {
  private static readonly STORAGE_KEY = 'mosque_sermons';

  // Get all sermons from localStorage
  static getSermons(): Sermon[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading sermons from storage:', error);
    }
    
    // Return default sermons if no stored data
    return this.getDefaultSermons();
  }

  // Clear storage and reset to defaults (useful for testing)
  static clearAndReset(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('Sermon storage cleared and reset to defaults');
    } catch (error) {
      console.error('Error clearing sermon storage:', error);
    }
  }

  // Save sermons to localStorage
  static saveSermons(sermons: Sermon[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sermons));
    } catch (error) {
      console.error('Error saving sermons to storage:', error);
    }
  }

  // Add a new sermon
  static addSermon(sermon: Omit<Sermon, 'id'>): Sermon {
    const sermons = this.getSermons();
    const newSermon: Sermon = {
      ...sermon,
      id: Date.now().toString(),
      views: 0,
      downloads: 0
    };
    
    sermons.push(newSermon);
    this.saveSermons(sermons);
    return newSermon;
  }

  // Update a sermon
  static updateSermon(id: string, updates: Partial<Sermon>): Sermon | null {
    const sermons = this.getSermons();
    const index = sermons.findIndex(s => s.id === id);
    
    if (index !== -1) {
      sermons[index] = { ...sermons[index], ...updates };
      this.saveSermons(sermons);
      return sermons[index];
    }
    
    return null;
  }

  // Delete a sermon
  static deleteSermon(id: string): boolean {
    const sermons = this.getSermons();
    const filteredSermons = sermons.filter(s => s.id !== id);
    
    if (filteredSermons.length < sermons.length) {
      this.saveSermons(filteredSermons);
      return true;
    }
    
    return false;
  }

  // Get default sermons
  static getDefaultSermons(): Sermon[] {
    return [
      {
        id: '1',
        title: 'Friday Khutbah: The Importance of Prayer',
        description: 'A powerful sermon about the significance of daily prayers in Islam',
        speaker: 'Imam Abdullah Khan',
        date: '2024-02-09',
        duration: '45:00',
        fileSize: '45.8 MB',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: '/sermons/thumbnails/prayer.jpg',
        category: 'Friday Khutbah',
        status: 'Published',
        views: 1250,
        downloads: 89,
        language: 'English',
        topic: 'Prayer',
        type: 'video'
      },
      {
        id: '2',
        title: 'Ramadan Preparation: Spiritual Readiness',
        description: 'Comprehensive guide on preparing spiritually for the holy month of Ramadan',
        speaker: 'Sheikh Khalid Al-Mansoor',
        date: '2024-01-28',
        duration: '35:42',
        fileSize: '68.2 MB',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: '/sermons/thumbnails/ramadan-prep.jpg',
        category: 'Lecture',
        status: 'Published',
        views: 2890,
        downloads: 156,
        language: 'English',
        topic: 'Ramadan',
        type: 'video'
      },
      {
        id: '3',
        title: 'Family Values in Islam',
        description: 'Essential teachings about maintaining strong family bonds according to Islamic principles',
        speaker: 'Dr. Mohammed Hassan',
        date: '2024-01-25',
        duration: '42:18',
        fileSize: '82.5 MB',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: '/sermons/thumbnails/family-values.jpg',
        category: 'Family Lecture',
        status: 'Published',
        views: 4567,
        downloads: 289,
        language: 'Bangla',
        topic: 'Family',
        type: 'video'
      }
    ];
  }

  // Increment views
  static incrementViews(id: string): void {
    const sermon = this.getSermons().find(s => s.id === id);
    if (sermon) {
      this.updateSermon(id, { views: sermon.views + 1 });
    }
  }

  // Increment downloads
  static incrementDownloads(id: string): void {
    const sermon = this.getSermons().find(s => s.id === id);
    if (sermon) {
      this.updateSermon(id, { downloads: sermon.downloads + 1 });
    }
  }
}

export default SermonStorage;
