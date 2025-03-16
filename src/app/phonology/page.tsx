'use client';

import React, { useState, useCallback, useRef } from 'react';
import PhonemeSelector, { PhonemeSelectorHandle } from '@/components/language/phonology/PhonemeSelector';
import PhonologyAIChat from '@/components/language/phonology/PhonologyAIChat';

export default function PhonologyPage() {
  const [selectedConsonants, setSelectedConsonants] = useState<string[]>(['p', 't', 'k', 'm', 'n']);
  const [selectedVowels, setSelectedVowels] = useState<string[]>(['a', 'i', 'u']);
  
  // Reference to the PhonemeSelector component
  const phonemeSelectorRef = useRef<PhonemeSelectorHandle>(null);
  
  const handlePhonemeSelectionChange = useCallback((consonants: string[], vowels: string[]) => {
    setSelectedConsonants(consonants);
    setSelectedVowels(vowels);
  }, []);
  
  // Handle phoneme selection from the AI chat
  const handleSelectPhoneme = useCallback((phoneme: string) => {
    const isVowel = /[aeiouäëïöüɑɛɪʊɔæøyɨʉɯɤəɐɒœɶʌɜɞɘɵʊɵɪɪɔʊɛɪəʊɪə]/.test(phoneme);
    
    // Create new arrays to avoid directly modifying state
    let newConsonants = [...selectedConsonants];
    let newVowels = [...selectedVowels];
    
    if (isVowel) {
      // If not already selected, add it
      if (!newVowels.includes(phoneme)) {
        newVowels.push(phoneme);
        setSelectedVowels(newVowels);
      }
    } else {
      // If not already selected, add it
      if (!newConsonants.includes(phoneme)) {
        newConsonants.push(phoneme);
        setSelectedConsonants(newConsonants);
      }
    }
    
    // Update the PhonemeSelector component's state
    if (phonemeSelectorRef.current) {
      phonemeSelectorRef.current.togglePhoneme(phoneme);
    }
  }, [selectedConsonants, selectedVowels]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Phonology Module</h1>
      <p className="text-lg mb-4">
        Select the phonemes (sounds) you want to include in your language. 
        This will be the foundation of your language's sound system.
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <strong>Audio Feature:</strong> Click the small blue button on each phoneme to hear how it's pronounced.
              Audio is sourced from Wikimedia Commons General Phonetics collection.
              <br />
              <span className="text-xs mt-1 block opacity-80">
                Audio playback requires an internet connection. Your browser may initially block audio - if prompted, allow playback.
              </span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Phoneme Selector Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <PhonemeSelector 
          initialConsonants={['p', 't', 'k', 'm', 'n']} 
          initialVowels={['a', 'i', 'u']}
        />
      </div>
      
      {/* Additional information section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">About Audio Playback</h3>
          <p className="text-sm text-gray-700 mb-2">
            Our audio is sourced from Wikimedia Commons:
          </p>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            <li>High-quality IPA pronunciation examples</li>
            <li>Optimized OGG format for language examples</li>
            <li>Attribution: <a href="https://commons.wikimedia.org/wiki/Category:General_phonetics" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Wikimedia Commons General Phonetics</a></li>
          </ul>
          <p className="text-sm text-gray-700 mt-2">
            Audio files are streamed directly from Wikimedia's servers. Not all IPA symbols have audio recordings available.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
          <p className="text-sm text-gray-700 mb-2">
            After selecting your phonemes, you'll be able to:
          </p>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            <li>Define phonotactic rules</li>
            <li>Create syllable structure templates</li>
            <li>Generate example words</li>
            <li>Export your phonology for use in other modules</li>
          </ul>
        </div>
      </div>
      
      {/* AI Chat Window - Full width at bottom */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Language Design Assistant</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <PhonologyAIChat className="relative h-96 w-full rounded-none shadow-none border-0" />
        </div>
      </div>
    </div>
  );
} 