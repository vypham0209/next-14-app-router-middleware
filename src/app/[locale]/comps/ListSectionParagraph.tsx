'use client'

//THIRD PARTY MODULES
import classcat from 'classcat'
import Link from 'next-intl/link'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'
//RELATIVE MODULES
import { useActiveIndex } from './list-section-common'

const buttonClasses = [
  'w-7 font-georgia text-16ita italic text-white border-e transition',
  'hover:border-yel-500 data-[active=false]:border-transparent data-[active=true]:border-yel-500 data-[active=false]:hover:border-yel-500',
]

type Props = {
  list: Extract<RouterOutputs['siteContent']['getSiteContentByComponent'], { status: true }>['data']
}

const ListSectionParagraph = ({ list }: Props) => {
  const [currentIndex, setCurrentIndex] = useActiveIndex(list)

  return (
    <div
      className={classcat([
        'grid grid-cols-[1fr_auto] items-start gap-6 pe-4 ps-[--max-padding]',
        'lg:gap-10 lg:pe-0 lg:ps-0',
      ])}
    >
      <div className="grid gap-10">
        <Show when={list[0].title?.trim()}>
          <h2 className="truncate text-28 text-white lg:text-48">{list[0].title?.trim()}</h2>
        </Show>
        {list.map(({ component, title, description, componentId }) => (
          <div
            key={componentId}
            id={`${component.toLowerCase()}_${componentId}`}
            className="pointer-events-none mt-[calc(var(--h-header)*-1)] grid gap-4 pt-[--h-header] lg:gap-2"
          >
            <h3 className="text-24 text-white lg:text-28">{title}</h3>
            {description ? (
              <div
                className="grid gap-2.5 lg:gap-3 [&>p]:text-14lig [&>p]:text-blu-50 [&>p]:lg:text-16lig"
                dangerouslySetInnerHTML={{
                  __html: description
                    .trim()
                    .split('\n')
                    .map((str) => `<p>${str}</p>`)
                    .join(''),
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
      <div className="sticky top-[--h-header] grid gap-10 pt-19 lg:pt-25">
        {list.map(({ component, componentId }, index) => (
          <Link
            key={component}
            href={`#${component.toLowerCase()}_${componentId}`}
            data-active={currentIndex === index}
            className={classcat([buttonClasses])}
            onClick={() => setCurrentIndex(index)}
          >
            {(index + 1).toString().padStart(2, '0')}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ListSectionParagraph
