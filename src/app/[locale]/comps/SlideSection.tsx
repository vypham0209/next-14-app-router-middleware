//THIRD PARTY MODULES
import { cookies } from 'next/headers'
import { SiteContentComponent } from '@prisma/client'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import { rethinkAnchor } from '_@landing/layout/header/constants'
//SHARED
import { apiServer } from '_@shared/utils/apiServer'
//RELATIVE MODULES
import SlideComponent from './SlideComponent'

const components = [SiteContentComponent.SLIDE]
const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en'
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components,
  })
  if (data.status) return data.data
}

const SlideSection = async () => {
  const data = await getData()
  if (!data || data.length === 0) return null

  return (
    <section
      id={rethinkAnchor}
      className="relative mt-[calc(var(--h-header)*-1)] h-162 pt-[--h-header] full-fledge s-992:h-151.25"
    >
      <SlideComponent list={data} />
    </section>
  )
}

export default SlideSection
