//THIRD PARTY MODULES
import classcat from 'classcat'
import { useRef, useState } from 'react'
import { OrderStatus } from '@prisma/client'
import * as Tabs from '@radix-ui/react-tabs'
import { GetOrderByUserInput } from '_@rpc/routers/order/order.validators'
//LAYOUT, COMPONENTS
// import Button from '_@shared/components/button/Button'
import Switch from '_@shared/components/conditions/Switch'
//SHARED
import { nextApi } from '_@shared/utils/api'
import SearchIcon from '_@shared/icons/SearchIcon'
import { OptionalExcept } from '_@shared/utils/type'
// import CustomerServiceIcon from '_@shared/icons/CustomerServiceIcon'
import {
  // CUSTOMER_SERVICE_TYPE_FORM,
  ORDER_TAB_ALL,
} from '_@landing/constants/shared'
//RELATIVE MODULES
import NoOrder from './NoOrder'
import Loading from './Loading'
import OrderCard from './OrderCard'

//RELATIVE MODULES
type Props = {
  dataCount: {
    [key: string]: number | undefined
  }
}

export default function Orders({ dataCount }: Props) {
  const [tab, setTab] = useState<string>(ORDER_TAB_ALL)
  const [state, setState] = useState<OptionalExcept<GetOrderByUserInput, 'status'>>({
    status: [
      OrderStatus.ACCEPT,
      OrderStatus.CANCELLED,
      OrderStatus.FINISHED,
      OrderStatus.DELIVERING,
    ],
  })

  const keywordRef = useRef<HTMLInputElement>(null)

  const { data, isLoading } = nextApi.order.getOrdersByUser.useQuery({
    orderId: state.orderId ?? undefined,
    status: state.status,
  })

  const onChangeTab = (val: string) => {
    setTab(val)
    setState((prev) => ({
      ...prev,
      status: val === 'ALL' ? [] : [val],
    }))
  }

  const onSearch = () => {
    const keyword = keywordRef.current?.value
    setState((prev) => {
      return {
        ...prev,
        orderId: keyword,
      }
    })
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <Tabs.Root
      defaultValue={ORDER_TAB_ALL}
      className={classcat(['flex flex-col', 'md:space-i-14 md:flex-row'])}
      value={tab}
      onValueChange={onChangeTab}
    >
      <Tabs.TabsList
        className={classcat([
          'mb-6 flex w-full snap-x snap-mandatory text-14 text-blu-400',
          'min-w overflow-x-auto whitespace-nowrap scrollbar-hide',
          'md:space-i-0 md:mb-0 md:w-50 md:shrink-0 md:flex-col md:space-y-4',
        ])}
      >
        {orderStatusTab.map((item) => (
          <Tabs.TabsTrigger
            key={item.value}
            className={classcat([
              'block snap-start py-1.25 text-16 pi-4 data-[state=active]:bg-yel-50 data-[state=active]:text-yel-500',
              'md:min-w-[theme(spacing.35)] md:bg-yel-25 md:py-1.5 md:text-start md:pi-2',
              'md:data-[state=active]:border-l-4 md:data-[state=active]:border-yel-500 md:data-[state=active]:ps-5',
            ])}
            value={item.value}
          >
            {item.label} ({dataCount?.[item.value as keyof typeof dataCount] ?? 0})
          </Tabs.TabsTrigger>
        ))}
      </Tabs.TabsList>

      <div className="w-full">
        <div
          className={classcat([
            'grid grid-cols-1 items-center gap-4',
            'lg:grid-cols-[theme(spacing.100)_1fr] lg:gap-0',
          ])}
        >
          <div
            className={classcat([
              'flex items-center justify-between border border-blu-100',
              'hover:border-blu-300 hover:bg-yel-25 hover:shadow-input',
              'focus-within:border-blu-300 focus-within:bg-yel-25 focus-within:shadow-input',
              'lg:w-100',
            ])}
          >
            <input
              ref={keywordRef}
              onKeyDown={handleKeywordKeyPress}
              placeholder="Search order id"
              className={classcat([
                'block w-full bg-yel-25 py-3.75 text-14lig leading-[theme(spacing[4.5])] text-blu-500 pi-3 placeholder:font-light placeholder:text-blu-200 focus:outline-none',
              ])}
              type="text"
            />
            <SearchIcon onClick={onSearch} className="me-3 cursor-pointer text-blu-500" />
          </div>
          {/* <div className="flex justify-end">
            <Button
              as="link"
              href={CUSTOMER_SERVICE_TYPE_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-medium [&>span]:text-16"
              variant="ghost"
              leadingIcon={<CustomerServiceIcon className="h-4 w-4" />}
            >
              Customer service
            </Button>
          </div> */}
        </div>
        {orderStatusTab.map((item) => {
          return (
            <Tabs.Content key={item.value} value={item.value}>
              <div className="mt-6 grid grid-cols-1 space-y-10 md:mt-10">
                <Switch.Root>
                  <Switch.Case when={isLoading}>
                    <Loading />
                  </Switch.Case>
                  <Switch.Case when={!isLoading && data?.data?.length}>
                    {data?.data?.map((order) => (
                      <OrderCard key={order.id} data={order} />
                    ))}
                  </Switch.Case>
                  <Switch.Case when={true}>
                    <NoOrder />
                  </Switch.Case>
                </Switch.Root>
              </div>
            </Tabs.Content>
          )
        })}
      </div>
    </Tabs.Root>
  )
}

export const orderStatusTab = [
  {
    value: ORDER_TAB_ALL,
    label: 'All',
  },
  {
    value: OrderStatus.ACCEPT,
    label: 'Accepted',
  },
  {
    value: OrderStatus.DELIVERING,
    label: 'Delivering',
  },
  {
    value: OrderStatus.FINISHED,
    label: 'Completed',
  },
  {
    value: OrderStatus.CANCELLED,
    label: 'Cancelled',
  },
]
