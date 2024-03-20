//THIRD PARTY MODULES
import { Fragment } from 'react';
import { SocialWall } from '@prisma/client';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import PostEmpty from '_@landing/components/empty/PostEmpty';
import SocialCard from '_@landing/components/card/SocialCard';
import SubscribeLastedUpdate from '_@landing/components/card/SubscribeLastedUpdate';

type Props = {
  list: SocialWall[];
};

const SocialPageList = ({ list }: Props) => {
  if (list.length === 0) return <PostEmpty />;
  const subscribeIndex = list.length === 1 ? 0 : 1;

  return (
    <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-14">
      {list.map((post, index) => (
        <Fragment key={post.id}>
          <SocialCard post={post} />
          <Show when={index === subscribeIndex}>
            <SubscribeLastedUpdate />
          </Show>
        </Fragment>
      ))}
    </div>
  );
};

export default SocialPageList;
