'use client'

//THIRD PARTY MODULES
import classcat from 'classcat'
import Link from 'next-intl/link'
import { SiteContentComponent } from '@prisma/client'
//RELATIVE MODULES
import { useActiveIndex } from './list-section-common'

const buttonClasses = [
  'w-7 font-georgia text-16ita italic text-white border-e transition',
  'hover:border-yel-500 data-[active=false]:border-transparent data-[active=true]:border-yel-500 data-[active=false]:hover:border-yel-500',
]

const LIST = [
  {
    component: SiteContentComponent.SECTION_WITH_A_LIST_ITEM,
    title: 'Est integer tempor',
    description:
      'At aliquam neque nec vestibulum diam. Laoreet hendrerit pretium pulvinar donec. Pretium vitae leo et erat quis velit urna a. Nunc velit at malesuada tortor duis leo massa morbi. Mauris urna urna ut arcu nunc volutpat. Platea sed arcu non egestas. Insed at venenatis nec lectus mauris rhoncus.\nSed tincidunt purus suspendisse risus ipsum nibh nascetur fusce hendrerit. Tellus bibendum odio ut suspendisse a urna congue.',
  },
  {
    component: SiteContentComponent.SECTION_WITH_A_LIST_ITEM,
    title: 'Est integer tempor',
    description:
      'At aliquam neque nec vestibulum diam. Laoreet hendrerit pretium pulvinar donec. Pretium vitae leo et erat quis velit urna a. Nunc velit at malesuada tortor duis leo massa morbi. Mauris urna urna ut arcu nunc volutpat. Platea sed arcu non egestas. Insed at venenatis nec lectus mauris rhoncus.\nSed tincidunt purus suspendisse risus ipsum nibh nascetur fusce hendrerit. Tellus bibendum odio ut suspendisse a urna congue.',
  },
  {
    component: SiteContentComponent.SECTION_WITH_A_LIST_ITEM,
    title: 'Vehicula vel urna',
    description:
      'Quisque egestas adipiscing turpis amet lorem. Elementum aliquet nulla et consectetur eget ultricies dignissim imperdiet aliquam. Vestibulum sed sed est quam convallis et quam aliquet tellus.\nAuctor ut natoque sit adipiscing est hendrerit odio pharetra. Blandit pretium gravida metus interdum consequat. Eget est tristique cras augue non blandit id enim sollicitudin. Ipsum lectus id posuere tempor.',
  },
]

const ListSectionParagraphFallback = () => {
  const [currentIndex, setCurrentIndex] = useActiveIndex(LIST)

  return (
    <div
      className={classcat([
        'grid grid-cols-[1fr_auto] items-start gap-6 pe-4 ps-[--max-padding]',
        'lg:gap-10 lg:pe-0 lg:ps-0',
      ])}
    >
      <div className="grid gap-10">
        <h2 className="truncate text-28 text-white lg:text-48">Section with a list</h2>
        {LIST.slice(1).map(({ component, title, description }) => (
          <div
            key={component}
            id={component.toLowerCase()}
            className="pointer-events-none mt-[calc(var(--h-header)*-1)] grid gap-4 pt-[--h-header] lg:gap-2"
          >
            <h3 className="text-24 text-white lg:text-28">{title}</h3>
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
          </div>
        ))}
      </div>
      <div className="sticky top-[--h-header] grid gap-10 pt-19 lg:pt-25">
        {LIST.slice(1).map(({ component }, index) => (
          <Link
            key={component}
            href={`#${component.toLowerCase()}`}
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

export default ListSectionParagraphFallback
