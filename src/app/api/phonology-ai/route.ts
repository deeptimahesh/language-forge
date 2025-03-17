import { NextResponse } from 'next/server';
import { PhonologyChain } from '@/lib/langchain/phonologyChain';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message, history } = body;
    
    // Check if message exists
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }
    
    // Initialize the phonology chain
    const phonologyChain = new PhonologyChain({
      temperature: 0.7,
    });
    
    // Process the message
    const response = await phonologyChain.processMessage({
      message,
      history,
    });
    
    // Return the response
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error processing phonology AI request:', error);
    
    return NextResponse.json(
      { error: 'Failed to process phonology AI request' },
      { status: 500 }
    );
  }
} 