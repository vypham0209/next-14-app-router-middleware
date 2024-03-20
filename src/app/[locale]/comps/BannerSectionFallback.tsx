//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '_@landing/components/client';

const BannerSectionFallback = () => {
  return (
    <section
      className={classcat([
        'max-content relative mt-[calc(var(--h-header)*-1)] full-fledge',
        'bg-cover bg-center bg-no-repeat',
        'h-169.25 bg-image-banner-for-mobile',
        'md:h-225 md:bg-image-banner-for-desktop',
        '2xl:h-[64rem] 2xl:bg-image-banner-for-big-desktop',
      ])}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="max-content absolute inset-x-0 bottom-8 md:bottom-auto md:top-40">
        <div className="mx-auto grid w-85.75 justify-items-center gap-4 md:mx-[unset] md:w-148.75 md:justify-items-start md:gap-7">
          <h2 className="max-w-[theme(spacing[67.5])] text-center text-36 text-white md:max-w-none md:text-start md:text-72">
            Explore African Epicurean Culinary Arts
          </h2>
          <ScrollAreaRoot className="max-h-[theme(spacing[16.5])] overflow-hidden md:max-h-[theme(spacing[27])]">
            <ScrollAreaViewport className="h-full">
              <p className="text-center text-14lig text-blu-50 md:text-start md:text-24lig">
                Our primary goals and values are enhancing African gastronomic and culinary arts and
                inclusively promoting the ethnic and cultural diversity of references.
              </p>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar
              orientation="vertical"
              className="touch-none select-none rounded-[0.0625rem] bg-yel-200 data-[orientation=vertical]:w-1.5"
            >
              <ScrollAreaThumb className="rounded-[0.0625rem] bg-yel-400" />
            </ScrollAreaScrollbar>
          </ScrollAreaRoot>

          <Button
            as="link"
            href="/exploring-food"
            className="btn-big md:btn-very-big md:mt-5 md:w-59.25"
          >
            EXPLORE OUR FOOD
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BannerSectionFallback;
