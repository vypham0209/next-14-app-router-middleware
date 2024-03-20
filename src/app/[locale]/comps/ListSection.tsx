//THIRD PARTY MODULES
import Image from 'next/image'
import classcat from 'classcat'
import { cookies } from 'next/headers'
import { SiteContentComponent } from '@prisma/client'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//SHARED
import { apiServer } from '_@shared/utils/apiServer'
//RELATIVE MODULES
import ListSectionParagraph from './ListSectionParagraph'

const components = [
  SiteContentComponent.SECTION_WITH_A_LIST,
  SiteContentComponent.SECTION_WITH_A_LIST_ITEM,
]
const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en'
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components,
  })

  if (data.status) return data.data
}

const ListSection = async () => {
  const data = await getData()

  if (!data || data.length === 0) return null

  const sectionWithAList = data.find(
    (item) => item.component === SiteContentComponent.SECTION_WITH_A_LIST,
  )
  const sectionWithAListItems = data.filter(
    (item) => item.component === SiteContentComponent.SECTION_WITH_A_LIST_ITEM,
  )

  return (
    <section
      id={SiteContentComponent.SECTION_WITH_A_LIST.toLowerCase()}
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <div
        className={classcat([
          'bg-yel-1000',
          'grid gap-16 py-20',
          'lg:grid-cols-2 lg:items-start lg:gap-32 lg:py-36 lg:pe-14',
          'xl:grid-cols-[1fr_41.375rem]',
          '2xl:pe-40',
        ])}
      >
        <div className="pe-[--max-padding] s-576:mx-auto s-576:w-125 s-576:pe-0 lg:sticky lg:top-[calc(var(--h-header)_+_6.25rem)] lg:w-full">
          <div
            className={classcat([
              'relative aspect-[6/5] shadow-image rtl:shadow-image-rtl',
              's-448:shadow-image-desktop s-448:rtl:shadow-image-desktop-rtl',
            ])}
          >
            <Image
              fill
              unoptimized
              quality={100}
              className="object-cover"
              alt={sectionWithAList?.title?.trim() || ''}
              src={
                sectionWithAList?.mediaUrl
                  ? process.env.NEXT_PUBLIC_CDN_HOST + sectionWithAList.mediaUrl
                  : '/img/with-a-list/image.webp'
              }
            />
          </div>
        </div>
        <ListSectionParagraph list={sectionWithAListItems} />
      </div>
    </section>
  )
}

export default ListSection
