# Language Forge: UI Design & User Experience

## 1. Design Philosophy

Language Forge's interface is designed around these core principles:

- **Progressive Disclosure**: Reveal complexity gradually as users advance
- **Guided Creation**: Provide clear pathways while allowing creative freedom
- **Visual Learning**: Use visualizations to make linguistic concepts accessible
- **Contextual Help**: Provide explanations and examples where needed
- **Responsive Feedback**: Give immediate feedback on language choices

## 2. UI Components

### 2.1 Global UI Elements

#### Header & Navigation

```bash
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────┐             Language Forge             ┌───┐  │
│  │  Logo        │                                        │ ⋮ │  │
│  └──────────────┘                                        └───┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [ Dashboard ]  [ My Languages ]  [ Explore ]  [ Learn ]        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Project Dashboard

```bash
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Elvish Language Project                                ■ □ ×   │
│                                                                 │
├─────────┬───────────────────────────────────────────────────────┤
│         │                                                       │
│         │   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│ Project │   │ Phonology   │ │ Lexicon     │ │ Grammar     │    │
│ Overview│   │ Module      │ │ Module      │ │ Module      │    │
│         │   │             │ │             │ │             │    │
│ Phonology   │ Progress:   │ │ Progress:   │ │ Progress:   │    │
│         │   │ [====75%====] │ [==20%======] │ [=10%=======] │    │
│ Lexicon │   │             │ │             │ │             │    │
│         │   └─────────────┘ └─────────────┘ └─────────────┘    │
│ Grammar │                                                       │
│         │   ┌─────────────┐ ┌─────────────┐                    │
│ Culture │   │ Culture     │ │ Orthography │                    │
│         │   │ Module      │ │ Module      │                    │
│ Export  │   │             │ │             │                    │
│         │   │ Progress:   │ │ Progress:   │                    │
│         │   │ [=5%========] │ [=0%========] │                    │
│         │   │             │ │             │                    │
│         │   └─────────────┘ └─────────────┘                    │
│         │                                                       │
│         │   [            Continue Creation             ]        │
│         │                                                       │
└─────────┴───────────────────────────────────────────────────────┘
```

### 2.2 Module-Specific UIs

#### Language Profile Creator

```bash
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Create Your Language Profile                                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Language Name: [___________________________]                   │
│                                                                 │
│  Tell us about your language (the more details, the better):    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ I want a language for forest-dwelling elves with a melodic│  │
│  │ quality. It should sound ethereal and flowing, with       │  │
│  │ complex vowels. The elves have a deep connection with     │  │
│  │ nature.                                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Speaker Species:                                               │
│  ○ Human   ● Non-human                                          │
│                                                                 │
│  If non-human, describe their physiological differences:        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Elves have more sensitive hearing and better vocal        │  │
│  │ articulation than humans. They can produce subtle         │  │
│  │ distinctions in sounds.                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Cultural Inspirations (select all that apply):                 │
│  ☑ Celtic   ☐ Norse   ☐ Asian   ☑ Fantasy   ☐ Other: [_______] │
│                                                                 │
│  Environment:                                                   │
│  ☑ Forest   ☐ Desert   ☐ Urban   ☐ Aquatic   ☐ Other: [_______]│
│                                                                 │
│  Aesthetic Goals:                                               │
│  ☑ Melodic  ☑ Flowing   ☐ Harsh   ☐ Guttural   ☑ Elegant       │
│                                                                 │
│  Complexity Level:                                              │
│  ○ Simple   ○ Moderate   ● Complex                              │
│                                                                 │
│  [ Generate Language Profile ]                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Phonology Module UI

```bash
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Phonology Creator: Elvish Language                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Consonant Inventory   2. Vowel Inventory   3. Phonotactics  │
│  ───────────────────────────────────────────────────────────────│
│                                                                 │
│  Recommended Consonants (click to toggle):                      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  Place of Articulation                      ││
│  │        │Bilabial│Alveolar│Palatal│Velar │Glottal│          ││
│  │        │        │        │       │      │       │          ││
│  │ Plosive│   p b  │   t d  │       │  k g │   ʔ   │          ││
│  │ Nasal  │    m   │    n   │       │   ŋ  │       │          ││
│  │ Fricative│  f v  │   s z  │   ʃ ʒ │      │   h   │          ││
│  │ Approx.│    w   │    ɹ   │   j   │      │       │          ││
│  │ Lateral│        │    l   │   ʎ   │      │       │          ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  Custom consonants: [_______] [+ Add]                           │
│                                                                 │
│  Special sound notes:                                           │
│  Palatalized consonants are frequent in this language           │
│  to achieve the melodic quality desired.                        │
│                                                                 │
│  Listen to examples:                                            │
│  [▶ Play "lathien"]  [▶ Play "nyélë"]  [▶ Play "thindor"]      │
│                                                                 │
│  [ Back ]                            [ Save and Continue ▶ ]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Lexicon Generator UI

```bash
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Lexicon Creator: Elvish Language                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Semantic Domains   2. Root Generation   3. Etymology       │
│  ───────────────────────────────────────────────────────────────│
│                                                                 │
│  Priority Semantic Domains:                                     │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ ▲ Nature        │  │ ▲ Art/Beauty    │  │ ▼ Technology    │  │
│  │ High Priority   │  │ High Priority   │  │ Low Priority    │  │
│  │                 │  │                 │  │                 │  │
│  │ Words: 48       │  │ Words: 35       │  │ Words: 8        │  │
│  │ [Generate More] │  │ [Generate More] │  │ [Generate More] │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ ▶ Emotions      │  │ ▶ Kinship       │  │ [+ Add Domain]  │  │
│  │ Medium Priority │  │ Medium Priority │  │                 │  │
│  │                 │  │                 │  │                 │  │
│  │ Words: 25       │  │ Words: 18       │  │                 │  │
│  │ [Generate More] │  │ [Generate More] │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                 │
│  Recent words from "Nature" domain:                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ alassë - "forest"                                           ││
│  │ nenlë  - "water"                                            ││
│  │ ëarë   - "sea"                                              ││
│  │ lairë  - "summer"                                           ││
│  │ ortala - "mountain"                                         ││
│  │ [Show all]                                                  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  Etymology Pattern:                                             │
│  ☑ Nature metaphors   ☐ Sound symbolism   ☐ Historical derivation│
│                                                                 │
│  [ Back ]                            [ Save and Continue ▶ ]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Interactive Components

#### IPA Chart (Interactive Phonology Tool)

```bash
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Interactive IPA Chart                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Consonants ▼]  [Vowels]  [Diacritics]                │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │                                                     ││
│  │   • p   • b   • t   • d   • ʈ   • ɖ   • c   • ɟ    ││
│  │                                                     ││
│  │   • k   • g   • q   • ɢ   • ʔ               ◐ ◐    ││
│  │                                                     ││
│  │   • m   • ɱ   • n   • ɳ   • ɲ   • ŋ   • ɴ         ││
│  │                                                     ││
│  │   • ʙ   • r   • ʀ                         ◐        ││
│  │                                                     ││
│  │   • ɸ   • β   • f   • v   • θ   • ð   • s   • z    ││
│  │                                                     ││
│  │   • ʃ   • ʒ   • ʂ   • ʐ   • ç   • ʝ   • x   • ɣ    ││
│  │                                                     ││
│  │   • χ   • ʁ   • ħ   • ʕ   • h   • ɦ         ◐ ◐    ││
│  │                                                     ││
│  │   • ɬ   • ɮ             • ɹ   • ɻ   • j   • ɰ      ││
│  │                                                     ││
│  │   • l   • ɭ   • ʎ   • ʟ                     ◐      ││
│  │                                                     ││
│  │                            Legend:                  ││
│  │                            ● - In your language     ││
│  │                            ◐ - Similar sound exists ││
│  │                            ○ - Not in language      ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ► Listen to selected sounds                            │
│  ► Add selected sounds to my inventory                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Word Generator (Lexicon Tool)

```bash
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Word Generator                             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Generate words following your phonological rules:      │
│                                                         │
│  Meaning to express: [tree_________________]            │
│                                                         │
│  Semantic domain:    [Nature__________▼]                │
│                                                         │
│  Etymology pattern:  [Nature metaphor__▼]               │
│                                                         │
│  Syllable count:     [2▼]                               │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │                                                     ││
│  │  Suggestions:                                       ││
│  │                                                     ││
│  │  • aldë   /alde/                                   ││
│  │    Etymology: From 'al' (tall) + 'dë' (living)     ││
│  │                                                     ││
│  │  • ornë   /orne/                                   ││
│  │    Etymology: Related to 'or' (grow) + 'në' (earth)││
│  │                                                     ││
│  │  • lassë  /lasse/                                  ││
│  │    Etymology: From concept of 'leaf-bearer'        ││
│  │                                                     ││
│  │  [♻ Regenerate]    [✓ Use Selected]                ││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  Or create your own:                                    │
│                                                         │
│  Word: [_________________]                              │
│                                                         │
│  Phonological check: []                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Grammar Builder (Morphology Tool)

```bash
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Grammar Builder                            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Grammatical Categories:                                │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ Number      │  │ Tense       │  │ Case        │      │
│  │             │  │             │  │             │      │
│  │ ☑ Singular  │  │ ☑ Present   │  │ ☑ Nominative│      │
│  │ ☑ Plural    │  │ ☑ Past      │  │ ☑ Accusative│      │
│  │ ☐ Dual      │  │ ☐ Future    │  │ ☐ Dative    │      │
│  │ ☐ Paucal    │  │ ☐ Perfect   │  │ ☐ Genitive  │      │
│  │ [+ Add]     │  │ [+ Add]     │  │ [+ Add]     │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                         │
│  Word Formation Preview:                                │
│                                                         │
│  Base: "ornë" (tree)                                    │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │                                                     ││
│  │  Singular: ornë                                     ││
│  │  Plural:   ornëth                                   ││
│  │                                                     ││
│  │  Present:  ornë                                     ││
│  │  Past:     ornessë                                  ││
│  │                                                     ││
│  │  Nominative: ornë                                   ││
│  │  Accusative: ornën                                  ││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  Combined forms:                                        │
│  "ornëthessën" - past tense, plural, accusative        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 3. User Journeys

### 3.1 First-time User

1. **Welcome & Onboarding**
   - Introduction to Language Forge
   - Brief overview of language creation process
   - Option to view tutorial or dive in

2. **Project Creation**
   - Language naming
   - High-level description input
   - Profile generation

3. **Guided Phonology Creation**
   - Simplified sound options based on profile
   - Visual and audio examples
   - Quick preview of generated sounds

4. **Basic Lexicon Generation**
   - Core vocabulary generation (10-20 words)
   - Option to regenerate unwanted words
   - Introduction to semantic domains

5. **Simple Grammar Rules**
   - Basic word order selection
   - Minimal grammatical categories
   - Example sentence generation

6. **Project Review**
   - Summary of created language features
   - Sample text in the new language
   - Options to share or continue development

### 3.2 Expert Linguistic User

1. **Advanced Project Setup**
   - Detailed linguistic goals specification
   - Cross-linguistic feature selection
   - Reference language influences

2. **Detailed Phonology Workshop**
   - Full IPA chart interaction
   - Custom phonological rules
   - Advanced features (tone, length, stress)
   - Sound change simulation

3. **Comprehensive Lexicon Development**
   - Etymology system design
   - Root derivation patterns
   - Compound formation rules
   - Extensive vocabulary generation

4. **Complex Grammar Construction**
   - Multiple grammatical categories
   - Irregular form creation
   - Syntax tree visualization
   - Typological consistency checking

5. **Cultural-Linguistic Integration**
   - Sociolinguistic variation
   - Historical language development
   - Dialect creation
   - Idiom and figurative language development

6. **Complete Documentation**
   - Comprehensive grammar generation
   - Full dictionary export
   - Orthography development
   - Translation tools

## 4. Visual Design System

### 4.1 Color Palette

```txt
Primary Colors:
- Deep Blue: #1A365D - Navigation, headers
- Teal: #2C7A7B - Buttons, interactive elements
- Amber: #C05621 - Accents, notifications

Secondary Colors:
- Light Gray: #E2E8F0 - Backgrounds
- Dark Gray: #4A5568 - Text
- Light Teal: #B2F5EA - Highlights
- Light Amber: #FEEBC8 - Secondary highlights

Semantic Colors:
- Success: #38A169 - Valid inputs, confirmations
- Warning: #DD6B20 - Cautions, partial completion
- Error: #E53E3E - Invalid inputs, errors
- Info: #3182CE - Help, information
```

### 4.2 Typography

```txt
Font Families:
- Headings: 'Montserrat', sans-serif
- Body: 'Open Sans', sans-serif
- Monospace: 'Fira Code', monospace (for IPA and code)

Type Scale:
- XS: 0.75rem
- SM: 0.875rem
- Base: 1rem
- LG: 1.125rem
- XL: 1.25rem
- 2XL: 1.5rem
- 3XL: 1.875rem
- 4XL: 2.25rem
```

### 4.3 Components

```txt
Buttons:
- Primary: Teal bg, white text, rounded
- Secondary: White bg, teal border, teal text
- Tertiary: Transparent bg, teal text
- Danger: Red bg, white text

Cards:
- White bg, light shadow, rounded corners
- Hover state with slight elevation increase
- Optional colored borders for categorization

Forms:
- Clearly labeled fields
- Inline validation
- Accessible focus states
- Complementary helper text
```

## 5. Responsive Design

### 5.1 Breakpoints

```txt
- Mobile: 0-639px
- Tablet: 640px-1023px
- Desktop: 1024px+
```

### 5.2 Layout Adjustments

```txt
Mobile:
- Single column layout
- Stacked navigation
- Simplified visualizations
- Sequential workflow

Tablet:
- Two column layout where appropriate
- Side navigation
- Enhanced visualizations
- Tab-based module navigation

Desktop:
- Multi-column layout
- Persistent side navigation
- Full visualizations
- Parallel workflow options
```

## 6. Accessibility Considerations

- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full functionality without mouse
- **Color Contrast**: WCAG AA compliant (4.5:1 for normal text)
- **Text Resizing**: UI adapts to larger text sizes
- **Focus Indicators**: Clear visual indicators for keyboard focus
- **Audio Alternatives**: Textual descriptions for sound examples
- **Cognitive Load**: Progressive disclosure of complex information

## 7. Animation & Microinteractions

- **Transition Effects**: Subtle animations between steps (300-500ms)
- **Hover States**: Gentle highlighting for interactive elements
- **Loading States**: Informative loading animations
- **Success Feedback**: Visual confirmation for completed actions
- **Error States**: Clear visual indication of problems
- **Sound Visualizations**: Waveform representations of phonemes

## 8. Implementation Notes

### 8.1 Component Library

We'll use a combination of custom components and Tailwind UI components:

```typescript
// Example Button Component
const Button = ({ 
  variant = 'primary', 
  size = 'medium',
  children,
  ...props 
}) => {
  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-50',
    tertiary: 'text-teal-600 hover:underline',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  
  const sizes = {
    small: 'text-sm py-1 px-3',
    medium: 'py-2 px-4',
    large: 'text-lg py-3 px-6'
  };
  
  return (
    <button
      className={`rounded font-medium transition-colors ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 8.2 Page Structure

Example page structure using Next.js App Router:

```typescript
// app/project/[id]/phonology/page.tsx
import { PhonologyEditor } from '@/components/language/phonology/PhonologyEditor';
import { PhonologyProvider } from '@/context/PhonologyContext';
import { getPhonologyData } from '@/lib/data';

export default async function PhonologyPage({ params }) {
  const phonologyData = await getPhonologyData(params.id);
  
  return (
    <PhonologyProvider initialData={phonologyData}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Phonology Creator</h1>
        <PhonologyEditor />
      </div>
    </PhonologyProvider>
  );
}
```

### 8.3 State Management

```typescript
// Example Zustand store for phonology state
import create from 'zustand';

interface PhonologyState {
  consonants: Phoneme[];
  vowels: Phoneme[];
  syllableStructures: SyllableTemplate[];
  addPhoneme: (phoneme: Phoneme) => void;
  removePhoneme: (id: string) => void;
  updatePhoneme: (id: string, data: Partial<Phoneme>) => void;
  // Additional actions...
}

export const usePhonologyStore = create<PhonologyState>((set) => ({
  consonants: [],
  vowels: [],
  syllableStructures: [],
  
  addPhoneme: (phoneme) => set((state) => {
    const target = phoneme.type === 'consonant' ? 'consonants' : 'vowels';
    return {
      [target]: [...state[target], phoneme]
    };
  }),
  
  removePhoneme: (id) => set((state) => {
    const newConsonants = state.consonants.filter(c => c.id !== id);
    const newVowels = state.vowels.filter(v => v.id !== id);
    return {
      consonants: newConsonants,
      vowels: newVowels
    };
  }),
  
  updatePhoneme: (id, data) => set((state) => {
    const consonantIndex = state.consonants.findIndex(c => c.id === id);
    const vowelIndex = state.vowels.findIndex(v => v.id === id);
    
    if (consonantIndex >= 0) {
      const newConsonants = [...state.consonants];
      newConsonants[consonantIndex] = { 
        ...newConsonants[consonantIndex], 
        ...data 
      };
      return { consonants: newConsonants };
    }
    
    if (vowelIndex >= 0) {
      const newVowels = [...state.vowels];
      newVowels[vowelIndex] = { 
        ...newVowels[vowelIndex], 
        ...data 
      };
      return { vowels: newVowels };
    }
    
    return {};
  }),
  
  // Additional actions...
}));
```
