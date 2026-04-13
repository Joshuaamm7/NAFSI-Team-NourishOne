import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPage.css';
import LanguagePopover from './LanguagePopover';
import arrowIcon from './assets/arrow-right.svg';
import locations from '../data/locations.json';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const center = [38.9, -76.95];

function MapPage() {
  const navigate = useNavigate();

  return (
    <div className="map-root">
      <header className="map-header">
        <button className="map-back" onClick={() => navigate(-1)} aria-label="Back">
          <img src={arrowIcon} alt="" className="map-back-icon" />
        </button>
        <span className="map-logo">NourishOne</span>
        <LanguagePopover />
      </header>

      <div className="map-container">
        <MapContainer center={center} zoom={11} className="map-leaflet">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc) => (
            loc.lat && loc.lng && (
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>
                  <strong>{loc.name}</strong><br />
                  {loc.address.street}, {loc.address.city}<br />
                  {loc.hours}
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
