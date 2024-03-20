//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
//RELATIVE MODULES
import NoOrderIcon from '_@shared/icons/NoOrderIcon';

type TNoDataProps = {
  colSpan: number;
};

function NoData({ colSpan }: TNoDataProps) {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan}>
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
              There are no delivery history
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default NoData;
