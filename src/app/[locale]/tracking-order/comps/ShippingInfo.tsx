//THIRD PARTY MODULES
import dayjs from 'dayjs';
import classcat from 'classcat';
import { DeliveryType } from '@prisma/client';
import { formatPhoneNumber } from '_@landing/utils/phoneFormat';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import MailIcon from '_@shared/icons/MailIcon';
import NoteIcon from '_@shared/icons/NoteIcon';
import UserIcon from '_@shared/icons/UserIcon';
import { RouterOutputs } from '_@shared/utils/api';
import LocationIcon from '_@shared/icons/LocationIcon';
import DialPhoneIcon from '_@shared/icons/DialPhoneIcon';
//RELATIVE MODULES
const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

interface Props {
  data?: RouterOutputs['order']['trackingOrder'];
}

const ShippingInfo = ({ data }: Props) => {
  const address = data?.address;

  if (!address) return null;
  return (
    <div className="flex-1">
      <div>
        <h3 className="text-18 text-blu-400 md:text-24">Shipping to</h3>
        <div
          className={classcat([
            'mt-2 flex flex-col space-y-2 text-blu-400',
            '[&>div]:space-i-2 [&>div>span]:flex-1 [&>div>span]:text-12 [&>div>span]:font-light [&>div]:flex',
            'md:mt-4 md:[&>div>span]:text-14',
          ])}
        >
          <div>
            <LocationIcon className="h-4.5 w-4.5" />
            <span>{address.address}</span>
          </div>
          <div>
            <DialPhoneIcon className="h-4.5 w-4.5" />
            <span>{formatPhoneNumber(address.phoneNumber, address.country?.dialCode)}</span>
          </div>
          <div>
            <UserIcon className="h-4.5 w-4.5" />
            <span>{address.customerName}</span>
          </div>
          <div>
            <MailIcon className="h-4.5 w-4.5" />
            <span>{address.email}</span>
          </div>
          <Show when={address.note}>
            <div>
              <NoteIcon className="h-4.5 w-4.5" />
              <span>{address.note}</span>
            </div>
          </Show>
        </div>
      </div>

      <div className={classcat(['mt-6 grid grid-cols-1 gap-2', 'md:gap-4'])}>
        <h3 className="text-18 text-blu-400 md:text-24">Delivery date & time</h3>
        <Switch.Root>
          <Switch.Case when={data.deliveryType === DeliveryType.PRE_ORDER}>
            <time className="text-12 font-light text-blu-400 md:text-14">
              {dayjs(data.preOrderDate).format('Do MMM YYYY, [at] HH:mm')}
            </time>
          </Switch.Case>
          <Switch.Case when={data.deliveryType === DeliveryType.RIGHT_AWAY}>
            <time className="text-12 font-light text-blu-400 md:text-14">
              {dayjs(data.cart.placedAt).format('Do MMM YYYY, [at] HH:mm')}
            </time>
          </Switch.Case>
        </Switch.Root>
      </div>
    </div>
  );
};

export default ShippingInfo;
