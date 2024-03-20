//LAYOUT, COMPONENTS
import PostListSkeleton from '_@landing/components/skeleton/PostListSkeleton';
//RELATIVE MODULES
import SocialPageFilterLoading from './comps/SocialPageFilterLoading';

export default function Loading() {
  return (
    <>
      <SocialPageFilterLoading />
      <PostListSkeleton />
    </>
  );
}
