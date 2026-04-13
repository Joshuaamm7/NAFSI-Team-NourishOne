import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPage.css';
import LanguagePopover from './LanguagePopover';
import arrowIcon from './assets/arrow-right.svg';
import locations from '../data/locations.json';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const HEALTH_ATTRS = ['halal','vegan','vegetarian','noBeef','lowGI','freshProduce','dairyFree'];
const FOOD_TYPES = [...new Set(locations.flatMap((l) => l.foodTypes || []))].sort().slice(0, 8);
const center = [38.9, -76.95];

function MapPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [range, setRange] = useState(10);
  const [heatmap, setHeatmap] = useState(true);

  return (
    <div className="mp-root">
      {/* Header */}
      <header className="mp-header">
        <button className="mp-back" onClick={() => navigate('/customer')} aria-label="Back">
          <img src={arrowIcon} alt="" className="mp-back-icon" />
        </button>
        <nav className="mp-nav-pill">
          <button className="mp-nav-btn" onClick={() => navigate('/customer')}>Home</button>
          <button className="mp-nav-btn mp-nav-btn--active">Map</button>
          <button className="mp-nav-btn">About Us</button>
        </nav>
        <div className="mp-header-right">
          <div className="mp-search-bar">
            <span>🔍</span>
            <input className="mp-search-input" placeholder="Search" aria-label="Search" />
          </div>
          <button className="mp-voice-btn" aria-label="Voice search">🎙</button>
          <LanguagePopover />
        </div>
      </header>

      <div className="mp-body">
        {/* Filter sidebar */}
        <aside className="mp-sidebar">
          <h3 className="mp-filter-title">Filter</h3>

          <div className="mp-filter-group">
            <label className="mp-filter-label">Food Resource Coverage</label>
            <button className={`mp-toggle ${heatmap ? 'mp-toggle--on' : ''}`} onClick={() => setHeatmap(!heatmap)}>
              <span className="mp-toggle-knob" />
              <span className="mp-toggle-text">{heatmap ? 'on' : 'off'}</span>
            </button>
          </div>

          <div className="mp-filter-group">
            <label className="mp-filter-label">Searching Near</label>
            <input className="mp-zip-input" placeholder="ZIP" aria-label="ZIP code" />
          </div>

          <div className="mp-filter-group">
            <label className="mp-filter-label">Location Range</label>
            <input type="range" min="5" max="20" step="5" value={range}
              onChange={(e) => setRange(e.target.value)} className="mp-range" />
            <div className="mp-range-labels">
              <span>5mi</span><span>10mi</span><span>15mi</span><span>20mi</span>
            </div>
          </div>

          <div className="mp-filter-group">
            <label className="mp-filter-label">Food Types</label>
            <div className="mp-tag-list">
              {FOOD_TYPES.map((ft) => (
                <span key={ft} className="mp-tag">{ft}</span>
              ))}
            </div>
          </div>

          <div className="mp-filter-group">
            <label className="mp-filter-label">Health Attribute</label>
            <div className="mp-tag-list">
              {HEALTH_ATTRS.map((a) => (
                <span key={a} className="mp-tag">{a}</span>
              ))}
            </div>
          </div>

          <button className="mp-clear-btn">Clear Filter</button>
        </aside>

        {/* Map + bottom card */}
        <div className="mp-map-area">
          <MapContainer center={center} zoom={11} className="mp-leaflet">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc) => (
              loc.lat && loc.lng && (
                <Marker key={loc.id} position={[loc.lat, loc.lng]}
                  eventHandlers={{ click: () => setSelected(loc) }}>
                  <Popup>
                    <strong>{loc.name}</strong><br />
                    {loc.address.street}, {loc.address.city}, {loc.address.state} {loc.address.zip}<br />
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                      target="_blank" rel="noopener noreferrer" style={{color:'#4a7c59'}}>
                      📍 Get Directions
                    </a>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>

          {/* Bottom detail card */}
          {selected && (
            <div className="mp-detail-card">
              <div className="mp-detail-top">
                <div>
                  <span className="mp-detail-name">{selected.name}</span>
                  <span className="mp-detail-partner">Capital Area Food Bank Partner</span>
                </div>
                <button className="mp-detail-link">Show Details ›</button>
              </div>
              <div className="mp-detail-meta">
                <span>🕐 {selected.hours || 'Contact for hours'} 📧 Ongoing</span>
                <span>📍 {selected.address.street}, {selected.address.city}, {selected.address.state} {selected.address.zip}</span>
              </div>
              <div className="mp-detail-bottom">
                <div className="mp-detail-tags">
                  {(selected.foodTypes || []).slice(0, 5).map((t) => (
                    <span key={t} className="mp-detail-tag">{t}</span>
                  ))}
                </div>
                <a className="mp-detail-dir"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                  target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
