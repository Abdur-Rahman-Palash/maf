'use client';

// Quran Storage System
export interface QuranRecitation {
  id: string;
  title: string;
  description: string;
  reciter: string;
  surah: number;
  ayah: number;
  surahName: string;
  audioUrl: string;
  duration: string;
  fileSize: string;
  thumbnail: string;
  category: string;
  status: 'Published' | 'Draft' | 'Archived';
  views: number;
  downloads: number;
  language: string;
  uploadDate: string;
  type: 'audio' | 'video';
}

export interface QuranVerse {
  id: string;
  surah: number;
  ayah: number;
  arabicText: string;
  translation: string;
  transliteration: string;
  audioUrl: string;
  tafsir: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  tags: string[];
}

class QuranStorage {
  private static readonly RECITATIONS_KEY = 'mosque_quran_recitations';
  private static readonly VERSES_KEY = 'mosque_quran_verses';

  // === RECITATIONS CRUD ===

  // Get all recitations from localStorage
  static getRecitations(): QuranRecitation[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.RECITATIONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading recitations from storage:', error);
    }
    
    return this.getDefaultRecitations();
  }

  // Save recitations to localStorage
  static saveRecitations(recitations: QuranRecitation[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.RECITATIONS_KEY, JSON.stringify(recitations));
    } catch (error) {
      console.error('Error saving recitations to storage:', error);
    }
  }

  // Add a new recitation
  static addRecitation(recitation: Omit<QuranRecitation, 'id'>): QuranRecitation {
    const recitations = this.getRecitations();
    const newRecitation: QuranRecitation = {
      ...recitation,
      id: Date.now().toString(),
      views: 0,
      downloads: 0
    };
    
    recitations.push(newRecitation);
    this.saveRecitations(recitations);
    return newRecitation;
  }

  // Update a recitation
  static updateRecitation(id: string, updates: Partial<QuranRecitation>): QuranRecitation | null {
    const recitations = this.getRecitations();
    const index = recitations.findIndex(r => r.id === id);
    
    if (index !== -1) {
      recitations[index] = { ...recitations[index], ...updates };
      this.saveRecitations(recitations);
      return recitations[index];
    }
    
    return null;
  }

  // Delete a recitation
  static deleteRecitation(id: string): boolean {
    const recitations = this.getRecitations();
    const filteredRecitations = recitations.filter(r => r.id !== id);
    
    if (filteredRecitations.length < recitations.length) {
      this.saveRecitations(filteredRecitations);
      return true;
    }
    
    return false;
  }

  // Get default recitations
  static getDefaultRecitations = (): QuranRecitation[] => {
    return [
      {
        id: '1',
        title: 'Surah Al-Fatiha',
        description: 'The Opening - Beautiful recitation by Abdul Basit',
        reciter: 'Abdul Basit Abdul Samad',
        surah: 1,
        ayah: 7,
        surahName: 'Al-Fatiha',
        audioUrl: 'https://download.quranicaudio.com/quran/mishaari_raad/001.mp3',
        duration: '3:45',
        fileSize: '2.8 MB',
        thumbnail: '/quran/thumbnails/al-fatiha.jpg',
        category: 'Daily Recitation',
        status: 'Published',
        views: 1250,
        downloads: 89,
        language: 'Arabic',
        uploadDate: '2024-02-01',
        type: 'audio'
      },
      {
        id: '2',
        title: 'Surah Ar-Rahman Recitation',
        description: 'The Chapter of Mercy, recited with beautiful tajweed',
        reciter: 'Qari Abdul Basit',
        surah: 55,
        ayah: 78,
        surahName: 'Ar-Rahman',
        audioUrl: 'https://download.quranicaudio.com/quran/abdul_basit/055.mp3',
        duration: '8:23',
        fileSize: '6.4 MB',
        thumbnail: '/quran/thumbnails/ar-rahman.jpg',
        category: 'Memorization',
        status: 'Published',
        views: 2890,
        downloads: 156,
        language: 'Arabic',
        uploadDate: '2024-01-28',
        type: 'audio'
      }
    ];
  }

  // === VERSES CRUD ===

  // Get all verses from localStorage
  static getVerses(): QuranVerse[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.VERSES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading verses from storage:', error);
    }
    
    return this.getDefaultVerses();
  }

  // Save verses to localStorage
  static saveVerses(verses: QuranVerse[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.VERSES_KEY, JSON.stringify(verses));
    } catch (error) {
      console.error('Error saving verses to storage:', error);
    }
  }

  // Add a new verse
  static addVerse(verse: Omit<QuranVerse, 'id'>): QuranVerse {
    const verses = this.getVerses();
    const newVerse: QuranVerse = {
      ...verse,
      id: Date.now().toString()
    };
    
    verses.push(newVerse);
    this.saveVerses(verses);
    return newVerse;
  }

  // Update a verse
  static updateVerse(id: string, updates: Partial<QuranVerse>): QuranVerse | null {
    const verses = this.getVerses();
    const index = verses.findIndex(v => v.id === id);
    
    if (index !== -1) {
      verses[index] = { ...verses[index], ...updates };
      this.saveVerses(verses);
      return verses[index];
    }
    
    return null;
  }

  // Delete a verse
  static deleteVerse(id: string): boolean {
    const verses = this.getVerses();
    const filteredVerses = verses.filter(v => v.id !== id);
    
    if (filteredVerses.length < verses.length) {
      this.saveVerses(filteredVerses);
      return true;
    }
    
    return false;
  }

  // Get default verses
  static getDefaultVerses = (): QuranVerse[] => {
    return [
      {
        id: '1',
        surah: 1,
        ayah: 1,
        arabicText: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        transliteration: 'Bismillah ir-Rahman ir-Raheem',
        audioUrl: 'https://download.quranicaudio.com/quran/mishaari_raad/001001.mp3',
        tafsir: 'This is the opening verse of the Quran, recited before beginning any task.',
        difficulty: 'easy',
        topic: 'Basmala',
        tags: ['opening', 'mercy', 'allah']
      },
      {
        id: '2',
        surah: 1,
        ayah: 2,
        arabicText: 'ٱلْحَمْدُ لِلَّٰهِ رَبِّ ٱلْعَٰلَمِينَ',
        translation: 'All praise is due to Allah, Lord of the worlds.',
        transliteration: 'Alhamdulillahi rabbil alameen',
        audioUrl: 'https://download.quranicaudio.com/quran/mishaari_raad/001002.mp3',
        tafsir: 'All praise belongs to Allah alone, who is the Creator and Sustainer of all worlds.',
        difficulty: 'easy',
        topic: 'Praise',
        tags: ['praise', 'lord', 'worlds']
      }
    ];
  }

  // === UTILITY FUNCTIONS ===

  // Increment views for recitation
  static incrementRecitationViews(id: string): void {
    const recitation = this.getRecitations().find(r => r.id === id);
    if (recitation) {
      this.updateRecitation(id, { views: recitation.views + 1 });
    }
  }

  // Increment downloads for recitation
  static incrementRecitationDownloads(id: string): void {
    const recitation = this.getRecitations().find(r => r.id === id);
    if (recitation) {
      this.updateRecitation(id, { downloads: recitation.downloads + 1 });
    }
  }

  // Get recitations by category
  static getRecitationsByCategory(category: string): QuranRecitation[] {
    return this.getRecitations().filter(r => r.category === category);
  }

  // Get recitations by status
  static getRecitationsByStatus(status: QuranRecitation['status']): QuranRecitation[] {
    return this.getRecitations().filter(r => r.status === status);
  }

  // Search recitations
  static searchRecitations(query: string): QuranRecitation[] {
    const recitations = this.getRecitations();
    const lowercaseQuery = query.toLowerCase();
    
    return recitations.filter(r => 
      r.title.toLowerCase().includes(lowercaseQuery) ||
      r.reciter.toLowerCase().includes(lowercaseQuery) ||
      r.surahName.toLowerCase().includes(lowercaseQuery) ||
      r.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Clear all data (for testing)
  static clearAll(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.RECITATIONS_KEY);
      localStorage.removeItem(this.VERSES_KEY);
      console.log('Quran storage cleared');
    } catch (error) {
      console.error('Error clearing Quran storage:', error);
    }
  }
}

export default QuranStorage;
