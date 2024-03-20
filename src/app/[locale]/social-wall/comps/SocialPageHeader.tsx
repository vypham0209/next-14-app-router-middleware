//THIRD PARTY MODULES
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import SocialIconList from '_@landing/components/card/SocialIconList';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.SOCIAL_WALL_HEADER],
  });
  if (data.status) return data.data;
};

const SocialPageHeader = async () => {
  const data = await getData();
  if (!data || data.length === 0) return null;

  return (
    <div className="grid gap-10 lg:gap-14">
      <div className="grid gap-6 lg:grid-cols-[455fr_685fr] lg:items-start lg:gap-35">
        <h1 className="word-break text-36 text-blu-400 lg:text-48">
          {data[0].title?.trim() || 'Social wall'}
        </h1>
        <div className="grid gap-4 lg:justify-items-end">
          <p
            className="word-break text-16lig text-blu-400 lg:text-end lg:text-20lig lg:text-blu-300"
            dangerouslySetInnerHTML={{
              __html: data[0].subtitle?.trim()
                ? data[0].subtitle.trim().replace(/\n/g, '<br />')
                : `Here are some of our latest posts! Catch up with us on`,
            }}
          />
          <SocialIconList />
        </div>
      </div>

      <div className="h-px bg-blu-200" />

      <h2 className="text-24 text-blu-400 lg:text-28">Browse all social media posts</h2>
    </div>
  );
};

export default SocialPageHeader;
