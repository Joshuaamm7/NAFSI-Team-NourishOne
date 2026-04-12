import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { computeUrgencyLevels } from '../../utils/heatmapUtils';
import UrgencyCircles from './HeatmapLayer';
import ViewToggle from './ViewToggle';
import Legend from './Legend';

const PG_COUNTY_CENTER = [38.83, -76.85];
const DEFAULT_ZOOM = 11;
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MARKER_COLORS = { customer: '#22c55e', donor: '#f59e0b', volunteer: '#3b82f6' };

function createColoredIcon(type) {
  const color = MARKER_COLORS[type] || MARKER_COLORS.customer;
  return L.divIcon({
    className: '',
    html: `<div style="width:24px;height:24px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
    iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -14],
  });
}

const userIcon = L.divIcon({
  className: '',
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 0 0 6px rgba(59,130,246,0.25),0 2px 6px rgba(0,0,0,0.3)"></div>`,
  iconSize: [16, 16], iconAnchor: [8, 8],
});

function formatAddress(a) {
  if (!a) return '';
  if (typeof a === 'string') return a;
  return [a.street, a.city, a.state, a.zip].filter(Boolean).join(', ');
}

const HEALTH_LABELS = {
  halal: 'Halal', vegan: 'Vegan', vegetarian: 'Vegetarian',
  noBeef: 'No Beef', lowGI: 'Low GI', freshProduce: 'Fresh Produce', dairyFree: 'Dairy Free',
};

function MapSetup({ locations }) {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 200);
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [locations, map]);
  return null;
}

function MapView({ locations = [], showUserLocation = true }) {
  const [userPos, setUserPos] = useState(null);
  const [viewMode, setViewMode] = useState('markers');
  // eslint-disable-next-line no-unused-vars
  const [heatmapError, setHeatmapError] = useState(false);

  const validLocations = (locations || []).filter(
    (loc) => loc && typeof loc.lat === 'number' && typeof loc.lng === 'number' && loc.name
  );

  const urgencyLocations = computeUrgencyLevels(validLocations);

  useEffect(() => {
    if (!showUserLocation || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      () => {}
    );
  }, [showUserLocation]);

  return (
    <div className="relative" style={{ height: '100%', width: '100%' }}>
      {!heatmapError && (
        <ViewToggle activeMode={viewMode} onChange={setViewMode} />
      )}
      {viewMode === 'heatmap' && !heatmapError && <Legend />}
      <MapContainer
        center={userPos || PG_COUNTY_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
        <MapSetup locations={validLocations} />

        {userPos && (
          <Marker position={userPos} icon={userIcon}>
            <Popup><strong>Your Location</strong></Popup>
          </Marker>
        )}

        {viewMode === 'markers' && validLocations.map((loc, index) => {
          const addr = formatAddress(loc.address);
          const badges = loc.healthAttributes
            ? Object.entries(loc.healthAttributes).filter(([, v]) => v).map(([k]) => HEALTH_LABELS[k]).filter(Boolean)
            : [];
          return (
            <Marker key={loc.id || index} position={[loc.lat, loc.lng]} icon={createColoredIcon(loc.type)}>
              <Popup>
                <strong>{loc.name}</strong>
                {addr && <p style={{ margin: '4px 0 0', fontSize: '0.85em' }}>{addr}</p>}
                {loc.hours && <p style={{ margin: '2px 0 0', fontSize: '0.8em', color: '#666' }}>🕐 {loc.hours}</p>}
                {badges.length > 0 && <p style={{ margin: '4px 0 0', fontSize: '0.8em' }}>{badges.join(' · ')}</p>}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '0.85em', color: '#16a34a', display: 'inline-block', marginTop: '4px' }}
                >📍 Get Directions</a>
              </Popup>
            </Marker>
          );
        })}

        {viewMode === 'heatmap' && (
          <UrgencyCircles locations={urgencyLocations} />
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
