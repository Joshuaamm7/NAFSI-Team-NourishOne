const LEVELS = [
  { level: 5, label: 'Critical (0–1 nearby)', color: '#b91c1c' },
  { level: 4, label: 'High (2–3 nearby)', color: '#ef4444' },
  { level: 3, label: 'Elevated (4–5 nearby)', color: '#f97316' },
  { level: 2, label: 'Moderate (6–8 nearby)', color: '#fbbf24' },
  { level: 1, label: 'Low (9+ nearby)', color: '#22c55e' },
];

/**
 * Legend overlay showing the 5 urgency levels and their colors.
 * Positioned bottom-right of the map container.
 */
function Legend() {
  return (
    <div
      className="absolute bottom-4 right-3 z-[1000] rounded-lg shadow-soft border border-neutral-200"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)', padding: '10px 12px' }}
    >
      <p style={{ margin: 0, fontSize: '0.75em', fontWeight: 600, marginBottom: '6px' }}>
        Urgency Level
      </p>
      {LEVELS.map(({ level, label, color }) => (
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
          <span style={{ fontSize: '0.7em', color: '#374151' }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
