import React from 'react';
import PhonemeSelector from '@/components/language/phonology/PhonemeSelector';

export default function PhonologyPage() {
  // Server component doesn't handle client-side events
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
      
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Only pass data props, not function props */}
        <PhonemeSelector 
          initialConsonants={['p', 't', 'k', 'm', 'n']} 
          initialVowels={['a', 'i', 'u']}
        />
      </div>
      
      {/* Additional information section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
} 