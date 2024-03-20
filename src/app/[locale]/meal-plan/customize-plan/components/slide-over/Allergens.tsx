'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
import AllergenIcon from '_@shared/icons/AllergenIcon';
//TYPES MODULES
import type { Allergens, Intolerance } from '@prisma/client';

type Props = { dish?: RouterOutputs['dishes']['getDishById'] };

export default function Allergens({ dish }: Props) {
  if (!dish) return null;
  return (
    <div>
      <p className="text-16 text-blu-400">Allergens</p>
      {dish.allergens.length > 0 ? (
        <div className="mt-2 space-y-2">
          {dish.allergens?.map((allergen: Allergens) => (
            <div key={allergen.id} className={classcat(['flex items-center gap-3'])}>
              <span
                className={classcat([
                  'inline-flex h-6 w-6 items-center justify-center rounded-sm border border-blu-200 bg-yel-25 text-blu-500 transition-colors',
                ])}
              >
                <AllergenIcon className="scale-75" name={allergen.name} />
              </span>
              <span className={classcat(['text-12lig text-blu-400', 'md:text-14lig'])}>
                {allergen.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-12lig text-blu-200 md:text-14lig">
          This dish contains no Allergens.
        </p>
      )}
      <p className={classcat(['mt-4 text-16 text-blu-400', 'md:mt-6'])}>Intolerances</p>
      {dish.intolerances.length > 0 ? (
        <div className="mt-2 space-y-2">
          {dish.intolerances?.map((intolerance: Intolerance) => (
            <div key={intolerance.id} className={classcat(['flex items-center gap-3'])}>
              <span className={classcat(['text-12lig text-blu-400', 'md:text-14lig'])}>
                {intolerance.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-12lig text-blu-200 md:text-14lig">
          This dish should cause no Intolerances.
        </p>
      )}
    </div>
  );
}
