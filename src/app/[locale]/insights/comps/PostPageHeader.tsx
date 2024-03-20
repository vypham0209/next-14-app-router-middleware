//THIRD PARTY MODULES
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.INSIGHT_HEADER],
  });
  if (data.status) return data.data;
};

const PostPageHeader = async () => {
  const data = await getData();
  if (!data || data.length === 0) return null;

  return (
    <div className="grid gap-10 lg:gap-14">
      <div className="grid gap-6 lg:grid-cols-[540fr_700fr] lg:items-start lg:gap-10">
        <h1 className="word-break text-36 text-blu-400 lg:text-48">
          {data[0].title?.trim() || 'Keep your curiosity alive.'}
        </h1>
        <div
          className="word-break grid gap-3 text-blu-300 lg:gap-4 [&>p]:text-16lig [&>p]:lg:text-20lig"
          dangerouslySetInnerHTML={{
            __html: data[0].subtitle?.trim()
              ? data[0].subtitle
                  ?.trim()
                  .split('\n')
                  .map((str) => `<p>${str}</p>`)
                  .join('')
              : `<p>Learn about African gastronomy and culinary arts through stories, opinions, and expertise.</p><p>Explore what matters most to you.</p>`,
          }}
        />
      </div>

      <div className="h-px bg-blu-200" />

      <h2 className="text-24 text-blu-400 lg:text-28">Browse all featured insights</h2>
    </div>
  );
};

export default PostPageHeader;
