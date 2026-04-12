import React, { useState } from 'react';

/**
 * Impact calculation constants (approximate values for demonstration).
 * Sources: EPA, USDA food waste data.
 */
const LBS_CO2_PER_LB_FOOD = 3.8; // avg CO2 equivalent per lb of food waste diverted
const MEALS_PER_LB = 0.75; // approximate meals per pound of donated food
const GALLONS_WATER_PER_LB = 108; // water footprint per lb of food

/**
 * ImpactCalculator — lets donors estimate the environmental and community impact
 * of their food donations. Shows CO2 saved, meals provided, and water conserved.
 */
function ImpactCalculator() {
  const [pounds, setPounds] = useState('');

  const lbs = parseFloat(pounds) || 0;
  const co2Saved = (lbs * LBS_CO2_PER_LB_FOOD).toFixed(1);
  const mealsProvided = Math.floor(lbs * MEALS_PER_LB);
  const waterSaved = Math.floor(lbs * GALLONS_WATER_PER_LB);

  const stats = [
    { label: 'CO₂ Diverted', value: `${co2Saved} lbs`, emoji: '🌍', color: 'text-primary-600' },
    { label: 'Meals Provided', value: mealsProvided, emoji: '🍽️', color: 'text-warm-600' },
    { label: 'Water Conserved', value: `${waterSaved} gal`, emoji: '💧', color: 'text-blue-600' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-neutral-200 p-6">
      <h3 className="text-lg font-bold text-neutral-800 mb-1">
        🌱 Impact Calculator
      </h3>
      <p className="text-sm text-neutral-500 mb-4">
        Estimate the impact of your food donation
      </p>

      <div className="flex items-center gap-3 mb-6">
        <label htmlFor="impact-lbs" className="text-sm font-medium text-neutral-700 whitespace-nowrap">
          Food donated (lbs):
        </label>
        <input
          id="impact-lbs"
          type="number"
          min="0"
          step="1"
          value={pounds}
          onChange={(e) => setPounds(e.target.value)}
          placeholder="e.g. 50"
          className="flex-1 px-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 bg-neutral-50 rounded-xl"
          >
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {lbs > 0 ? stat.value : '—'}
            </div>
            <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImpactCalculator;
