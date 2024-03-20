//THIRD PARTY MODULES
import classcat from 'classcat'
import { OrderStatus } from '@prisma/client'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
//SHARED
import RefreshIcon from '_@shared/icons/RefreshIcon'
// import { FAQ_TYPE_FORM } from '_@landing/constants/shared';

interface Props {
  status: OrderStatus
  id: string
  onRefresh: () => void
}

function OrderAction({ status, id, onRefresh }: Props) {
  return (
    <div
      className={classcat([
        'flex flex-col justify-end space-y-3',
        'lg:space-i-4 lg:flex-row lg:space-y-0',
      ])}
    >
      <div className={classcat(['space-i-2 flex', 'md:space-i-4'])}>
        {/* <Button
          as="link"
          href={FAQ_TYPE_FORM}
          target="_blank"
          rel="noopener noreferrer"
          color="secondary"
          className={classcat([
            'btn-medium py-1.75 pi-2',
            'md:h-9 md:py-1.75 md:pi-4',
            'ow:hover:border-white ow:hover:bg-white ow:hover:text-blu-500 ow:hover:shadow-none',
            'hover-hover:border-yel-50 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-secondary-filled-hover',
          ])}
        >
          Need help?
        </Button> */}
        <Button
          as="link"
          href={`/account/order-detail/${id}`}
          color="secondary"
          className={classcat([
            'btn-medium py-1.75 pi-2',
            'md:h-9 md:py-1.75 md:pi-4',
            'ow:hover:border-white ow:hover:bg-white ow:hover:text-blu-500 ow:hover:shadow-none',
            'hover-hover:border-yel-50 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-secondary-filled-hover',
          ])}
          prefetch={false}
        >
          View details
        </Button>
        <Show when={status !== OrderStatus.FINISHED && status !== OrderStatus.CANCELLED}>
          <Button
            onClick={onRefresh}
            leadingIcon={<RefreshIcon />}
            color="secondary"
            className={classcat([
              'btn-medium py-1.75 pi-2',
              'md:h-9 md:py-1.75 md:pi-4',
              'ow:hover:border-white ow:hover:bg-white ow:hover:text-blu-500 ow:hover:shadow-none',
              'hover-hover:border-yel-50 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-secondary-filled-hover',
            ])}
          >
            Refresh
          </Button>
        </Show>
      </div>
    </div>
  )
}

export default OrderAction
