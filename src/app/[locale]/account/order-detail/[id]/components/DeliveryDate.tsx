'use client';
//THIRD PARTY MODULES
import dayjs from 'dayjs';
import classcat from 'classcat';
import { DeliveryType } from '@prisma/client';
//LAYOUT, COMPONENTS
import BrowserOnly from '_@shared/components/BrowserOnly';
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//RELATIVE MODULES
import DeliveryDateFallback from './DeliveryFallback';
//RELATIVE MODULES
const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

interface Props {
  data: RouterOutputs['order']['getOrderById'];
}

function DeliveryDate({ data }: Props) {
  return (
    <BrowserOnly fallback={<DeliveryDateFallback />}>
      <div className={classcat(['grid grid-cols-1 gap-2', 'md:gap-4'])}>
        <h3 className="text-18 text-blu-400 md:text-24">Delivery date & time</h3>
        <Switch.Root>
          <Switch.Case when={data?.deliveryType === DeliveryType.PRE_ORDER && data?.preOrderDate}>
            <time className="text-12 font-light text-blu-400 md:text-14">
              {dayjs(data?.preOrderDate).format('Do MMM YYYY, [at] HH:mm')}
            </time>
          </Switch.Case>
          <Switch.Case when={data?.deliveryType === DeliveryType.RIGHT_AWAY && data?.cart.placedAt}>
            <time className="text-12 font-light text-blu-400 md:text-14">
              {dayjs(data?.cart.placedAt).format('Do MMM YYYY, [at] HH:mm')}
            </time>
          </Switch.Case>
        </Switch.Root>
      </div>
    </BrowserOnly>
  );
}

export default DeliveryDate;
