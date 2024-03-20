const PostSkeleton = () => {
  return (
    <div className="grid h-84.75 animate-pulse gap-4">
      <div className="h-57.75 bg-skeleton" />
      <div className="grid gap-2">
        <div className="h-5 w-[57%] bg-skeleton" />
        <div className="h-5 bg-skeleton" />
        <div className="h-5 w-3/4 bg-skeleton" />
      </div>
    </div>
  );
};

export default PostSkeleton;
