//THIRD PARTY MODULES
import classcat from 'classcat'
import { cookies } from 'next/headers'
import { SiteContentComponent } from '@prisma/client'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
//SHARED
import QuoteIcon from '_@shared/icons/QuoteIcon'
import { apiServer } from '_@shared/utils/apiServer'

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en'
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.FOUNDER_QUOTE],
  })
  if (data.status) return data.data
}

const FounderQuoteSection = async () => {
  const data = await getData()
  if (!data || data.length === 0) return null

  return (
    <section
      id={SiteContentComponent.FOUNDER_QUOTE.toLowerCase()}
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <div className="grid gap-10 md:gap-20">
        <div
          className="h-59.5 bg-founder bg-cover bg-center md:h-85.75 md:bg-founder-desktop"
          {...(data[0].mediaUrl
            ? {
                style: {
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN_HOST + data[0].mediaUrl})`,
                },
              }
            : {})}
        />

        <Show when={data[0].subtitle?.trim() && data[0].founderName?.trim()}>
          <div className="max-content relative mx-auto grid max-w-[theme(spacing.200)] gap-6 s-992:px-0">
            <QuoteIcon
              className={classcat([
                'absolute left-[--max-padding] top-0',
                'md:-left-26 md:h-20 md:w-20',
              ])}
            />

            {data[0].subtitle?.trim() ? (
              <div
                className={classcat([
                  'mt-16 grid gap-2.5',
                  '[&>p]:font-georgia [&>p]:text-16ita [&>p]:italic [&>p]:text-blu-500',
                  'md:[&>p]:text-24ita md:mt-0 md:gap-4',
                ])}
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    const charList = data[0].subtitle
                      .trim()
                      .split('\n')
                      .map((str) => `<p>${str}</p>`)
                      .join('')
                      .split('')
                    charList.splice(3, 0, '"')
                    charList.splice(-4, 0, '"')
                    return charList.join('')
                  })(),
                }}
              />
            ) : null}

            <Show when={data[0].founderName?.trim()}>
              <div className="grid auto-cols-max grid-flow-col items-center justify-end gap-2">
                <span className="h-0.5 w-4 bg-yel-500" />
                <span className="text-14 text-yel-500 md:text-16">
                  {data[0].founderName?.trim()}
                </span>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </section>
  )
}

export default FounderQuoteSection
