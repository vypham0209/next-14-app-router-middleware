//THIRD PARTY MODULES
import Image from 'next/image'
import classcat from 'classcat'
import { MealType } from '@prisma/client'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'
//RELATIVE MODULES
import { useCustomizePlanContext } from '../../context/CustomizePlanContext'

type TDishCardProps = {
  data: NonNullable<
    RouterOutputs['mealPlan']['getMealPlanDishes']['dishesInMealPlan'][MealType]
  >[number]
  value: number
  onChange: (value: number) => void
}

function DishCard({ value, onChange, data }: TDishCardProps) {
  const { viewDetail } = useCustomizePlanContext()
  return (
    <div
      onClick={() => onChange(data.id)}
      className={classcat([
        'grid cursor-pointer gap-3 border border-blu-100 p-3',
        value === data.id ? 'border-yel-500 bg-yel-200 shadow-input' : '',
      ])}
    >
      <div className="grid grid-flow-col grid-cols-[theme(spacing.14)_1fr] gap-3 sm:grid-cols-[theme(spacing.20)_1fr]">
        <div className="relative w-[theme(spacing.14)] md:w-[theme(spacing.20)]">
          <AspectRatio ratio={6 / 5}>
            <Image
              src={process.env.NEXT_PUBLIC_CDN_HOST + data?.images[0] || ''}
              className="h-full w-full object-cover"
              alt={data.name}
              fill
              sizes="7rem, (max-width: 768px) 10rem"
              quality={100}
            />
          </AspectRatio>
        </div>
        <div className={classcat(['grid content-start gap-2'])}>
          <p
            title={data.name}
            className="line-clamp-2 text-14 text-blu-400 sm:line-clamp-1 sm:text-16"
          >
            {data.name}
          </p>
          <p title={data.description} className="hidden text-12lig text-blu-400 sm:line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          color="navy"
          variant="ghost"
          onClick={(e: any) => {
            e.stopPropagation()
            viewDetail(data.id)
          }}
          className={classcat([
            'ow:hover:border-none ow:hover:text-blu-500 ow:hover:shadow-none',
            'hover-hover:text-yel-500 hover-hover:shadow-[inset_0_-1px] hover-hover:shadow-yel-500',
            'ow:focus-visible:ring-none',
          ])}
        >
          VIEW DETAILS
        </Button>
      </div>
    </div>
  )
}

export default DishCard
