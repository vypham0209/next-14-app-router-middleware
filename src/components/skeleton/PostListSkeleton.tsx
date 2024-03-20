//THIRD PARTY MODULES
import { Fragment } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import Button from '_@shared/components/button/Button';
import SubscribeLastedUpdate from '_@landing/components/card/SubscribeLastedUpdate';
//RELATIVE MODULES
import PostSkeleton from './PostSkeleton';

const PostListSkeleton = () => {
  return (
    <>
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-14">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <Fragment key={index}>
              <Show when={index === 2}>
                <SubscribeLastedUpdate />
              </Show>
              <PostSkeleton />
            </Fragment>
          ))}
      </div>
      <Button color="navy" variant="outlined" className="btn-big mx-auto sm:w-87">
        LOAD MORE
      </Button>
    </>
  );
};

export default PostListSkeleton;
