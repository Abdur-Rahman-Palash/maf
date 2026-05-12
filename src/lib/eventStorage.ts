'use client';

// Event Storage System
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  organizer: string;
  maxAttendees: number;
  currentAttendees: number;
  image: string;
}

class EventStorage {
  private static readonly STORAGE_KEY = 'mosque_events';

  // Get all events from localStorage
  static getEvents(): Event[] {
    console.log('EventStorage.getEvents() called');
    if (typeof window === 'undefined') {
      console.log('EventStorage: window is undefined, returning empty array');
      return [];
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      console.log('EventStorage: localStorage data exists:', !!stored);
      if (stored) {
        const events = JSON.parse(stored);
        console.log('EventStorage: Loaded events from localStorage:', events.length);
        console.log('EventStorage: Events from storage:', events.map((e: Event) => ({
          id: e.id,
          title: e.title,
          date: e.date,
          status: e.status
        })));
        return events;
      } else {
        console.log('EventStorage: No data in localStorage, loading defaults');
      }
    } catch (error) {
      console.error('Error loading events from storage:', error);
    }
    
    // Return default events if no stored data
    const defaultEvents = this.getDefaultEvents();
    console.log('EventStorage: Returning default events:', defaultEvents.length);
    console.log('EventStorage: Default events:', defaultEvents.map((e: Event) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      status: e.status
    })));
    return defaultEvents;
  }

  // Save events to localStorage
  static saveEvents(events: Event[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to storage:', error);
    }
  }

  // Clear all events (useful for testing)
  static clearEvents(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing events:', error);
    }
  }

  // Reset events to defaults (useful for updating old events)
  static resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const defaultEvents = this.getDefaultEvents();
      this.saveEvents(defaultEvents);
    } catch (error) {
      console.error('Error resetting events:', error);
    }
  }

  // Add a new event
  static addEvent(event: Omit<Event, 'id'>): Event {
    const events = this.getEvents();
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      currentAttendees: 0
    };
    
    events.push(newEvent);
    this.saveEvents(events);
    return newEvent;
  }

  // Update an event
  static updateEvent(id: string, updates: Partial<Event>): Event | null {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === id);
    
    if (index !== -1) {
      events[index] = { ...events[index], ...updates };
      this.saveEvents(events);
      return events[index];
    }
    
    return null;
  }

  // Delete an event
  static deleteEvent(id: string): boolean {
    const events = this.getEvents();
    const filteredEvents = events.filter(e => e.id !== id);
    
    if (filteredEvents.length < events.length) {
      this.saveEvents(filteredEvents);
      return true;
    }
    
    return false;
  }

  // Get default events
  static getDefaultEvents(): Event[] {
    return [
      {
        id: '1',
        title: 'Friday Jumu\'ah Prayer',
        description: 'Weekly congregational prayer with sermon',
        date: '2026-05-09',
        time: '1:00 PM',
        location: 'Main Prayer Hall',
        category: 'Prayer',
        status: 'Upcoming',
        organizer: 'Imam Abdullah',
        maxAttendees: 500,
        currentAttendees: 0,
        image: '/events/friday-prayer.jpg'
      },
      {
        id: '2',
        title: 'Islamic Lecture Series',
        description: 'Weekly educational lecture on Islamic topics',
        date: '2026-05-10',
        time: '7:00 PM',
        location: 'Community Hall',
        category: 'Education',
        status: 'Upcoming',
        organizer: 'Sheikh Khalid',
        maxAttendees: 200,
        currentAttendees: 0,
        image: '/events/lecture-series.jpg'
      },
      {
        id: '3',
        title: 'Ramadan Iftar Dinner',
        description: 'Community iftar dinner during Ramadan',
        date: '2026-05-15',
        time: '6:30 PM',
        location: 'Community Center',
        category: 'Community',
        status: 'Upcoming',
        organizer: 'Ramadan Committee',
        maxAttendees: 300,
        currentAttendees: 0,
        image: '/events/iftar-dinner.jpg'
      },
      {
        id: '4',
        title: 'Eid Celebration',
        description: 'Eid al-Fitr celebration with prayers and festivities',
        date: '2026-05-20',
        time: '10:00 AM',
        location: 'Main Prayer Hall',
        category: 'Celebration',
        status: 'Upcoming',
        organizer: 'Imam Abdullah',
        maxAttendees: 1000,
        currentAttendees: 0,
        image: '/events/eid-celebration.jpg'
      },
      {
        id: '5',
        title: 'Youth Islamic Study Circle',
        description: 'Weekly study circle for young Muslims',
        date: '2026-05-12',
        time: '6:00 PM',
        location: 'Library Room',
        category: 'Education',
        status: 'Upcoming',
        organizer: 'Youth Coordinator',
        maxAttendees: 50,
        currentAttendees: 0,
        image: '/events/youth-study.jpg'
      },
      {
        id: '6',
        title: 'Charity Fundraiser',
        description: 'Monthly charity fundraiser for community projects',
        date: '2026-05-18',
        time: '2:00 PM',
        location: 'Community Center',
        category: 'Charity',
        status: 'Upcoming',
        organizer: 'Charity Committee',
        maxAttendees: 150,
        currentAttendees: 0,
        image: '/events/charity-fundraiser.jpg'
      }
    ];
  }

  // Increment attendees
  static incrementAttendees(id: string): void {
    const event = this.getEvents().find(e => e.id === id);
    if (event && event.currentAttendees < event.maxAttendees) {
      this.updateEvent(id, { currentAttendees: event.currentAttendees + 1 });
    }
  }

  // Update event status
  static updateEventStatus(id: string, status: Event['status']): void {
    this.updateEvent(id, { status });
  }
}

export default EventStorage;
