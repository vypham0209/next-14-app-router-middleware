//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';

function OrderReason({ reason }: { reason: string | null }) {
  return (
    <div
      className={classcat([
        'flex flex-col space-y-2 bg-red-100 py-4 pi-4',
        'border border-solid border-red-400',
      ])}
    >
      <h3 className={classcat(['text-12 uppercase text-blu-600', 'md:text-14'])}>Reject reason:</h3>
      <p className={classcat(['text-14lig text-blu-400', 'md:text-16lig'])}>{reason}</p>
    </div>
  );
}

export default OrderReason;
