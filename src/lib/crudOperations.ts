// CRUD Operations for Admin Dashboard

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxAttendees?: number;
  currentAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
  role: 'member' | 'volunteer' | 'admin';
  skills?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  type: 'one-time' | 'monthly' | 'zakat' | 'sadaqa';
  purpose: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  date: string;
  recurring?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  title: string;
  type: 'sermon' | 'announcement' | 'blog' | 'page';
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Storage keys
const STORAGE_KEYS = {
  EVENTS: 'admin_events',
  MEMBERS: 'admin_members',
  DONATIONS: 'admin_donations',
  CONTENT: 'admin_content'
};

// Generic CRUD operations
class CRUDManager<T extends { id: string; createdAt: string; updatedAt: string }> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  private getItems(): T[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private setItems(items: T[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const items = this.getItems();
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as T;

    items.push(newItem);
    this.setItems(items);
    return newItem;
  }

  read(id?: string): T[] | T | null {
    const items = this.getItems();
    if (id) {
      return items.find(item => item.id === id) || null;
    }
    return items;
  }

  readAll(): T[] {
    return this.getItems();
  }

  update(id: string, updates: Partial<Omit<T, 'id' | 'createdAt'>>): T | null {
    const items = this.getItems();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;

    const updatedItem = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    items[index] = updatedItem;
    this.setItems(items);
    return updatedItem;
  }

  delete(id: string): boolean {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    this.setItems(filteredItems);
    return true;
  }

  search(query: string, fields: (keyof T)[]): T[] {
    const items = this.getItems();
    const lowercaseQuery = query.toLowerCase();
    
    return items.filter(item => 
      fields.some(field => 
        String(item[field]).toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  filter(predicate: (item: T) => boolean): T[] {
    const items = this.getItems();
    return items.filter(predicate);
  }

  sort(field: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    const items = this.getItems();
    return [...items].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

// Export specific managers
export const eventManager = new CRUDManager<Event>(STORAGE_KEYS.EVENTS);
export const memberManager = new CRUDManager<Member>(STORAGE_KEYS.MEMBERS);
export const donationManager = new CRUDManager<Donation>(STORAGE_KEYS.DONATIONS);
export const contentManager = new CRUDManager<Content>(STORAGE_KEYS.CONTENT);

// Initialize sample data if empty
export const initializeSampleData = () => {
  if (typeof window === 'undefined') return;

  // Sample Events
  if (eventManager.readAll().length === 0) {
    const sampleEvents: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        title: 'Friday Prayer',
        description: 'Weekly Jumu\'ah prayer congregation',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '13:00',
        location: 'Main Prayer Hall',
        category: 'Prayer',
        maxAttendees: 500,
        currentAttendees: 245,
        status: 'upcoming'
      },
      {
        title: 'Islamic Study Circle',
        description: 'Weekly Quran and Hadith study session',
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        time: '19:00',
        location: 'Community Hall',
        category: 'Education',
        maxAttendees: 50,
        currentAttendees: 12,
        status: 'upcoming'
      }
    ];

    sampleEvents.forEach(event => eventManager.create(event));
  }

  // Sample Members
  if (memberManager.readAll().length === 0) {
    const sampleMembers: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Ahmed Rahman',
        email: 'ahmed@example.com',
        phone: '+8801234567890',
        address: '123 Main St, Dhaka',
        joinDate: '2024-01-15',
        status: 'active',
        role: 'member',
        skills: ['Quran Recitation', 'Teaching']
      },
      {
        name: 'Fatima Khan',
        email: 'fatima@example.com',
        phone: '+8801234567891',
        address: '456 Oak Ave, Dhaka',
        joinDate: '2024-02-20',
        status: 'active',
        role: 'volunteer',
        skills: ['Event Management', 'Community Outreach']
      }
    ];

    sampleMembers.forEach(member => memberManager.create(member));
  }

  // Sample Donations
  if (donationManager.readAll().length === 0) {
    const sampleDonations: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        donorName: 'Mohammed Ali',
        email: 'mohammed@example.com',
        amount: 5000,
        type: 'zakat',
        purpose: 'Mosque Maintenance',
        status: 'completed',
        paymentMethod: 'Bank Transfer',
        date: new Date().toISOString().split('T')[0]
      },
      {
        donorName: 'Aisha Begum',
        email: 'aisha@example.com',
        amount: 1000,
        type: 'sadaqa',
        purpose: 'Community Programs',
        status: 'completed',
        paymentMethod: 'Cash',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
      }
    ];

    sampleDonations.forEach(donation => donationManager.create(donation));
  }

  // Sample Content
  if (contentManager.readAll().length === 0) {
    const sampleContent: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        title: 'Welcome to Our Mosque',
        type: 'page',
        content: 'We welcome you to our peaceful mosque community...',
        author: 'Admin',
        status: 'published',
        publishDate: new Date().toISOString().split('T')[0],
        tags: ['welcome', 'community']
      },
      {
        title: 'Ramadan Preparation Guide',
        type: 'blog',
        content: 'Preparing for the blessed month of Ramadan...',
        author: 'Imam Abdullah',
        status: 'published',
        publishDate: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        tags: ['ramadan', 'spiritual', 'guide']
      }
    ];

    sampleContent.forEach(content => contentManager.create(content));
  }
};

// Statistics utilities
export const getDashboardStats = () => {
  const events = eventManager.readAll();
  const members = memberManager.readAll();
  const donations = donationManager.readAll();
  const content = contentManager.readAll();

  return {
    totalEvents: events.length,
    upcomingEvents: events.filter((e: Event) => e.status === 'upcoming').length,
    totalMembers: members.length,
    activeMembers: members.filter((m: Member) => m.status === 'active').length,
    totalDonations: donations.length,
    monthlyDonations: donations
      .filter((d: Donation) => {
        const donationDate = new Date(d.date);
        const now = new Date();
        return donationDate.getMonth() === now.getMonth() && 
               donationDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum: number, d: Donation) => sum + d.amount, 0),
    totalContent: content.length,
    publishedContent: content.filter((c: Content) => c.status === 'published').length
  };
};
