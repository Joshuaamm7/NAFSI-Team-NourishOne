import React from 'react';

function LocationCardSkeleton() {
  return (
    <div className="rounded-2xl shadow-soft bg-white border border-neutral-100 p-4 animate-pulse" data-testid="location-card-skeleton">
      <div className="flex items-start justify-between gap-2">
        <div className="h-5 bg-neutral-200 rounded w-3/5" />
        <div className="h-5 bg-neutral-200 rounded w-12" />
      </div>
      <div className="h-4 bg-neutral-200 rounded w-4/5 mt-2" />
      <div className="h-4 bg-neutral-200 rounded w-2/5 mt-2" />
      <div className="flex gap-2 mt-3">
        <div className="h-5 bg-neutral-200 rounded-full w-16" />
        <div className="h-5 bg-neutral-200 rounded-full w-20" />
        <div className="h-5 bg-neutral-200 rounded-full w-14" />
      </div>
    </div>
  );
}

export default LocationCardSkeleton;
