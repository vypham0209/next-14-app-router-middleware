//THIRD PARTY MODULES
import classcat from 'classcat';
import { ComponentPropsWithoutRef } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';

export default function SubscribeLastedUpdate({ className }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={classcat([
        'grid place-content-center justify-items-center gap-4',
        'bg-yel-200 text-blu-500',
        'px-6 py-7.25 s-576:py-12',
        className,
      ])}
    >
      <p className="max-w-[231px] text-center text-24 md:max-w-[266.67px] md:text-28">
        Subscribe for the latest updates
      </p>
      <p className="max-w-[279px] text-center text-14lig md:max-w-[298.67px]">
        A tour of West African gourmet gastronomy is coming soon. Please join us and follow our
        social media to get the latest news & updates
      </p>
      <Button color="navy" className="btn-big max-w-[298.67px]">
        WELCOME/AKWABA
      </Button>
    </div>
  );
}
