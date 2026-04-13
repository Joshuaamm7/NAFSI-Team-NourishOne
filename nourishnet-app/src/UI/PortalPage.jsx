import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './PortalPage.css';

import imgJoelGroup from './assets/joel-muniz-group.jpg';
import imgDonna2 from './assets/donna-spearman-2.jpg';
import imgJoelVolunteer from './assets/joel-muniz-volunteer.jpg';
import arrowIcon from './assets/arrow-right.svg';

const PORTALS = [
  {
    key: 'customer',
    titleKey: 'Find Food',
    descKey: 'Locate Food pantries, meal programs, and assistance near you',
    btnLabel: "I'm a Customer",
    route: '/family',
    image: imgJoelGroup,
  },
  {
    key: 'donor',
    titleKey: 'Donate',
    descKey: 'Connect your donations with communities that need them most',
    btnLabel: "I'm a Donor",
    route: '/donor',
    image: imgDonna2,
  },
  {
    key: 'volunteer',
    titleKey: 'Volunteer',
    descKey: 'Join missions and help distribute food in your area',
    btnLabel: "I'm a Volunteer",
    route: '/volunteer',
    image: imgJoelVolunteer,
  },
];

function PortalPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const langLabel = (() => {
    const map = { en: 'English', es: 'Español', zh: '中文', fr: 'Français', am: 'Amharic', tl: 'Tagalog' };
    return map[i18n.language] || 'English';
  })();

  return (
    <div className="portal-root">
      {/* Top bar */}
      <header className="portal-header">
        <span className="portal-logo">NourishOne</span>
        <div className="portal-lang-badge">
          <span className="portal-lang-text">{langLabel}</span>
          <img src={arrowIcon} alt="" className="portal-lang-arrow" />
        </div>
      </header>

      {/* Marquee */}
      <div className="portal-marquee">
        <div className="portal-marquee-track">
          <span className="portal-marquee-text">
            {'One Community. One Table. One Family. '.repeat(8)}
          </span>
          <span className="portal-marquee-text">
            {'One Community. One Table. One Family. '.repeat(8)}
          </span>
        </div>
      </div>

      {/* Portal cards */}
      <div className="portal-cards">
        {PORTALS.map((p) => (
          <div key={p.key} className="portal-card">
            <div className="portal-card-img-wrap">
              <img src={p.image} alt={p.titleKey} className="portal-card-img" />
            </div>
            <div className="portal-card-body">
              <h2 className="portal-card-title">{p.titleKey}</h2>
              <p className="portal-card-desc">{p.descKey}</p>
              <button
                className="portal-card-btn"
                onClick={() => navigate(p.route)}
                aria-label={p.btnLabel}
              >
                <span>{p.btnLabel}</span>
                <img src={arrowIcon} alt="" className="portal-card-btn-arrow" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortalPage;
