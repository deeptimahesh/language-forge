'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getAllConsonants, getAllVowels } from '@/lib/phonology/ipaData';
import { getAudioUrl } from '@/lib/phonology/audioUtils';
import { IpaSymbol, MannerOfArticulation, PlaceOfArticulation } from '@/types/phonology';
import AudioFeedback from './AudioFeedback';

interface PhonemeSelectorProps {
  initialConsonants?: string[];
  initialVowels?: string[];
  // Make the callback prop optional since we'll handle logging internally
  onPhonemeSelectionChange?: (consonants: string[], vowels: string[]) => void;
}

export default function PhonemeSelector({ 
  initialConsonants = [], 
  initialVowels = [],
  onPhonemeSelectionChange 
}: PhonemeSelectorProps) {
  // Get all available phonemes
  const allConsonants = getAllConsonants();
  const allVowels = getAllVowels();
  
  // State for selected phonemes
  const [selectedConsonants, setSelectedConsonants] = useState<Set<string>>(
    new Set(initialConsonants)
  );
  const [selectedVowels, setSelectedVowels] = useState<Set<string>>(
    new Set(initialVowels)
  );
  
  // State for audio playback
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  
  // Use ref for audio element to maintain a single instance
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle internal logging and state updates when selections change
  useEffect(() => {
    console.log('Selected consonants:', Array.from(selectedConsonants));
    console.log('Selected vowels:', Array.from(selectedVowels));
    
    // Only call the callback if it was provided
    if (onPhonemeSelectionChange) {
      onPhonemeSelectionChange(
        Array.from(selectedConsonants), 
        Array.from(selectedVowels)
      );
    }
  }, [selectedConsonants, selectedVowels, onPhonemeSelectionChange]);
  
  // Initialize audio element
  useEffect(() => {
    // Create the audio element if it doesn't exist
    if (!audioRef.current) {
      // The audio element is now created in the render method using the HTML5 approach
      audioRef.current = document.getElementById('phoneme-audio') as HTMLAudioElement;
      
      if (audioRef.current) {
        // Add event listeners
        audioRef.current.addEventListener('ended', () => {
          console.log('Audio playback ended');
          setPlayingAudio(null);
        });
        
        audioRef.current.addEventListener('error', (e) => {
          console.error('Audio error:', e);
          const error = e as ErrorEvent;
          const mediaError = (e.target as HTMLMediaElement).error;
          
          let errorMessage = "Could not play audio. ";
          if (mediaError) {
            // Add more detailed error information
            switch (mediaError.code) {
              case MediaError.MEDIA_ERR_ABORTED:
                errorMessage += "Playback aborted by the user.";
                break;
              case MediaError.MEDIA_ERR_NETWORK:
                errorMessage += "Network error occurred while loading the audio.";
                break;
              case MediaError.MEDIA_ERR_DECODE:
                errorMessage += "Audio decoding error. The file may be corrupted.";
                break;
              case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                errorMessage += "The audio format is not supported by your browser.";
                break;
              default:
                errorMessage += "Unknown error occurred.";
            }
          } else if (error && error.message) {
            errorMessage += error.message;
          }
          
          setAudioError(errorMessage);
          setPlayingAudio(null);
        });
        
        // Add canplaythrough event listener
        audioRef.current.addEventListener('canplaythrough', () => {
          console.log('Audio can play through without buffering');
        });
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        // Don't set to null here as it's a DOM element
      }
    };
  }, []);
  
  // Toggle phoneme selection
  const toggleConsonant = (symbol: string) => {
    const newSelection = new Set(selectedConsonants);
    if (newSelection.has(symbol)) {
      newSelection.delete(symbol);
    } else {
      newSelection.add(symbol);
    }
    setSelectedConsonants(newSelection);
  };
  
  const toggleVowel = (symbol: string) => {
    const newSelection = new Set(selectedVowels);
    if (newSelection.has(symbol)) {
      newSelection.delete(symbol);
    } else {
      newSelection.add(symbol);
    }
    setSelectedVowels(newSelection);
  };

  // Play audio for a phoneme
  const handlePlayAudio = async (event: React.MouseEvent, symbol: string) => {
    event.stopPropagation(); // Prevent toggling the phoneme selection
    
    // Clear any previous error
    setAudioError(null);
    
    // Check if the audio is already playing
    if (playingAudio === symbol) {
      return; // Don't restart if already playing
    }
    
    try {
      // Get the audio URL for this symbol
      let audioUrl = getAudioUrl(symbol);
      
      if (!audioUrl) {
        throw new Error("No audio available for this phoneme");
      }
      
      console.log(`Attempting to play audio for ${symbol} from: ${audioUrl}`);
      
      // Set that we're trying to play
      setPlayingAudio(symbol);
      
      const audioElement = document.getElementById('phoneme-audio') as HTMLAudioElement;
      if (audioElement) {
        // Set source attributes using proper HTML5 format
        const sourceElement = document.getElementById('phoneme-audio-source') as HTMLSourceElement;
        if (sourceElement) {
          sourceElement.src = audioUrl;
          sourceElement.type = 'audio/mpeg'; // Set proper MIME type
          
          // Force reload after changing source
          audioElement.load();
          
          try {
            console.log(`Starting audio playback for ${symbol}`);
            await audioElement.play();
            console.log(`Playback started successfully for ${symbol}`);
          } catch (error) {
            console.error(`Error playing audio for ${symbol}:`, error);
            throw error;
          }
        } else {
          throw new Error("Audio source element not found");
        }
      } else {
        throw new Error("Audio player not initialized");
      }
    } catch (error) {
      // Handle the error
      console.error(`Error playing audio for ${symbol}:`, error);
      
      let errorMessage = "Unable to play audio. ";
      
      // Check for specific error types
      if (error instanceof DOMException) {
        if (error.name === 'NotSupportedError') {
          errorMessage += "The audio format is not supported by your browser.";
        } else if (error.name === 'NotAllowedError') {
          errorMessage += "Audio playback requires user interaction first.";
        } else if (error.name === 'AbortError') {
          errorMessage += "Audio playback was aborted.";
        } else {
          errorMessage += error.message || "Unknown error.";
        }
      } else if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += "The audio file may be unavailable.";
      }
      
      setAudioError(errorMessage);
      setPlayingAudio(null);
    }
  };
  
  // Group consonants by manner and place of articulation
  const groupedConsonants: Record<string, Record<string, IpaSymbol[]>> = {};
  
  allConsonants.forEach(consonant => {
    if (consonant.features && 'manner' in consonant.features && 'place' in consonant.features) {
      const manner = consonant.features.manner;
      const place = consonant.features.place;
      
      // Initialize nested objects if they don't exist
      if (!groupedConsonants[manner]) {
        groupedConsonants[manner] = {};
      }
      
      if (!groupedConsonants[manner][place]) {
        groupedConsonants[manner][place] = [];
      }
      
      groupedConsonants[manner][place].push(consonant);
    }
  });
  
  // Function to render phoneme cell
  const renderPhonemeCell = (phoneme: IpaSymbol) => {
    const isSelected = phoneme.type === 'consonant' 
      ? selectedConsonants.has(phoneme.symbol)
      : selectedVowels.has(phoneme.symbol);
      
    const isPlaying = playingAudio === phoneme.symbol;
    
    return (
      <div key={phoneme.symbol} className="relative">
        <button
          className={`w-12 h-12 flex items-center justify-center text-lg rounded
            ${isSelected 
              ? 'bg-teal-600 text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
            } 
            ${isPlaying ? 'ring-2 ring-blue-500' : ''}
            transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 m-1`}
          onClick={() => phoneme.type === 'consonant' 
            ? toggleConsonant(phoneme.symbol) 
            : toggleVowel(phoneme.symbol)
          }
          title={phoneme.description}
        >
          {phoneme.symbol}
        </button>
        
        {/* Audio button */}
        <button
          className={`absolute -bottom-1 -right-1 w-5 h-5 text-white rounded-full text-xs 
            flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isPlaying ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
          onClick={(e) => handlePlayAudio(e, phoneme.symbol)}
          title={`Play sound for ${phoneme.symbol}`}
          aria-label={`Play sound for ${phoneme.symbol}`}
          disabled={isPlaying}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    );
  };

  // Get unique manner and place values for table headers
  const manners = Object.keys(groupedConsonants);
  const places = Object.keys(Object.values(groupedConsonants)[0] || {});
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Phoneme Selection</h2>
      
      {/* HTML5 audio element - hidden but accessible by DOM */}
      <audio id="phoneme-audio" className="hidden">
        <source id="phoneme-audio-source" src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-sm text-blue-800">
        <p>
          <strong>Audio Playback:</strong> Click the blue button on any phoneme to hear how it's pronounced.
          Audio files are sourced from Wikimedia Commons and require an internet connection.
        </p>
      </div>
      
      {/* Consonants Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Consonants</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b-2 border-gray-300 text-left"></th> {/* Empty corner cell */}
                {places.map(place => (
                  <th key={place} className="p-2 border-b-2 border-gray-300 text-center">
                    {place}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {manners.map(manner => (
                <tr key={manner}>
                  <th className="p-2 border-b border-gray-200 text-left">{manner}</th>
                  {places.map(place => (
                    <td key={`${manner}-${place}`} className="p-2 border-b border-gray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        {groupedConsonants[manner][place]?.map(phoneme => renderPhonemeCell(phoneme))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Vowels Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Vowels</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {allVowels.map(vowel => renderPhonemeCell(vowel))}
        </div>
      </div>
      
      {/* Selected Phonemes Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Selected Phonemes</h3>
        
        <div className="mb-4">
          <h4 className="font-medium">Consonants ({selectedConsonants.size})</h4>
          <p className="text-lg tracking-wide">
            {Array.from(selectedConsonants).join(' ')}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium">Vowels ({selectedVowels.size})</h4>
          <p className="text-lg tracking-wide">
            {Array.from(selectedVowels).join(' ')}
          </p>
        </div>
      </div>
      
      {/* Audio feedback component */}
      <AudioFeedback 
        isPlaying={!!playingAudio} 
        symbol={playingAudio || ''} 
        error={audioError}
      />
    </div>
  );
} 