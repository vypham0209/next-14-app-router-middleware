//THIRD PARTY MODULES
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.EXPLORE_FOOD_CTA],
  });
  if (data.status) return data.data;
};

const ExploreFoodSection = async () => {
  const data = await getData();
  if (!data || data.length === 0) return null;

  return (
    <section id="explore-food" className="full-fledge">
      <div className="max-content grid justify-center justify-items-center gap-10 bg-yel-1000 py-14 md:py-16">
        <Show when={data[0].title?.trim() && data[0].subtitle?.trim()}>
          <div className="grid max-w-[theme(spacing.200)] gap-4 md:gap-6">
            <Show when={data[0].title?.trim()}>
              <h2 className="text-center text-36 text-white md:text-48">{data[0].title?.trim()}</h2>
            </Show>
            <Show when={data[0].subtitle?.trim()}>
              <p className="text-center text-14ita text-white md:text-20lig">
                {data[0].subtitle?.trim()}
              </p>
            </Show>
          </div>
        </Show>

        <Button as="link" color="secondary" href="/exploring-food" className="btn-big sm:w-87">
          EXPLORE OUR FOOD
        </Button>
      </div>
    </section>
  );
};

export default ExploreFoodSection;
