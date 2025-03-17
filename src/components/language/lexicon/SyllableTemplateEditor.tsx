'use client';

import React, { useState, useEffect } from 'react';
import { SyllableTemplate } from '@/types/lexicon';
import { v4 as uuidv4 } from 'uuid';

interface SyllableTemplateEditorProps {
  initialTemplates?: SyllableTemplate[];
  onChange: (templates: SyllableTemplate[]) => void;
}

const DEFAULT_TEMPLATES: SyllableTemplate[] = [
  { id: uuidv4(), pattern: 'CV', weight: 5, description: 'Consonant + Vowel (most common)' },
  { id: uuidv4(), pattern: 'CVC', weight: 3, description: 'Consonant + Vowel + Consonant' },
  { id: uuidv4(), pattern: 'V', weight: 1, description: 'Vowel only' },
];

export default function SyllableTemplateEditor({ 
  initialTemplates = DEFAULT_TEMPLATES,
  onChange 
}: SyllableTemplateEditorProps) {
  const [templates, setTemplates] = useState<SyllableTemplate[]>(initialTemplates);
  const [newPattern, setNewPattern] = useState('');
  const [newWeight, setNewWeight] = useState(3);
  const [newDescription, setNewDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Notify parent component when templates change
  useEffect(() => {
    onChange(templates);
  }, [templates, onChange]);

  // Validate a syllable pattern (must contain only C and V)
  const isValidPattern = (pattern: string): boolean => {
    return /^[CV]+$/.test(pattern);
  };

  // Add a new template
  const handleAddTemplate = () => {
    if (!newPattern) {
      setError('Pattern cannot be empty');
      return;
    }

    if (!isValidPattern(newPattern)) {
      setError('Pattern must contain only C (consonant) and V (vowel) characters');
      return;
    }

    const newTemplate: SyllableTemplate = {
      id: uuidv4(),
      pattern: newPattern,
      weight: newWeight,
      description: newDescription || undefined,
    };

    setTemplates([...templates, newTemplate]);
    setNewPattern('');
    setNewDescription('');
    setError(null);
  };

  // Remove a template
  const handleRemoveTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  // Update template weight
  const handleWeightChange = (id: string, weight: number) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, weight } : template
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Syllable Templates</h3>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Define the syllable patterns for your language using C (consonant) and V (vowel).
          Assign weights to control how frequently each pattern appears.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
          <p className="text-sm text-blue-800">
            <strong>Examples:</strong> CV (like "ba"), CVC (like "bat"), CCVC (like "stop")
          </p>
        </div>
      </div>
      
      {/* Template list */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Current Templates</h4>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-4 text-left">Pattern</th>
                <th className="py-3 px-4 text-left">Weight</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {templates.map(template => (
                <tr key={template.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{template.pattern}</td>
                  <td className="py-3 px-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={template.weight}
                      onChange={(e) => handleWeightChange(template.id, parseInt(e.target.value))}
                      className="w-24"
                    />
                    <span className="ml-2">{template.weight}</span>
                  </td>
                  <td className="py-3 px-4">{template.description || '-'}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleRemoveTemplate(template.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove template"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add new template form */}
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Add New Template</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-1">
              Pattern
            </label>
            <input
              type="text"
              id="pattern"
              value={newPattern}
              onChange={(e) => setNewPattern(e.target.value.toUpperCase())}
              placeholder="CV, CVC, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Weight (1-10)
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="weight"
                min="1"
                max="10"
                value={newWeight}
                onChange={(e) => setNewWeight(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="ml-2 w-6 text-center">{newWeight}</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Optional description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {error && (
          <div className="mt-2 text-red-500 text-sm">
            {error}
          </div>
        )}
        
        <button
          onClick={handleAddTemplate}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Template
        </button>
      </div>
    </div>
  );
} 