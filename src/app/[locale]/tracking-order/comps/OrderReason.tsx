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
      <h3 className={classcat(['text-14 uppercase text-blu-600'])}>Reason:</h3>
      <p className={classcat(['text-14lig text-blu-400'])}>{reason}</p>
    </div>
  );
}

export default OrderReason;
