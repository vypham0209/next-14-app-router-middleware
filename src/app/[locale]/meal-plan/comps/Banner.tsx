//THIRD PARTY MODULES
import classcat from 'classcat'
import { cookies } from 'next/headers'
import { SiteContentComponent } from '@prisma/client'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
//SHARED
import { apiServer } from '_@shared/utils/apiServer'
//LAYOUT, COMPONENTS
//SHARED

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en'
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.MEAL_PLAN_HERO],
  })
  if (data.status) return data.data
}

const Banner = async () => {
  const data = await getData()

  if (!data || data.length === 0) return null

  return (
    <div
      className={classcat([
        'flex flex-col bg-yel-700',
        'md:flex-row md:gap-x-10 md:pl-20 md:[&>*]:flex-1',
      ])}
    >
      <div
        className={classcat([
          'flex flex-col gap-y-4 p-6 text-white',
          'md:gap-y-10 md:px-0 md:py-20',
        ])}
      >
        <Show when={data[0].title?.trim()}>
          <h2 className="text-36 font-medium lg:text-64">{data[0].title?.trim() || ''}</h2>
        </Show>

        <Show when={data[0].subtitle?.trim()}>
          <p className="font-medium lg:text-18 lg:font-normal">{data[0].subtitle?.trim() || ''}</p>
        </Show>
      </div>

      <div className="max-w-[660px] self-center">
        <Show when={data[0].mediaUrl}>
          <div className="relative w-full pb-[100%]">
            <img
              src={`${process.env.NEXT_PUBLIC_CDN_HOST}${data[0].mediaUrl}`}
              alt="meal plan food"
              className="absolute left-0 top-0 h-full w-full object-cover"
              sizes="(max-width: 768px) 375px, 660px"
            />
          </div>
        </Show>
      </div>
    </div>
  )
}

export default Banner
