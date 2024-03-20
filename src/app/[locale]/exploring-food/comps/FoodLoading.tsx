//LAYOUT, COMPONENTS
import DishListSkeleton from '_@landing/components/skeleton/DishListSkeleton';

const FoodLoading = () => {
  return (
    <div className="grid gap-6 md:gap-8">
      <div className="h-9 w-full  bg-skeleton sm:h-15 sm:w-1/3" />
      <DishListSkeleton />
    </div>
  );
};

export default FoodLoading;
