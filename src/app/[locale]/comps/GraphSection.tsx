//THIRD PARTY MODULES
import Image from 'next/image';
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.SECTION_WITH_A_GRAPH],
  });
  if (data.status) return data.data;
};

const GraphSection = async () => {
  const data = await getData();
  if (!data || data.length === 0) return null;

  return (
    <section
      id={SiteContentComponent.SECTION_WITH_A_GRAPH.toLowerCase()}
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <div className="max-content grid gap-16 bg-yel-25 py-20 md:py-36">
        <div className="mx-auto grid max-w-[theme(spacing.200)] gap-6">
          <Show when={data[0].title?.trim()}>
            <h2 className="text-center text-28 text-blu-400 md:text-48">{data[0].title?.trim()}</h2>
          </Show>
          <Show when={data[0].subtitle?.trim()}>
            <h3 className="text-center text-14lig text-blu-300 md:text-16lig">
              {data[0].subtitle?.trim()}
            </h3>
          </Show>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:items-start md:gap-14">
          <div className="relative aspect-[6/5] s-576:mx-auto s-576:w-125 md:w-full">
            <Image
              fill
              unoptimized
              quality={100}
              className="object-cover"
              alt={data[0].title?.trim() || ''}
              src={
                data[0].mediaUrl
                  ? process.env.NEXT_PUBLIC_CDN_HOST + data[0].mediaUrl
                  : '/img/with-a-graph/image.webp'
              }
            />
          </div>

          {data[0].description?.trim() ? (
            <div
              className="grid gap-2.5 md:gap-3 [&>p]:text-14lig [&>p]:text-blu-300 [&>p]:md:text-16lig"
              dangerouslySetInnerHTML={{
                __html: data[0].description
                  .trim()
                  .split('\n')
                  .map((str) => `<p>${str}</p>`)
                  .join(''),
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};
export default GraphSection;
