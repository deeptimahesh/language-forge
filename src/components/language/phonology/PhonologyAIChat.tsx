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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  // Convert our message format to the format expected by the API
  const formatMessagesForAPI = (messages: Message[]) => {
    return messages
      .filter(msg => msg.id !== '1') // Skip the initial greeting
      .map(msg => ({
        role: msg.sender,
        content: msg.text
      }));
  };

  // Send message to AI and get response
  const processMessageWithAI = async (message: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Only format actual messages, not the initial greeting
      const historyForAPI = formatMessagesForAPI(messages);
      
      const response = await fetch('/api/phonology-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: historyForAPI,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add AI response to messages
      const aiResponse = data.text;
      const suggestedPhonemes = data.suggestedPhonemes || [];
      
      // Create a properly formatted AI message
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        suggestedPhonemes: suggestedPhonemes,
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Failed to process message with AI:', err);
      setError('Failed to get AI response. Please try again later.');
      
      // Add error message as AI response
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error processing your request.',
        sender: 'ai',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPhonemeClick = (phoneme: string) => {
    if (onSelectPhoneme) {
      onSelectPhoneme(phoneme);
    }
  };

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    }]);
    setInputValue('');
    
    // Process with AI
    await processMessageWithAI(userMessage);
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
            
            {/* Phoneme suggestions as separate buttons */}
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
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center py-2">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}
        
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
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'
            } text-white rounded-r-md px-4 py-2 transition-colors`}
            disabled={!inputValue.trim() || isLoading}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
} 