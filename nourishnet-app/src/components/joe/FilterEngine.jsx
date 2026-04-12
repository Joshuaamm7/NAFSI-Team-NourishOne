import React from 'react';
import { useTranslation } from 'react-i18next';
import { DIETARY_FILTERS } from '../../utils/filterUtils';

/**
 * FilterEngine — renders dietary filter toggles and a search input.
 * Parent component manages state; this component fires callbacks.
 *
 * Props:
 *   activeTags: string[]           — currently active dietary filter keys
 *   onToggleTag: (key) => void     — called when a dietary tag is toggled
 *   searchQuery: string            — current search text
 *   onSearchChange: (text) => void — called when search input changes
 */
function FilterEngine({ activeTags = [], onToggleTag, searchQuery = '', onSearchChange }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('common.search')}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 bg-white"
          aria-label={t('common.search')}
        />
      </div>

      {/* Dietary filter toggles */}
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('common.filter')}>
        {DIETARY_FILTERS.map((filter) => {
          const isActive = activeTags.includes(filter.key);
          return (
            <button
              key={filter.key}
              onClick={() => onToggleTag(filter.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-all duration-150 ${
                isActive
                  ? 'bg-primary-500 text-white border-primary-500 shadow-soft'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300 hover:text-primary-600'
              }`}
              aria-pressed={isActive}
            >
              <span aria-hidden="true">{filter.emoji}</span>
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FilterEngine;
