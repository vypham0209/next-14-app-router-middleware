//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
//RELATIVE MODULES
import ListSectionParagraphFallback from './ListSectionParagraphFallback';

const ListSectionFallback = () => {
  return (
    <section id="with-a-list" className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge">
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
              alt=""
              unoptimized
              quality={100}
              className="object-cover"
              src="/img/with-a-list/image.webp"
            />
          </div>
        </div>
        <ListSectionParagraphFallback />
      </div>
    </section>
  );
};

export default ListSectionFallback;
