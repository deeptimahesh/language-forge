'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestedPhonemes?: string[]; // Optional phoneme suggestions
}

interface PhonologyAIChatProps {
  onSelectPhoneme?: (phoneme: string) => void;
  className?: string;
}

export default function PhonologyAIChat({ onSelectPhoneme, className = '' }: PhonologyAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your language design assistant. Tell me about the language you want to create, and I'll help you select appropriate phonemes.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const suggestPhonemes = (input: string): string[] => {
    // This is a placeholder function that would be replaced with actual LangChain logic
    // For now, we'll just simulate some basic responses based on keywords
    
    // Convert input to lowercase for easier matching
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('romantic') || lowercaseInput.includes('romance') || lowercaseInput.includes('latin')) {
      return ['p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'f', 'v', 's', 'z', 'r', 'l', 'a', 'e', 'i', 'o', 'u'];
    } else if (lowercaseInput.includes('germanic') || lowercaseInput.includes('german') || lowercaseInput.includes('norse')) {
      return ['p', 'b', 't', 'd', 'k', 'g', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'h', 'r', 'l', 'm', 'n', 'j', 'w', 'a', 'e', 'i', 'o', 'u', 'y'];
    } else if (lowercaseInput.includes('slavic') || lowercaseInput.includes('russian') || lowercaseInput.includes('polish')) {
      return ['p', 'b', 't', 'd', 'k', 'g', 'f', 'v', 's', 'z', 'ʃ', 'ʒ', 'ts', 'tʃ', 'm', 'n', 'r', 'l', 'j', 'a', 'e', 'i', 'o', 'u', 'ɨ'];
    } else if (lowercaseInput.includes('japanese') || lowercaseInput.includes('simple')) {
      return ['p', 'b', 't', 'd', 'k', 'g', 's', 'z', 'h', 'm', 'n', 'r', 'w', 'j', 'a', 'e', 'i', 'o', 'u'];
    } else if (lowercaseInput.includes('complex') || lowercaseInput.includes('difficult') || lowercaseInput.includes('unique')) {
      return ['p', 'b', 't', 'd', 'k', 'g', 'q', 'ʔ', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'x', 'ɣ', 'h', 'm', 'n', 'ŋ', 'r', 'l', 'j', 'w', 'ts', 'dz', 'tʃ', 'dʒ', 'a', 'e', 'i', 'o', 'u', 'y', 'ø', 'æ', 'ɑ'];
    } else if (lowercaseInput.includes('clicks') || lowercaseInput.includes('african')) {
      return ['p', 't', 'k', 'b', 'd', 'g', 'm', 'n', 'ŋ', 'f', 's', 'h', 'ǀ', 'ǃ', 'ǂ', 'ǁ', 'a', 'e', 'i', 'o', 'u'];
    } else if (lowercaseInput.includes('tonal') || lowercaseInput.includes('chinese') || lowercaseInput.includes('asian')) {
      return ['p', 't', 'k', 'b', 'd', 'g', 'm', 'n', 'ŋ', 'f', 's', 'ʃ', 'h', 'l', 'j', 'w', 'a', 'e', 'i', 'o', 'u'];
    } else {
      // Default suggestion for when no specific keywords are found
      return ['p', 't', 'k', 'm', 'n', 's', 'l', 'r', 'w', 'j', 'a', 'e', 'i', 'o', 'u'];
    }
  };

  const handleSuggestedPhonemeClick = (phoneme: string) => {
    if (onSelectPhoneme) {
      onSelectPhoneme(phoneme);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Generate suggested phonemes based on user input
    const suggestedPhonemes = suggestPhonemes(inputValue);

    // Generate AI response
    setTimeout(() => {
      let responseText = "I'll help you create a language with those characteristics. ";
      
      if (suggestedPhonemes.length > 0) {
        responseText += "Based on your description, I suggest these phonemes:";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
        suggestedPhonemes: suggestedPhonemes
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-teal-500 text-white'
                    : 'bg-white text-gray-800 shadow'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
            
            {/* Phoneme suggestions */}
            {message.suggestedPhonemes && message.suggestedPhonemes.length > 0 && (
              <div className={`flex flex-wrap gap-1 mt-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.suggestedPhonemes.map((phoneme) => (
                  <button
                    key={phoneme}
                    onClick={() => handleSuggestedPhonemeClick(phoneme)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm font-mono"
                    title="Click to select this phoneme"
                  >
                    {phoneme}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form 
        onSubmit={handleSubmit} 
        className="flex-none p-3 bg-white border-t border-gray-200"
      >
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your language..."
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-500 text-white rounded-r-md px-4 py-2 hover:bg-teal-600"
            disabled={!inputValue.trim()}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
} 