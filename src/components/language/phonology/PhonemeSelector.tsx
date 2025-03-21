import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { getAllConsonants, getAllVowels } from '@/lib/phonology/ipaData';
import { getAudioUrl } from '@/lib/phonology/audioUtils';
import { IpaSymbol } from '@/types/phonology';
import AudioFeedback, { getAudioFeedbackScript } from './AudioFeedback';

interface PhonemeSelectorProps {
  initialConsonants?: string[];
  initialVowels?: string[];
  onPhonemeSelectionChange?: (consonants: string[], vowels: string[]) => void;
}

// Define the handle interface for imperative methods
export interface PhonemeSelectorHandle {
  togglePhoneme: (symbol: string) => void;
}

// Convert the component to use forwardRef
const PhonemeSelector = forwardRef<PhonemeSelectorHandle, PhonemeSelectorProps>(({ 
  initialConsonants = [], 
  initialVowels = [],
  onPhonemeSelectionChange 
}, ref) => {
  // State for tracking selected phonemes
  const [selectedConsonants, setSelectedConsonants] = useState<string[]>(initialConsonants);
  const [selectedVowels, setSelectedVowels] = useState<string[]>(initialVowels);
  
  // Get all available phonemes
  const allConsonants = getAllConsonants();
  const allVowels = getAllVowels();
  
  // Audio feedback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [currentPhoneme, setCurrentPhoneme] = useState<string | null>(null);
  
  // Implement useImperativeHandle to expose methods to parent components
  useImperativeHandle(ref, () => ({
    togglePhoneme: (symbol: string) => {
      // Determine if it's a consonant or vowel
      const isVowel = allVowels.some(v => v.symbol === symbol);
      const isConsonant = allConsonants.some(c => c.symbol === symbol);
      
      if (isVowel) {
        if (selectedVowels.includes(symbol)) {
          setSelectedVowels(prev => prev.filter(v => v !== symbol));
        } else {
          setSelectedVowels(prev => [...prev, symbol]);
        }
      } else if (isConsonant) {
        if (selectedConsonants.includes(symbol)) {
          setSelectedConsonants(prev => prev.filter(c => c !== symbol));
        } else {
          setSelectedConsonants(prev => [...prev, symbol]);
        }
      }
    }
  }));
  
  // Effect to notify parent component of changes
  useEffect(() => {
    if (onPhonemeSelectionChange) {
      onPhonemeSelectionChange(selectedConsonants, selectedVowels);
    }
  }, [selectedConsonants, selectedVowels, onPhonemeSelectionChange]);
  
  // Helper function to determine if a phoneme is selected
  const isSelectedConsonant = (symbol: string) => selectedConsonants.includes(symbol);
  const isSelectedVowel = (symbol: string) => selectedVowels.includes(symbol);
  
  // Render a consonant cell
  const renderConsonantCell = (phoneme: IpaSymbol) => {
    const isSelected = isSelectedConsonant(phoneme.symbol);
    
    return (
      <div 
        key={phoneme.symbol} 
        className="relative phoneme-cell"
        data-phoneme={phoneme.symbol}
        data-type="consonant"
        data-selected={isSelected ? 'true' : 'false'}
        data-description={phoneme.description}
      >
        <button
          className={`w-12 h-12 flex items-center justify-center text-lg rounded
            ${isSelected 
              ? 'bg-teal-600 text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
            } 
            transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 m-1`}
          title={phoneme.description}
          data-phoneme-button="true"
        >
          {phoneme.symbol}
        </button>
        
        {/* Audio button */}
        <button
          className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-xs 
            flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
          title={`Play sound for ${phoneme.symbol}`}
          aria-label={`Play sound for ${phoneme.symbol}`}
          data-audio-button="true"
          data-phoneme={phoneme.symbol}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  };
  
  // Render a vowel cell
  const renderVowelCell = (phoneme: IpaSymbol) => {
    const isSelected = isSelectedVowel(phoneme.symbol);
    
    return (
      <div 
        key={phoneme.symbol} 
        className="relative phoneme-cell"
        data-phoneme={phoneme.symbol}
        data-type="vowel"
        data-selected={isSelected ? 'true' : 'false'}
        data-description={phoneme.description}
      >
        <button
          className={`w-12 h-12 flex items-center justify-center text-lg rounded
            ${isSelected 
              ? 'bg-green-600 text-white' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
            } 
            transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 m-1`}
          title={phoneme.description}
          data-phoneme-button="true"
        >
          {phoneme.symbol}
        </button>
        
        {/* Audio button */}
        <button
          className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-xs 
            flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
          title={`Play sound for ${phoneme.symbol}`}
          aria-label={`Play sound for ${phoneme.symbol}`}
          data-audio-button="true"
          data-phoneme={phoneme.symbol}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  };

  // Group consonants by manner of articulation
  const groupedConsonants: Record<string, IpaSymbol[]> = {};
  
  allConsonants.forEach(consonant => {
    if (consonant.features && 'manner' in consonant.features) {
      const manner = consonant.features.manner;
      
      if (!groupedConsonants[manner]) {
        groupedConsonants[manner] = [];
      }
      
      groupedConsonants[manner].push(consonant);
    }
  });
  
  // Get unique manners
  const manners = Object.keys(groupedConsonants);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Phoneme Selection</h2>
      
      {/* Hidden audio element for client-side JavaScript to use */}
      <audio id="phoneme-audio" className="hidden">
        {/* Source added dynamically via JavaScript */}
        <p>Your browser does not support the audio element.</p>
      </audio>
      
      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-sm text-blue-800">
        <p>
          <strong>Audio Playback:</strong> Click the blue button on any phoneme to hear how it's pronounced.
          Audio files are sourced from Wikimedia Commons and require an internet connection.
        </p>
      </div>
      
      {/* Consonants Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Consonants</h3>
        
        {manners.map(manner => (
          <div key={manner} className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-gray-700">{manner}</h4>
            <div className="flex flex-wrap gap-1">
              {groupedConsonants[manner].map(consonant => renderConsonantCell(consonant))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Vowels Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Vowels</h3>
        <div className="flex flex-wrap gap-1 mb-6">
          {allVowels.map(vowel => renderVowelCell(vowel))}
        </div>
      </div>
      
      {/* Selected Phonemes Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Selected Phonemes</h3>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-700">Consonants</h4>
          <p className="text-lg tracking-wide text-gray-500" id="selected-consonants">
            {selectedConsonants.join(' ')}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700">Vowels</h4>
          <p className="text-lg tracking-wide text-gray-500" id="selected-vowels">
            {selectedVowels.join(' ')}
          </p>
        </div>
      </div>
      
      {/* Client-side JavaScript to handle interactions */}
      <script id="phoneme-selector-script" dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Initialize selected phonemes
            let selectedConsonants = new Set(${JSON.stringify(selectedConsonants)});
            let selectedVowels = new Set(${JSON.stringify(selectedVowels)});
            
            // Set up audio element
            const audioElement = document.getElementById('phoneme-audio');
            
            if (!audioElement) {
              console.error('Audio element not found');
            }
            
            // Audio feedback functions
            ${getAudioFeedbackScript()}
            
            // Handle phoneme selection
            document.querySelectorAll('[data-phoneme-button="true"]').forEach(button => {
              button.addEventListener('click', function(e) {
                const cell = this.closest('.phoneme-cell');
                const phoneme = cell.dataset.phoneme;
                const type = cell.dataset.type;
                
                if (type === 'consonant') {
                  if (selectedConsonants.has(phoneme)) {
                    selectedConsonants.delete(phoneme);
                    cell.dataset.selected = 'false';
                    this.classList.remove('bg-teal-600', 'text-white');
                    this.classList.add('bg-white', 'text-gray-800', 'hover:bg-gray-100');
                  } else {
                    selectedConsonants.add(phoneme);
                    cell.dataset.selected = 'true';
                    this.classList.remove('bg-white', 'text-gray-800', 'hover:bg-gray-100');
                    this.classList.add('bg-teal-600', 'text-white');
                  }
                  document.getElementById('selected-consonants').textContent = 
                    Array.from(selectedConsonants).join(' ');
                } else if (type === 'vowel') {
                  if (selectedVowels.has(phoneme)) {
                    selectedVowels.delete(phoneme);
                    cell.dataset.selected = 'false';
                    this.classList.remove('bg-green-600', 'text-white');
                    this.classList.add('bg-white', 'text-gray-800', 'hover:bg-gray-100');
                  } else {
                    selectedVowels.add(phoneme);
                    cell.dataset.selected = 'true';
                    this.classList.remove('bg-white', 'text-gray-800', 'hover:bg-gray-100');
                    this.classList.add('bg-green-600', 'text-white');
                  }
                  document.getElementById('selected-vowels').textContent = 
                    Array.from(selectedVowels).join(' ');
                }
                
                // Notify of selection change if callback exists
                if (typeof window.onPhonemeSelectionChange === 'function') {
                  window.onPhonemeSelectionChange(
                    Array.from(selectedConsonants),
                    Array.from(selectedVowels)
                  );
                }
              });
            });
            
            // Handle audio playback
            document.querySelectorAll('[data-audio-button="true"]').forEach(button => {
              button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering the selection toggle
                
                const cell = this.closest('.phoneme-cell');
                const phoneme = cell.dataset.phoneme;
                const description = cell.dataset.description || '';
                
                // Show playing message
                showAudioFeedback(\`Playing sound for "\${phoneme}"\`);
                
                if (!audioElement) {
                  showAudioFeedback('Audio element not found', true);
                  return;
                }
                
                // Fetch audio URL from our API
                fetch('/api/phoneme-audio?symbol=' + encodeURIComponent(phoneme))
                  .then(response => response.json())
                  .then(data => {
                    if (data.url) {
                      // Clear any existing sources
                      const sources = audioElement.getElementsByTagName('source');
                      while (sources.length > 0) {
                        sources[0].parentNode.removeChild(sources[0]);
                      }
                      
                      // Create and add new source element
                      const sourceElement = document.createElement('source');
                      sourceElement.src = data.url;
                      sourceElement.type = 'audio/mpeg';
                      audioElement.insertBefore(sourceElement, audioElement.firstChild);
                      
                      console.log('Setting audio source to:', data.url);
                      audioElement.load();
                      
                      const playPromise = audioElement.play();
                      
                      if (playPromise !== undefined) {
                        playPromise.catch(error => {
                          console.error('Error playing audio:', error);
                          showAudioFeedback(\`Could not play audio for "\${phoneme}". The file may be unavailable or blocked by your browser.\`, true);
                        });
                      }
                      
                      // When audio finishes
                      audioElement.onended = function() {
                        showAudioFeedback(\`Sound for "\${phoneme}" finished playing\`);
                        setTimeout(hideAudioFeedback, 1500);
                      };
                    } else if (data.error) {
                      console.error('Audio API error:', data.error);
                      showAudioFeedback(data.error, true);
                    } else {
                      showAudioFeedback(\`No audio available for "\${phoneme}"\`, true);
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching audio:', error);
                    showAudioFeedback('Error loading audio. Please check your internet connection.', true);
                  });
              });
            });
          });
        `
      }} />
    </div>
  );
});

export default PhonemeSelector; 