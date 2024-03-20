//THIRD PARTY MODULES
import classcat from 'classcat'
import { SiteContentComponent } from '@prisma/client'

import QuoteIcon from '_@shared/icons/QuoteIcon'

const FounderQuoteSectionFallback = () => {
  return (
    <section
      id={SiteContentComponent.FOUNDER_QUOTE.toLowerCase()}
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <div className="grid gap-10 md:gap-20">
        <div className="h-59.5 bg-founder bg-cover bg-center md:h-85.75 md:bg-founder-desktop" />

        <div className="max-content mx-auto grid max-w-[theme(spacing.200)] gap-6 s-992:px-0">
          <QuoteIcon
            className={classcat([
              'absolute left-[--max-padding] top-0',
              'md:-left-26 md:h-20 md:w-20',
            ])}
          />

          <div
            className={classcat([
              'mt-16 grid gap-2.5',
              '[&>p]:font-georgia [&>p]:text-16ita [&>p]:italic [&>p]:text-blu-500',
              'md:[&>p]:text-24ita md:mt-0 md:gap-4',
            ])}
          >
            <p>
              “At aliquam neque nec vestibulum diam. Laoreet hendrerit pretium pulvinar donec.
              Pretium vitae leo et erat quis velit urna a. Nunc velit at malesuada tortor duis leo
              massa morbi. Mauris urna urna ut arcu nunc volutpat. Platea sed arcu non egestas. In
              sed at venenatis nec lectus mauris rhoncus.
            </p>
            <p>
              Sed tincidunt purus suspendisse risus ipsum nibh nascetur fusce hendrerit. Tellus
              bibendum odio ut suspendisse a urna congue.”
            </p>
          </div>

          <div className="grid auto-cols-max grid-flow-col items-center justify-end gap-2">
            <span className="h-0.5 w-4 bg-yel-500" />
            <span className="text-14 text-yel-500 md:text-16">Founder name</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FounderQuoteSectionFallback
