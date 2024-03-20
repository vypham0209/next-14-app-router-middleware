//THIRD PARTY MODULES
import { SocialPlatform } from '@prisma/client';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
//RELATIVE MODULES
import SocialPageList from './comps/SocialPageList';
import SocialPageFilter from './comps/SocialPageFilter';
import SocialPageLoadMoreButton from './comps/SocialPageLoadMoreButton';

type Props = {
  searchParams: string | string[][] | Record<string, string> | URLSearchParams | undefined;
};

async function getData({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
  const keyword = params.get('keyword');
  const size = parseInt(params.get('size') || '8');
  const platform = params.get('platform') as SocialPlatform | null;
  return apiServer.socialWall.getSocialWalls.query({
    size,
    disabled: false,
    orderBy: 'desc',
    sortBy: 'publishedTime',
    ...(keyword && { keyword }),
    ...(platform && { platform: [platform] }),
  });
}

export default async function Page({ searchParams }: Props) {
  const { data, meta } = await getData({ searchParams });

  return (
    <>
      <SocialPageFilter />
      <SocialPageList list={data} />
      <SocialPageLoadMoreButton pagination={meta} />
    </>
  );
}
