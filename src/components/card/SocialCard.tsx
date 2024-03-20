//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import Link from 'next-intl/link';
import { SocialPlatform, SocialWall } from '@prisma/client';
import convertToAltImage from '_@landing/utils/convertToAltImage';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import BrowserOnly from '_@shared/components/BrowserOnly';
import PublishTime from '_@landing/components/card/PublishTime';
//SHARED
import PlayIcon from '_@shared/icons/PlayIcon';
import TwitterIcon from '_@shared/icons/TwitterIcon';
import YoutubeIcon from '_@shared/icons/YoutubeIcon';
import FacebookIcon from '_@shared/icons/FacebookIcon';
import LinkedinIcon from '_@shared/icons/LinkedinIcon';
import InstagramIcon from '_@shared/icons/InstagramIcon';

const MAP_PLATFORM_TO_ICON = {
  [SocialPlatform.INSTAGRAM]: InstagramIcon,
  [SocialPlatform.FACEBOOK]: FacebookIcon,
  [SocialPlatform.TWITTER]: TwitterIcon,
  [SocialPlatform.LINKEDIN]: LinkedinIcon,
  [SocialPlatform.YOUTUBE]: YoutubeIcon,
};

type Props = {
  post: SocialWall;
};

const SocialCard = ({ post }: Props) => {
  const PostText = ({ className = 'line-clamp-5' }: { className?: string }) => (
    <div className="grid place-content-center gap-2.5 px-6 pt-6 text-center text-blu-400">
      <BrowserOnly>
        <Show when={post.caption?.trim()}>
          <p
            className={classcat(['text-blu-400 [&_*]:text-14ita', className])}
            dangerouslySetInnerHTML={{ __html: post.caption?.trim() || '' }}
          />
        </Show>
      </BrowserOnly>
    </div>
  );

  const Icon = post.platform ? MAP_PLATFORM_TO_ICON[post.platform] : null;
  const isMinHeight =
    post.type === 'TEXT_POST' || (post.type === 'IMAGE_POST' && post.caption?.trim());

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={
        post.linkToPost.trim().startsWith('http://') ||
        post.linkToPost.trim().startsWith('https://')
          ? post.linkToPost.trim()
          : `//${post.linkToPost.trim()}`
      }
      className={classcat([
        'grid grid-rows-[1fr_auto] bg-yel-50',
        'transition hover:-translate-y-1 hover:shadow-lg',
        isMinHeight && 'min-h-[theme(spacing[126.5])]',
      ])}
    >
      <Show when={post.type === 'TEXT_POST'}>
        <PostText className="line-clamp-12" />
      </Show>

      <Show when={post.type === 'VIDEO_POST'}>
        {post.mediaUrl ? (
          <div className="relative aspect-square">
            <Image
              fill
              unoptimized
              quality={100}
              alt={post.title}
              className="object-cover"
              src={process.env.NEXT_PUBLIC_CDN_HOST + post.mediaUrl}
            />
            <PlayIcon className="absolute bottom-1/2 right-1/2 h-8 w-8 translate-x-1/2 translate-y-1/2" />
          </div>
        ) : null}
      </Show>

      <Show when={post.type === 'IMAGE_POST'}>
        {post.mediaUrl ? (
          <div className={classcat([post.caption && 'grid grid-rows-[auto_1fr]'])}>
            <div
              className={classcat(['relative', post.caption ? 'aspect-video' : 'aspect-square'])}
            >
              <Image
                fill
                unoptimized
                quality={100}
                alt={post.title}
                className="object-cover"
                src={process.env.NEXT_PUBLIC_CDN_HOST + post.mediaUrl}
              />
            </div>
            <Show when={post.caption?.trim()}>
              <PostText />
            </Show>
          </div>
        ) : null}
      </Show>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-6">
        <div className="relative aspect-square w-12 overflow-hidden rounded-full bg-yel-100">
          {post.userAvatarUrl ? (
            <Image
              fill
              unoptimized
              quality={100}
              className="object-cover"
              alt={convertToAltImage(post.username)}
              src={process.env.NEXT_PUBLIC_CDN_HOST + post.userAvatarUrl}
            />
          ) : null}
        </div>

        <div className="grid gap-1">
          <p className="truncate text-12 text-blu-500">{post.username || 'User name'}</p>
          {/* NOTE: To avoid the timezone of server  */}
          <p className="truncate font-georgia text-12ita italic text-blu-300">
            <PublishTime publishedTime={post.publishedTime} />
          </p>
        </div>

        <Show when={Icon}>
          <div className="grid aspect-square w-9 place-content-center bg-yel-100">
            {Icon ? <Icon /> : null}
          </div>
        </Show>
      </div>
    </Link>
  );
};

export default SocialCard;
