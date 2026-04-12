import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const PG_COUNTY_CENTER = [38.83, -76.85];
const DEFAULT_ZOOM = 11;
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function MapView({ locations = [] }) {
  const validLocations = (locations || []).filter(
    loc => loc && typeof loc.lat === 'number' && typeof loc.lng === 'number' && loc.name
  );

  return (
    <div className="w-full min-h-[300px] md:min-h-[400px]">
      <MapContainer center={PG_COUNTY_CENTER} zoom={DEFAULT_ZOOM} style={{ height: '100%', width: '100%' }}>
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
        {validLocations.map((loc, index) => (
          <Marker key={loc.id || index} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.name}</strong>
              {loc.address && <p>{loc.address}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
