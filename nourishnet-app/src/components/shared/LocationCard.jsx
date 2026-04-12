import React from 'react';

/**
 * Renders a location entry's basic info, handling null/missing fields gracefully.
 * @param {{ location: object }} props
 */
function LocationCard({ location }) {
  if (!location) return null;

  const { name, address, phone, website, hours, foodTypes, tags } = location;

  const street = address?.street ?? '';
  const city = address?.city ?? '';
  const state = address?.state ?? '';
  const zip = address?.zip ?? '';
  const addressLine = [street, city, state, zip].filter(Boolean).join(', ');

  return (
    <div className="rounded-2xl shadow-soft bg-surface p-4" data-testid="location-card">
      <h3 className="text-lg font-semibold">{name ?? 'Unknown Location'}</h3>
      {addressLine && <p className="text-muted text-sm">{addressLine}</p>}
      {phone ? <p className="text-sm">Phone: {phone}</p> : null}
      {website ? (
        <p className="text-sm">
          <a href={website} target="_blank" rel="noopener noreferrer">Website</a>
        </p>
      ) : null}
      {hours ? <p className="text-sm">Hours: {hours}</p> : null}
      {Array.isArray(foodTypes) && foodTypes.length > 0 && (
        <p className="text-sm">Food: {foodTypes.join(', ')}</p>
      )}
      {Array.isArray(tags) && tags.length > 0 && (
        <p className="text-sm">Tags: {tags.join(', ')}</p>
      )}
    </div>
  );
}

export default LocationCard;
