//THIRD PARTY MODULES
import classcat from 'classcat'
import { cookies } from 'next/headers'
import { SiteContentComponent } from '@prisma/client'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
//SHARED
import { apiServer } from '_@shared/utils/apiServer'

const components = [
  SiteContentComponent.SECTION_WITH_A_NUMBER,
  SiteContentComponent.SECTION_NUMBER_ITEM,
]
const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en'
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components,
  })
  if (data.status) return data.data
}

const NumbersSection = async () => {
  const data = await getData()
  if (!data || data.length === 0) return null

  const sectionWithNumber = data.find(
    (item) => item.component === SiteContentComponent.SECTION_WITH_A_NUMBER,
  )
  const sectionWithNumberItems = data.filter(
    (item) => item.component === SiteContentComponent.SECTION_NUMBER_ITEM,
  )

  return (
    <section
      id={SiteContentComponent.SECTION_WITH_A_NUMBER.toLowerCase()}
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <div
        className={classcat([
          'max-content grid gap-10 bg-yel-1000 py-14',
          'xl:grid-cols-[452fr_700fr] xl:items-start xl:gap-32 xl:py-16',
        ])}
      >
        <Show when={sectionWithNumber?.title?.trim()}>
          <h2
            className={classcat([
              'mx-auto line-clamp-2 max-w-[theme(spacing.200)] text-center text-28 text-white',
              'xl:max-w-full xl:text-start xl:text-48',
            ])}
          >
            {sectionWithNumber?.title?.trim()}
          </h2>
        </Show>

        <div className="grid gap-10 xl:grid-cols-3 xl:items-start">
          {sectionWithNumberItems.map(({ componentId, title, subtitle, description }) => (
            <div
              key={componentId}
              className="mx-auto grid max-w-[15.4375rem] justify-items-center gap-2 xl:gap-6"
            >
              <p className="grid max-w-full grid-flow-col items-end gap-1 truncate text-white">
                <span className="text-48 xl:text-64">{title}</span>
                {subtitle ? <span className="truncate text-28 xl:text-32">{subtitle}</span> : null}
              </p>
              <p className="line-clamp-3 text-center text-14lig text-blu-50 xl:line-clamp-4 xl:text-16lig">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NumbersSection
