//THIRD PARTY MODULES
import classcat from 'classcat';
import { metaCategoriesId } from '_@landing/constants/metaCategory';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import { exploringAnchor } from '_@landing/layout/header/constants';
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from '_@landing/components/client';

const InspiringSectionFallback = () => {
  return (
    <section id={exploringAnchor} className="full-fledge">
      <h2
        className={classcat([
          'mx-auto max-w-[theme(spacing.200)] px-[--max-padding] pb-10 pt-16 text-center text-28 text-blu-400',
          's-992:px-0 s-992:pb-20 s-992:pt-32 s-992:text-48',
        ])}
      >
        Inspiring your African food journeys with refined, authentic, innovative, and stunning
        cuisine
      </h2>

      <div className="grid s-576:grid-cols-2 s-992:grid-cols-4">
        {META_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className={classcat([
              'group relative aspect-[375/225] md:aspect-[360/600]',
              'bg-cover bg-center bg-no-repeat',
              category.imageClasses,
            ])}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 group-hover:duration-[2s]" />

            <h3
              className={classcat([
                'absolute inset-x-0 bottom-5 text-center text-24 text-white',
                'md:bottom-11 md:text-28',
                'group-hover:bottom-1/2 group-hover:opacity-0 group-hover:duration-[2s]',
              ])}
            >
              {category.name}
            </h3>

            <div
              className={classcat([
                'absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2',
                'grid aspect-[300/160] w-4/5 grid-rows-[auto_1fr] gap-2 bg-[#000A1099] p-3',
                'md:aspect-[300/168] md:w-[83.33%]',
                'opacity-0 group-hover:opacity-100 group-hover:duration-[2s]',
              ])}
            >
              <Button
                as="link"
                href={'/exploring-food?categoryId=' + category.id}
                variant="ghost"
                color="secondary"
                className="mx-auto font-normal ow:hover:shadow-[inset_0_-2px] [&>span]:text-24 md:[&>span]:text-28"
              >
                {category.name}
              </Button>

              <ScrollAreaRoot className="overflow-hidden">
                <ScrollAreaViewport className="h-full">
                  <p className="text-center text-14lig text-white md:text-16lig">
                    {category.subtitle}
                  </p>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar
                  orientation="vertical"
                  className="touch-none select-none rounded-[0.0625rem] bg-yel-200 data-[orientation=vertical]:w-1.5"
                >
                  <ScrollAreaThumb className="rounded-[0.0625rem] bg-yel-400" />
                </ScrollAreaScrollbar>
              </ScrollAreaRoot>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InspiringSectionFallback;

const META_CATEGORIES = [
  {
    id: metaCategoriesId.Ordinary,
    imageClasses: 'bg-ordinary-mobile-image md:bg-ordinary-image',
    name: 'Ordinary',
    subtitle:
      'In West Africa, ordinary means exceptional. See the selection of our good-mood foods that make you feel great physically and mentally.',
  },
  {
    id: metaCategoriesId.Healthy,
    imageClasses: 'bg-healthy-mobile-image md:bg-healthy-image',
    name: 'Healthy',
    subtitle:
      "Start your journey into West African-inspired healthy and balanced diet to sustain your body's well-being and retain energy.",
  },
  {
    id: metaCategoriesId.Vegetarian,
    imageClasses: 'bg-vegetarian-mobile-image md:bg-vegetarian-image',
    name: 'Vegetarian',
    subtitle:
      'Explore the mouthwatering collection of our delicious veggie-powered and nutritious vegetarian foods enriched with authentic West African flavors.',
  },
  {
    id: metaCategoriesId.Vegan,
    imageClasses: 'bg-vegan-mobile-image md:bg-vegan-image',
    name: 'Vegan',
    subtitle:
      'Go on a culinary adventure and savor our West African tasty plant-based creations that are dairy-free and meat-free - just the way you like!',
  },
];
