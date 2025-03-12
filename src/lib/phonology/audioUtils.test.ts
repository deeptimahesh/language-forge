import { getAudioUrl } from './audioUtils';
import { getAllConsonants, getAllVowels } from './ipaData';

// This is a simple test script to verify that audio URLs are correctly generated
// Not intended for automated testing

function testAudioUrls() {
  // Test some specific common phonemes
  const testSymbols = ['p', 't', 'k', 'm', 'n', 'f', 's', 'z', 'h', 'r', 'l', 'w', 'j',
                      'a', 'e', 'i', 'o', 'u', 'ə'];
  
  console.log("=== Testing specific IPA symbols ===");
  testSymbols.forEach(symbol => {
    const url = getAudioUrl(symbol);
    console.log(`${symbol}: ${url || 'No audio URL available'}`);
  });
  
  // Count how many consonants have audio URLs
  const consonants = getAllConsonants();
  const consonantsWithAudio = consonants.filter(c => !!getAudioUrl(c.symbol));
  console.log(`\n=== Consonants with audio: ${consonantsWithAudio.length}/${consonants.length} ===`);
  
  // Count how many vowels have audio URLs
  const vowels = getAllVowels();
  const vowelsWithAudio = vowels.filter(v => !!getAudioUrl(v.symbol));
  console.log(`=== Vowels with audio: ${vowelsWithAudio.length}/${vowels.length} ===`);
  
  // Log some consonants without audio
  const consonantsWithoutAudio = consonants.filter(c => !getAudioUrl(c.symbol)).slice(0, 5);
  console.log("\n=== Sample consonants without audio ===");
  consonantsWithoutAudio.forEach(c => {
    console.log(`${c.symbol} (${c.description})`);
  });
  
  // Log some vowels without audio
  const vowelsWithoutAudio = vowels.filter(v => !getAudioUrl(v.symbol)).slice(0, 5);
  console.log("\n=== Sample vowels without audio ===");
  vowelsWithoutAudio.forEach(v => {
    console.log(`${v.symbol} (${v.description})`);
  });
}

// This would typically be run in a Node.js environment
// or browser console for testing purposes
// testAudioUrls();

export { testAudioUrls }; 