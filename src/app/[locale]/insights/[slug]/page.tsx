//THIRD PARTY MODULES
import { processHtml } from '_@landing/utils/wordFormat';
//LAYOUT, COMPONENTS
import WrapBreadcrumb from '_@landing/components/breadcrumb/WrapBreadcrumb';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
//RELATIVE MODULES
import PostDetailHeader from './comps/PostDetailHeader';

type Props = {
  params: { slug: string };
};

async function getData({ params: { slug } }: Props) {
  return apiServer.insightPost.getInsightPostBySlug.query(decodeURIComponent(slug));
}

export default async function Page(props: Props) {
  const post = await getData(props);

  const breadcrumbList = [
    {
      url: '/',
      name: 'Homepage',
    },
    {
      url: '/insights',
      name: 'Insights',
    },
    {
      url: '',
      name: post.title.trim(),
    },
  ];

  return (
    <>
      <WrapBreadcrumb list={breadcrumbList} />
      <div className="grid gap-6 lg:gap-14">
        <PostDetailHeader post={post} />

        <div className="max-content">
          <div
            className="rich-text mx-auto max-w-[theme(spacing.220)]"
            dangerouslySetInnerHTML={{
              __html: processHtml(post.content.trim()),
            }}
          />
        </div>
      </div>
    </>
  );
}
