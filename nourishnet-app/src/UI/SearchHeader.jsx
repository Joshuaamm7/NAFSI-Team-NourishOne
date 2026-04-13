import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguagePopover from './LanguagePopover';
import arrowIcon from './assets/arrow-right.svg';
import './SearchHeader.css';

function SearchHeader({ backTo, activeNav = 'home', navPrefix = '/customer' }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [listening, setListening] = useState(false);

  const handleVoice = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(t('voice.notSupported') || 'Voice search not supported');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = document.documentElement.lang || 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      const input = document.querySelector('.sh-search-input');
      if (input) { input.value = text; input.dispatchEvent(new Event('input', { bubbles: true })); }
    };
    recognition.start();
  }, [t]);

  return (
    <header className="sh-header">
      <button className="sh-back" onClick={() => navigate(backTo)} aria-label="Back">
        <img src={arrowIcon} alt="" className="sh-back-icon" />
      </button>
      <nav className="sh-nav-pill">
        <button className={`sh-nav-btn${activeNav === 'home' ? ' sh-nav-btn--active' : ''}`}
          onClick={() => navigate(navPrefix)}>{t('ui.home')}</button>
        <button className={`sh-nav-btn${activeNav === 'map' ? ' sh-nav-btn--active' : ''}`}
          onClick={() => navigate(`${navPrefix}/map`)}>{t('ui.map')}</button>
        <button className="sh-nav-btn">{t('ui.aboutUs')}</button>
      </nav>
      <div className="sh-right">
        <div className="sh-search-bar">
          <span className="sh-search-icon">🔍</span>
          <input className="sh-search-input" placeholder={t('ui.search')} aria-label={t('ui.search')} />
          <button className={`sh-mic-btn${listening ? ' sh-mic-btn--active' : ''}`}
            onClick={handleVoice} aria-label="Voice search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dcfce8" strokeWidth="2">
              <rect x="9" y="1" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0014 0" /><line x1="12" y1="17" x2="12" y2="22" />
              <line x1="8" y1="22" x2="16" y2="22" />
            </svg>
          </button>
        </div>
        <LanguagePopover />
      </div>
    </header>
  );
}

/* Request geolocation on mount for customer pages */
export function useGeolocation() {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {} // silently fail
    );
  }, []);
  return coords;
}

export default SearchHeader;
