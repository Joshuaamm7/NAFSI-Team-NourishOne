import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './PortalPage.css';
import arrowIcon from './assets/arrow-right.svg';

const PORTALS = [
  {
    key: 'customer',
    title: 'Find Food',
    desc: 'Locate Food pantries, meal programs, and assistance near you',
    btn: "I'm a Customer",
    route: '/family',
  },
  {
    key: 'donor',
    title: 'Donate',
    desc: 'Connect your donations with communities that need them most',
    btn: "I'm a Donor",
    route: '/donor',
  },
  {
    key: 'volunteer',
    title: 'Volunteer',
    desc: 'Join missions and help distribute food in your area',
    btn: "I'm a Volunteer",
    route: '/volunteer',
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
      {/* Header */}
      <header className="portal-header">
        <button className="portal-back" onClick={() => navigate('/welcome')} aria-label="Back">
          <img src={arrowIcon} alt="" className="portal-back-icon" />
        </button>
        <span className="portal-logo">NourishOne</span>
        <div className="portal-lang-badge">
          <span className="portal-lang-text">{langLabel}</span>
          <span className="portal-lang-caret">›</span>
        </div>
      </header>

      {/* Portal cards */}
      <div className="portal-cards">
        {PORTALS.map((p) => (
          <div key={p.key} className="portal-card">
            <h2 className="portal-card-title">{p.title}</h2>
            <div className="portal-card-divider" />
            <p className="portal-card-desc">{p.desc}</p>
            <button className="portal-card-btn" onClick={() => navigate(p.route)}>
              {p.btn}
            </button>
          </div>
        ))}
      </div>

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
    </div>
  );
}

export default PortalPage;
