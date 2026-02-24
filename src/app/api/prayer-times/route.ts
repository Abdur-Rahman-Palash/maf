import { NextResponse } from 'next/server';

// Mock database for prayer times (in production, this would be a real database)
let prayerTimes: any[] = [];
let activePrayerTime: any = null;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    
    if (active === 'true') {
      // Return active prayer time
      if (activePrayerTime) {
        return NextResponse.json(activePrayerTime, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      } else {
        // Return default prayer times if no active one set
        const defaultPrayerTimes = {
          id: 1,
          fajr_begins: '05:45',
          fajr_jamaat: '06:00',
          dhuhr_begins: '13:00',
          dhuhr_jamaat: '13:30',
          asr_begins: '15:30',
          asr_jamaat: '16:00',
          maghrib_begins: '18:15',
          maghrib_jamaat: '18:15',
          isha_begins: '19:30',
          isha_jamaat: '20:00',
          jumuah_time: '13:30',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Set as active if not already set
        if (!activePrayerTime) {
          activePrayerTime = defaultPrayerTimes;
          prayerTimes.push(defaultPrayerTimes);
        }
        
        return NextResponse.json(defaultPrayerTimes, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
    }
    
    // Return all prayer times
    return NextResponse.json(prayerTimes, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Prayer Times API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prayer times' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create new prayer time
    const newPrayerTime = {
      id: Date.now(),
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    prayerTimes.push(newPrayerTime);
    
    // If this is the first prayer time or explicitly set as active, activate it
    if (!activePrayerTime || body.is_active) {
      // Deactivate all others
      prayerTimes.forEach(pt => pt.is_active = false);
      newPrayerTime.is_active = true;
      activePrayerTime = newPrayerTime;
    }
    
    return NextResponse.json(newPrayerTime, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Create Prayer Time Error:', error);
    return NextResponse.json(
      { error: 'Failed to create prayer time' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const activate = searchParams.get('activate');
    
    if (activate === 'true' && id) {
      // Activate specific prayer time
      const prayerTimeId = parseInt(id);
      const prayerTime = prayerTimes.find(pt => pt.id === prayerTimeId);
      
      if (!prayerTime) {
        return NextResponse.json(
          { error: 'Prayer time not found' },
          { status: 404 }
        );
      }
      
      // Deactivate all others and activate this one
      prayerTimes.forEach(pt => pt.is_active = false);
      prayerTime.is_active = true;
      prayerTime.updated_at = new Date().toISOString();
      activePrayerTime = prayerTime;
      
      return NextResponse.json(prayerTime, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
    
    // Update prayer time
    const body = await request.json();
    const prayerTimeId = parseInt(id || '0');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Prayer time ID is required' },
        { status: 400 }
      );
    }
    
    const prayerTimeIndex = prayerTimes.findIndex(pt => pt.id === prayerTimeId);
    
    if (prayerTimeIndex === -1) {
      return NextResponse.json(
        { error: 'Prayer time not found' },
        { status: 404 }
      );
    }
    
    prayerTimes[prayerTimeIndex] = {
      ...prayerTimes[prayerTimeIndex],
      ...body,
      updated_at: new Date().toISOString()
    };
    
    // If this prayer time was activated, update activePrayerTime
    if (body.is_active) {
      prayerTimes.forEach(pt => pt.is_active = false);
      prayerTimes[prayerTimeIndex].is_active = true;
      activePrayerTime = prayerTimes[prayerTimeIndex];
    }
    
    return NextResponse.json(prayerTimes[prayerTimeIndex], {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Update Prayer Time Error:', error);
    return NextResponse.json(
      { error: 'Failed to update prayer time' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Prayer time ID is required' },
        { status: 400 }
      );
    }
    
    const prayerTimeId = parseInt(id || '0');
    const prayerTimeIndex = prayerTimes.findIndex(pt => pt.id === prayerTimeId);
    
    if (prayerTimeIndex === -1) {
      return NextResponse.json(
        { error: 'Prayer time not found' },
        { status: 404 }
      );
    }
    
    // If deleting the active prayer time, clear activePrayerTime
    if (activePrayerTime && activePrayerTime.id === prayerTimeId) {
      activePrayerTime = null;
    }
    
    prayerTimes.splice(prayerTimeIndex, 1);
    
    return NextResponse.json(
      { message: 'Prayer time deleted successfully' },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    console.error('Delete Prayer Time Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete prayer time' },
      { status: 500 }
    );
  }
}
