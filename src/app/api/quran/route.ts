import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const surah = searchParams.get('surah');
  const ayah = searchParams.get('ayah');

  if (!surah || !ayah) {
    return NextResponse.json(
      { error: 'Surah and Ayah parameters are required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `http://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.sahih`,
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
    console.error('Quran API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Quran verse' },
      { status: 500 }
    );
  }
}
