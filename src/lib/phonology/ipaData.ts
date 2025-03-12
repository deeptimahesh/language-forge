// IPA data organized for phoneme selection
import { IpaSymbol, MannerOfArticulation, PlaceOfArticulation, VowelBackness, VowelHeight } from '@/types/phonology';

// Consonant IPA chart organized by place (columns) and manner (rows)
export const consonantChart: Record<MannerOfArticulation, Record<PlaceOfArticulation, IpaSymbol[]>> = {
  [MannerOfArticulation.Plosive]: {
    [PlaceOfArticulation.Bilabial]: [
      { symbol: 'p', description: 'voiceless bilabial plosive', type: 'consonant', features: { place: PlaceOfArticulation.Bilabial, manner: MannerOfArticulation.Plosive, voiced: false } },
      { symbol: 'b', description: 'voiced bilabial plosive', type: 'consonant', features: { place: PlaceOfArticulation.Bilabial, manner: MannerOfArticulation.Plosive, voiced: true } }
    ],
    [PlaceOfArticulation.Alveolar]: [
      { symbol: 't', description: 'voiceless alveolar plosive', type: 'consonant', features: { place: PlaceOfArticulation.Alveolar, manner: MannerOfArticulation.Plosive, voiced: false } },
      { symbol: 'd', description: 'voiced alveolar plosive', type: 'consonant', features: { place: PlaceOfArticulation.Alveolar, manner: MannerOfArticulation.Plosive, voiced: true } }
    ],
    [PlaceOfArticulation.Velar]: [
      { symbol: 'k', description: 'voiceless velar plosive', type: 'consonant', features: { place: PlaceOfArticulation.Velar, manner: MannerOfArticulation.Plosive, voiced: false } },
      { symbol: 'g', description: 'voiced velar plosive', type: 'consonant', features: { place: PlaceOfArticulation.Velar, manner: MannerOfArticulation.Plosive, voiced: true } }
    ],
    [PlaceOfArticulation.Glottal]: [
      { symbol: 'ʔ', description: 'glottal stop', type: 'consonant', features: { place: PlaceOfArticulation.Glottal, manner: MannerOfArticulation.Plosive, voiced: false } }
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: []
  },
  [MannerOfArticulation.Nasal]: {
    [PlaceOfArticulation.Bilabial]: [
      { symbol: 'm', description: 'bilabial nasal', type: 'consonant', features: { place: PlaceOfArticulation.Bilabial, manner: MannerOfArticulation.Nasal, voiced: true } }
    ],
    [PlaceOfArticulation.Alveolar]: [
      { symbol: 'n', description: 'alveolar nasal', type: 'consonant', features: { place: PlaceOfArticulation.Alveolar, manner: MannerOfArticulation.Nasal, voiced: true } }
    ],
    [PlaceOfArticulation.Velar]: [
      { symbol: 'ŋ', description: 'velar nasal', type: 'consonant', features: { place: PlaceOfArticulation.Velar, manner: MannerOfArticulation.Nasal, voiced: true } }
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Fricative]: {
    [PlaceOfArticulation.Labiodental]: [
      { symbol: 'f', description: 'voiceless labiodental fricative', type: 'consonant', features: { place: PlaceOfArticulation.Labiodental, manner: MannerOfArticulation.Fricative, voiced: false } },
      { symbol: 'v', description: 'voiced labiodental fricative', type: 'consonant', features: { place: PlaceOfArticulation.Labiodental, manner: MannerOfArticulation.Fricative, voiced: true } }
    ],
    [PlaceOfArticulation.Dental]: [
      { symbol: 'θ', description: 'voiceless dental fricative', type: 'consonant', features: { place: PlaceOfArticulation.Dental, manner: MannerOfArticulation.Fricative, voiced: false } },
      { symbol: 'ð', description: 'voiced dental fricative', type: 'consonant', features: { place: PlaceOfArticulation.Dental, manner: MannerOfArticulation.Fricative, voiced: true } }
    ],
    [PlaceOfArticulation.Alveolar]: [
      { symbol: 's', description: 'voiceless alveolar fricative', type: 'consonant', features: { place: PlaceOfArticulation.Alveolar, manner: MannerOfArticulation.Fricative, voiced: false } },
      { symbol: 'z', description: 'voiced alveolar fricative', type: 'consonant', features: { place: PlaceOfArticulation.Alveolar, manner: MannerOfArticulation.Fricative, voiced: true } }
    ],
    [PlaceOfArticulation.PostAlveolar]: [
      { symbol: 'ʃ', description: 'voiceless postalveolar fricative', type: 'consonant', features: { place: PlaceOfArticulation.PostAlveolar, manner: MannerOfArticulation.Fricative, voiced: false } },
      { symbol: 'ʒ', description: 'voiced postalveolar fricative', type: 'consonant', features: { place: PlaceOfArticulation.PostAlveolar, manner: MannerOfArticulation.Fricative, voiced: true } }
    ],
    [PlaceOfArticulation.Glottal]: [
      { symbol: 'h', description: 'voiceless glottal fricative', type: 'consonant', features: { place: PlaceOfArticulation.Glottal, manner: MannerOfArticulation.Fricative, voiced: false } }
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: []
  },
  [MannerOfArticulation.Approximant]: {
    [PlaceOfArticulation.Alveolar]: [
      { symbol: 'ɹ', description: 'alveolar approximant', type: 'consonant', features: { place: PlaceOfArticulation.Alveolar, manner: MannerOfArticulation.Approximant, voiced: true } }
    ],
    [PlaceOfArticulation.Palatal]: [
      { symbol: 'j', description: 'palatal approximant', type: 'consonant', features: { place: PlaceOfArticulation.Palatal, manner: MannerOfArticulation.Approximant, voiced: true } }
    ],
    [PlaceOfArticulation.Velar]: [
      { symbol: 'w', description: 'labial-velar approximant', type: 'consonant', features: { place: PlaceOfArticulation.Velar, manner: MannerOfArticulation.Approximant, voiced: true } }
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.LateralApproximant]: {
    [PlaceOfArticulation.Alveolar]: [
      { symbol: 'l', description: 'alveolar lateral approximant', type: 'consonant', features: { place: PlaceOfArticulation.Alveolar, manner: MannerOfArticulation.LateralApproximant, voiced: true } }
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  // Empty placeholders for other manners of articulation
  [MannerOfArticulation.Trill]: {
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.Alveolar]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.TapOrFlap]: {
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.Alveolar]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.LateralFricative]: {
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.Alveolar]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Affricate]: {
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.Alveolar]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  }
};

// Vowel IPA chart organized by height (rows) and backness (columns)
export const vowelChart: Record<VowelHeight, Record<VowelBackness, IpaSymbol[]>> = {
  [VowelHeight.Close]: {
    [VowelBackness.Front]: [
      { symbol: 'i', description: 'close front unrounded vowel', type: 'vowel', features: { height: VowelHeight.Close, backness: VowelBackness.Front, rounded: false } },
      { symbol: 'y', description: 'close front rounded vowel', type: 'vowel', features: { height: VowelHeight.Close, backness: VowelBackness.Front, rounded: true } }
    ],
    [VowelBackness.Central]: [
      { symbol: 'ɨ', description: 'close central unrounded vowel', type: 'vowel', features: { height: VowelHeight.Close, backness: VowelBackness.Central, rounded: false } },
      { symbol: 'ʉ', description: 'close central rounded vowel', type: 'vowel', features: { height: VowelHeight.Close, backness: VowelBackness.Central, rounded: true } }
    ],
    [VowelBackness.Back]: [
      { symbol: 'ɯ', description: 'close back unrounded vowel', type: 'vowel', features: { height: VowelHeight.Close, backness: VowelBackness.Back, rounded: false } },
      { symbol: 'u', description: 'close back rounded vowel', type: 'vowel', features: { height: VowelHeight.Close, backness: VowelBackness.Back, rounded: true } }
    ]
  },
  [VowelHeight.CloseMid]: {
    [VowelBackness.Front]: [
      { symbol: 'e', description: 'close-mid front unrounded vowel', type: 'vowel', features: { height: VowelHeight.CloseMid, backness: VowelBackness.Front, rounded: false } },
      { symbol: 'ø', description: 'close-mid front rounded vowel', type: 'vowel', features: { height: VowelHeight.CloseMid, backness: VowelBackness.Front, rounded: true } }
    ],
    [VowelBackness.Central]: [
      { symbol: 'ɘ', description: 'close-mid central unrounded vowel', type: 'vowel', features: { height: VowelHeight.CloseMid, backness: VowelBackness.Central, rounded: false } },
      { symbol: 'ɵ', description: 'close-mid central rounded vowel', type: 'vowel', features: { height: VowelHeight.CloseMid, backness: VowelBackness.Central, rounded: true } }
    ],
    [VowelBackness.Back]: [
      { symbol: 'ɤ', description: 'close-mid back unrounded vowel', type: 'vowel', features: { height: VowelHeight.CloseMid, backness: VowelBackness.Back, rounded: false } },
      { symbol: 'o', description: 'close-mid back rounded vowel', type: 'vowel', features: { height: VowelHeight.CloseMid, backness: VowelBackness.Back, rounded: true } }
    ]
  },
  [VowelHeight.OpenMid]: {
    [VowelBackness.Front]: [
      { symbol: 'ɛ', description: 'open-mid front unrounded vowel', type: 'vowel', features: { height: VowelHeight.OpenMid, backness: VowelBackness.Front, rounded: false } },
      { symbol: 'œ', description: 'open-mid front rounded vowel', type: 'vowel', features: { height: VowelHeight.OpenMid, backness: VowelBackness.Front, rounded: true } }
    ],
    [VowelBackness.Central]: [
      { symbol: 'ɜ', description: 'open-mid central unrounded vowel', type: 'vowel', features: { height: VowelHeight.OpenMid, backness: VowelBackness.Central, rounded: false } },
      { symbol: 'ɞ', description: 'open-mid central rounded vowel', type: 'vowel', features: { height: VowelHeight.OpenMid, backness: VowelBackness.Central, rounded: true } }
    ],
    [VowelBackness.Back]: [
      { symbol: 'ʌ', description: 'open-mid back unrounded vowel', type: 'vowel', features: { height: VowelHeight.OpenMid, backness: VowelBackness.Back, rounded: false } },
      { symbol: 'ɔ', description: 'open-mid back rounded vowel', type: 'vowel', features: { height: VowelHeight.OpenMid, backness: VowelBackness.Back, rounded: true } }
    ]
  },
  [VowelHeight.Open]: {
    [VowelBackness.Front]: [
      { symbol: 'a', description: 'open front unrounded vowel', type: 'vowel', features: { height: VowelHeight.Open, backness: VowelBackness.Front, rounded: false } },
      { symbol: 'ɶ', description: 'open front rounded vowel', type: 'vowel', features: { height: VowelHeight.Open, backness: VowelBackness.Front, rounded: true } }
    ],
    [VowelBackness.Central]: [],
    [VowelBackness.Back]: [
      { symbol: 'ɑ', description: 'open back unrounded vowel', type: 'vowel', features: { height: VowelHeight.Open, backness: VowelBackness.Back, rounded: false } },
      { symbol: 'ɒ', description: 'open back rounded vowel', type: 'vowel', features: { height: VowelHeight.Open, backness: VowelBackness.Back, rounded: true } }
    ]
  },
  // Empty placeholders for other heights
  [VowelHeight.NearClose]: {
    [VowelBackness.Front]: [],
    [VowelBackness.Central]: [],
    [VowelBackness.Back]: []
  },
  [VowelHeight.Mid]: {
    [VowelBackness.Front]: [],
    [VowelBackness.Central]: [],
    [VowelBackness.Back]: []
  },
  [VowelHeight.NearOpen]: {
    [VowelBackness.Front]: [],
    [VowelBackness.Central]: [],
    [VowelBackness.Back]: []
  }
};

// Helper function to get all IPA symbols as a flat list
export const getAllConsonants = (): IpaSymbol[] => {
  const allConsonants: IpaSymbol[] = [];
  
  Object.values(consonantChart).forEach(placeMap => {
    Object.values(placeMap).forEach(symbols => {
      symbols.forEach(symbol => {
        if (symbol.symbol) {
          allConsonants.push(symbol);
        }
      });
    });
  });
  
  return allConsonants;
};

export const getAllVowels = (): IpaSymbol[] => {
  const allVowels: IpaSymbol[] = [];
  
  Object.values(vowelChart).forEach(backnessMap => {
    Object.values(backnessMap).forEach(symbols => {
      symbols.forEach(symbol => {
        if (symbol.symbol) {
          allVowels.push(symbol);
        }
      });
    });
  });
  
  return allVowels;
}; 