//THIRD PARTY MODULES
import Image from 'next/image'
import classcat from 'classcat'
import { categoryOptionsObject } from '_@landing/constants/meal-plan'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Switch from '_@shared/components/conditions/Switch'
//SHARED
import { nextApi } from '_@shared/utils/api'
//RELATIVE MODULES
import Loading from './Loading'
import NoMealPlan from './NoMealPlan'
import MealPlanModal from './MealPlanModal'

function MealPlanCurrent() {
  const { data, isLoading } = nextApi.mealPlan.getActiveMealPlanOrderByUserId.useQuery()
  return (
    <div className="grid gap-6 pt-6 md:gap-10 md:pe-56 md:pt-0">
      <Switch.Root>
        <Switch.Case when={isLoading}>
          <Loading />
        </Switch.Case>
        <Switch.Case when={data?.length === 0}>
          <NoMealPlan />
        </Switch.Case>
        <Switch.Case when={true}>
          {data?.map((item) => (
            <div
              key={item.id}
              className={classcat([
                'grid grid-cols-[theme(spacing[25])_1fr] gap-3 border border-blu-100 p-4',
                'md:grid-cols-[theme(spacing[32.5])_1fr] md:gap-6 md:p-6',
              ])}
            >
              <div className="relative w-[theme(spacing[25])] md:w-[theme(spacing[32.5])]">
                <Image
                  src={process.env.NEXT_PUBLIC_CDN_HOST + item.mealPlan.image}
                  alt={item.mealPlan.name}
                  className="h-full w-full object-cover"
                  fill
                  sizes="12.5rem, (max-width: 768px) 16.25rem"
                  quality={100}
                />
              </div>
              <div className="grid grid-flow-row gap-3 md:gap-6">
                <p className={classcat(['truncate text-24 text-blu-400', 'md:text-28'])}>
                  {categoryOptionsObject[item.mealPlan.category]?.label}
                </p>
                <div className="grid grid-flow-col grid-cols-2 justify-start gap-2 md:grid-cols-none md:gap-4">
                  <Button
                    as="link"
                    href={`/account/meal-plan-detail/${item.id}`}
                    color="navy"
                    variant="outlined"
                    className={classcat([
                      'btn-medium md:btn-big',
                      'ow:hover:border-blu-100 ow:hover:bg-transparent ow:hover:text-blu-500 ow:hover:shadow-none',
                      'hover-hover:border-blu-100 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-navy-outlined-hover',
                    ])}
                  >
                    Details
                  </Button>
                  <MealPlanModal id={item.id}>
                    <Button
                      color="navy"
                      className={classcat([
                        'btn-medium md:btn-big',
                        'ow:hover:border-blu-500 ow:hover:bg-blu-500 ow:hover:text-white ow:hover:shadow-none',
                        'hover-hover:border-blu-300 hover-hover:bg-blu-300 hover-hover:shadow-btn-navy-filled-hover ',
                      ])}
                    >
                      Menu
                    </Button>
                  </MealPlanModal>
                </div>
              </div>
            </div>
          ))}
        </Switch.Case>
      </Switch.Root>
    </div>
  )
}

export default MealPlanCurrent
