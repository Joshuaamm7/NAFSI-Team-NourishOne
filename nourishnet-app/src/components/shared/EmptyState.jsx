import React from 'react';

function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center" data-testid="empty-state">
      <span className="text-6xl mb-4" role="img" aria-label="No results">🍽️</span>
      <h3 className="text-lg font-semibold text-neutral-700 mb-1">No results found</h3>
      <p className="text-neutral-400 text-sm mb-4 max-w-xs">
        Try adjusting your filters or search to find food resources near you.
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-card transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default EmptyState;
