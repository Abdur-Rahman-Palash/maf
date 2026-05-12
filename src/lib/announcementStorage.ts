'use client';

export interface AnnouncementItem {
  id: number;
  title: string;
  content: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt?: string;
  expiresAt: string;
}

const STORAGE_KEY = 'mosque_announcements';

class AnnouncementStorage {
  static getAnnouncements(): AnnouncementItem[] {
    if (typeof window === 'undefined') return this.getDefaultAnnouncements();

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return this.getDefaultAnnouncements();
      const parsed = JSON.parse(stored) as AnnouncementItem[];
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : this.getDefaultAnnouncements();
    } catch (error) {
      console.error('AnnouncementStorage.getAnnouncements error:', error);
      return this.getDefaultAnnouncements();
    }
  }

  static saveAnnouncements(announcements: AnnouncementItem[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
    } catch (error) {
      console.error('AnnouncementStorage.saveAnnouncements error:', error);
    }
  }

  static addAnnouncement(data: Omit<AnnouncementItem, 'id' | 'createdAt'>): AnnouncementItem {
    const announcements = this.getAnnouncements();
    const newAnnouncement: AnnouncementItem = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    const updated = [...announcements, newAnnouncement];
    this.saveAnnouncements(updated);
    return newAnnouncement;
  }

  static updateAnnouncement(id: number, updates: Partial<Omit<AnnouncementItem, 'id' | 'createdAt'>>): AnnouncementItem | null {
    const announcements = this.getAnnouncements();
    const index = announcements.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updated = {
      ...announcements[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    announcements[index] = updated;
    this.saveAnnouncements(announcements);
    return updated;
  }

  static deleteAnnouncement(id: number): boolean {
    const announcements = this.getAnnouncements();
    const filtered = announcements.filter((item) => item.id !== id);
    if (filtered.length === announcements.length) return false;
    this.saveAnnouncements(filtered);
    return true;
  }

  static getDefaultAnnouncements(): AnnouncementItem[] {
    return [
      {
        id: 1,
        title: "Jumu'ah Prayer Reminder",
        content: 'Every Friday at 1:30 PM - Please arrive early',
        type: 'prayer',
        priority: 'high',
        status: 'active',
        createdAt: '2024-05-10T10:00:00Z',
        expiresAt: '2024-12-31T23:59:59Z'
      },
      {
        id: 2,
        title: 'Ramadan Mubarak',
        content: 'Join us for daily Iftar and Taraweeh prayers',
        type: 'event',
        priority: 'high',
        status: 'active',
        createdAt: '2024-03-10T10:00:00Z',
        expiresAt: '2024-04-10T23:59:59Z'
      },
      {
        id: 3,
        title: 'Weekend Islamic School',
        content: 'Saturdays & Sundays 10 AM - 2 PM',
        type: 'education',
        priority: 'medium',
        status: 'active',
        createdAt: '2024-01-15T10:00:00Z',
        expiresAt: '2024-12-31T23:59:59Z'
      }
    ];
  }
}

export default AnnouncementStorage;
