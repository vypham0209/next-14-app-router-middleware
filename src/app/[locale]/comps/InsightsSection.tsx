//THIRD PARTY MODULES
import classcat from 'classcat';
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import PostCard from '_@landing/components/card/PostCard';
import { insightAnchor } from '_@landing/layout/header/constants';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
import promiseAllSettled from '_@shared/utils/promiseAllSettled';

export const revalidate = 60;

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const [data1, data2] = await promiseAllSettled([
    apiServer.siteContent.getSiteContentByComponent.query({
      language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
      components: [SiteContentComponent.INSIGHT],
    }),
    apiServer.insightPost.getFeaturedPosts.query(),
  ]);
  return {
    head: data1?.status && data1.data,
    list: data2?.featuredPosts,
  };
};

const InsightsSection = async () => {
  const { head, list } = await getData();
  if (!head || head.length === 0) return null;
  if (!list || list.length === 0) return null;

  return (
    <section id={insightAnchor} className="mt-[calc(var(--h-header)*-1)] pt-[--h-header]">
      <div className="grid gap-10 py-20 md:gap-16 md:py-36">
        <div className="grid gap-4 md:grid-cols-[540fr_700fr] md:items-start md:gap-10">
          <h2 className="word-break text-36 text-blu-400 md:text-48">
            {head[0].title?.trim() || 'Insights'}
          </h2>
          <div
            className="word-break text-blu-300 [&>p]:text-14lig [&>p]:md:text-20lig"
            dangerouslySetInnerHTML={{
              __html: !head[0].subtitle?.trim()
                ? '<p>Tincidunt in sagittis facilisis vitae commodo vel. Sed pretium aliquam neque elementum libero pharetra diam dui etiam.</p>'
                : head[0].subtitle
                    ?.trim()
                    .split('\n')
                    .map((str) => `<p>${str}</p>`)
                    .join(''),
            }}
          />
        </div>

        <div className="h-px bg-blu-200" />

        <div
          className={classcat([
            'grid gap-6',
            list.length < 3 || list.length > 4 ? 'md:grid-cols-6' : '',
            list.length === 3 ? 'md:grid-cols-3' : '',
            list.length === 4 ? 'md:grid-cols-2' : '',
          ])}
        >
          {list.map(({ insightPost: post }, index) => {
            if (!post) return null;
            return (
              <PostCard
                key={post.id}
                post={post}
                className={
                  list.length < 3 || list.length > 4
                    ? index < 2
                      ? 'md:col-span-3'
                      : 'md:col-span-2'
                    : 'md:col-span-1'
                }
                insightPostClasses={
                  index < 2 || index > 4 ? 'line-clamp-10 md:line-clamp-15' : 'line-clamp-10'
                }
              />
            );
          })}
        </div>

        <Button
          as="link"
          href="/insights"
          color="navy"
          variant="outlined"
          className="btn-big mx-auto sm:w-87"
        >
          VIEW ALL
        </Button>
      </div>
    </section>
  );
};

export default InsightsSection;
