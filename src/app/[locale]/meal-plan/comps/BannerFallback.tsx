//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
//SHARED
//LAYOUT, COMPONENTS
//SHARED

const BannerFallback = () => {
  return (
    <div
      className={classcat([
        'flex flex-col bg-yel-700',
        'md:flex-row md:items-center md:gap-x-10 md:pl-20 md:[&>*]:flex-1',
      ])}
    >
      <div className={classcat(['flex flex-col gap-y-4 p-6 text-white', 'md:gap-y-10 md:p-0'])}>
        <h2 className="text-36 font-medium lg:text-64">
          Hassle-free, calorie-strict meals right to your door
        </h2>

        <p className="font-medium lg:text-18">
          Aliquet sit purus dictum tincidunt placerat. Egestas quisque scelerisque ut vulputate ut
          massa. Semper dui id bibendum lobortis facilisis volutpat. Amet varius aenean turpis felis
          urna dolor pellentesque tellus urna.
        </p>
      </div>

      <div className="max-w-[660px]">
        <div className="relative w-full pb-[100%]">
          <Image
            src="/img/meal-plan/banner.png"
            alt="meal plan food"
            layout="fill"
            sizes="(max-width: 768px) 375px, 660px"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerFallback;
