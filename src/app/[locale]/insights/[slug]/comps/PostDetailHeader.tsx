//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import { InsightPost } from '@prisma/client';
import { renderDate } from '_@landing/utils/dateFormat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
import BrowserOnly from '_@shared/components/BrowserOnly';
//SHARED
import BookOpenIcon from '_@shared/icons/BookOpenIcon';
import CalendarIcon from '_@shared/icons/CalendarIcon';

type Props = {
  post: InsightPost;
};

const PostDetailHeader = ({ post }: Props) => {
  return (
    <div className="lg:max-content">
      <div className="grid gap-8 bg-yel-50 p-6 sm:p-10 sm:pr-14 md:grid-cols-2 md:items-start lg:gap-10">
        <Show when={post.mediaUrl}>
          <div className="relative aspect-video drop-shadow-image sm:drop-shadow-image-desktop md:order-1">
            <Image
              fill
              unoptimized
              quality={100}
              alt={post.title}
              className="object-cover"
              src={(process.env.NEXT_PUBLIC_CDN_HOST as string) + post.mediaUrl}
            />
          </div>
        </Show>

        <Show when={!post.mediaUrl}>
          <p className="order-1 hidden px-10 font-georgia text-14ita italic text-blu-400 md:block lg:text-16ita">
            {post.synopsis.slice(0, 500).trim()}
            {post.synopsis.length > 500 && '...'}
          </p>
        </Show>

        <div className="word-break grid gap-4 lg:gap-6">
          <h1 className="text-28 text-blu-400 lg:text-36">
            {post.title.slice(0, 90).trim()}
            {post.title.length > 90 && '...'}
          </h1>
          <p
            className={classcat([
              'font-georgia text-14ita italic text-blu-400 lg:text-16ita',
              !post.mediaUrl && 'md:hidden',
            ])}
          >
            {post.synopsis.slice(0, 500).trim()}
            {post.synopsis.length > 500 && '...'}
          </p>
          <div className="grid auto-cols-max grid-flow-col items-center gap-8">
            <div className="grid auto-cols-max grid-flow-col items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <BrowserOnly>
                <p className="text-12 text-blu-500">{renderDate(post.createdAt, 'MMM D, YYYY')}</p>
              </BrowserOnly>
            </div>
            <div className="grid auto-cols-max grid-flow-col items-center gap-2">
              <BookOpenIcon className="h-4 w-4" />
              <p className="text-12 text-blu-500">
                {post.readingTime === 1 ? '1 min read' : `${post.readingTime ?? 0} mins read`}
              </p>
            </div>
          </div>

          <Show when={post.category.length > 0}>
            <div className="grid auto-cols-max grid-flow-col gap-6">
              {post.category.map((category) => (
                <Button key={category} variant="ghost">
                  {category}
                </Button>
              ))}
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default PostDetailHeader;
