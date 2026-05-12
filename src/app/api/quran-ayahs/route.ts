import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Quran Ayah API: Request received');
    
    const body = await request.json();
    console.log('Quran Ayah API: Request body:', body);
    
    // Validate required fields
    if (!body || typeof body !== 'object') {
      console.error('Quran Ayah API: Invalid request body');
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    // Mock Quran API response
    const mockResponse = {
      success: true,
      data: {
        id: Date.now().toString(),
        surah: body.surah || 1,
        ayah: body.ayah || 1,
        arabic: body.arabic || `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ`,
        english_translation: body.english_translation || "In the name of Allah, the Entirely Merciful, the Especially Merciful. Peace be upon you and Allah's mercy and blessings.",
        urdu_translation: body.urdu_translation || "اللہ کے نام سے، بہت مہربان اور رحم فرمانے والے کے نام سے۔ آپ پر السلام، اللہ کی رحمت اور برکتیں ہوں۔",
        audio_url: body.audio_url || `https://audio.qurancdn.com/ayah/${(body.surah || 1).toString().padStart(3, '0')}${(body.ayah || 1).toString().padStart(3, '0')}.mp3`,
        status: body.status || 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    };

    console.log('Quran Ayah API: Response:', mockResponse);
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Quran Ayah API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Quran ayah', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Quran Ayah API - Use POST with surah and ayah numbers' 
  });
}
