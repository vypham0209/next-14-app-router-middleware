//THIRD PARTY MODULES
import React from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import FishOnCuttingBoard from '_@shared/icons/FishOnCuttingBoardIcon';

export default function NotFound() {
  return (
    <div className="mb-30 mt-10 flex w-full flex-col items-center justify-between space-y-10 pi-4 md:mb-36">
      <FishOnCuttingBoard className="h-[152px] w-40 md:h-[276px] md:w-[293px]" />
      <div className="text-center text-blu-400">
        <h3 className="text-36 md:text-64">Sorry...</h3>
        <p className="mt-6 text-14lig md:text-20lig">We can't find the page you're looking for.</p>
      </div>
      <Button href="/" as="link" color="navy" className="btn-big w-73.75 md:btn-very-big md:w-70">
        Back to Homepage
      </Button>
    </div>
  );
}
