//THIRD PARTY MODULES
import dayjs from 'dayjs'
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
import { useGlobalContext } from '../../../global/GlobalProvider'
//RELATIVE MODULES
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

type TShippingInfoProps = {
  data: RouterOutputs['mealPlan']['trackingMealPlan']['address']
}

const ShippingInfo = ({ data }: TShippingInfoProps) => {
  const global = useGlobalContext()
  const dialCode = (global.country?.data || []).find(
    (item) => item.id === data?.countryId,
  )?.dialCode
  if (!data) return null
  return (
    <div className="grid justify-start gap-4">
      <h3 className="text-18 text-blu-400 md:text-24">Shipping to</h3>
      <div
        className={classcat([
          'flex flex-col space-y-2 text-blu-400',
          '[&>div]:space-i-2 [&>div>span]:flex-1 [&>div>span]:text-12 [&>div>span]:font-light [&>div]:flex',
          'md:[&>div>span]:text-14',
        ])}
      >
        <div>
          <LocationIcon className="h-4.5 w-4.5" />
          <span>{data.address}</span>
        </div>
        <div>
          <DialPhoneIcon className="h-4.5 w-4.5" />
          <span>{formatPhoneNumber(data.phoneNumber, dialCode)}</span>
        </div>
        <div>
          <UserIcon className="h-4.5 w-4.5" />
          <span>{data.customerName}</span>
        </div>
        <div>
          <MailIcon className="h-4.5 w-4.5" />
          <span>{data.email}</span>
        </div>
        <Show when={data.note}>
          <div>
            <NoteIcon className="h-4.5 w-4.5" />
            <span>{data.note}</span>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default ShippingInfo
