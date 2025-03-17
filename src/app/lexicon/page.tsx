'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SyllableTemplateEditor from '@/components/language/lexicon/SyllableTemplateEditor';
import PositionConstraintEditor from '@/components/language/lexicon/PositionConstraintEditor';
import WordGenerationForm from '@/components/language/lexicon/WordGenerationForm';
import LexiconDisplay from '@/components/language/lexicon/LexiconDisplay';
import { SyllableTemplate, PositionConstraint, WordGenerationParams, LexiconEntry } from '@/types/lexicon';
import { generateLexicon } from '@/lib/lexicon/wordGenerator';
import { v4 as uuidv4 } from 'uuid';

export default function LexiconPage() {
  // State for phoneme inventory (would normally come from the phonology module)
  const [selectedConsonants, setSelectedConsonants] = useState<string[]>(['p', 't', 'k', 'm', 'n']);
  const [selectedVowels, setSelectedVowels] = useState<string[]>(['a', 'i', 'u']);
  
  // State for lexicon generation
  const [syllableTemplates, setSyllableTemplates] = useState<SyllableTemplate[]>([]);
  const [positionConstraints, setPositionConstraints] = useState<PositionConstraint[]>([]);
  const [generatedWords, setGeneratedWords] = useState<LexiconEntry[]>([]);
  
  // Handle syllable template changes
  const handleSyllableTemplatesChange = (templates: SyllableTemplate[]) => {
    setSyllableTemplates(templates);
  };
  
  // Handle position constraint changes
  const handlePositionConstraintsChange = (constraints: PositionConstraint[]) => {
    setPositionConstraints(constraints);
  };
  
  // Handle word generation
  const handleGenerateWords = (params: WordGenerationParams) => {
    // Generate words using the word generator utility
    const words = generateLexicon(
      params,
      selectedConsonants,
      selectedVowels,
      'project-id' // In a real app, this would be the actual project ID
    );
    
    setGeneratedWords(words);
  };
  
  // Fetch phoneme inventory from phonology module (in a real app)
  useEffect(() => {
    // This would normally fetch the phoneme inventory from the phonology module
    // For now, we'll use the default values
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lexicon Module</h1>
      <p className="text-lg mb-6">
        Generate words for your language based on syllable patterns and phonotactic constraints.
        This module uses the phoneme inventory from your phonology module.
      </p>
      
      {/* Phoneme inventory display */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Phoneme Inventory</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-700">Consonants</h3>
            <p className="text-xl tracking-wide">{selectedConsonants.join(' ')}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-700">Vowels</h3>
            <p className="text-xl tracking-wide">{selectedVowels.join(' ')}</p>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>
            These phonemes are imported from your phonology module. 
            To modify them, go to the Phonology Module.
          </p>
        </div>
      </div>
      
      {/* Syllable template editor */}
      <div className="mb-8">
        <SyllableTemplateEditor
          onChange={handleSyllableTemplatesChange}
        />
      </div>
      
      {/* Position constraint editor */}
      <div className="mb-8">
        <PositionConstraintEditor
          consonants={selectedConsonants}
          vowels={selectedVowels}
          onChange={handlePositionConstraintsChange}
        />
      </div>
      
      {/* Word generation form */}
      <div className="mb-8">
        <WordGenerationForm
          syllableTemplates={syllableTemplates}
          positionConstraints={positionConstraints}
          onGenerate={handleGenerateWords}
        />
      </div>
      
      {/* Lexicon display */}
      <div>
        <LexiconDisplay entries={generatedWords} />
      </div>
    </div>
  );
} 