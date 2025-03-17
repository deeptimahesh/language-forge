// Types for the lexicon module

// Syllable structure types
export type PhonemeType = 'C' | 'V'; // C for consonant, V for vowel

export interface SyllableTemplate {
  id: string;
  pattern: string; // A string like "CV", "CVC", "CCVC", etc.
  weight: number;  // The relative frequency of this pattern (1-10)
  description?: string;
}

// Phonotactic constraint types
export interface PositionConstraint {
  position: 'initial' | 'final' | 'any';
  phonemeType: PhonemeType;
  allowedPhonemes: string[]; // IPA symbols
}

// Word generation parameters
export interface WordGenerationParams {
  minSyllables: number;
  maxSyllables: number;
  syllableTemplates: SyllableTemplate[];
  positionConstraints?: PositionConstraint[];
  wordCount: number;
}

// Generated word entry
export interface LexiconEntry {
  id: string;
  word: string; // The generated word in IPA
  syllables: string[]; // The individual syllables
  partOfSpeech?: string;
  definition?: string;
  tags?: string[];
}

// Overall lexicon interface
export interface Lexicon {
  id?: string;
  projectId: string;
  entries: LexiconEntry[];
  generationParams?: WordGenerationParams;
} 