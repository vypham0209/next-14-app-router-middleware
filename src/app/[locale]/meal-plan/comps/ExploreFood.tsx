//THIRD PARTY MODULES
import classcat from 'classcat'
import { cookies } from 'next/headers'
import { SiteContentComponent } from '@prisma/client'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import BuildPlanModal from '../components/build-plan/BuildPlanModal'
//SHARED
import { apiServer } from '_@shared/utils/apiServer'

//THIRD PARTY MODULES
//SHARED

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en'
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.EXPLORE_MEAL_PLAN_CTA],
  })
  if (data.status) return data.data
}

const ExploreFood = async () => {
  const data = await getData()

  if (!data || data.length === 0) return null

  return (
    <div
      className={classcat([
        'flex flex-col items-center gap-y-10 bg-yel-1000 px-6 py-14',
        'md:py-16',
      ])}
    >
      <div className={classcat(['flex flex-col gap-y-4 md:gap-y-6', 'md:max-w-[800px]'])}>
        <h2 className={classcat(['text-center text-36 font-medium text-white', 'text-48'])}>
          {data[0].title || ''}
        </h2>
        <p className={classcat(['text-center text-white', 'md:text-20'])}>
          {data[0].subtitle || ''}
        </p>
      </div>

      <BuildPlanModal>
        <Button
          className="btn-medium bg-white uppercase ow:py-3 ow:text-blu-500 md:max-w-[348px]"
          variant="outlined"
        >
          Build your plan now
        </Button>
      </BuildPlanModal>
    </div>
  )
}

export default ExploreFood
