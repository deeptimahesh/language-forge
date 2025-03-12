// Basic types for the phonology module

export interface IpaSymbol {
  symbol: string;
  description: string;
  type: 'consonant' | 'vowel';
  features?: PhoneticFeatures;
  selected?: boolean;
}

// Consonant features
export interface ConsonantFeatures {
  place: PlaceOfArticulation;
  manner: MannerOfArticulation;
  voiced: boolean;
}

// Vowel features
export interface VowelFeatures {
  height: VowelHeight;
  backness: VowelBackness;
  rounded: boolean;
}

// Union type for phonetic features
export type PhoneticFeatures = ConsonantFeatures | VowelFeatures;

// Enum for consonant place of articulation
export enum PlaceOfArticulation {
  Bilabial = 'bilabial',
  Labiodental = 'labiodental',
  Dental = 'dental',
  Alveolar = 'alveolar',
  PostAlveolar = 'post-alveolar',
  Retroflex = 'retroflex',
  Palatal = 'palatal',
  Velar = 'velar',
  Uvular = 'uvular',
  Pharyngeal = 'pharyngeal',
  Glottal = 'glottal'
}

// Enum for consonant manner of articulation
export enum MannerOfArticulation {
  Plosive = 'plosive',
  Nasal = 'nasal',
  Trill = 'trill',
  TapOrFlap = 'tap or flap',
  Fricative = 'fricative',
  LateralFricative = 'lateral fricative',
  Approximant = 'approximant',
  LateralApproximant = 'lateral approximant',
  Affricate = 'affricate'
}

// Enum for vowel height
export enum VowelHeight {
  Close = 'close',
  NearClose = 'near-close',
  CloseMid = 'close-mid',
  Mid = 'mid',
  OpenMid = 'open-mid',
  NearOpen = 'near-open',
  Open = 'open'
}

// Enum for vowel backness
export enum VowelBackness {
  Front = 'front',
  Central = 'central',
  Back = 'back'
}

// Simple phonology module interface (we'll expand this later)
export interface PhonologyModule {
  id?: string;
  projectId: string;
  consonants: IpaSymbol[];
  vowels: IpaSymbol[];
} 