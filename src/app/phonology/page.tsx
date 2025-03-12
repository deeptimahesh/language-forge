'use client';

import React from 'react';
import PhonemeSelector from '@/components/language/phonology/PhonemeSelector';

export default function PhonologyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Phonology Module</h1>
      <p className="text-lg mb-8">
        Select the phonemes (sounds) you want to include in your language. 
        This will be the foundation of your language's sound system.
      </p>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <PhonemeSelector 
          initialConsonants={['p', 't', 'k', 'm', 'n']} 
          initialVowels={['a', 'i', 'u']}
          onPhonemeSelectionChange={(consonants, vowels) => {
            // This will be implemented later to save the phoneme selection
            console.log('Selected consonants:', consonants);
            console.log('Selected vowels:', vowels);
          }}
        />
      </div>
    </div>
  );
} 