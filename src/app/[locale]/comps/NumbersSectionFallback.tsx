//THIRD PARTY MODULES
import classcat from 'classcat'
import { SiteContentComponent } from '@prisma/client'

const LIST = [
  {
    component: SiteContentComponent.SECTION_NUMBER_ITEM,
    componentId: 0,
    title: '100',
    subtitle: null,
    description:
      'Lorem ipsum dolor sit amet consectetur. Amet vivamus netus risus luctus imperdiet at pellentesque libero.',
  },
  {
    component: SiteContentComponent.SECTION_NUMBER_ITEM,
    componentId: 1,
    title: '50',
    subtitle: '%',
    description:
      'Lorem ipsum dolor sit amet consectetur. Amet vivamus netus risus luctus imperdiet at pellentesque libero.',
  },
  {
    component: SiteContentComponent.SECTION_NUMBER_ITEM,
    componentId: 2,
    title: '1455',
    subtitle: null,
    description:
      'Lorem ipsum dolor sit amet consectetur. Amet vivamus netus risus luctus imperdiet at pellentesque libero.',
  },
]

const NumbersSectionFallback = () => {
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
        <h2
          className={classcat([
            'mx-auto line-clamp-2 max-w-[theme(spacing.200)] text-center text-28 text-white',
            'xl:max-w-full xl:text-start xl:text-48',
          ])}
        >
          Section with numbers
        </h2>

        <div className="grid gap-10 xl:grid-cols-3 xl:items-start">
          {LIST.map(({ component, title, subtitle, description }) => (
            <div
              key={component}
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

export default NumbersSectionFallback
