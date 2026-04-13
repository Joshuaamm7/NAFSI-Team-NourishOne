import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodTypesPage.css';
import LanguagePopover from './LanguagePopover';
import arrowIcon from './assets/arrow-right.svg';
import locations from '../data/locations.json';

const FOOD_TYPES = [...new Set(locations.flatMap((l) => l.foodTypes || []))].sort();

function FoodTypesPage() {
  const navigate = useNavigate();

  return (
    <div className="ft-root">
      <header className="ft-header">
        <button className="ft-back" onClick={() => navigate('/customer')} aria-label="Back">
          <img src={arrowIcon} alt="" className="ft-back-icon" />
        </button>
        <span className="ft-logo">NourishOne</span>
        <LanguagePopover />
      </header>

      <h1 className="ft-title">Food Type</h1>

      <div className="ft-grid">
        {FOOD_TYPES.map((ft) => (
          <button
            key={ft}
            className="ft-card"
            onClick={() => navigate(`/customer/food/${encodeURIComponent(ft)}`)}
          >
            <span className="ft-card-label">{ft}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FoodTypesPage;
