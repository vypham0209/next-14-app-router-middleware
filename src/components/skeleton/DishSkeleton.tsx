const DishSkeleton = () => {
  return (
    <div className="grid animate-pulse gap-3 md:gap-6">
      <div className="aspect-[6/5] w-full bg-skeleton sm:aspect-[5/6]" />
      <div className="grid gap-2 md:gap-4">
        <div className="grid gap-1">
          <div className="h-5.5 bg-skeleton sm:h-6" />
          <div className="grid gap-1">
            <div className="h-6 bg-skeleton sm:h-7" />
            <div className="h-9 bg-skeleton sm:h-11" />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="h-8 bg-skeleton" />
          <div className="h-px w-full bg-skeleton" />
          <div className="h-9 bg-skeleton" />
        </div>
      </div>
    </div>
  );
};

export default DishSkeleton;
