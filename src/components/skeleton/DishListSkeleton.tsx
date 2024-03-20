//THIRD PARTY MODULES
import classcat from 'classcat';
//RELATIVE MODULES
import DishSkeleton from './DishSkeleton';

const DishListSkeleton = () => {
  return (
    <div
      className={classcat([
        'grid gap-6 sm:gap-y-16',
        'grid-cols-[repeat(auto-fill,minmax(calc(192rem/16),1fr))]',
        'sm:grid-cols-[repeat(auto-fill,minmax(calc(212rem/16),1fr))]',
        'lg:grid-cols-[repeat(auto-fill,minmax(calc(243rem/16),1fr))]',
      ])}
    >
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <DishSkeleton key={index} />
        ))}
    </div>
  );
};

export default DishListSkeleton;
