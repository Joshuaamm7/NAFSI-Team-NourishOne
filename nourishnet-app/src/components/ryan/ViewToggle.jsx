function ViewToggle({ activeMode, onChange }) {
  const modes = [
    { key: 'markers', label: '📍 Markers' },
    { key: 'heatmap', label: '🔥 Heatmap' },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Map view mode"
      className="absolute top-3 right-3 z-[1000] flex rounded-lg overflow-hidden shadow-soft border border-neutral-200 bg-white"
    >
      {modes.map(({ key, label }) => (
        <button
          key={key}
          role="radio"
          aria-checked={activeMode === key}
          onClick={() => onChange(key)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            activeMode === key
              ? 'bg-primary-600 text-white'
              : 'bg-white text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default ViewToggle;
