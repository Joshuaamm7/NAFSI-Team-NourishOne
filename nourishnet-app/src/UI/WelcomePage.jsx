import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  { src: imgDaria, alt: 'Community food sharing', x: 5, y: 8, size: 180, depth: 0.03 },
  { src: imgNico, alt: 'Volunteers working', x: 75, y: 5, size: 160, depth: 0.04 },
  { src: imgJoelCommunity, alt: 'Community gathering', x: 20, y: 55, size: 150, depth: 0.025 },
  { src: imgJoelGroup, alt: 'Group volunteering', x: 82, y: 60, size: 170, depth: 0.035 },
  { src: imgJoelVolunteer, alt: 'Volunteer effort', x: 50, y: 80, size: 140, depth: 0.02 },
  { src: imgMelanie, alt: 'Food preparation', x: 88, y: 35, size: 130, depth: 0.045 },
  { src: imgMegan, alt: 'Meal service', x: 8, y: 35, size: 140, depth: 0.03 },
  { src: imgElaine, alt: 'Community support', x: 35, y: 10, size: 120, depth: 0.05 },
  { src: imgDonna1, alt: 'Food donation', x: 60, y: 15, size: 130, depth: 0.04 },
  { src: imgDonna2, alt: 'Helping hands', x: 15, y: 78, size: 120, depth: 0.035 },
  { src: imgJacob, alt: 'Community kitchen', x: 70, y: 75, size: 150, depth: 0.025 },
  { src: imgAaron, alt: 'Food distribution', x: 45, y: 45, size: 110, depth: 0.05 },
];

const MARQUEE_TEXT = 'One Community. One Table. One Family. ';

function WelcomePage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
        x: prev.x + (mouseRef.current.x - prev.x) * 0.08,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.08,
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

  const handleStart = useCallback(() => {
    navigate('/portal');
  }, [navigate]);

  return (
    <div className="welcome-root" ref={containerRef}>
      {/* Floating images */}
      <div className="welcome-images">
        {FLOAT_IMAGES.map((img, i) => (
          <div
            key={i}
            className="welcome-float-img"
            style={{
              left: `${img.x}%`,
              top: `${img.y}%`,
              width: img.size,
              height: img.size,
              transform: `translate(${offset.x * img.depth * 800}px, ${offset.y * img.depth * 800}px)`,
            }}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="welcome-center">
        <h1 className="welcome-title">NourishOne</h1>
        <button className="welcome-start-btn" onClick={handleStart} aria-label="Start">
          <span className="welcome-start-text">Start</span>
          <img src={arrowIcon} alt="" className="welcome-start-arrow" />
        </button>
      </div>

      {/* Infinite marquee */}
      <div className="welcome-marquee">
        <div className="welcome-marquee-track">
          <span className="welcome-marquee-text">{MARQUEE_TEXT.repeat(6)}</span>
          <span className="welcome-marquee-text">{MARQUEE_TEXT.repeat(6)}</span>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
