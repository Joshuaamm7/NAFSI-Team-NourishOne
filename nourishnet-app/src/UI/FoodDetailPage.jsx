import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FoodDetailPage.css';
import LanguagePopover from './LanguagePopover';
import arrowIcon from './assets/arrow-right.svg';
import locations from '../data/locations.json';

function FoodDetailPage() {
  const navigate = useNavigate();
  const { foodType } = useParams();
  const decoded = decodeURIComponent(foodType);

  const filtered = locations.filter((l) =>
    l.foodTypes && l.foodTypes.some((ft) => ft.toLowerCase() === decoded.toLowerCase())
  );

  return (
    <div className="fd-root">
      <header className="fd-header">
        <button className="fd-back" onClick={() => navigate(-1)} aria-label="Back">
          <img src={arrowIcon} alt="" className="fd-back-icon" />
        </button>
        <span className="fd-logo">NourishOne</span>
        <LanguagePopover />
      </header>

      <h1 className="fd-title">{decoded}</h1>
      <p className="fd-count">{filtered.length} locations</p>

      <div className="fd-list">
        {filtered.map((loc) => (
          <div key={loc.id} className="fd-card">
            <div className="fd-card-top">
              <span className="fd-card-name">{loc.name}</span>
              <button className="fd-card-map" onClick={() => navigate('/customer/map')}>
                Show in Map
              </button>
            </div>
            <span className="fd-card-addr">{loc.address.street}, {loc.address.city}, {loc.address.state} {loc.address.zip}</span>
            <span className="fd-card-hours">{loc.hours}</span>
            <div className="fd-card-tags">
              {(loc.foodTypes || []).map((t) => (
                <span key={t} className="fd-card-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="fd-empty">No locations found for "{decoded}"</p>}
      </div>
    </div>
  );
}

export default FoodDetailPage;
