'use client';

//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//RELATIVE MODULES
import { useFoodContext } from '../ui/ExploringFoodLayout';

const FoodBanner = () => {
  const { categoryActive, siteContent } = useFoodContext();
  const { categories } = useGlobalContext();

  if (!categories) return null;
  return (
    <section className="relative h-37 full-fledge sm:h-80">
      <Image
        src={
          `${process.env.NEXT_PUBLIC_CDN_HOST}${siteContent?.mediaUrl}` ||
          '/img/slide/background-desktop.webp'
        }
        className="object-cover"
        alt=""
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, 640px"
      />
      <div className="absolute inset-0 bg-yel-1000/30"></div>
      <div className="isolate z-10 mt-14 flex flex-col items-center space-y-10 sm:mt-20">
        <h3 className="text-28 text-white sm:text-64">Explore food</h3>

        <div className="space-i-6 hidden sm:flex">
          {categories.metaCategory.map((meta) => (
            <Button
              key={meta.id}
              variant="outlined"
              shape="pill"
              as="link"
              href={`/exploring-food?categoryId=${meta.id}`}
              className={classcat([
                'btn-medium ow:w-30 ',
                meta.metaCategory === categoryActive.metaCategory
                  ? 'text-yel-500 ow:bg-white'
                  : 'ow:bg-[#fff]/35 ow:text-white',
              ])}
            >
              {meta.metaCategory}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodBanner;
