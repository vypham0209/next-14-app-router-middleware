//THIRD PARTY MODULES
import classcat from 'classcat';
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { firstUpperAllLower } from '_@landing/utils/wordFormat';
import { metaCategoriesId } from '_@landing/constants/metaCategory';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
import { exploringAnchor } from '_@landing/layout/header/constants';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '_@landing/components/client';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';

const components = [
  SiteContentComponent.CATEGORIES,
  SiteContentComponent.ORDINARY,
  SiteContentComponent.HEALTHY,
  SiteContentComponent.VEGETARIAN,
  SiteContentComponent.VEGAN,
];
const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components,
  });
  if (data.status) return data.data;
};

const InspiringSection = async () => {
  const data = await getData();
  if (!data || data.length === 0) return null;
  const list = components
    .map((component) => data.find((item) => item.component === component))
    .filter(Boolean);

  return (
    <section
      id={exploringAnchor}
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <Show when={list[0].title?.trim()}>
        <h2
          className={classcat([
            'mx-auto max-w-[theme(spacing.200)] px-[--max-padding] pb-10 pt-16 text-center text-28 text-blu-400',
            's-992:px-0 s-992:pb-20 s-992:pt-32 s-992:text-48',
          ])}
        >
          {list[0].title?.trim()}
        </h2>
      </Show>

      <div className="grid s-576:grid-cols-2 s-992:grid-cols-4">
        {list.slice(1).map((category) => {
          const name = firstUpperAllLower(category.component);
          // @ts-ignore
          const id = metaCategoriesId[name];
          return (
            <div
              key={id}
              className={classcat([
                'group relative aspect-[375/225] md:aspect-[360/600]',
                'bg-cover bg-center bg-no-repeat',
              ])}
              {...(category.mediaUrl
                ? {
                    style: {
                      backgroundImage: `url(${
                        (process.env.NEXT_PUBLIC_CDN_HOST as string) + category.mediaUrl
                      })`,
                    },
                  }
                : {})}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 group-hover:duration-[2s]" />

              <h3
                className={classcat([
                  'absolute inset-x-0 bottom-5 text-center text-24 text-white',
                  'md:bottom-11 md:text-28',
                  'group-hover:bottom-1/2 group-hover:opacity-0 group-hover:duration-[2s]',
                ])}
              >
                {name}
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
                  variant="ghost"
                  color="secondary"
                  href={`/exploring-food?categoryId=${id}`}
                  className="mx-auto font-normal ow:hover:shadow-[inset_0_-2px] [&>span]:text-24 md:[&>span]:text-28"
                >
                  {name}
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
          );
        })}
      </div>
    </section>
  );
};

export default InspiringSection;
