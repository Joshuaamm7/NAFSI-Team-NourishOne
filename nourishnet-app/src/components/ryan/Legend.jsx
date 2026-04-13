import { useTranslation } from 'react-i18next';

const LEVELS = [
  { level: 5, labelKey: 'urgency.critical', color: '#b91c1c' },
  { level: 4, labelKey: 'urgency.high', color: '#ef4444' },
  { level: 3, labelKey: 'urgency.elevated', color: '#f97316' },
  { level: 2, labelKey: 'urgency.moderate', color: '#fbbf24' },
  { level: 1, labelKey: 'urgency.low', color: '#22c55e' },
];

/**
 * Legend overlay showing the 5 urgency levels and their colors.
 * Positioned bottom-right of the map container.
 */
function Legend() {
  const { t } = useTranslation();

  return (
    <div
      className="absolute bottom-4 right-3 z-[1000] rounded-lg shadow-soft border border-neutral-200"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', padding: '10px 12px' }}
    >
      <p style={{ margin: 0, fontSize: '0.75em', fontWeight: 600, marginBottom: '6px' }}>
        {t('map.urgencyLevel')}
      </p>
      {LEVELS.map(({ level, labelKey, color }) => (
        <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              backgroundColor: color,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: '0.7em', color: '#374151' }}>{t(labelKey)}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
