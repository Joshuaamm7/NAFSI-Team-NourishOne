import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerPage.css';
import LanguagePopover from './LanguagePopover';
import arrowIcon from './assets/arrow-right.svg';
import locations from '../data/locations.json';

const FOOD_TYPES = [...new Set(locations.flatMap((l) => l.foodTypes || []))].sort();

const NAV_ITEMS = [
  { label: 'Home', key: 'home', bold: true },
  { label: 'Map', key: 'map' },
  { label: 'About Us', key: 'about' },
];

function CustomerPage() {
  const navigate = useNavigate();
  const foodScrollRef = useRef(null);
  const nearbyScrollRef = useRef(null);

  const handleDrag = useScrollDrag();

  const handleFoodTypeClick = (foodType) => {
    navigate(`/customer/food/${encodeURIComponent(foodType)}`);
  };

  return (
    <div className="cust-root">
      {/* Header */}
      <header className="cust-header">
        <button className="cust-back" onClick={() => navigate('/portal')} aria-label="Back">
          <img src={arrowIcon} alt="" className="cust-back-icon" />
        </button>
        <span className="cust-logo">NourishOne</span>
        <LanguagePopover />
      </header>

      {/* Nav */}
      <nav className="cust-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`cust-nav-item${item.bold ? ' cust-nav-item--active' : ''}`}
            onClick={() => item.key === 'map' && navigate('/customer/map')}
          >{item.label}</button>
        ))}
      </nav>

      {/* Search */}
      <div className="cust-search-wrap">
        <input className="cust-search" placeholder="Search" aria-label="Search locations" />
      </div>

      {/* Food Type section */}
      <section className="cust-section">
        <div className="cust-section-header">
          <h2 className="cust-section-title">Food Type</h2>
          <button className="cust-section-arrow" onClick={() => navigate('/customer/food-types')} aria-label="See all food types">
            <img src={arrowIcon} alt="" className="cust-arrow-icon" />
          </button>
        </div>
        <div
          className="cust-hscroll"
          ref={foodScrollRef}
          {...handleDrag(foodScrollRef)}
        >
          {FOOD_TYPES.map((ft) => (
            <button key={ft} className="cust-card cust-card--food" onClick={() => handleFoodTypeClick(ft)}>
              <span className="cust-card-label">{ft}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Nearby You section */}
      <section className="cust-section">
        <div className="cust-section-header">
          <h2 className="cust-section-title">Nearby You</h2>
          <button className="cust-section-arrow" onClick={() => navigate('/customer/nearby')} aria-label="See all nearby">
            <img src={arrowIcon} alt="" className="cust-arrow-icon" />
          </button>
        </div>
        <div
          className="cust-hscroll"
          ref={nearbyScrollRef}
          {...handleDrag(nearbyScrollRef)}
        >
          {locations.slice(0, 20).map((loc) => (
            <button key={loc.id} className="cust-card cust-card--nearby" onClick={() => navigate(`/customer/location/${loc.id}`)}>
              <span className="cust-card-name">{loc.name}</span>
              <span className="cust-card-addr">{loc.address.street}, {loc.address.city}</span>
              <span className="cust-card-hours">{loc.hours}</span>
              {loc.foodTypes && (
                <div className="cust-card-tags">
                  {loc.foodTypes.slice(0, 3).map((t) => (
                    <span key={t} className="cust-card-tag">{t}</span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* Hook for mouse/touch drag scrolling */
function useScrollDrag() {
  return useCallback((scrollRef) => {
    let isDown = false, startX = 0, scrollLeft = 0;
    return {
      onMouseDown: (e) => {
        isDown = true; startX = e.pageX;
        scrollLeft = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = 'grabbing';
      },
      onMouseLeave: () => { isDown = false; scrollRef.current && (scrollRef.current.style.cursor = 'grab'); },
      onMouseUp: () => { isDown = false; scrollRef.current && (scrollRef.current.style.cursor = 'grab'); },
      onMouseMove: (e) => {
        if (!isDown) return;
        e.preventDefault();
        scrollRef.current.scrollLeft = scrollLeft - (e.pageX - startX);
      },
    };
  }, []);
}

export default CustomerPage;
