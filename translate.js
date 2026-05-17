import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, 'src', 'locales');
const enFilePath = path.join(localesDir, 'en.json');

const targetLanguages = ['hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'or', 'ml', 'pa', 'as'];

async function translateText(text, targetLang) {
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    
    if (!res.ok) {
      console.warn(`Translation failed for ${targetLang}: ${res.statusText}. Using fallback.`);
      return text;
    }
    const data = await res.json();
    return data.responseData?.translatedText || text;
  } catch (err) {
    console.error(`Error translating to ${targetLang}:`, err.message);
    return text;
  }
}

async function run() {
  if (!fs.existsSync(enFilePath)) {
    console.error("en.json not found in src/locales");
    return;
  }
  
  const enData = JSON.parse(fs.readFileSync(enFilePath, 'utf-8'));
  const keys = Object.keys(enData);
  
  if (keys.length === 0) {
    console.log("en.json is empty. Nothing to translate.");
    return;
  }

  for (const lang of targetLanguages) {
    console.log(`Processing ${lang}...`);
    const langFilePath = path.join(localesDir, `${lang}.json`);
    
    let existingData = {};
    if (fs.existsSync(langFilePath)) {
      try {
        existingData = JSON.parse(fs.readFileSync(langFilePath, 'utf-8'));
      } catch (e) {
        // Ignore JSON parse error for empty files
      }
    }
    
    const translatedData = { ...existingData };
    let updated = false;
    
    for (const key of keys) {
      if (!translatedData[key] || translatedData[key] === enData[key]) {
        console.log(`Translating key: ${key}`);
        translatedData[key] = await translateText(enData[key], lang);
        updated = true;
        // Sleep to avoid rate limiting on free instance
        await new Promise(r => setTimeout(r, 1500));
      }
    }
    
    if (updated) {
      fs.writeFileSync(langFilePath, JSON.stringify(translatedData, null, 2));
      console.log(`Saved ${lang}.json`);
    } else {
      console.log(`No new translations needed for ${lang}`);
    }
  }
  
  console.log("Translation complete!");
}

run();
