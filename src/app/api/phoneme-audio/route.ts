import { NextResponse } from 'next/server';
import { getAudioUrl } from '@/lib/phonology/audioUtils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  
  if (!symbol) {
    return NextResponse.json(
      { error: 'Symbol parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const audioUrl = getAudioUrl(symbol);
    
    if (!audioUrl) {
      return NextResponse.json(
        { error: 'No audio available for this symbol' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ url: audioUrl });
    
  } catch (error) {
    console.error('Error fetching audio URL:', error);
    return NextResponse.json(
      { error: 'Failed to get audio URL' },
      { status: 500 }
    );
  }
} 