// Import the 'translate' function as a named import
import { translate } from '@vitalets/google-translate-api';

// List of supported languages for translation
const supportedLanguages = ['hi', 'bn', 'en'];

export const translateText = async (text, lang) => {
  if (!supportedLanguages.includes(lang)) {
    console.error(`Unsupported language: ${lang}`);
    return text; // Return original text if language is unsupported
  }

  try {
    const { text: translatedText } = await translate(text, { to: lang });
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};