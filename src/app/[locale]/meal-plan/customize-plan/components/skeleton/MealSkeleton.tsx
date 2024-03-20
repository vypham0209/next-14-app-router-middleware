//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
//SHARED
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
//RELATIVE MODULES
import DishCardSkeleton from './DishCardSkeleton';

const arrowClasses = classcat([
  'transition-all',
  'focus-visible:outline-none focus-visible:ring',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'grid auto-cols-max grid-flow-col items-center justify-center',
  'h-7.5 w-7.5 rounded-full border border-solid border-blu-100 pb-0',
  'border-blu-100 text-blu-500',
  'focus-visible:ring-yellow-600 hover-hover:border-blu-100 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-navy-outlined-hover',
]);

function MealSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="w-20 animate-pulse bg-skeleton sm:h-6" />
        <div className="hidden grid-flow-col items-center justify-items-end gap-2 md:grid">
          <button className={classcat([arrowClasses])}>
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button className={classcat([arrowClasses])}>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-flow-col grid-cols-2 gap-4 md:hidden">
        {Array(2)
          .fill(1)
          .map((_, index) => (
            <DishCardSkeleton key={index} />
          ))}
      </div>
      <div className="hidden grid-flow-col grid-cols-3 gap-4 md:grid lg:hidden">
        {Array(3)
          .fill(1)
          .map((_, index) => (
            <DishCardSkeleton key={index} />
          ))}
      </div>
      <div className="hidden grid-flow-col grid-cols-4 gap-4 lg:grid">
        {Array(4)
          .fill(1)
          .map((_, index) => (
            <DishCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}

export default MealSkeleton;
