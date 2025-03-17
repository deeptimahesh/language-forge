'use client';

import React, { useState } from 'react';
import { WordGenerationParams, SyllableTemplate, PositionConstraint } from '@/types/lexicon';

interface WordGenerationFormProps {
  initialParams?: Partial<WordGenerationParams>;
  syllableTemplates: SyllableTemplate[];
  positionConstraints: PositionConstraint[];
  onGenerate: (params: WordGenerationParams) => void;
}

export default function WordGenerationForm({
  initialParams = {},
  syllableTemplates,
  positionConstraints,
  onGenerate
}: WordGenerationFormProps) {
  const [minSyllables, setMinSyllables] = useState(initialParams.minSyllables || 1);
  const [maxSyllables, setMaxSyllables] = useState(initialParams.maxSyllables || 3);
  const [wordCount, setWordCount] = useState(initialParams.wordCount || 50);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (minSyllables > maxSyllables) {
      alert('Minimum syllables cannot be greater than maximum syllables');
      return;
    }
    
    if (syllableTemplates.length === 0) {
      alert('You must define at least one syllable template');
      return;
    }
    
    // Create the parameters object
    const params: WordGenerationParams = {
      minSyllables,
      maxSyllables,
      wordCount,
      syllableTemplates,
      positionConstraints
    };
    
    onGenerate(params);
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Generate Words</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="minSyllables" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Syllables
            </label>
            <input
              type="number"
              id="minSyllables"
              min="1"
              max="5"
              value={minSyllables}
              onChange={(e) => setMinSyllables(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="maxSyllables" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Syllables
            </label>
            <input
              type="number"
              id="maxSyllables"
              min="1"
              max="10"
              value={maxSyllables}
              onChange={(e) => setMaxSyllables(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Words
            </label>
            <input
              type="number"
              id="wordCount"
              min="1"
              max="1000"
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Words will be generated using the syllable templates and position constraints defined above.
            Make sure you've set up these parameters before generating words.
          </p>
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Generate Words
        </button>
      </form>
    </div>
  );
} 