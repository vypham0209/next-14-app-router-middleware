//THIRD PARTY MODULES
import classcat from 'classcat'
import { formatPhoneNumber } from '_@landing/utils/phoneFormat'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
//SHARED
import MailIcon from '_@shared/icons/MailIcon'
import NoteIcon from '_@shared/icons/NoteIcon'
import UserIcon from '_@shared/icons/UserIcon'
import { RouterOutputs } from '_@shared/utils/api'
import LocationIcon from '_@shared/icons/LocationIcon'
import DialPhoneIcon from '_@shared/icons/DialPhoneIcon'
//RELATIVE MODULES
import DeliveryDate from './DeliveryDate'

interface Props {
  data: RouterOutputs['order']['getOrderById']
}

const ShippingInfo = ({ data }: Props) => {
  if (!data) return null
  const address = data.address
  return (
    <div className="flex-1 space-y-6 md:space-y-10">
      <div>
        <h3 className="text-18 text-blu-400 md:text-24">Shipping to</h3>
        <div
          className={classcat([
            'mt-2 flex flex-col space-y-2 text-blu-400',
            '[&>div]:space-i-2 [&>div>span]:flex-1 [&>div>span]:text-12 [&>div>span]:font-light [&>div]:flex',
            'md:mt-4 md:space-y-4 md:[&>div>span]:text-14',
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
          <Show when={address.note?.replace(/\s+/g, '').length}>
            <div>
              <NoteIcon className="h-4.5 w-4.5" />
              <span>{address.note}</span>
            </div>
          </Show>
        </div>
      </div>
      <DeliveryDate data={data} />
    </div>
  )
}

export default ShippingInfo
