'use client'

//THIRD PARTY MODULES
import Image from 'next/image'
import classcat from 'classcat'
import { useState } from 'react'
import { MealPlanCategory, SiteContentComponent } from '@prisma/client'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
import BuildPlanModal from '../components/build-plan/BuildPlanModal'
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '_@landing/components/client'
//SHARED
import { nextApi } from '_@shared/utils/api'
import getCookies from '_@shared/utils/parseCookieToObject'

const PLAN_MAPPING: Record<
  MealPlanCategory,
  { title: string; component: SiteContentComponent; benefit: SiteContentComponent; img: string }
> = {
  [MealPlanCategory.Ordinary]: {
    title: 'Ordinary',
    component: SiteContentComponent.ORDINARY_PLAN,
    benefit: SiteContentComponent.ORDINARY_PLAN_BENEFIT,
    img: 'ordinary.png',
  },
  [MealPlanCategory.Healthy]: {
    title: 'Healthy',
    component: SiteContentComponent.HEALTHY_PLAN,
    benefit: SiteContentComponent.HEALTHY_PLAN_BENEFIT,
    img: 'healthy.png',
  },
  [MealPlanCategory.Vegetarian]: {
    title: 'Vegetarian',
    component: SiteContentComponent.VEGETARIAN_PLAN,
    benefit: SiteContentComponent.VEGETARIAN_PLAN_BENEFIT,
    img: 'vegetarian.png',
  },
  [MealPlanCategory.Vegan]: {
    title: 'Vegan',
    component: SiteContentComponent.VEGAN_PLAN,
    benefit: SiteContentComponent.VEGAN_PLAN_BENEFIT,
    img: 'vegan.png',
  },
  [MealPlanCategory.WeightLost]: {
    title: 'Weight Loss',
    component: SiteContentComponent.WEIGHT_LOST_PLAN,
    benefit: SiteContentComponent.WEIGHT_LOST_PLAN_BENEFIT,
    img: 'weightlost.png',
  },
  [MealPlanCategory.Athletes]: {
    title: 'Athletes',
    component: SiteContentComponent.ATHLETES_PLAN,
    benefit: SiteContentComponent.ATHLETES_PLAN_BENEFIT,
    img: 'athletes.png',
  },
}

const AllPlan = () => {
  const [selectedType, setSelectedType] = useState<MealPlanCategory>(MealPlanCategory.Ordinary)
  const { data } = nextApi.siteContent.getSiteContentByComponent.useQuery({
    components: [
      SiteContentComponent.ALL_PLAN,
      ...Object.values(PLAN_MAPPING).map((item) => item.component),
      ...Object.values(PLAN_MAPPING).map((item) => item.benefit),
    ],
    language: (
      getCookies()['NEXT_LOCALE'] || 'EN'
    ).toUpperCase() as GetSiteContentByComponentInput['language'],
  })

  const components = data?.status === true ? data.data : []
  const allPlanComponent = components.find(
    (item) => item.component === SiteContentComponent.ALL_PLAN,
  )
  const currentComponent = components.find(
    (item) => item.component === PLAN_MAPPING[selectedType].component,
  )
  const currentBenefits = components.filter(
    (item) => item.component === PLAN_MAPPING[selectedType].benefit,
  )

  return (
    <div>
      <div
        className={classcat([
          'mb-10 flex flex-col gap-y-6 px-6',
          'text-center',
          'md:mx-auto md:mb-14 md:max-w-[848px]',
        ])}
      >
        <h2 className="text-28 font-medium text-blu-400 md:text-48">
          {allPlanComponent?.title || ''}
        </h2>
        <p className="text-14 font-light text-blu-300 md:text-16lig">
          {allPlanComponent?.subtitle || ''}
        </p>
      </div>

      <div className="bg-yel-50 pt-6 md:pt-10">
        <ScrollAreaRoot className="overflow-hidden">
          <ScrollAreaViewport>
            <div className="flex flex-nowrap md:max-content md:gap-x-4">
              {Object.keys(PLAN_MAPPING).map((key, index) => (
                <div
                  key={index}
                  className={classcat([
                    'flex w-full max-w-[140px] shrink-0 cursor-pointer flex-col items-center gap-y-2',
                    'py-2',
                    selectedType === key ? 'bg-yel-100' : '',
                    'md:max-w-[200px] md:gap-y-6 md:pb-10 md:pt-4',
                  ])}
                  onClick={() => setSelectedType(key as MealPlanCategory)}
                >
                  <div className="relative h-16 w-16 md:h-30 md:w-30">
                    <Image
                      src={`/img/meal-plan/${PLAN_MAPPING[key as MealPlanCategory].img}`}
                      alt="food"
                      layout="fill"
                    />
                  </div>

                  <span className="font-medium text-blu-400 md:text-24">
                    {PLAN_MAPPING[key as MealPlanCategory].title}
                  </span>
                </div>
              ))}
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar
            orientation="horizontal"
            className="touch-none select-none rounded-[0.0625rem] bg-yel-200 data-[orientation=horizontal]:h-1.5"
          >
            <ScrollAreaThumb
              className="rounded-[0.0625rem] bg-yel-400 ow:h-full"
              style={{ height: '100%' }}
            />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>

        <div
          className={classcat([
            'bg-yel-100 p-6 pb-12',
            'flex flex-col gap-y-6',
            'md:max-content md:flex-row-reverse md:gap-x-10 md:py-14',
          ])}
        >
          <div className="md:w-[56%] md:max-w-[700px] md:shrink-0">
            <div className="relative pb-[83.3%]">
              <img
                src={`${process.env.NEXT_PUBLIC_CDN_HOST}${currentComponent?.mediaUrl}`}
                alt="food"
                className={'absolute left-0 top-0 h-full w-full object-cover'}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-4 md:flex-1 md:gap-y-10">
            <Show when={currentComponent?.description}>
              <p className="text-14 font-light text-blu-400 md:text-16">
                {currentComponent?.description || ''}
              </p>
            </Show>

            <Show when={currentBenefits.length > 0}>
              <div className="flex flex-col gap-y-1 md:gap-y-[10px]">
                {currentBenefits.map((item, index) => (
                  <div key={index} className="flex gap-x-2 md:gap-x-4">
                    <div className="relative h-6 w-6 shrink-0">
                      <Image
                        src="/img/meal-plan/bullet-list.png"
                        alt="bullet list checked"
                        layout="fill"
                      />
                    </div>

                    <p className="font-georgia text-12 italic text-blu-400 md:text-14">
                      {item.title || ''}
                    </p>
                  </div>
                ))}
              </div>
            </Show>

            <BuildPlanModal>
              <Button className="btn-medium uppercase ow:py-3 md:max-w-[348px]">
                Build your plan now
              </Button>
            </BuildPlanModal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPlan
