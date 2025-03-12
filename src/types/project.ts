// Project type definitions
// Core purpose: Define TypeScript interfaces for type safety

// Main Project type
export interface Project {
  id?: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  languageProfile: LanguageProfile;
  modules: {
    // References to other modules
    phonology?: string; // ID reference to PhonologyModule
    lexicon?: string; // ID reference to LexiconModule
    morphology?: string; // ID reference to MorphologyModule
    syntax?: string; // ID reference to SyntaxModule
    culture?: string; // ID reference to CultureModule
    orthography?: string; // ID reference to OrthographyModule
  };
  versions: ProjectVersion[];
  collaborators?: string[];
}

export interface ProjectVersion {
  id?: string;
  projectId: string;
  name: string;
  description: string;
  createdAt: Date;
  snapshot: any; // Serialized project state
}


export interface LanguageProfile {
  id?: string;
  projectId: string;
  
  // Core descriptors
  name: string;
  description: string;
  shortDescription: string;
  
  // Conceptual framework
  speciesDescription: string;
  anatomicalConstraints: string[];
  
  // Cultural framework
  culturalInspiration: string[];
  environmentalContext: string;
  socialStructure: string;
  
  // Aesthetic goals
  aestheticQualities: string[];
  examples: string[];
  
  // Technical specifications
  complexity: 'simple' | 'moderate' | 'complex';
  purposeAndContext: string;
  
  // AI-generated recommendations
  recommendedFeatures: {
    phonology: PhonologyRecommendation;
    grammar: GrammarRecommendation;
    lexicon: LexiconRecommendation;
  };
}

export interface PhonologyRecommendation {
  consonantComplexity: 'simple' | 'moderate' | 'complex';
  vowelComplexity: 'simple' | 'moderate' | 'complex';
  tonality: boolean;
  stressImportance: 'low' | 'medium' | 'high';
  suggestedSounds: string[]; // IPA symbols
  avoidedSounds: string[]; // IPA symbols
  notes: string;
}

export interface GrammarRecommendation {
  morphologyComplexity: 'simple' | 'moderate' | 'complex';
  syntaxComplexity: 'simple' | 'moderate' | 'complex';
  suggestedFeatures: string[];
  avoidedFeatures: string[];
  notes: string;
}

export interface LexiconRecommendation {
  rootComplexity: 'simple' | 'moderate' | 'complex';
  derivationComplexity: 'simple' | 'moderate' | 'complex';
  primaryVocabularyDomains: string[];
  etymologyRecommendations: string[];
  notes: string;
} 