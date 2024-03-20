//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
//RELATIVE MODULES
import NoOrderIcon from '_@shared/icons/NoOrderIcon';

function NoOrder() {
  return (
    <div
      className={classcat([
        'mt-10 flex flex-col items-center justify-center space-y-6 pb-4 pt-20',
        'md:space-y-10 md:py-20',
      ])}
    >
      <NoOrderIcon className={classcat(['h-30 w-35', 'md:h-auto md:w-auto'])} />
      <p
        className={classcat([
          'text-center text-16lig text-blu-400 pi-14',
          'md:max-w-175 md:text-20lig md:pi-0',
        ])}
      >
        There are no orders
      </p>
    </div>
  );
}

export default NoOrder;
