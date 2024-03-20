//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';

interface Props {
  label: string;
  value?: number;
}

function PriceItem({ label, value }: Props) {
  return (
    <div className={classcat(['flex justify-between'])}>
      <p className={classcat(['text-12 uppercase text-blu-400', 'md:text-14'])}>{label}</p>
      <p className={classcat(['text-12 uppercase text-blu-400', 'md:text-14'])}>
        {value?.toFixed(2)} AED
      </p>
    </div>
  );
}

export default PriceItem;
