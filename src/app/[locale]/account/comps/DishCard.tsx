//THIRD PARTY MODULES
import Image from 'next/image'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'

interface DishCardProps {
  data: RouterOutputs['order']['getOrdersByUser']['data'][number]['cart']['dishesInCart'][number]
}

function DishCard({ data }: DishCardProps) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="grid grid-flow-row grid-cols-[theme(spacing.10)_1fr] items-center space-x-0 md:space-x-4">
        <div className="w-8 md:w-10">
          <AspectRatio.Root ratio={1 / 1}>
            <Image
              src={process.env.NEXT_PUBLIC_CDN_HOST + data?.images?.[0]}
              alt="image"
              fill
              sizes="(max-width: 768px) 2rem, (max-width: 1200px) 2.5rem, 2.5rem"
              className="h-full w-full object-cover"
            />
          </AspectRatio.Root>
        </div>
        <p className="truncate text-12lig text-blu-400 md:text-14lig">{data.name}</p>
      </div>
      <p className="whitespace-nowrap text-12 text-blu-400 md:text-14">
        {data.totalPrice.toFixed(2)} AED
      </p>
    </div>
  )
}

export default DishCard
