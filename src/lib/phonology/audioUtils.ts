/**
 * Utilities for handling IPA audio playback
 * Using transcoded MP3 versions from Wikimedia Commons for better browser compatibility
 */

// Base audio URL for Wikimedia Commons with transcoded MP3 files
export const AUDIO_SOURCES = {
  WIKIMEDIA: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/'
};

// Map IPA symbols to their audio file names on Wikimedia Commons
// Using the transcoded MP3 versions which have better browser compatibility
const wikimediaMap: Record<string, string> = {
  // Plosives - Updated with correct file paths
  'p': '5/51/Voiceless_bilabial_plosive.ogg/Voiceless_bilabial_plosive.ogg.mp3',
  'b': '2/2c/Voiced_bilabial_plosive.ogg/Voiced_bilabial_plosive.ogg.mp3',
  't': '0/02/Voiceless_alveolar_plosive.ogg/Voiceless_alveolar_plosive.ogg.mp3',
  'd': '0/01/Voiced_alveolar_plosive.ogg/Voiced_alveolar_plosive.ogg.mp3',
  'ʈ': 'b/b0/Voiceless_retroflex_stop.oga/Voiceless_retroflex_stop.oga.mp3',
  'ɖ': '2/27/Voiced_retroflex_stop.oga/Voiced_retroflex_stop.oga.mp3',
  'c': '5/5d/Voiceless_palatal_plosive.ogg/Voiceless_palatal_plosive.ogg.mp3',
  'ɟ': '1/1d/Voiced_palatal_plosive.ogg/Voiced_palatal_plosive.ogg.mp3',
  'k': 'e/e3/Voiceless_velar_plosive.ogg/Voiceless_velar_plosive.ogg.mp3',
  'g': '1/12/Voiced_velar_plosive_02.ogg/Voiced_velar_plosive_02.ogg.mp3',
  'q': '1/19/Voiceless_uvular_plosive.ogg/Voiceless_uvular_plosive.ogg.mp3',
  'ɢ': 'b/b6/Voiced_uvular_stop.oga/Voiced_uvular_stop.oga.mp3',
  'ʔ': '4/4d/Glottal_stop.ogg/Glottal_stop.ogg.mp3',

  // Nasals
  'm': 'a/a9/Bilabial_nasal.ogg/Bilabial_nasal.ogg.mp3',
  'ɱ': '1/18/Labiodental_nasal.ogg/Labiodental_nasal.ogg.mp3',
  'n': '2/29/Alveolar_nasal.ogg/Alveolar_nasal.ogg.mp3',
  'ɳ': 'a/af/Retroflex_nasal.ogg/Retroflex_nasal.ogg.mp3',
  'ɲ': '4/46/Palatal_nasal.ogg/Palatal_nasal.ogg.mp3',
  'ŋ': '3/39/Velar_nasal.ogg/Velar_nasal.ogg.mp3',
  'ɴ': '3/3e/Uvular_nasal.ogg/Uvular_nasal.ogg.mp3',

  // Fricatives
  'ɸ': '4/41/Voiceless_bilabial_fricative.ogg/Voiceless_bilabial_fricative.ogg.mp3',
  'β': '3/37/Voiced_bilabial_fricative.ogg/Voiced_bilabial_fricative.ogg.mp3',
  'f': '3/33/Voiceless_labiodental_fricative.ogg/Voiceless_labiodental_fricative.ogg.mp3',
  'v': '8/85/Voiced_labiodental_fricative.ogg/Voiced_labiodental_fricative.ogg.mp3',
  'θ': '8/80/Voiceless_dental_fricative.ogg/Voiceless_dental_fricative.ogg.mp3',
  'ð': '6/6a/Voiced_dental_fricative.ogg/Voiced_dental_fricative.ogg.mp3',
  's': 'a/ac/Voiceless_alveolar_sibilant.ogg/Voiceless_alveolar_sibilant.ogg.mp3',
  'z': 'c/c0/Voiced_alveolar_sibilant.ogg/Voiced_alveolar_sibilant.ogg.mp3',
  'ʃ': 'c/cc/Voiceless_palato-alveolar_sibilant.ogg/Voiceless_palato-alveolar_sibilant.ogg.mp3',
  'ʒ': '3/30/Voiced_palato-alveolar_sibilant.ogg/Voiced_palato-alveolar_sibilant.ogg.mp3',
  'ʂ': 'b/b1/Voiceless_retroflex_sibilant.ogg/Voiceless_retroflex_sibilant.ogg.mp3',
  'ʐ': 'f/fa/Voiced_retroflex_sibilant.ogg/Voiced_retroflex_sibilant.ogg.mp3',
  'ç': '9/9f/Voiceless_palatal_fricative.ogg/Voiceless_palatal_fricative.ogg.mp3',
  'ʝ': 'a/aa/Voiced_palatal_fricative.ogg/Voiced_palatal_fricative.ogg.mp3',
  'x': '0/0f/Voiceless_velar_fricative.ogg/Voiceless_velar_fricative.ogg.mp3',
  'ɣ': '4/47/Voiced_velar_fricative.ogg/Voiced_velar_fricative.ogg.mp3',
  'χ': 'c/c8/Voiceless_uvular_fricative.ogg/Voiceless_uvular_fricative.ogg.mp3',
  'ʁ': 'a/a8/Voiced_uvular_fricative.ogg/Voiced_uvular_fricative.ogg.mp3',
  'ħ': 'b/b2/Voiceless_pharyngeal_fricative.ogg/Voiceless_pharyngeal_fricative.ogg.mp3',
  'ʕ': '5/51/Voiced_pharyngeal_fricative.ogg/Voiced_pharyngeal_fricative.ogg.mp3',
  'h': 'd/da/Voiceless_glottal_fricative.ogg/Voiceless_glottal_fricative.ogg.mp3',
  'ɦ': 'e/e2/Voiced_glottal_fricative.ogg/Voiced_glottal_fricative.ogg.mp3',

  // Approximants
  'ʋ': 'e/ee/Labiodental_approximant.ogg/Labiodental_approximant.ogg.mp3',
  'ɹ': '1/1f/Alveolar_approximant.ogg/Alveolar_approximant.ogg.mp3',
  'ɻ': '7/7b/Retroflex_approximant.ogg/Retroflex_approximant.ogg.mp3',
  'j': '6/65/Palatal_approximant.ogg/Palatal_approximant.ogg.mp3',
  'ɰ': '5/5c/Voiced_velar_approximant.ogg/Voiced_velar_approximant.ogg.mp3',
  'ɥ': 'f/fe/Labial-palatal_approximant.ogg/Labial-palatal_approximant.ogg.mp3',
  'w': 'f/f2/Voiced_labio-velar_approximant.ogg/Voiced_labio-velar_approximant.ogg.mp3',

  // Trills
  'ʙ': 'e/e7/Bilabial_trill.ogg/Bilabial_trill.ogg.mp3',
  'r': 'c/ce/Alveolar_trill.ogg/Alveolar_trill.ogg.mp3',
  'ʀ': 'c/cb/Uvular_trill.ogg/Uvular_trill.ogg.mp3',

  // Taps/Flaps
  // 'ⱱ': '8/8e/Labiodental_flap.ogg/Labiodental_flap.ogg.mp3',
  // 'ɾ': 'a/a0/Alveolar_tap.ogg/Alveolar_tap.ogg.mp3',
  // 'ɽ': '5/5c/Retroflex_flap.ogg/Retroflex_flap.ogg.mp3',

  // Laterals
  'ɬ': '4/45/Voiceless_lateral_fricative.ogg/Voiceless_lateral_fricative.ogg.mp3',
  'ɮ': '6/6f/Voiced_lateral_fricative.ogg/Voiced_lateral_fricative.ogg.mp3',
  'l': 'b/bc/Alveolar_lateral_approximant.ogg/Alveolar_lateral_approximant.ogg.mp3',
  'ɭ': 'd/d1/Retroflex_lateral_approximant.ogg/Retroflex_lateral_approximant.ogg.mp3',
  'ʎ': 'c/c4/Palatal_lateral_approximant.ogg/Palatal_lateral_approximant.ogg.mp3',
  'ʟ': 'd/dc/Velar_lateral_approximant.ogg/Velar_lateral_approximant.ogg.mp3',

  // Vowels
  'i': '9/91/Close_front_unrounded_vowel.ogg/Close_front_unrounded_vowel.ogg.mp3',
  'y': 'e/ea/Close_front_rounded_vowel.ogg/Close_front_rounded_vowel.ogg.mp3',
  'ɨ': '5/53/Close_central_unrounded_vowel.ogg/Close_central_unrounded_vowel.ogg.mp3',
  'ʉ': '6/66/Close_central_rounded_vowel.ogg/Close_central_rounded_vowel.ogg.mp3',
  'ɯ': 'e/e8/Close_back_unrounded_vowel.ogg/Close_back_unrounded_vowel.ogg.mp3',
  'u': '5/5d/Close_back_rounded_vowel.ogg/Close_back_rounded_vowel.ogg.mp3',
  'ɪ': '4/4c/Near-close_near-front_unrounded_vowel.ogg/Near-close_near-front_unrounded_vowel.ogg.mp3',
  'ʏ': 'e/e3/Near-close_near-front_rounded_vowel.ogg/Near-close_near-front_rounded_vowel.ogg.mp3',
  'ʊ': 'd/d5/Near-close_near-back_rounded_vowel.ogg/Near-close_near-back_rounded_vowel.ogg.mp3',
  'e': '6/6c/Close-mid_front_unrounded_vowel.ogg/Close-mid_front_unrounded_vowel.ogg.mp3',
  'ø': '5/53/Close-mid_front_rounded_vowel.ogg/Close-mid_front_rounded_vowel.ogg.mp3',
  'ɘ': '6/60/Close-mid_central_unrounded_vowel.ogg/Close-mid_central_unrounded_vowel.ogg.mp3',
  'ɵ': 'b/b5/Close-mid_central_rounded_vowel.ogg/Close-mid_central_rounded_vowel.ogg.mp3',
  'ɤ': '2/26/Close-mid_back_unrounded_vowel.ogg/Close-mid_back_unrounded_vowel.ogg.mp3',
  'o': '8/84/Close-mid_back_rounded_vowel.ogg/Close-mid_back_rounded_vowel.ogg.mp3',
  'ə': 'd/d9/Mid-central_vowel.ogg/Mid-central_vowel.ogg.mp3',
  'ɛ': '7/71/Open-mid_front_unrounded_vowel.ogg/Open-mid_front_unrounded_vowel.ogg.mp3',
  'œ': '0/00/Open-mid_front_rounded_vowel.ogg/Open-mid_front_rounded_vowel.ogg.mp3',
  'ɜ': '0/01/Open-mid_central_unrounded_vowel.ogg/Open-mid_central_unrounded_vowel.ogg.mp3',
  'ɞ': 'd/d9/Open-mid_central_rounded_vowel.ogg/Open-mid_central_rounded_vowel.ogg.mp3',
  'ʌ': '9/92/Open-mid_back_unrounded_vowel.ogg/Open-mid_back_unrounded_vowel.ogg.mp3',
  'ɔ': '0/02/Open-mid_back_rounded_vowel.ogg/Open-mid_back_rounded_vowel.ogg.mp3',
  'æ': 'c/c9/Near-open_front_unrounded_vowel.ogg/Near-open_front_unrounded_vowel.ogg.mp3',
  'ɐ': '2/22/Near-open_central_unrounded_vowel.ogg/Near-open_central_unrounded_vowel.ogg.mp3',
  'a': '6/65/Open_front_unrounded_vowel.ogg/Open_front_unrounded_vowel.ogg.mp3',
  'ɶ': 'c/c1/Open_front_rounded_vowel.ogg/Open_front_rounded_vowel.ogg.mp3',
  'ɑ': 'e/e5/Open_back_unrounded_vowel.ogg/Open_back_unrounded_vowel.ogg.mp3',
  'ɒ': '0/0a/Open_back_rounded_vowel.ogg/Open_back_rounded_vowel.ogg.mp3',
};

/**
 * Gets the audio URL for a given IPA symbol.
 * @param ipaSymbol The IPA symbol to get audio for
 * @returns The URL to the audio file, or undefined if no audio is available
 */
export function getAudioUrl(ipaSymbol: string): string | undefined {
  // First check the Wikimedia map
  const wikimediaPath = wikimediaMap[ipaSymbol];
  if (wikimediaPath) {
    const url = `${AUDIO_SOURCES.WIKIMEDIA}${wikimediaPath}`;
    console.log(`Audio URL for ${ipaSymbol}: ${url}`); // Debug logging
    return url;
  }
  
  // Return undefined if no audio source is found
  return undefined;
}

/**
 * Plays audio for a given IPA symbol.
 * @param ipaSymbol The IPA symbol to play audio for
 * @returns A promise that resolves when audio playback starts or rejects if there's an error
 */
export async function playIpaAudio(ipaSymbol: string): Promise<void> {
  const audioUrl = getAudioUrl(ipaSymbol);
  
  if (!audioUrl) {
    throw new Error(`No audio available for IPA symbol: ${ipaSymbol}`);
  }
  
  try {
    // Create and play the audio
    const audio = new Audio(audioUrl);
    return await audio.play();
  } catch (error) {
    console.error(`Error playing audio for ${ipaSymbol}:`, error);
    throw new Error(`Failed to play audio for ${ipaSymbol}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// For local development with downloaded files
export const getLocalAudioUrl = (ipaSymbol: string): string | undefined => {
  // If you download audio files locally, map them here
  // Example: return `/audio/ipa/${encodeURIComponent(ipaSymbol)}.mp3`;
  return undefined;
}; 