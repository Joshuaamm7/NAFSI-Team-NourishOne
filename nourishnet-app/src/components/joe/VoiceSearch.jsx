import React, { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Voice keyword → dietary filter mapping.
 * Spoken words are matched to healthAttribute keys.
 */
const VOICE_KEYWORD_MAP = {
  halal: 'halal',
  vegan: 'vegan',
  vegetarian: 'vegetarian',
  'no beef': 'noBeef',
  beef: 'noBeef',
  'low gi': 'lowGI',
  'low glycemic': 'lowGI',
  diabetic: 'lowGI',
  'fresh produce': 'freshProduce',
  fresh: 'freshProduce',
  vegetables: 'freshProduce',
  fruits: 'freshProduce',
  produce: 'freshProduce',
  'dairy free': 'dairyFree',
  'no dairy': 'dairyFree',
  'lactose free': 'dairyFree',
};

/**
 * Check if the Web Speech API is available in this browser.
 */
export function isSpeechSupported() {
  return !!(
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  );
}

/**
 * Parse transcript text and return matching dietary filter keys + remaining search text.
 * @param {string} transcript
 * @returns {{ filters: string[], searchText: string }}
 */
export function parseVoiceInput(transcript) {
  const lower = transcript.toLowerCase().trim();
  const matchedFilters = [];
  let remaining = lower;

  // Check multi-word phrases first, then single words
  const sortedKeywords = Object.keys(VOICE_KEYWORD_MAP).sort(
    (a, b) => b.length - a.length
  );

  for (const keyword of sortedKeywords) {
    if (remaining.includes(keyword)) {
      const filterKey = VOICE_KEYWORD_MAP[keyword];
      if (!matchedFilters.includes(filterKey)) {
        matchedFilters.push(filterKey);
      }
      remaining = remaining.replace(keyword, '').trim();
    }
  }

  return { filters: matchedFilters, searchText: remaining };
}

/**
 * VoiceSearch — microphone button that uses Web Speech API to capture voice input,
 * then maps keywords to dietary filters and passes remaining text as search query.
 *
 * Props:
 *   onResult: ({ filters: string[], searchText: string }) => void
 *   lang?: string — BCP-47 language code for recognition (default: 'en-US')
 */
function VoiceSearch({ onResult, lang = 'en-US' }) {
  const { t } = useTranslation();
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const startListening = useCallback(() => {
    if (!isSpeechSupported()) {
      setError('Voice search is not supported in this browser');
      return;
    }

    setError(null);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const parsed = parseVoiceInput(transcript);
      onResult(parsed);
      setListening(false);
    };

    recognition.onerror = (event) => {
      setError(event.error === 'no-speech' ? 'No speech detected. Try again.' : `Error: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [lang, onResult]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  }, []);

  if (!isSpeechSupported()) return null;

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <button
        onClick={listening ? stopListening : startListening}
        className={`p-2.5 rounded-full transition-all duration-200 ${
          listening
            ? 'bg-danger text-white animate-pulse shadow-hover'
            : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
        }`}
        aria-label={listening ? 'Stop voice search' : t('common.search') + ' by voice'}
        title={listening ? 'Listening...' : 'Voice search'}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {listening ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10l6 6m0-6l-6 6" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 15a3 3 0 003-3V5a3 3 0 00-6 0v7a3 3 0 003 3z" />
          )}
        </svg>
      </button>
      {listening && (
        <span className="text-xs text-danger font-medium animate-pulse">
          Listening...
        </span>
      )}
      {error && (
        <span className="text-xs text-danger">{error}</span>
      )}
    </div>
  );
}

export default VoiceSearch;
