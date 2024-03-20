//THIRD PARTY MODULES
import classcat from 'classcat'
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
import PhoneFormat from './PhoneFormat'

interface Props {
  data: RouterOutputs['mealPlan']['getMealPlanOrderDetail']['data']['address']
}

const ShippingInfo = ({ data }: Props) => {
  if (!data) return null
  return (
    <div className="grid gap-4">
      <h3 className="text-18 text-blu-400 md:text-24">Shipping to</h3>
      <div
        className={classcat([
          'grid gap-4 text-blu-400',
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
          <PhoneFormat countryId={data.countryId || 0} phoneNumber={data.phoneNumber} />
        </div>
        <div>
          <UserIcon className="h-4.5 w-4.5" />
          <span>{data.customerName}</span>
        </div>
        <div>
          <MailIcon className="h-4.5 w-4.5" />
          <span>{data.email}</span>
        </div>
        <Show when={data.note?.replace(/\s+/g, '').length}>
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
