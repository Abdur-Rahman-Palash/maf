import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch(
      'https://api.aladhan.com/v1/timingsByCity?city=Atlanta&country=US&method=2',
      {
        headers: {
          'Origin': 'https://maf-wqvi.vercel.app',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Add CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
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
