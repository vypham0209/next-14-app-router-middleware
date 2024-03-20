'use client'

//THIRD PARTY MODULES
import classcat from 'classcat'
import { useState } from 'react'
import { MealPlanCategory } from '@prisma/client'
import { GetSiteContentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import BuildPlanModal from '../components/build-plan/BuildPlanModal'
//SHARED
import { nextApi } from '_@shared/utils/api'
import { formatStringToWords } from '_@shared/utils/func'
import getCookies from '_@shared/utils/parseCookieToObject'
//RELATIVE MODULES
import { CATEGORY_MAPPING } from '../constants/meal-plan'

const SampleMacros = () => {
  const { data } = nextApi.siteContent.getMealPlanSample.useQuery({
    language: (
      getCookies()['NEXT_LOCALE'] || 'EN'
    ).toUpperCase() as GetSiteContentInput['language'],
  })

  const [selectedType, setSelectedType] = useState<MealPlanCategory>(MealPlanCategory.Ordinary)

  const macros = data?.macros.filter((item) => item.mealPlanCategory === selectedType) || []

  return (
    <div className={classcat(['flex flex-col gap-y-10 px-6', 'md:max-content md:gap-y-16'])}>
      <div
        className={classcat([
          'mx-auto flex flex-col gap-y-4 text-center',
          'md:max-w-[800px] md:gap-y-6',
        ])}
      >
        <h2 className={classcat(['px-10 text-28 font-medium text-blu-400', 'md:text-48'])}>
          Sample macros for weight loss
        </h2>

        <p className={classcat(['text-14 font-light text-blu-300', 'md:text-20'])}>
          Tristique semper diam felis sed morbi parturient. Condimentum cursus convallis ornare
          volutpat rhoncus hendrerit commodo. Vulputate sapien aenean accumsan auctor. Tincidunt
          amet commodo venenatis vel aliquet convallis dictum aliquet.
        </p>
      </div>

      <div className={classcat(['flex flex-col gap-y-6', 'md:gap-y-16'])}>
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
          {macros.map((item, index) => (
            <div
              key={index}
              className={classcat([
                'flex w-full max-w-[240px] shrink-0 flex-col gap-y-[10px] bg-yel-50 p-4',
                'md:max-w-[calc((100%_-_32px)_/_3)]',
                'md:gap-y-6 md:px-10 md:py-16',
              ])}
            >
              <p
                className={classcat([
                  'text-center text-14 font-medium text-blu-400',
                  'md: text-18',
                ])}
              >
                {item.mealTypes.map((mt) => formatStringToWords(mt)).join(', ')}
              </p>

              <div
                className={classcat(['text-center text-12 font-light text-blu-400', 'md:text-16'])}
              >
                <span
                  className={classcat([
                    'text-14 font-medium text-yel-500',
                    'md:text-18 md:font-semibold',
                  ])}
                >
                  {item.caloriesFrom}
                </span>{' '}
                to{' '}
                <span
                  className={classcat([
                    'text-14 font-medium text-yel-500',
                    'md:text-18 md:font-semibold',
                  ])}
                >
                  {item.caloriesTo}
                </span>{' '}
                kcal
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex items-center justify-between gap-x-2 border-b border-dashed border-blu-100 pb-1">
                  <span className="text-14 font-light text-blu-400">Protein</span>
                  <span className="text-14 font-medium text-blu-400">{`${item.protein}g`}</span>
                </div>
                <div className="flex items-center justify-between gap-x-2 border-b border-dashed border-blu-100 pb-1">
                  <span className="text-14 font-light text-blu-400">Carbohydrates</span>
                  <span className="text-14 font-medium text-blu-400">{`${item.carbonHydrate}g`}</span>
                </div>
                <div className="flex items-center justify-between gap-x-2 border-b border-dashed border-blu-100 pb-1">
                  <span className="text-14 font-light text-blu-400">Fats</span>
                  <span className="text-14 font-medium text-blu-400">{`${item.fat}g`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BuildPlanModal>
        <Button className={classcat(['btn-medium mx-auto uppercase ow:py-3', 'md:max-w-[348px]'])}>
          Build your plan now
        </Button>
      </BuildPlanModal>
    </div>
  )
}

export default SampleMacros
