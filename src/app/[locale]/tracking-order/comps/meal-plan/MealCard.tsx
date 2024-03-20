//THIRD PARTY MODULES
import Image from 'next/image'
import classcat from 'classcat'
import { DayOfWeek } from '@prisma/client'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { mealPlanOptionsObject } from '_@landing/constants/meal-plan'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'

type TMealCardProps = {
  data: RouterOutputs['mealPlan']['getMealPlanOrderDetail']['data']['dishInMealPlanOrder'][string][DayOfWeek][number]
}

function MealCard({ data }: TMealCardProps) {
  return (
    <div className={classcat(['grid gap-2 md:justify-items-start'])}>
      <p className={classcat(['text-14 font-bold uppercase text-blu-500'])}>
        {mealPlanOptionsObject?.[data.mealType]?.label}
      </p>
      <div
        className={classcat([
          'grid grid-cols-[theme(spacing[16])_1fr] items-start gap-2',
          'md:grid-cols-[theme(spacing[30])_1fr]',
        ])}
      >
        <div className="relative w-[theme(spacing[16])] py-0 md:w-[theme(spacing[30])] md:py-1">
          <AspectRatio ratio={6 / 5}>
            <Image
              src={process.env.NEXT_PUBLIC_CDN_HOST + data.image}
              alt={data.name}
              className="h-full w-full object-cover"
              fill
              sizes="8rem, (max-width: 768px) 15rem"
              quality={100}
            />
          </AspectRatio>
        </div>
        <div
          className={classcat([
            'space-i-2 flex items-start justify-between',
            'md:space-i-0 md:flex-col md:space-y-2',
          ])}
        >
          <p className={classcat(['line-clamp-2 text-14lig text-blu-400'])}>{data.name}</p>
          <p className={classcat(['whitespace-nowrap text-14 font-bold text-blu-400'])}>
            {data.price.toFixed(2)} AED
          </p>
        </div>
      </div>
    </div>
  )
}

export default MealCard
