//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import Link from 'next-intl/link';
import { renderDate } from '_@landing/utils/dateFormat';
import { InsightPost, MetaCategory } from '@prisma/client';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import BrowserOnly from '_@shared/components/BrowserOnly';

const trueOrderCategory = [
  MetaCategory.Ordinary,
  MetaCategory.Healthy,
  MetaCategory.Vegetarian,
  MetaCategory.Vegan,
];

type Props = {
  post: InsightPost;
  rethinkPost?: boolean;
  rethinkPostClasses?: string | string[];
  insightPostClasses?: string | string[];
  className?: string;
};

function convertStringToArray(content?: string) {
  if (!content) return [];
  return content.split('\n').filter((item) => item !== '');
}

const PostCard = ({
  post,
  rethinkPost = false,
  className = '',
  rethinkPostClasses,
  insightPostClasses,
}: Props) => {
  return (
    <Link
      key={post.id}
      href={`/insights/${post.slug}`}
      className={classcat([
        post.mediaUrl && 'grid content-between',
        'bg-yel-50 transition hover:-translate-y-1 hover:shadow-lg',
        rethinkPost
          ? 'min-h-[theme(spacing.58)] md:min-h-[theme(spacing[71.75])]'
          : 'min-h-[theme(spacing.69)] md:min-h-[theme(spacing[84.75])]',
        className,
      ])}
    >
      <Show when={post.mediaUrl}>
        <div className="relative aspect-video">
          <Image
            fill
            alt={post.title}
            className="object-cover"
            src={(process.env.NEXT_PUBLIC_CDN_HOST as string) + post.mediaUrl}
          />
        </div>
      </Show>

      <div
        className={classcat([
          'grid gap-1 px-4 py-3 md:gap-2 md:py-4',
          !post.mediaUrl && 'h-full',
          rethinkPost ? 'auto-rows-[auto_1fr]' : 'auto-rows-[auto_auto_1fr_auto]',
        ])}
      >
        <Show when={post.category.length > 0 && !rethinkPost}>
          <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-12 text-yel-500">
            {post.category
              .sort((a, b) => trueOrderCategory.indexOf(a) - trueOrderCategory.indexOf(b))
              .map((category) => (
                <p key={category}>{category}</p>
              ))}
          </div>
        </Show>

        <p className="truncate text-blu-400">{post.title}</p>

        <Show when={!post.mediaUrl}>
          <div className="overflow-hidden">
            <div
              className={classcat([
                ' space-y-2 text-blu-400',
                !rethinkPost ? classcat(['line-clamp-10', insightPostClasses]) : rethinkPostClasses,
              ])}
            >
              {convertStringToArray(post.synopsis).map((value, idx) => (
                <p key={idx} className="mt-0 inline text-12lig text-blu-400 md:text-14lig">
                  {value}
                </p>
              ))}
            </div>
          </div>
        </Show>

        <Show when={!rethinkPost}>
          <div className="grid auto-cols-max grid-flow-col items-center gap-2 text-blu-200">
            {/* NOTE: To avoid the timezone of server  */}
            <BrowserOnly>
              <p className="text-12lig">{renderDate(post.createdAt, 'DD/MM/YYYY')}</p>
            </BrowserOnly>
            <p className="aspect-square w-1 rounded-full bg-blu-200" />
            <p className="text-12lig">
              {post.readingTime === 1 ? '1 min read' : `${post.readingTime ?? 0} mins read`}
            </p>
          </div>
        </Show>
      </div>
    </Link>
  );
};

export default PostCard;
