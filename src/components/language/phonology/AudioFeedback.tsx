'use client';

import React, { useEffect, useState } from 'react';

interface AudioFeedbackProps {
  isPlaying: boolean;
  symbol: string;
  error: string | null;
}

export default function AudioFeedback({ 
  isPlaying, 
  symbol, 
  error
}: AudioFeedbackProps) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [wasPlaying, setWasPlaying] = useState(false);
  
  useEffect(() => {
    // Show feedback when audio is playing or there's an error
    if (isPlaying || error) {
      setVisible(true);
      setMessage(error || `Playing sound for "${symbol}"`);
      
      if (isPlaying) {
        setWasPlaying(true);
      }
    } else if (wasPlaying) {
      // Audio just finished playing
      setMessage(`Sound for "${symbol}" finished playing`);
      setWasPlaying(false);
      
      // Keep the message visible for a short time after playing finishes
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      // No audio playing and no error, hide the feedback
      setVisible(false);
    }
  }, [isPlaying, error, symbol, wasPlaying]);
  
  // Hide if not visible
  if (!visible) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className={`rounded-lg shadow-lg p-3 ${error ? 'bg-red-100 border-l-4 border-red-500' : 'bg-blue-100 border-l-4 border-blue-500'}`}>
        <div className="flex items-center">
          {error ? (
            // Error icon
            <div className="flex-shrink-0 mr-2">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            // Audio icon
            <div className="flex-shrink-0 mr-2">
              <div className={`${isPlaying ? 'animate-pulse' : ''}`}>
                <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
          <div>
            <div className="text-sm font-medium">
              {message}
            </div>
            
            {error && (
              <div className="mt-2">
                <a 
                  href={`https://en.wikipedia.org/wiki/Help:IPA/Introduction#${encodeURIComponent(symbol)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Learn more about this sound
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Create a client-side script for use with server-side rendering
export function getAudioFeedbackScript() {
  return `
    // Create audio feedback element
    function createAudioFeedback() {
      const feedbackDiv = document.createElement('div');
      feedbackDiv.id = 'audio-feedback';
      feedbackDiv.className = 'fixed bottom-4 right-4 z-50 max-w-md hidden';
      document.body.appendChild(feedbackDiv);
      
      return feedbackDiv;
    }
    
    // Show audio feedback
    function showAudioFeedback(message, isError = false) {
      const feedbackDiv = document.getElementById('audio-feedback') || createAudioFeedback();
      
      feedbackDiv.innerHTML = \`
        <div class="rounded-lg shadow-lg p-3 \${isError ? 'bg-red-100 border-l-4 border-red-500' : 'bg-blue-100 border-l-4 border-blue-500'}">
          <div class="flex items-center">
            \${isError 
              ? '<div class="flex-shrink-0 mr-2"><svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg></div>'
              : '<div class="flex-shrink-0 mr-2"><div class="animate-pulse"><svg class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clip-rule="evenodd" /></svg></div></div>'
            }
            <div>
              <div class="text-sm font-medium">
                \${message}
              </div>
            </div>
          </div>
        </div>
      \`;
      
      feedbackDiv.classList.remove('hidden');
      
      // Auto-hide after a few seconds if not an error
      if (!isError) {
        setTimeout(() => {
          feedbackDiv.classList.add('hidden');
        }, 3000);
      }
    }
    
    // Hide audio feedback
    function hideAudioFeedback() {
      const feedbackDiv = document.getElementById('audio-feedback');
      if (feedbackDiv) {
        feedbackDiv.classList.add('hidden');
      }
    }
  `;
} 