//THIRD PARTY MODULES
import React from 'react';

function DishCardSkeleton() {
  return (
    <div className="grid animate-pulse gap-3 border border-blu-100 p-3">
      <div className="grid grid-flow-col grid-cols-[theme(spacing.14)_1fr] gap-3 sm:grid-cols-[theme(spacing.20)_1fr]">
        <div className="h-full w-full bg-skeleton" />
        <div className="grid items-start gap-2">
          <div className="h-6 bg-skeleton" />
          <div className="hidden h-9 bg-skeleton sm:block" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="h-4.5 w-20 bg-skeleton" />
      </div>
    </div>
  );
}

export default DishCardSkeleton;
