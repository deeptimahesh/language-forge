'use client';

import React, { useState } from 'react';
import { LexiconEntry } from '@/types/lexicon';

interface LexiconDisplayProps {
  entries: LexiconEntry[];
}

export default function LexiconDisplay({ entries }: LexiconDisplayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'word' | 'syllables'>('word');
  
  // Filter entries based on search term
  const filteredEntries = entries.filter(entry => 
    entry.word.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort entries
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortBy === 'word') {
      return a.word.localeCompare(b.word);
    } else {
      return a.syllables.length - b.syllables.length;
    }
  });
  
  // Group entries by first letter for dictionary-style display
  const groupedEntries: Record<string, LexiconEntry[]> = {};
  
  sortedEntries.forEach(entry => {
    const firstLetter = entry.word[0] || '?';
    if (!groupedEntries[firstLetter]) {
      groupedEntries[firstLetter] = [];
    }
    groupedEntries[firstLetter].push(entry);
  });
  
  // Get sorted keys
  const sortedKeys = Object.keys(groupedEntries).sort();
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Generated Lexicon</h3>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Words
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'word' | 'syllables')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="word">Alphabetical</option>
              <option value="syllables">Number of Syllables</option>
            </select>
          </div>
        </div>
      </div>
      
      {entries.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
          No words have been generated yet. Use the form above to generate words.
        </div>
      ) : (
        <div>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredEntries.length} of {entries.length} words
          </div>
          
          {/* Dictionary-style display */}
          <div className="space-y-6">
            {sortedKeys.map(key => (
              <div key={key}>
                <h4 className="text-lg font-bold text-gray-700 border-b border-gray-300 mb-2">
                  {key.toUpperCase()}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupedEntries[key].map(entry => (
                    <div key={entry.id} className="border rounded-md p-3 hover:bg-gray-50">
                      <div className="font-medium text-lg">{entry.word}</div>
                      <div className="text-sm text-gray-500">
                        Syllables: {entry.syllables.join('·')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 