import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchHeader from './SearchHeader';
import './FoodTypesPage.css';
import locations from '../data/locations.json';

const FOOD_TYPES = [...new Set(locations.flatMap((l) => l.foodTypes || []))].sort();

function FoodTypesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="ft-root">
      <SearchHeader backTo="/customer" activeNav="home" navPrefix="/customer" />
      <h1 className="ft-title">{t('ui.foodType')}</h1>
      <div className="ft-grid">
        {FOOD_TYPES.map((ft) => (
          <button key={ft} className="ft-card" onClick={() => navigate(`/customer/food/${encodeURIComponent(ft)}`)}>
            <span className="ft-card-label">{ft}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FoodTypesPage;
