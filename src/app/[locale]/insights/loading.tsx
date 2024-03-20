//LAYOUT, COMPONENTS
import WrapBreadcrumb from '_@landing/components/breadcrumb/WrapBreadcrumb';
import PostListSkeleton from '_@landing/components/skeleton/PostListSkeleton';
//RELATIVE MODULES
import PostPageHeader from './comps/PostPageHeader';
import PostPageFilterLoading from './comps/PostPageFilterLoading';

export default function Loading() {
  return (
    <>
      <WrapBreadcrumb />
      <div className="max-content grid gap-10 lg:gap-14">
        <PostPageHeader />
        <PostPageFilterLoading />
        <PostListSkeleton />
      </div>
    </>
  );
}
