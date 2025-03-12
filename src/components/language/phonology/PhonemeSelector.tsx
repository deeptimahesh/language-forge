'use client';

import React, { useState } from 'react';
import { getAllConsonants, getAllVowels } from '@/lib/phonology/ipaData';
import { IpaSymbol, MannerOfArticulation, PlaceOfArticulation } from '@/types/phonology';

interface PhonemeSelectorProps {
  initialConsonants?: string[];
  initialVowels?: string[];
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
  
  // Toggle phoneme selection
  const toggleConsonant = (symbol: string) => {
    const newSelection = new Set(selectedConsonants);
    if (newSelection.has(symbol)) {
      newSelection.delete(symbol);
    } else {
      newSelection.add(symbol);
    }
    setSelectedConsonants(newSelection);
    
    if (onPhonemeSelectionChange) {
      onPhonemeSelectionChange(
        Array.from(newSelection), 
        Array.from(selectedVowels)
      );
    }
  };
  
  const toggleVowel = (symbol: string) => {
    const newSelection = new Set(selectedVowels);
    if (newSelection.has(symbol)) {
      newSelection.delete(symbol);
    } else {
      newSelection.add(symbol);
    }
    setSelectedVowels(newSelection);
    
    if (onPhonemeSelectionChange) {
      onPhonemeSelectionChange(
        Array.from(selectedConsonants), 
        Array.from(newSelection)
      );
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
      
    return (
      <button
        key={phoneme.symbol}
        className={`w-10 h-10 flex items-center justify-center text-lg rounded
          ${isSelected 
            ? 'bg-teal-600 text-white' 
            : 'bg-white text-gray-800 hover:bg-gray-100'
          } 
          transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 m-1`}
        onClick={() => phoneme.type === 'consonant' 
          ? toggleConsonant(phoneme.symbol) 
          : toggleVowel(phoneme.symbol)
        }
        title={phoneme.description}
      >
        {phoneme.symbol}
      </button>
    );
  };

  // Get unique manner and place values for table headers
  const manners = Object.keys(groupedConsonants);
  const places = Object.keys(Object.values(groupedConsonants)[0] || {});
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Phoneme Selection</h2>
      
      {/* Consonants Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Consonants</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b-2 border-gray-300 text-left"></th>
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
    </div>
  );
} 