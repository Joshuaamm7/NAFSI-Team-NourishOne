import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './WelcomePage.css';

import imgDaria from './assets/daria-strategy.jpg';
import imgNico from './assets/nico-smit.jpg';
import imgJoelCommunity from './assets/joel-muniz-community.jpg';
import imgJoelGroup from './assets/joel-muniz-group.jpg';
import imgJoelVolunteer from './assets/joel-muniz-volunteer.jpg';
import imgMelanie from './assets/melanie-lim.jpg';
import imgMegan from './assets/megan-thomas.jpg';
import imgElaine from './assets/elaine-casap.jpg';
import imgDonna1 from './assets/donna-spearman-1.jpg';
import imgDonna2 from './assets/donna-spearman-2.jpg';
import imgJacob from './assets/jacob-mcgowin.jpg';
import imgAaron from './assets/aaron-doucett.jpg';
import arrowIcon from './assets/arrow-right.svg';

const FLOAT_IMAGES = [
  { src: imgElaine, alt: 'Store shelves', x: 3, y: 12, w: 180, h: 220, depth: 0.03 },
  { src: imgDaria, alt: 'Volunteers sorting', x: 25, y: 4, w: 160, h: 120, depth: 0.04 },
  { src: imgMegan, alt: 'Canned goods', x: 42, y: 8, w: 130, h: 110, depth: 0.025 },
  { src: imgNico, alt: 'Food bank', x: 62, y: 2, w: 170, h: 130, depth: 0.035 },
  { src: imgAaron, alt: 'Grocery store', x: 88, y: 5, w: 140, h: 170, depth: 0.02 },
  { src: imgJoelCommunity, alt: 'Community boxes', x: 12, y: 42, w: 180, h: 150, depth: 0.045 },
  { src: imgDonna2, alt: 'Fresh produce', x: 75, y: 30, w: 170, h: 140, depth: 0.03 },
  { src: imgMelanie, alt: 'Sorting donations', x: 88, y: 55, w: 130, h: 160, depth: 0.04 },
  { src: imgJacob, alt: 'Delivery truck', x: 18, y: 75, w: 150, h: 110, depth: 0.035 },
  { src: imgDonna1, alt: 'Tomatoes', x: 38, y: 78, w: 140, h: 130, depth: 0.05 },
  { src: imgJoelGroup, alt: 'Vegetables', x: 78, y: 78, w: 160, h: 130, depth: 0.025 },
  { src: imgJoelVolunteer, alt: 'Food distribution', x: 0, y: 72, w: 120, h: 100, depth: 0.04 },
];

function WelcomePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const langLabel = (() => {
    const map = { en: 'English', es: 'Español', zh: '中文', fr: 'Français', am: 'Amharic', tl: 'Tagalog' };
    return map[i18n.language] || 'English';
  })();

  useEffect(() => {
    let raf;
    const handleMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRef.current = { x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy };
    };
    const handleTouch = (e) => {
      const t = e.touches[0];
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRef.current = { x: (t.clientX - cx) / cx, y: (t.clientY - cy) / cy };
    };
    const tick = () => {
      setOffset((prev) => ({
        x: prev.x + (mouseRef.current.x - prev.x) * 0.06,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.06,
      }));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouch);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="welcome-root">
      {/* Header */}
      <header className="welcome-header">
        <button className="welcome-back" onClick={() => navigate('/')} aria-label="Back">
          <img src={arrowIcon} alt="" className="welcome-back-icon" />
        </button>
        <div className="welcome-lang-badge">
          <span className="welcome-lang-text">{langLabel}</span>
          <span className="welcome-lang-caret">›</span>
        </div>
      </header>

      {/* Floating images */}
      <div className="welcome-images">
        {FLOAT_IMAGES.map((img, i) => (
          <div
            key={i}
            className="welcome-float-img"
            style={{
              left: `${img.x}%`,
              top: `${img.y}%`,
              width: img.w,
              height: img.h,
              transform: `translate(${offset.x * img.depth * 800}px, ${offset.y * img.depth * 800}px)`,
            }}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="welcome-center">
        <h1 className="welcome-title">
          One Community.<br />One Table.<br />One Family.
        </h1>
        <button className="welcome-start-btn" onClick={() => navigate('/portal')} aria-label="Start">
          <span className="welcome-start-text">START</span>
          <img src={arrowIcon} alt="" className="welcome-start-arrow" />
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
