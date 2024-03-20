//THIRD PARTY MODULES
import React from 'react';
//LAYOUT, COMPONENTS
import DishSkeleton from '_@landing/components/skeleton/DishSkeleton';

function Page() {
  return (
    <>
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-14">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <DishSkeleton key={index} />
          ))}
      </div>
    </>
  );
}

export default Page;
