//THIRD PARTY MODULES
import { cookies } from 'next/headers';
import { GetRethinkPostInput } from '_@rpc/routers/insight-post/insight-post.validators';
//LAYOUT, COMPONENTS
import PostCard from '_@landing/components/card/PostCard';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';

const getData = () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  return apiServer.insightPost.getRethinkPosts.query({
    language: locale.toUpperCase() as GetRethinkPostInput['language'],
  });
};

const RethinkSection = async () => {
  const { rethinkTitle, rethinkPosts } = await getData();
  const list = rethinkPosts?.filter(Boolean) || [];

  return (
    <section id="rethink" className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge">
      <div className="max-content grid gap-10 bg-yel-25 py-20 md:gap-15 md:py-36">
        <h2 className="max-w-[theme(spacing.160)] justify-self-center text-center text-36 text-blu-400 md:text-48">
          {rethinkTitle || `Culinary arts of West Africa's magnificent seven`}
        </h2>
        <div className="grid gap-6 md:grid-cols-6">
          {list.map(({ insightPost }, index) => {
            if (!insightPost) return null;
            return (
              <PostCard
                key={insightPost.id}
                post={insightPost}
                rethinkPostClasses={
                  index < 2 || index > 4 ? 'line-clamp-10 md:line-clamp-15' : 'line-clamp-10'
                }
                rethinkPost
                className={index < 2 || index > 4 ? 'md:col-span-3' : 'md:col-span-2'}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RethinkSection;
