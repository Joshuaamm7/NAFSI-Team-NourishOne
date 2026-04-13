import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerPage.css';
import LanguagePopover from './LanguagePopover';
import arrowIcon from './assets/arrow-right.svg';
import locations from '../data/locations.json';

function CustomerPage() {
  const navigate = useNavigate();
  const nearbyRef = useRef(null);
  const drag = useScrollDrag();

  return (
    <div className="cust-root">
      {/* Header */}
      <header className="cust-header">
        <button className="cust-back" onClick={() => navigate('/portal')} aria-label="Back">
          <img src={arrowIcon} alt="" className="cust-back-icon" />
        </button>
        <nav className="cust-nav-pill">
          <button className="cust-nav-btn cust-nav-btn--active">Home</button>
          <button className="cust-nav-btn" onClick={() => navigate('/customer/map')}>Map</button>
          <button className="cust-nav-btn">About Us</button>
        </nav>
        <div className="cust-header-right">
          <div className="cust-search-bar">
            <span className="cust-search-icon">🔍</span>
            <input className="cust-search-input" placeholder="Search" aria-label="Search" />
          </div>
          <button className="cust-voice-btn" aria-label="Voice search">🎙</button>
          <LanguagePopover />
        </div>
      </header>

      {/* Title */}
      <section className="cust-hero">
        <h1 className="cust-title">Customer's Portal</h1>
        <p className="cust-subtitle">Browse food pantries and meal programs in your area</p>
      </section>

      {/* Nearby You */}
      <section className="cust-section">
        <div className="cust-section-row">
          <h2 className="cust-section-title">Nearby You</h2>
          <button className="cust-section-arrow" onClick={() => navigate('/customer/nearby')} aria-label="See all nearby">
            <img src={arrowIcon} alt="" className="cust-arrow-flip" />
          </button>
        </div>
        <div className="cust-hscroll" ref={nearbyRef} {...drag(nearbyRef)}>
          {locations.slice(0, 20).map((loc) => (
            <div key={loc.id} className="cust-loc-card">
              <div className="cust-loc-top">
                <div>
                  <span className="cust-loc-name">{loc.name}</span>
                  <span className="cust-loc-partner">Capital Area Food Bank Partner</span>
                </div>
                <button className="cust-loc-details" onClick={() => navigate(`/customer/location/${loc.id}`)}>
                  Show Details ›
                </button>
              </div>
              <div className="cust-loc-meta">
                <span>🕐 {loc.hours || 'Contact for hours'}</span>
                <span>📍 {loc.address.street}, {loc.address.city}, {loc.address.state} {loc.address.zip}</span>
              </div>
              <div className="cust-loc-tags">
                {(loc.foodTypes || []).slice(0, 5).map((t) => (
                  <span key={t} className="cust-loc-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Food Type */}
      <section className="cust-section">
        <div className="cust-section-row">
          <h2 className="cust-section-title">Food Type</h2>
          <button className="cust-section-arrow" onClick={() => navigate('/customer/food-types')} aria-label="See all food types">
            <img src={arrowIcon} alt="" className="cust-arrow-flip" />
          </button>
        </div>
      </section>
    </div>
  );
}

function useScrollDrag() {
  return useCallback((ref) => {
    let down = false, sx = 0, sl = 0;
    return {
      onMouseDown: (e) => { down = true; sx = e.pageX; sl = ref.current.scrollLeft; ref.current.style.cursor = 'grabbing'; },
      onMouseLeave: () => { down = false; if (ref.current) ref.current.style.cursor = 'grab'; },
      onMouseUp: () => { down = false; if (ref.current) ref.current.style.cursor = 'grab'; },
      onMouseMove: (e) => { if (!down) return; e.preventDefault(); ref.current.scrollLeft = sl - (e.pageX - sx); },
    };
  }, []);
}

export default CustomerPage;
