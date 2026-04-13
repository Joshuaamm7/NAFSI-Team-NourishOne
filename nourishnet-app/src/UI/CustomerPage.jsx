import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchHeader, { useGeolocation } from './SearchHeader';
import './CustomerPage.css';
import arrowIcon from './assets/arrow-right.svg';
import locations from '../data/locations.json';

function CustomerPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const nearbyRef = useRef(null);
  const drag = useScrollDrag();
  useGeolocation(); // request location permission on mount

  return (
    <div className="cust-root">
      <SearchHeader backTo="/portal" activeNav="home" navPrefix="/customer" />

      <section className="cust-hero">
        <h1 className="cust-title">{t('ui.customersPortal')}</h1>
        <p className="cust-subtitle">{t('ui.browseFood')}</p>
      </section>

      <section className="cust-section">
        <div className="cust-section-row">
          <h2 className="cust-section-title">{t('ui.nearbyYou')}</h2>
          <button className="cust-section-arrow" onClick={() => navigate('/customer/nearby')}><img src={arrowIcon} alt="" className="cust-arrow-flip" /></button>
        </div>
        <div className="cust-hscroll" ref={nearbyRef} {...drag(nearbyRef)}>
          {locations.slice(0, 20).map((loc) => (
            <div key={loc.id} className="cust-loc-card">
              <div className="cust-loc-top">
                <div>
                  <span className="cust-loc-name">{loc.name}</span>
                  <span className="cust-loc-partner">{t('ui.partner')}</span>
                </div>
                <button className="cust-loc-details">{t('ui.showDetails')} ›</button>
              </div>
              <div className="cust-loc-meta">
                <span>🕐 {loc.hours || t('ui.contactForHours')}</span>
                <span>📍 {loc.address.street}, {loc.address.city}, {loc.address.state} {loc.address.zip}</span>
              </div>
              <div className="cust-loc-tags">
                {(loc.foodTypes || []).slice(0, 5).map((ft) => (<span key={ft} className="cust-loc-tag">{ft}</span>))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cust-section">
        <div className="cust-section-row">
          <h2 className="cust-section-title">{t('ui.foodType')}</h2>
          <button className="cust-section-arrow" onClick={() => navigate('/customer/food-types')}><img src={arrowIcon} alt="" className="cust-arrow-flip" /></button>
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
