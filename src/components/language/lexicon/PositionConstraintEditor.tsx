'use client';

import React, { useState, useEffect } from 'react';
import { PositionConstraint } from '@/types/lexicon';
import { v4 as uuidv4 } from 'uuid';

interface PositionConstraintEditorProps {
  initialConstraints?: PositionConstraint[];
  consonants: string[];
  vowels: string[];
  onChange: (constraints: PositionConstraint[]) => void;
}

export default function PositionConstraintEditor({
  initialConstraints = [],
  consonants,
  vowels,
  onChange
}: PositionConstraintEditorProps) {
  const [constraints, setConstraints] = useState<PositionConstraint[]>(initialConstraints);
  
  // Notify parent component when constraints change
  useEffect(() => {
    onChange(constraints);
  }, [constraints, onChange]);
  
  // Add a new constraint for initial consonants
  const handleAddInitialConsonantConstraint = () => {
    const newConstraint: PositionConstraint = {
      position: 'initial',
      phonemeType: 'C',
      allowedPhonemes: [...consonants] // Start with all consonants
    };
    
    setConstraints([...constraints, newConstraint]);
  };
  
  // Add a new constraint for final consonants
  const handleAddFinalConsonantConstraint = () => {
    const newConstraint: PositionConstraint = {
      position: 'final',
      phonemeType: 'C',
      allowedPhonemes: [...consonants] // Start with all consonants
    };
    
    setConstraints([...constraints, newConstraint]);
  };
  
  // Remove a constraint
  const handleRemoveConstraint = (index: number) => {
    const newConstraints = [...constraints];
    newConstraints.splice(index, 1);
    setConstraints(newConstraints);
  };
  
  // Toggle a phoneme in a constraint
  const togglePhoneme = (constraintIndex: number, phoneme: string) => {
    const newConstraints = [...constraints];
    const constraint = newConstraints[constraintIndex];
    
    if (constraint.allowedPhonemes.includes(phoneme)) {
      // Remove the phoneme
      constraint.allowedPhonemes = constraint.allowedPhonemes.filter(p => p !== phoneme);
    } else {
      // Add the phoneme
      constraint.allowedPhonemes.push(phoneme);
    }
    
    setConstraints(newConstraints);
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Position Constraints</h3>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Define which phonemes can appear in specific positions within words.
          This helps create natural-sounding words that follow your language's phonotactic rules.
        </p>
      </div>
      
      {/* Constraint list */}
      {constraints.length > 0 ? (
        <div className="space-y-6 mb-6">
          {constraints.map((constraint, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-700">
                  {constraint.position === 'initial' ? 'Word-Initial' : 'Word-Final'} {constraint.phonemeType === 'C' ? 'Consonants' : 'Vowels'}
                </h4>
                <button
                  onClick={() => handleRemoveConstraint(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove constraint"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(constraint.phonemeType === 'C' ? consonants : vowels).map(phoneme => (
                  <button
                    key={phoneme}
                    onClick={() => togglePhoneme(index, phoneme)}
                    className={`w-10 h-10 flex items-center justify-center text-lg rounded
                      ${constraint.allowedPhonemes.includes(phoneme) 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                      } 
                      transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    title={`Toggle ${phoneme}`}
                  >
                    {phoneme}
                  </button>
                ))}
              </div>
              
              <div className="mt-3 text-sm text-gray-600">
                <p>
                  {constraint.allowedPhonemes.length === 0 
                    ? 'No phonemes allowed in this position (very restrictive)' 
                    : `${constraint.allowedPhonemes.length} phonemes allowed in this position`}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-md mb-6 text-center text-gray-500">
          No position constraints defined. Words will use all phonemes in all positions.
        </div>
      )}
      
      {/* Add constraint buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleAddInitialConsonantConstraint}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Word-Initial Consonant Constraint
        </button>
        
        <button
          onClick={handleAddFinalConsonantConstraint}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Word-Final Consonant Constraint
        </button>
      </div>
    </div>
  );
} 