// Prayer Times Storage - Shared between admin dashboard and main website

export interface PrayerTime {
  id: number;
  fajr_begins: string;
  fajr_jamaat: string;
  dhuhr_begins: string;
  dhuhr_jamaat: string;
  asr_begins: string;
  asr_jamaat: string;
  maghrib_begins: string;
  maghrib_jamaat: string;
  isha_begins: string;
  isha_jamaat: string;
  date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class PrayerTimesStorage {
  private static readonly STORAGE_KEY = 'masjid_prayer_times';

  // Get all prayer times
  static getPrayerTimes(): PrayerTime[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : this.getDefaultPrayerTimes();
    } catch (error) {
      console.error('Error loading prayer times:', error);
      return this.getDefaultPrayerTimes();
    }
  }

  // Save prayer times
  static savePrayerTimes(prayerTimes: PrayerTime[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prayerTimes));
    } catch (error) {
      console.error('Error saving prayer times:', error);
    }
  }

  // Get active prayer times
  static getActivePrayerTimes(): PrayerTime | null {
    const prayerTimes = this.getPrayerTimes();
    return prayerTimes.find(pt => pt.is_active) || null;
  }

  // Add prayer time
  static addPrayerTime(prayerTime: Omit<PrayerTime, 'id' | 'created_at' | 'updated_at'>): PrayerTime {
    const prayerTimes = this.getPrayerTimes();
    const newPrayerTime: PrayerTime = {
      ...prayerTime,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    prayerTimes.push(newPrayerTime);
    this.savePrayerTimes(prayerTimes);
    
    return newPrayerTime;
  }

  // Update prayer time
  static updatePrayerTime(id: number, updates: Partial<PrayerTime>): PrayerTime | null {
    const prayerTimes = this.getPrayerTimes();
    const index = prayerTimes.findIndex(pt => pt.id === id);
    
    if (index === -1) return null;
    
    prayerTimes[index] = {
      ...prayerTimes[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    this.savePrayerTimes(prayerTimes);
    return prayerTimes[index];
  }

  // Delete prayer time
  static deletePrayerTime(id: number): boolean {
    const prayerTimes = this.getPrayerTimes();
    const filteredPrayerTimes = prayerTimes.filter(pt => pt.id !== id);
    
    if (filteredPrayerTimes.length < prayerTimes.length) {
      this.savePrayerTimes(filteredPrayerTimes);
      return true;
    }
    
    return false;
  }

  // Activate prayer time
  static activatePrayerTime(id: number): PrayerTime | null {
    const prayerTimes = this.getPrayerTimes();
    
    // Deactivate all prayer times
    prayerTimes.forEach(pt => {
      pt.is_active = false;
    });
    
    // Activate the selected one
    const activePrayerTime = prayerTimes.find(pt => pt.id === id);
    if (activePrayerTime) {
      activePrayerTime.is_active = true;
      activePrayerTime.updated_at = new Date().toISOString();
      this.savePrayerTimes(prayerTimes);
      return activePrayerTime;
    }
    
    return null;
  }

  // Get default prayer times
  static getDefaultPrayerTimes(): PrayerTime[] {
    const today = new Date().toISOString().split('T')[0];
    
    return [
      {
        id: 1,
        fajr_begins: '05:26',
        fajr_jamaat: '05:45',
        dhuhr_begins: '13:34',
        dhuhr_jamaat: '13:45',
        asr_begins: '17:17',
        asr_jamaat: '17:30',
        maghrib_begins: '20:27',
        maghrib_jamaat: '20:30',
        isha_begins: '21:43',
        isha_jamaat: '21:55',
        date: today,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ];
  }

  // Sync with API (mock implementation for now)
  static async syncWithAPI(): Promise<void> {
    // This would sync with a real backend API
    // For now, we'll just ensure we have default data
    const prayerTimes = this.getPrayerTimes();
    if (prayerTimes.length === 0) {
      this.savePrayerTimes(this.getDefaultPrayerTimes());
    }
  }
}
