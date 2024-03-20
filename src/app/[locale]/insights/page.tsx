//THIRD PARTY MODULES
import { MetaCategory } from '@prisma/client';
import { ErrorBoundary } from 'react-error-boundary';
//LAYOUT, COMPONENTS
import WrapBreadcrumb from '_@landing/components/breadcrumb/WrapBreadcrumb';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
//RELATIVE MODULES
import PostPageList from './comps/PostPageList';
import PostPageHeader from './comps/PostPageHeader';
import PostPageFilter from './comps/PostPageFilter';
import PostPageLoadMoreButton from './comps/PostPageLoadMoreButton';
import PostPageHeaderFallback from './comps/PostPageHeaderFallback';

type Props = {
  searchParams: string | string[][] | Record<string, string> | URLSearchParams | undefined;
};

async function getData({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
  const keyword = params.get('keyword');
  const size = parseInt(params.get('size') || '8');
  const category = params.get('category') as MetaCategory | null;
  return apiServer.insightPost.getEnableInsightPosts.query({
    size,
    ...(keyword && { keyword }),
    ...(category && { category: [category] }),
  });
}

export default async function Page({ searchParams }: Props) {
  const { data, meta } = await getData({ searchParams });

  return (
    <>
      <WrapBreadcrumb />
      <div className="max-content grid gap-10 lg:gap-14">
        <ErrorBoundary fallback={<PostPageHeaderFallback />}>
          <PostPageHeader />
        </ErrorBoundary>
        <PostPageFilter />
        <PostPageList list={data} />
        <PostPageLoadMoreButton pagination={meta} />
      </div>
    </>
  );
}
