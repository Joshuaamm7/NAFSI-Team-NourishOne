import React, { useState } from 'react';

const HEALTH_BADGES = [
  { key: 'halal', label: 'Halal', emoji: '🥩' },
  { key: 'vegan', label: 'Vegan', emoji: '🌱' },
  { key: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
  { key: 'noBeef', label: 'No Beef', emoji: '🚫🐄' },
  { key: 'lowGI', label: 'Low GI', emoji: '📉' },
  { key: 'freshProduce', label: 'Fresh Produce', emoji: '🥦' },
  { key: 'dairyFree', label: 'Dairy Free', emoji: '🥛' },
];

function getInsecurityColor(index) {
  if (index >= 7) return { bg: 'bg-danger', width: `${Math.min(index * 10, 100)}%`, label: 'High Need' };
  if (index >= 4) return { bg: 'bg-warning', width: `${index * 10}%`, label: 'Medium Need' };
  return { bg: 'bg-success', width: `${index * 10}%`, label: 'Low Need' };
}

function LocationCard({ location }) {
  const [expanded, setExpanded] = useState(false);

  if (!location) return null;

  const {
    name, address, phone, website, hours, foodTypes,
    healthAttributes, distance, insecurityIndex, requirements,
  } = location;

  const street = address?.street ?? '';
  const city = address?.city ?? '';
  const state = address?.state ?? '';
  const zip = address?.zip ?? '';
  const addressLine = [street, city, state, zip].filter(Boolean).join(', ');

  const activeBadges = HEALTH_BADGES.filter(
    (b) => healthAttributes && healthAttributes[b.key]
  );

  const insecurity = typeof insecurityIndex === 'number' ? getInsecurityColor(insecurityIndex) : null;

  return (
    <div
      className="rounded-2xl shadow-soft bg-white border border-neutral-100 p-4 hover:shadow-hover transition-shadow cursor-pointer"
      data-testid="location-card"
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded); }}
      aria-expanded={expanded}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-neutral-800">{name ?? 'Unknown Location'}</h3>
        <div className="flex items-center gap-2">
          {typeof distance === 'number' && distance < Infinity && (
            <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full whitespace-nowrap font-medium">
              {distance.toFixed(1)} mi
            </span>
          )}
          <span className="text-neutral-400 text-sm">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {addressLine && <p className="text-neutral-500 text-sm mt-1">{addressLine}</p>}
      {hours && <p className="text-neutral-400 text-sm mt-1">🕐 {hours}</p>}

      {/* Insecurity index bar */}
      {insecurity && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>Need Level</span>
            <span>{insecurity.label}</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${insecurity.bg} rounded-full transition-all`}
              style={{ width: insecurity.width }}
            />
          </div>
        </div>
      )}

      {/* Health attribute badges */}
      {activeBadges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {activeBadges.map((badge) => (
            <span
              key={badge.key}
              className="inline-flex items-center gap-1 text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
            >
              <span aria-hidden="true">{badge.emoji}</span>
              {badge.label}
            </span>
          ))}
        </div>
      )}

      {/* Expandable detail section */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-neutral-200 space-y-2" data-testid="location-card-details">
          {Array.isArray(foodTypes) && foodTypes.length > 0 && (
            <p className="text-sm text-neutral-500">🍽️ {foodTypes.join(', ')}</p>
          )}

          {Array.isArray(requirements) && requirements.length > 0 && (
            <div className="text-sm text-neutral-500">
              <span className="font-medium">Requirements:</span> {requirements.join(', ')}
            </div>
          )}

          <div className="flex items-center gap-4">
            {phone && (
              <a href={`tel:${phone}`} className="text-sm text-primary-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                📞 {phone}
              </a>
            )}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                🔗 Website
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationCard;
