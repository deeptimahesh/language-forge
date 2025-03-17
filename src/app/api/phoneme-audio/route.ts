import { NextResponse } from 'next/server';
import { getAudioUrl } from '@/lib/phonology/audioUtils';

export async function GET(request: Request) {
  try {
    // Get the phoneme symbol from the query parameters
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol');
    
    if (!symbol) {
      return NextResponse.json(
        { error: 'Phoneme symbol is required' },
        { status: 400 }
      );
    }
    
    // Get the audio URL for the phoneme
    const audioUrl = getAudioUrl(symbol);
    
    if (!audioUrl) {
      return NextResponse.json(
        { error: `No audio available for "${symbol}"` },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ url: audioUrl });
  } catch (error) {
    console.error('Error getting phoneme audio:', error);
    
    return NextResponse.json(
      { error: 'Failed to get audio' },
      { status: 500 }
    );
  }
} 