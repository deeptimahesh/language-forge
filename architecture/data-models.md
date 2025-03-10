# Language Forge: Data Models

## 1. Overview

Language Forge requires structured data models to represent the various components of constructed languages. These models need to:

- Capture linguistic complexity while maintaining usability
- Support progressive building of language features
- Enable version control and alternative explorations
- Facilitate export and documentation

## 2. Core Models

### 2.1 Project Model

The top-level container for a language creation project.

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  languageProfile: LanguageProfile;
  modules: {
    phonology: PhonologyModule;
    lexicon: LexiconModule;
    morphology: MorphologyModule;
    syntax: SyntaxModule;
    culture: CultureModule;
    orthography?: OrthographyModule;  // Optional
  };
  versions: ProjectVersion[];  // For tracking major changes
  collaborators?: string[];  // User IDs of collaborators
}

interface ProjectVersion {
  id: string;
  projectId: string;
  name: string;
  description: string;
  createdAt: Date;
  snapshot: Object;  // Serialized project state
}
```

### 2.2 Language Profile Model

Captures the high-level characteristics and goals of the language.

```typescript
interface LanguageProfile {
  id: string;
  projectId: string;
  
  // Core descriptors
  name: string;  // Language name
  description: string;  // Full description
  shortDescription: string;  // Concise summary
  
  // Conceptual framework
  speciesDescription: string;  // Physical characteristics of speakers
  anatomicalConstraints: string[];  // Limitations on sound production
  
  // Cultural framework
  culturalInspiration: string[];  // Real-world inspirations
  environmentalContext: string;  // Living environment of speakers
  socialStructure: string;  // Society organization
  
  // Aesthetic goals
  aestheticQualities: string[];  // Desired sound and feel
  examples: string[];  // Example phrases or words
  
  // Technical specifications
  complexity: 'simple' | 'moderate' | 'complex';  // Overall complexity
  purposeAndContext: string;  // Intended use case
  
  // AI-generated recommendations
  recommendedFeatures: {
    phonology: PhonologyRecommendation;
    grammar: GrammarRecommendation;
    lexicon: LexiconRecommendation;
  };
}

interface PhonologyRecommendation {
  consonantComplexity: 'simple' | 'moderate' | 'complex';
  vowelComplexity: 'simple' | 'moderate' | 'complex';
  tonality: boolean;
  stressImportance: 'low' | 'medium' | 'high';
  suggestedSounds: string[];  // IPA symbols
  avoidedSounds: string[];  // IPA symbols
  notes: string;
}

// Similar recommendation interfaces for grammar and lexicon
```

## 3. Linguistic Component Models

### 3.1 Phonology Module

Represents the sound system of the language.

```typescript
interface PhonologyModule {
  id: string;
  projectId: string;
  
  // Sound inventory
  consonants: Phoneme[];
  vowels: Phoneme[];
  
  // Organizational structures
  features: PhonologicalFeature[];  // Distinctive features
  naturalClasses: NaturalClass[];  // Groups of phonemes
  
  // Rules
  syllableStructure: SyllableTemplate[];
  phonotacticRules: PhonotacticRule[];
  stressRules: StressRule[];
  intonationPatterns: IntonationPattern[];
  
  // Optional advanced features
  allophoneRules?: AllophoneRule[];  // Sound variations
  soundChanges?: SoundChangeRule[];  // Historical developments
  
  // Meta
  notes: string;
  userModifications: UserModification[];
}

interface Phoneme {
  id: string;
  symbol: string;  // IPA symbol
  features: string[];  // Feature specifications
  examples: string[];  // Example words
  frequency: 'rare' | 'uncommon' | 'common' | 'very common';
  isCustom: boolean;  // User-added vs. AI-generated
}

interface SyllableTemplate {
  id: string;
  template: string;  // e.g., "CVC", "CV", etc.
  examples: string[];
  constraints: string[];  // Additional rules for this template
  frequency: 'rare' | 'uncommon' | 'common' | 'very common';
}

interface PhonotacticRule {
  id: string;
  description: string;
  pattern: string;  // Formal rule pattern
  examples: {
    allowed: string[];
    disallowed: string[];
  };
  isCustom: boolean;
}

// Additional interfaces for other phonological components
```

### 3.2 Lexicon Module

Manages the vocabulary of the language.

```typescript
interface LexiconModule {
  id: string;
  projectId: string;
  
  // Core vocabulary
  rootWords: LexicalEntry[];
  compounds: CompoundWord[];
  derivatives: DerivativeWord[];
  
  // Organizational structures
  semanticDomains: SemanticDomain[];
  etymologyPatterns: EtymologyPattern[];
  
  // Statistical information
  frequencyDistribution: FrequencyData;
  
  // Meta
  notes: string;
  userModifications: UserModification[];
}

interface LexicalEntry {
  id: string;
  word: string;  // Orthographic form
  phoneticForm: string;  // IPA representation
  meaning: string;  // Translation/definition
  partOfSpeech: string;
  semanticDomain: string[];
  etymology: string;  // Origin description
  examples: string[];  // Usage examples
  cultural_notes?: string;
  isCustom: boolean;  // User-added vs. AI-generated
}

interface SemanticDomain {
  id: string;
  name: string;
  description: string;
  parentDomain?: string;  // For hierarchical organization
  relatedWords: string[];  // IDs of related lexical entries
  culturalSignificance: string;
}

interface EtymologyPattern {
  id: string;
  description: string;
  pattern: string;  // Pattern description
  examples: string[];
}

// Additional interfaces for lexical components
```

### 3.3 Morphology Module

Handles word formation and grammatical inflection.

```typescript
interface MorphologyModule {
  id: string;
  projectId: string;
  
  // Grammatical categories
  grammaticalCategories: GrammaticalCategory[];
  
  // Word formation
  derivationalAffixes: Affix[];
  inflectionalAffixes: Affix[];
  compoundingRules: CompoundingRule[];
  
  // Paradigms
  declensionClasses: DeclensionClass[];
  conjugationClasses: ConjugationClass[];
  
  // Irregularity
  irregularForms: IrregularForm[];
  
  // Meta
  notes: string;
  userModifications: UserModification[];
}

interface GrammaticalCategory {
  id: string;
  name: string;  // e.g., "Number", "Tense", "Case"
  description: string;
  values: string[];  // e.g., ["singular", "plural"] for Number
  isRequired: boolean;  // Is this category obligatory?
  appliesTo: string[];  // Parts of speech this applies to
}

interface Affix {
  id: string;
  form: string;  // Orthographic form
  phoneticForm: string;  // IPA form
  type: 'prefix' | 'suffix' | 'infix' | 'circumfix';
  meaning: string;
  category: string;  // ID of related grammatical category
  allomorphs: Allomorph[];  // Contextual variants
  examples: string[];
}

interface DeclensionClass {
  id: string;
  name: string;
  description: string;
  appliesTo: string[];  // Parts of speech this applies to
  forms: {
    [categoryValue: string]: string;  // Map of category values to affixes
  };
  examples: string[];
}

// Additional interfaces for morphological components
```

### 3.4 Syntax Module

Defines sentence structure and grammatical relations.

```typescript
interface SyntaxModule {
  id: string;
  projectId: string;
  
  // Basic word order
  wordOrder: {
    basic: string;  // SVO, SOV, etc.
    variations: WordOrderVariation[];
  };
  
  // Phrase structure
  phraseStructures: PhraseStructure[];
  
  // Sentence types
  sentenceTypes: SentenceType[];
  
  // Relations
  grammaticalRelations: GrammaticalRelation[];
  
  // Complex structures
  subordinationStrategies: SubordinationStrategy[];
  coordinationStrategies: CoordinationStrategy[];
  
  // Meta
  notes: string;
  userModifications: UserModification[];
}

interface WordOrderVariation {
  id: string;
  pattern: string;  // Word order pattern
  context: string;  // When this variation applies
  examples: string[];
}

interface PhraseStructure {
  id: string;
  type: 'noun' | 'verb' | 'adjective' | 'adposition' | 'other';
  headPosition: 'initial' | 'final' | 'variable';
  modifierOrder: string[];  // Order of modifiers
  examples: string[];
}

interface GrammaticalRelation {
  id: string;
  name: string;  // e.g., "subject", "direct object"
  markedBy: string[];  // How this relation is marked (case, word order, etc.)
  examples: string[];
}

// Additional interfaces for syntactic components
```

### 3.5 Cultural Context Module

Integrates cultural elements with linguistic features.

```typescript
interface CultureModule {
  id: string;
  projectId: string;
  
  // Social dimensions
  registers: Register[];
  honorifics: Honorific[];
  tabooExpressions: TabooExpression[];
  
  // Figurative language
  idioms: Idiom[];
  metaphors: Metaphor[];
  
  // Historical development
  evolutionaryStages: EvolutionaryStage[];
  dialectVariation: Dialect[];
  
  // Meta
  notes: string;
  userModifications: UserModification[];
}

interface Register {
  id: string;
  name: string;
  description: string;
  socialContext: string;
  grammaticalFeatures: GrammaticalFeature[];
  lexicalFeatures: LexicalFeature[];
  examples: string[];
}

interface Idiom {
  id: string;
  expression: string;
  literalMeaning: string;
  figurativeMeaning: string;
  culturalContext: string;
  etymology: string;
  examples: string[];
}

interface Dialect {
  id: string;
  name: string;
  region: string;
  distinguishingFeatures: {
    phonological: string[];
    lexical: string[];
    grammatical: string[];
  };
  examples: string[];
}

// Additional interfaces for cultural components
```

### 3.6 Orthography Module (Optional)

Defines the writing system for the language.

```typescript
interface OrthographyModule {
  id: string;
  projectId: string;
  
  // Writing system type
  type: 'alphabet' | 'abjad' | 'abugida' | 'syllabary' | 'logography' | 'mixed';
  
  // Characters
  characters: Character[];
  
  // Mapping
  phonemeToGraphemeMapping: PhonemeGraphemeMapping[];
  
  // Rules
  orthographicRules: OrthographicRule[];
  
  // Visual style
  visualStyle: {
    direction: 'LTR' | 'RTL' | 'TTB' | 'BTT';
    lineBreak: string;
    characterStyle: string;  // Description of visual aesthetic
  };
  
  // Meta
  notes: string;
  userModifications: UserModification[];
}

interface Character {
  id: string;
  glyph: string;  // Visual representation
  name: string;
  phoneticValue: string[];  // IPA values
  variants: CharacterVariant[];  // Positional variants, etc.
  examples: string[];
}

interface OrthographicRule {
  id: string;
  description: string;
  pattern: string;  // Formal rule pattern
  examples: {
    before: string[];
    after: string[];
  };
}

// Additional interfaces for orthographic components
```

## 4. Utility Models

### 4.1 User Modification

Tracks changes made by users to AI suggestions.

```typescript
interface UserModification {
  id: string;
  timestamp: Date;
  field: string;  // Path to modified field
  previousValue: any;
  newValue: any;
  reason?: string;  // Optional user explanation
}
```

### 4.2 Export Settings

Controls how language documentation is generated.

```typescript
interface ExportSettings {
  id: string;
  projectId: string;
  format: 'pdf' | 'html' | 'markdown' | 'json';
  sections: {
    [sectionName: string]: boolean;  // Inclusion toggles
  };
  styling: {
    fontFamily: string;
    fontSize: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  customTemplates?: {
    header?: string;
    footer?: string;
    sectionIntro?: {
      [sectionName: string]: string;
    };
  };
}
```

## 5. MongoDB Schema Implementation

Example MongoDB schema for the Project model:

```typescript
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: false },
  languageProfile: {
    name: String,
    description: String,
    shortDescription: String,
    speciesDescription: String,
    anatomicalConstraints: [String],
    culturalInspiration: [String],
    environmentalContext: String,
    socialStructure: String,
    aestheticQualities: [String],
    examples: [String],
    complexity: { 
      type: String, 
      enum: ['simple', 'moderate', 'complex'],
      default: 'moderate'
    },
    purposeAndContext: String,
    recommendedFeatures: {
      phonology: {
        consonantComplexity: { 
          type: String, 
          enum: ['simple', 'moderate', 'complex'] 
        },
        vowelComplexity: { 
          type: String, 
          enum: ['simple', 'moderate', 'complex'] 
        },
        tonality: Boolean,
        stressImportance: { 
          type: String, 
          enum: ['low', 'medium', 'high'] 
        },
        suggestedSounds: [String],
        avoidedSounds: [String],
        notes: String
      },
      // Grammar and lexicon recommendations...
    }
  },
  modules: {
    phonology: { type: mongoose.Schema.Types.ObjectId, ref: 'PhonologyModule' },
    lexicon: { type: mongoose.Schema.Types.ObjectId, ref: 'LexiconModule' },
    morphology: { type: mongoose.Schema.Types.ObjectId, ref: 'MorphologyModule' },
    syntax: { type: mongoose.Schema.Types.ObjectId, ref: 'SyntaxModule' },
    culture: { type: mongoose.Schema.Types.ObjectId, ref: 'CultureModule' },
    orthography: { type: mongoose.Schema.Types.ObjectId, ref: 'OrthographyModule' }
  },
  versions: [{
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    snapshot: Object
  }],
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Pre-save hook to update the updatedAt field
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
```

## 6. Relational Integrity

The data models must maintain relational integrity across the language components:

1. **Cross-Module Consistency**: Changes in phonology should cascade to lexicon, etc.
2. **Versioning**: Version tracking to allow safe experimentation
3. **Reference Tracking**: Proper references between related objects
4. **Validation**: Schema validation to ensure linguistic coherence

## 7. Migration and Evolution Considerations

As the application evolves, the data models will need to support:

1. **Schema Migrations**: Ability to update existing data when schemas change
2. **Backward Compatibility**: Supporting older versions of language projects
3. **Export Formats**: Standardized export formats for interoperability
4. **Import Capabilities**: Importing from external language creation tools
