import { Circle, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

const URGENCY_COLORS = {
  1: '#22c55e', // Low - green
  2: '#fbbf24', // Moderate - yellow
  3: '#f97316', // Elevated - orange
  4: '#ef4444', // High - red
  5: '#b91c1c', // Critical - dark red
};

const URGENCY_LABEL_KEYS = {
  1: 'urgency.lowShort',
  2: 'urgency.moderateShort',
  3: 'urgency.elevatedShort',
  4: 'urgency.highShort',
  5: 'urgency.criticalShort',
};

const CIRCLE_RADIUS = 800; // meters

/**
 * Renders colored circle overlays on the map based on density-based urgency levels.
 * Each location gets a circle colored by how underserved its surrounding area is.
 *
 * @param {Object} props
 * @param {Array<{lat, lng, name, urgencyLevel, nearbyCount}>} props.locations
 */
function UrgencyCircles({ locations }) {
  const { t } = useTranslation();

  if (!locations || locations.length === 0) return null;

  return (
    <>
      {locations.map((loc, index) => {
        const color = URGENCY_COLORS[loc.urgencyLevel] || URGENCY_COLORS[3];
        const labelKey = URGENCY_LABEL_KEYS[loc.urgencyLevel] || 'urgency.elevatedShort';

        return (
          <Circle
            key={`urgency-${index}`}
            center={[loc.lat, loc.lng]}
            radius={CIRCLE_RADIUS}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.25,
              opacity: 0.5,
              weight: 1,
            }}
          >
            <Popup>
              <strong>{loc.name}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '0.85em' }}>
                {t('map.urgency')}: <span style={{ color, fontWeight: 'bold' }}>{t(labelKey)}</span>
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '0.8em', color: '#666' }}>
                {t(loc.nearbyCount !== 1 ? 'map.pantriesNearby_plural' : 'map.pantriesNearby', { count: loc.nearbyCount })}
              </p>
            </Popup>
          </Circle>
        );
      })}
    </>
  );
}

export default UrgencyCircles;
