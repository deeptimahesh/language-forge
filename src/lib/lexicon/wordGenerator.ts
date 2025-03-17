import { LexiconEntry, SyllableTemplate, WordGenerationParams, PositionConstraint } from '@/types/lexicon';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a random syllable based on the provided template and phoneme inventories
 */
export function generateSyllable(
  template: string,
  consonants: string[],
  vowels: string[],
  initialConsonants?: string[],
  finalConsonants?: string[]
): string {
  let syllable = '';
  
  for (let i = 0; i < template.length; i++) {
    const char = template[i];
    
    if (char === 'C') {
      // Use position-specific constraints if available
      if (i === 0 && initialConsonants && initialConsonants.length > 0) {
        syllable += initialConsonants[Math.floor(Math.random() * initialConsonants.length)];
      } else if (i === template.length - 1 && finalConsonants && finalConsonants.length > 0) {
        syllable += finalConsonants[Math.floor(Math.random() * finalConsonants.length)];
      } else {
        syllable += consonants[Math.floor(Math.random() * consonants.length)];
      }
    } else if (char === 'V') {
      syllable += vowels[Math.floor(Math.random() * vowels.length)];
    }
  }
  
  return syllable;
}

/**
 * Selects a syllable template based on the weights provided
 */
export function selectTemplate(templates: SyllableTemplate[]): SyllableTemplate {
  // Calculate total weight
  const totalWeight = templates.reduce((sum, template) => sum + template.weight, 0);
  
  // Generate a random number between 0 and totalWeight
  const random = Math.random() * totalWeight;
  
  // Find the template that corresponds to the random number
  let cumulativeWeight = 0;
  for (const template of templates) {
    cumulativeWeight += template.weight;
    if (random < cumulativeWeight) {
      return template;
    }
  }
  
  // Fallback to the last template (should never happen if weights > 0)
  return templates[templates.length - 1];
}

/**
 * Get position-specific phonemes based on constraints
 */
export function getConstrainedPhonemes(
  constraints: PositionConstraint[] | undefined,
  position: 'initial' | 'final',
  phonemeType: 'C' | 'V',
  defaultPhonemes: string[]
): string[] {
  if (!constraints) return defaultPhonemes;
  
  const constraint = constraints.find(
    c => (c.position === position || c.position === 'any') && c.phonemeType === phonemeType
  );
  
  return constraint && constraint.allowedPhonemes.length > 0 
    ? constraint.allowedPhonemes 
    : defaultPhonemes;
}

/**
 * Generates a random word based on syllable templates and phoneme inventories
 */
export function generateWord(
  params: WordGenerationParams,
  consonants: string[],
  vowels: string[]
): LexiconEntry {
  // Determine number of syllables for this word
  const numSyllables = Math.floor(
    Math.random() * (params.maxSyllables - params.minSyllables + 1) + params.minSyllables
  );
  
  const syllables: string[] = [];
  
  // Generate each syllable
  for (let i = 0; i < numSyllables; i++) {
    // Select a template
    const template = selectTemplate(params.syllableTemplates);
    
    // Apply positional constraints
    const isInitial = i === 0;
    const isFinal = i === numSyllables - 1;
    
    const initialConsonants = isInitial 
      ? getConstrainedPhonemes(params.positionConstraints, 'initial', 'C', consonants)
      : undefined;
      
    const finalConsonants = isFinal
      ? getConstrainedPhonemes(params.positionConstraints, 'final', 'C', consonants)
      : undefined;
    
    // Generate the syllable
    const syllable = generateSyllable(
      template.pattern,
      consonants,
      vowels,
      initialConsonants,
      finalConsonants
    );
    
    syllables.push(syllable);
  }
  
  // Combine syllables into a word
  const word = syllables.join('');
  
  return {
    id: uuidv4(),
    word,
    syllables
  };
}

/**
 * Generates a lexicon of the specified size
 */
export function generateLexicon(
  params: WordGenerationParams,
  consonants: string[],
  vowels: string[],
  projectId: string
): LexiconEntry[] {
  const entries: LexiconEntry[] = [];
  const existingWords = new Set<string>();
  
  // Generate words until we reach the desired count or hit a limit
  let attempts = 0;
  const maxAttempts = params.wordCount * 10; // Prevent infinite loops
  
  while (entries.length < params.wordCount && attempts < maxAttempts) {
    attempts++;
    
    const entry = generateWord(params, consonants, vowels);
    
    // Ensure uniqueness
    if (!existingWords.has(entry.word)) {
      existingWords.add(entry.word);
      entries.push(entry);
    }
  }
  
  return entries;
} 