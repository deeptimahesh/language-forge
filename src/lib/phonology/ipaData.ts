// IPA data organized for phoneme selection
import { IpaSymbol, MannerOfArticulation, PlaceOfArticulation, VowelBackness, VowelHeight } from '@/types/phonology';
import { getAudioUrl } from './audioUtils';

// Helper function to create IPA symbol objects with audio URLs
const createConsonant = (
  symbol: string, 
  description: string, 
  place: PlaceOfArticulation, 
  manner: MannerOfArticulation, 
  voiced: boolean
): IpaSymbol => ({
  symbol,
  description,
  type: 'consonant',
  features: { place, manner, voiced },
  audioUrl: getAudioUrl(symbol)
});

const createVowel = (
  symbol: string, 
  description: string, 
  height: VowelHeight, 
  backness: VowelBackness, 
  rounded: boolean
): IpaSymbol => ({
  symbol,
  description,
  type: 'vowel',
  features: { height, backness, rounded },
  audioUrl: getAudioUrl(symbol)
});

// Consonant IPA chart organized by place (columns) and manner (rows)
// Expanded to match ipachart.com
export const consonantChart: Record<MannerOfArticulation, Record<PlaceOfArticulation, IpaSymbol[]>> = {
  [MannerOfArticulation.Plosive]: {
    [PlaceOfArticulation.Bilabial]: [
      createConsonant('p', 'voiceless bilabial plosive', PlaceOfArticulation.Bilabial, MannerOfArticulation.Plosive, false),
      createConsonant('b', 'voiced bilabial plosive', PlaceOfArticulation.Bilabial, MannerOfArticulation.Plosive, true)
    ],
    [PlaceOfArticulation.Alveolar]: [
      createConsonant('t', 'voiceless alveolar plosive', PlaceOfArticulation.Alveolar, MannerOfArticulation.Plosive, false),
      createConsonant('d', 'voiced alveolar plosive', PlaceOfArticulation.Alveolar, MannerOfArticulation.Plosive, true)
    ],
    [PlaceOfArticulation.Retroflex]: [
      createConsonant('ʈ', 'voiceless retroflex plosive', PlaceOfArticulation.Retroflex, MannerOfArticulation.Plosive, false),
      createConsonant('ɖ', 'voiced retroflex plosive', PlaceOfArticulation.Retroflex, MannerOfArticulation.Plosive, true)
    ],
    [PlaceOfArticulation.Palatal]: [
      createConsonant('c', 'voiceless palatal plosive', PlaceOfArticulation.Palatal, MannerOfArticulation.Plosive, false),
      createConsonant('ɟ', 'voiced palatal plosive', PlaceOfArticulation.Palatal, MannerOfArticulation.Plosive, true)
    ],
    [PlaceOfArticulation.Velar]: [
      createConsonant('k', 'voiceless velar plosive', PlaceOfArticulation.Velar, MannerOfArticulation.Plosive, false),
      createConsonant('g', 'voiced velar plosive', PlaceOfArticulation.Velar, MannerOfArticulation.Plosive, true)
    ],
    [PlaceOfArticulation.Uvular]: [
      createConsonant('q', 'voiceless uvular plosive', PlaceOfArticulation.Uvular, MannerOfArticulation.Plosive, false),
      createConsonant('ɢ', 'voiced uvular plosive', PlaceOfArticulation.Uvular, MannerOfArticulation.Plosive, true)
    ],
    [PlaceOfArticulation.Glottal]: [
      createConsonant('ʔ', 'glottal stop', PlaceOfArticulation.Glottal, MannerOfArticulation.Plosive, false)
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Pharyngeal]: []
  },
  [MannerOfArticulation.Nasal]: {
    [PlaceOfArticulation.Bilabial]: [
      createConsonant('m', 'bilabial nasal', PlaceOfArticulation.Bilabial, MannerOfArticulation.Nasal, true)
    ],
    [PlaceOfArticulation.Labiodental]: [
      createConsonant('ɱ', 'labiodental nasal', PlaceOfArticulation.Labiodental, MannerOfArticulation.Nasal, true)
    ],
    [PlaceOfArticulation.Alveolar]: [
      createConsonant('n', 'alveolar nasal', PlaceOfArticulation.Alveolar, MannerOfArticulation.Nasal, true)
    ],
    [PlaceOfArticulation.Retroflex]: [
      createConsonant('ɳ', 'retroflex nasal', PlaceOfArticulation.Retroflex, MannerOfArticulation.Nasal, true)
    ],
    [PlaceOfArticulation.Palatal]: [
      createConsonant('ɲ', 'palatal nasal', PlaceOfArticulation.Palatal, MannerOfArticulation.Nasal, true)
    ],
    [PlaceOfArticulation.Velar]: [
      createConsonant('ŋ', 'velar nasal', PlaceOfArticulation.Velar, MannerOfArticulation.Nasal, true)
    ],
    [PlaceOfArticulation.Uvular]: [
      createConsonant('ɴ', 'uvular nasal', PlaceOfArticulation.Uvular, MannerOfArticulation.Nasal, true)
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Trill]: {
    [PlaceOfArticulation.Bilabial]: [
      createConsonant('ʙ', 'bilabial trill', PlaceOfArticulation.Bilabial, MannerOfArticulation.Trill, true)
    ],
    [PlaceOfArticulation.Alveolar]: [
      createConsonant('r', 'alveolar trill', PlaceOfArticulation.Alveolar, MannerOfArticulation.Trill, true)
    ],
    [PlaceOfArticulation.Uvular]: [
      createConsonant('ʀ', 'uvular trill', PlaceOfArticulation.Uvular, MannerOfArticulation.Trill, true)
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.TapOrFlap]: {
    [PlaceOfArticulation.Labiodental]: [
      // createConsonant('ⱱ', 'labiodental flap', PlaceOfArticulation.Labiodental, MannerOfArticulation.TapOrFlap, true)
    ],
    [PlaceOfArticulation.Alveolar]: [
      // createConsonant('ɾ', 'alveolar tap', PlaceOfArticulation.Alveolar, MannerOfArticulation.TapOrFlap, true)
    ],
    [PlaceOfArticulation.Retroflex]: [
      // createConsonant('ɽ', 'retroflex flap', PlaceOfArticulation.Retroflex, MannerOfArticulation.TapOrFlap, true)
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Fricative]: {
    [PlaceOfArticulation.Bilabial]: [
      createConsonant('ɸ', 'voiceless bilabial fricative', PlaceOfArticulation.Bilabial, MannerOfArticulation.Fricative, false),
      createConsonant('β', 'voiced bilabial fricative', PlaceOfArticulation.Bilabial, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Labiodental]: [
      createConsonant('f', 'voiceless labiodental fricative', PlaceOfArticulation.Labiodental, MannerOfArticulation.Fricative, false),
      createConsonant('v', 'voiced labiodental fricative', PlaceOfArticulation.Labiodental, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Dental]: [
      createConsonant('θ', 'voiceless dental fricative', PlaceOfArticulation.Dental, MannerOfArticulation.Fricative, false),
      createConsonant('ð', 'voiced dental fricative', PlaceOfArticulation.Dental, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Alveolar]: [
      createConsonant('s', 'voiceless alveolar fricative', PlaceOfArticulation.Alveolar, MannerOfArticulation.Fricative, false),
      createConsonant('z', 'voiced alveolar fricative', PlaceOfArticulation.Alveolar, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.PostAlveolar]: [
      createConsonant('ʃ', 'voiceless postalveolar fricative', PlaceOfArticulation.PostAlveolar, MannerOfArticulation.Fricative, false),
      createConsonant('ʒ', 'voiced postalveolar fricative', PlaceOfArticulation.PostAlveolar, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Retroflex]: [
      createConsonant('ʂ', 'voiceless retroflex fricative', PlaceOfArticulation.Retroflex, MannerOfArticulation.Fricative, false),
      createConsonant('ʐ', 'voiced retroflex fricative', PlaceOfArticulation.Retroflex, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Palatal]: [
      createConsonant('ç', 'voiceless palatal fricative', PlaceOfArticulation.Palatal, MannerOfArticulation.Fricative, false),
      createConsonant('ʝ', 'voiced palatal fricative', PlaceOfArticulation.Palatal, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Velar]: [
      createConsonant('x', 'voiceless velar fricative', PlaceOfArticulation.Velar, MannerOfArticulation.Fricative, false),
      createConsonant('ɣ', 'voiced velar fricative', PlaceOfArticulation.Velar, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Uvular]: [
      createConsonant('χ', 'voiceless uvular fricative', PlaceOfArticulation.Uvular, MannerOfArticulation.Fricative, false),
      createConsonant('ʁ', 'voiced uvular fricative', PlaceOfArticulation.Uvular, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Pharyngeal]: [
      createConsonant('ħ', 'voiceless pharyngeal fricative', PlaceOfArticulation.Pharyngeal, MannerOfArticulation.Fricative, false),
      createConsonant('ʕ', 'voiced pharyngeal fricative', PlaceOfArticulation.Pharyngeal, MannerOfArticulation.Fricative, true)
    ],
    [PlaceOfArticulation.Glottal]: [
      createConsonant('h', 'voiceless glottal fricative', PlaceOfArticulation.Glottal, MannerOfArticulation.Fricative, false),
      createConsonant('ɦ', 'voiced glottal fricative', PlaceOfArticulation.Glottal, MannerOfArticulation.Fricative, true)
    ]
  },
  [MannerOfArticulation.LateralFricative]: {
    [PlaceOfArticulation.Alveolar]: [
      createConsonant('ɬ', 'voiceless alveolar lateral fricative', PlaceOfArticulation.Alveolar, MannerOfArticulation.LateralFricative, false),
      createConsonant('ɮ', 'voiced alveolar lateral fricative', PlaceOfArticulation.Alveolar, MannerOfArticulation.LateralFricative, true)
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
  [MannerOfArticulation.Approximant]: {
    [PlaceOfArticulation.Labiodental]: [
      createConsonant('ʋ', 'labiodental approximant', PlaceOfArticulation.Labiodental, MannerOfArticulation.Approximant, true)
    ],
    [PlaceOfArticulation.Alveolar]: [
      createConsonant('ɹ', 'alveolar approximant', PlaceOfArticulation.Alveolar, MannerOfArticulation.Approximant, true)
    ],
    [PlaceOfArticulation.Retroflex]: [
      createConsonant('ɻ', 'retroflex approximant', PlaceOfArticulation.Retroflex, MannerOfArticulation.Approximant, true)
    ],
    [PlaceOfArticulation.Palatal]: [
      createConsonant('j', 'palatal approximant', PlaceOfArticulation.Palatal, MannerOfArticulation.Approximant, true)
    ],
    [PlaceOfArticulation.Velar]: [
      createConsonant('ɰ', 'velar approximant', PlaceOfArticulation.Velar, MannerOfArticulation.Approximant, true)
    ],
    // Add w as a complex labial-velar approximant
    [PlaceOfArticulation.Bilabial]: [
      createConsonant('w', 'labial-velar approximant', PlaceOfArticulation.Bilabial, MannerOfArticulation.Approximant, true)
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.LateralApproximant]: {
    [PlaceOfArticulation.Alveolar]: [
      createConsonant('l', 'alveolar lateral approximant', PlaceOfArticulation.Alveolar, MannerOfArticulation.LateralApproximant, true)
    ],
    [PlaceOfArticulation.Retroflex]: [
      createConsonant('ɭ', 'retroflex lateral approximant', PlaceOfArticulation.Retroflex, MannerOfArticulation.LateralApproximant, true)
    ],
    [PlaceOfArticulation.Palatal]: [
      createConsonant('ʎ', 'palatal lateral approximant', PlaceOfArticulation.Palatal, MannerOfArticulation.LateralApproximant, true)
    ],
    [PlaceOfArticulation.Velar]: [
      createConsonant('ʟ', 'velar lateral approximant', PlaceOfArticulation.Velar, MannerOfArticulation.LateralApproximant, true)
    ],
    // Empty placeholders for other places of articulation
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Affricate]: {
    [PlaceOfArticulation.PostAlveolar]: [
      // createConsonant('tʃ', 'voiceless postalveolar affricate', PlaceOfArticulation.PostAlveolar, MannerOfArticulation.Affricate, false),
      // createConsonant('dʒ', 'voiced postalveolar affricate', PlaceOfArticulation.PostAlveolar, MannerOfArticulation.Affricate, true)
    ],
    [PlaceOfArticulation.Alveolar]: [
      // createConsonant('ts', 'voiceless alveolar affricate', PlaceOfArticulation.Alveolar, MannerOfArticulation.Affricate, false),
      // createConsonant('dz', 'voiced alveolar affricate', PlaceOfArticulation.Alveolar, MannerOfArticulation.Affricate, true)
    ],
    // Empty placeholders for other places
    [PlaceOfArticulation.Bilabial]: [],
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Click]: {
    [PlaceOfArticulation.Bilabial]: [
      // createConsonant('ʘ', 'bilabial click', PlaceOfArticulation.Bilabial, MannerOfArticulation.Click, false)
    ],
    [PlaceOfArticulation.Dental]: [
      // createConsonant('ǀ', 'dental click', PlaceOfArticulation.Dental, MannerOfArticulation.Click, false)
    ],
    [PlaceOfArticulation.Alveolar]: [
      // createConsonant('ǃ', 'alveolar click', PlaceOfArticulation.Alveolar, MannerOfArticulation.Click, false),
      // createConsonant('ǁ', 'alveolar lateral click', PlaceOfArticulation.Alveolar, MannerOfArticulation.Click, false)
    ],
    [PlaceOfArticulation.Palatal]: [
      // createConsonant('ǂ', 'palatal click', PlaceOfArticulation.Palatal, MannerOfArticulation.Click, false)
    ],
    // Empty placeholders for other places
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Velar]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Implosive]: {
    [PlaceOfArticulation.Bilabial]: [
      // createConsonant('ɓ', 'bilabial implosive', PlaceOfArticulation.Bilabial, MannerOfArticulation.Implosive, true)
    ],
    [PlaceOfArticulation.Alveolar]: [
      // createConsonant('ɗ', 'alveolar implosive', PlaceOfArticulation.Alveolar, MannerOfArticulation.Implosive, true)
    ],
    [PlaceOfArticulation.Palatal]: [
      // createConsonant('ʄ', 'palatal implosive', PlaceOfArticulation.Palatal, MannerOfArticulation.Implosive, true)
    ],
    [PlaceOfArticulation.Velar]: [
      // createConsonant('ɠ', 'velar implosive', PlaceOfArticulation.Velar, MannerOfArticulation.Implosive, true)
    ],
    [PlaceOfArticulation.Uvular]: [
      // createConsonant('ʛ', 'uvular implosive', PlaceOfArticulation.Uvular, MannerOfArticulation.Implosive, true)
    ],
    // Empty placeholders for other places
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Ejective]: {
    [PlaceOfArticulation.Bilabial]: [
      // createConsonant('pʼ', 'bilabial ejective', PlaceOfArticulation.Bilabial, MannerOfArticulation.Ejective, false)
    ],
    [PlaceOfArticulation.Alveolar]: [
      // createConsonant('tʼ', 'alveolar ejective', PlaceOfArticulation.Alveolar, MannerOfArticulation.Ejective, false),
      // createConsonant('sʼ', 'alveolar ejective fricative', PlaceOfArticulation.Alveolar, MannerOfArticulation.Ejective, false)
    ],
    [PlaceOfArticulation.Velar]: [
      // createConsonant('kʼ', 'velar ejective', PlaceOfArticulation.Velar, MannerOfArticulation.Ejective, false)
    ],
    // Empty placeholders for other places
    [PlaceOfArticulation.Labiodental]: [],
    [PlaceOfArticulation.Dental]: [],
    [PlaceOfArticulation.PostAlveolar]: [],
    [PlaceOfArticulation.Retroflex]: [],
    [PlaceOfArticulation.Palatal]: [],
    [PlaceOfArticulation.Uvular]: [],
    [PlaceOfArticulation.Pharyngeal]: [],
    [PlaceOfArticulation.Glottal]: []
  },
  [MannerOfArticulation.Other]: {
    // Coarticulated consonants and others that don't fit cleanly
    [PlaceOfArticulation.Bilabial]: [
    //   createConsonant('ʍ', 'voiceless labial-velar fricative', PlaceOfArticulation.Bilabial, MannerOfArticulation.Other, false),
    //   createConsonant('ɥ', 'labial-palatal approximant', PlaceOfArticulation.Bilabial, MannerOfArticulation.Other, true)
    ],
    // Empty placeholders for other places
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
      createVowel('i', 'close front unrounded vowel', VowelHeight.Close, VowelBackness.Front, false),
      createVowel('y', 'close front rounded vowel', VowelHeight.Close, VowelBackness.Front, true)
    ],
    [VowelBackness.Central]: [
      createVowel('ɨ', 'close central unrounded vowel', VowelHeight.Close, VowelBackness.Central, false),
      createVowel('ʉ', 'close central rounded vowel', VowelHeight.Close, VowelBackness.Central, true)
    ],
    [VowelBackness.Back]: [
      createVowel('ɯ', 'close back unrounded vowel', VowelHeight.Close, VowelBackness.Back, false),
      createVowel('u', 'close back rounded vowel', VowelHeight.Close, VowelBackness.Back, true)
    ]
  },
  [VowelHeight.NearClose]: {
    [VowelBackness.Front]: [
      createVowel('ɪ', 'near-close near-front unrounded vowel', VowelHeight.NearClose, VowelBackness.Front, false),
      createVowel('ʏ', 'near-close near-front rounded vowel', VowelHeight.NearClose, VowelBackness.Front, true)
    ],
    [VowelBackness.Central]: [],
    [VowelBackness.Back]: [
      createVowel('ʊ', 'near-close near-back rounded vowel', VowelHeight.NearClose, VowelBackness.Back, true)
    ]
  },
  [VowelHeight.CloseMid]: {
    [VowelBackness.Front]: [
      createVowel('e', 'close-mid front unrounded vowel', VowelHeight.CloseMid, VowelBackness.Front, false),
      createVowel('ø', 'close-mid front rounded vowel', VowelHeight.CloseMid, VowelBackness.Front, true)
    ],
    [VowelBackness.Central]: [
      createVowel('ɘ', 'close-mid central unrounded vowel', VowelHeight.CloseMid, VowelBackness.Central, false),
      createVowel('ɵ', 'close-mid central rounded vowel', VowelHeight.CloseMid, VowelBackness.Central, true)
    ],
    [VowelBackness.Back]: [
      createVowel('ɤ', 'close-mid back unrounded vowel', VowelHeight.CloseMid, VowelBackness.Back, false),
      createVowel('o', 'close-mid back rounded vowel', VowelHeight.CloseMid, VowelBackness.Back, true)
    ]
  },
  [VowelHeight.Mid]: {
    [VowelBackness.Front]: [],
    [VowelBackness.Central]: [
      createVowel('ə', 'mid central vowel', VowelHeight.Mid, VowelBackness.Central, false)
    ],
    [VowelBackness.Back]: []
  },
  [VowelHeight.OpenMid]: {
    [VowelBackness.Front]: [
      createVowel('ɛ', 'open-mid front unrounded vowel', VowelHeight.OpenMid, VowelBackness.Front, false),
      createVowel('œ', 'open-mid front rounded vowel', VowelHeight.OpenMid, VowelBackness.Front, true)
    ],
    [VowelBackness.Central]: [
      createVowel('ɜ', 'open-mid central unrounded vowel', VowelHeight.OpenMid, VowelBackness.Central, false),
      createVowel('ɞ', 'open-mid central rounded vowel', VowelHeight.OpenMid, VowelBackness.Central, true)
    ],
    [VowelBackness.Back]: [
      createVowel('ʌ', 'open-mid back unrounded vowel', VowelHeight.OpenMid, VowelBackness.Back, false),
      createVowel('ɔ', 'open-mid back rounded vowel', VowelHeight.OpenMid, VowelBackness.Back, true)
    ]
  },
  [VowelHeight.NearOpen]: {
    [VowelBackness.Front]: [
      createVowel('æ', 'near-open front unrounded vowel', VowelHeight.NearOpen, VowelBackness.Front, false)
    ],
    [VowelBackness.Central]: [
      createVowel('ɐ', 'near-open central vowel', VowelHeight.NearOpen, VowelBackness.Central, false)
    ],
    [VowelBackness.Back]: []
  },
  [VowelHeight.Open]: {
    [VowelBackness.Front]: [
      createVowel('a', 'open front unrounded vowel', VowelHeight.Open, VowelBackness.Front, false),
      createVowel('ɶ', 'open front rounded vowel', VowelHeight.Open, VowelBackness.Front, true)
    ],
    [VowelBackness.Central]: [],
    [VowelBackness.Back]: [
      createVowel('ɑ', 'open back unrounded vowel', VowelHeight.Open, VowelBackness.Back, false),
      createVowel('ɒ', 'open back rounded vowel', VowelHeight.Open, VowelBackness.Back, true)
    ]
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