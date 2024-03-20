'use client'

//THIRD PARTY MODULES
import classcat from 'classcat'
import { useState } from 'react'
import { MealPlanCategory, MealType } from '@prisma/client'
import { GetSiteContentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import BuildPlanModal from '../components/build-plan/BuildPlanModal'
//SHARED
import { nextApi } from '_@shared/utils/api'
import getCookies from '_@shared/utils/parseCookieToObject'
//RELATIVE MODULES
import { CATEGORY_MAPPING } from '../constants/meal-plan'

const SampleMenu = () => {
  const { data } = nextApi.siteContent.getMealPlanSample.useQuery({
    language: (
      getCookies()['NEXT_LOCALE'] || 'EN'
    ).toUpperCase() as GetSiteContentInput['language'],
  })

  const [selectedType, setSelectedType] = useState<MealPlanCategory>(MealPlanCategory.Ordinary)

  const menus = data?.menu || []

  return (
    <div className={classcat(['flex flex-col gap-y-10 px-6', 'md:gap-y-16 md:px-0'])}>
      <div
        className={classcat([
          'mx-auto flex flex-col gap-y-4 text-center',
          'md:max-w-[800px] md:gap-y-6',
        ])}
      >
        <h2 className={classcat(['text-28 font-medium text-blu-400', 'md:text-48'])}>
          Sample menu
        </h2>

        <p className={classcat(['text-14 font-light text-blu-300', 'md:text-20'])}>
          Tristique semper diam felis sed morbi parturient. Condimentum cursus convallis ornare
          volutpat rhoncus hendrerit commodo. Vulputate sapien aenean accumsan auctor. Tincidunt
          amet commodo venenatis vel aliquet convallis dictum aliquet.
        </p>
      </div>

      <div className={classcat(['flex flex-col gap-y-6', 'md:max-content md:gap-y-10'])}>
        <div
          className={classcat([
            'mx-auto flex max-w-full gap-x-10 overflow-x-auto scrollbar-hide',
            'md:gap-x-16',
          ])}
        >
          {Object.keys(CATEGORY_MAPPING).map((item, index) => (
            <div
              key={index}
              className={classcat([
                'shrink-0 cursor-pointer pb-1 text-16 font-medium text-blu-400',
                'md:text-24',
                selectedType === item
                  ? 'border-b border-yel-500 text-yel-500 md:border-b-[2px]'
                  : '',
              ])}
              onClick={() => setSelectedType(item as MealPlanCategory)}
            >
              {CATEGORY_MAPPING[item as MealPlanCategory]}
            </div>
          ))}
        </div>

        <div className="flex gap-x-4 overflow-x-auto scrollbar-hide">
          {Object.values(MealType).map((item, index) => {
            const mealPlan = menus.find((m) => m.category === selectedType && m.type === item)

            if (!mealPlan) return null

            return (
              <div
                key={index}
                className={classcat(['flex w-full max-w-[200px] shrink-0 flex-col'])}
              >
                <p className="bg-yel-50 py-2 text-center text-14 font-light text-blu-400">
                  {item.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </p>

                <div className="relative pb-[83.3%]">
                  <img
                    src={`${process.env.NEXT_PUBLIC_CDN_HOST}${mealPlan.dish.images[0]}`}
                    alt="sample menu food"
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                </div>

                <p
                  className={classcat([
                    'mt-2 text-14 font-medium text-blu-400',
                    'md:mt-4 md:text-16',
                  ])}
                >
                  {mealPlan.dish.name || ''}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="md:pt-9">
        <BuildPlanModal>
          <Button
            className={classcat(['btn-medium mx-auto uppercase ow:py-3', 'md:max-w-[348px]'])}
          >
            Build your plan now
          </Button>
        </BuildPlanModal>
      </div>
    </div>
  )
}

export default SampleMenu
