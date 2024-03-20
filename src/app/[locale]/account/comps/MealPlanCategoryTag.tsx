//THIRD PARTY MODULES
import classcat from 'classcat';

type TMealPlanCategoryTagProps = {
  label: string | JSX.Element;
};
function MealPlanCategoryTag({ label }: TMealPlanCategoryTagProps) {
  return (
    <div
      className={classcat([
        'w-fit rounded-full border border-yel-200 bg-yel-50 px-3 py-1 text-12lig text-yel-900',
      ])}
    >
      {label}
    </div>
  );
}

export default MealPlanCategoryTag;
