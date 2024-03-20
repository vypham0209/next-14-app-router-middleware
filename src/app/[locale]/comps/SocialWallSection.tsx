//THIRD PARTY MODULES
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import SocialCard from '_@landing/components/card/SocialCard';
import { socialWallAnchor } from '_@landing/layout/header/constants';
import SocialIconList from '_@landing/components/card/SocialIconList';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
import promiseAllSettled from '_@shared/utils/promiseAllSettled';

export const revalidate = 60;

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const [data1, data2] = await promiseAllSettled([
    apiServer.siteContent.getSiteContentByComponent.query({
      language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
      components: [SiteContentComponent.SOCIAL_WALL],
    }),
    apiServer.socialWall.getSocialWalls.query({
      size: 6,
      orderBy: 'desc',
      sortBy: 'publishedTime',
      disabled: false,
    }),
  ]);
  return {
    head: data1?.status && data1.data,
    list: data2?.data,
  };
};

const SocialWallSection = async () => {
  const { head, list } = await getData();
  if (!head || head.length === 0) return null;
  if (!list || list.length === 0) return null;

  return (
    <section id={socialWallAnchor} className="mt-[calc(var(--h-header)*-1)] pt-[--h-header]">
      <div className="grid gap-10 pb-20 md:gap-16 md:pb-36 ">
        <div className="grid gap-4 md:grid-cols-[455fr_685fr] md:items-start md:gap-35">
          <h2 className="word-break text-center text-36 text-blu-400 md:text-start md:text-48">
            {head[0].title?.trim() || 'Social wall'}
          </h2>

          <div className="grid justify-center justify-items-center gap-4 md:justify-end md:justify-items-end">
            <p
              className="word-break text-center text-16lig text-blu-400 md:text-end md:text-20lig md:text-blu-300"
              dangerouslySetInnerHTML={{
                __html: head[0].subtitle?.trim()
                  ? head[0].subtitle
                      ?.trim()
                      .replace(
                        /\n/g,
                        '<br class="block md:hidden" /><span class="hidden md:inline">&nbsp;</span>',
                      )
                  : `Here are some of our latest posts!<br class='block md:hidden' /><span class='hidden md:inline'>&nbsp;</span>Catch up with us on`,
              }}
            />
            <SocialIconList />
          </div>
        </div>

        <div className="h-px bg-blu-200" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((post) => (
            <SocialCard key={post.id} post={post} />
          ))}
        </div>

        <Button
          as="link"
          href="/social-wall"
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

export default SocialWallSection;
