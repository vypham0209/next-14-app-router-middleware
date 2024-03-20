'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { NutriScore } from '@prisma/client';
//LAYOUT, COMPONENTS
import TooltipRadix from '_@shared/components/Tooltip';
//SHARED
import SpicyIcon from '_@shared/icons/SpicyIcon';
import { RouterOutputs } from '_@shared/utils/api';
import QuestionMarkIcon from '_@shared/icons/QuestionMarkIcon';

type Props = { dish?: RouterOutputs['dishes']['getDishById'] };

export default function InfoContent({ dish }: Props) {
  if (!dish) return null;
  return (
    <div className={classcat(['flex flex-col space-y-6'])}>
      <p className={classcat(['text-12lig text-blu-400', 'md:text-14lig'])}>{dish?.description}</p>
      <div className="space-y-2">
        <p className={classcat(['text-16 text-blu-400'])}>Origins</p>
        <p className={classcat(['mt-2 text-12lig text-blu-400', 'md:text-14lig'])}>
          {dish?.origin}
        </p>
      </div>
      <div className="space-y-2">
        <p className={classcat(['text-16 text-blu-400'])}>Spice level</p>
        <SpicyIcon level={dish?.spicyLevel} size="big" />
      </div>
      <div className="space-y-2">
        <p className="text-16 text-blu-400">Nutritive values per portion</p>
        <div className={classcat(['space-i-6 flex flex-row', 'md:space-i-10'])}>
          <div className={classcat(['space-i-0.5 flex flex-col'])}>
            <span className="text-14lig text-blu-400">Fat</span>
            <span className={classcat(['text-12 text-blu-400', 'text-14'])}>{dish?.fat}g</span>
          </div>
          <div className={classcat(['space-i-0.5 flex flex-col'])}>
            <span className="text-14lig text-blu-400">Protein</span>
            <span className={classcat(['text-12 text-blu-400', 'text-14'])}>{dish?.protein}g</span>
          </div>
          <div className={classcat(['space-i-0.5 flex flex-col'])}>
            <span className="text-14lig text-blu-400">Carbohydrate</span>
            <span className={classcat(['text-12 text-blu-400', 'text-14'])}>
              {dish?.carbohydrate}g
            </span>
          </div>
          <div className={classcat(['space-i-0.5 flex flex-col'])}>
            <span className="text-14lig text-blu-400">Calories</span>
            <span className={classcat(['text-12 text-blu-400', 'text-14'])}>
              {dish?.sizes?.find((size) => size.default)?.calories}kcal
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className={classcat(['flex flex-row items-center justify-between'])}>
          <p className={classcat(['text-16 text-blu-400'])}>Nutriscore</p>
          <TooltipRadix
            delayDuration={300}
            description="Some brief explanation"
            contentProps={{
              className: 'z-toast',
            }}
          >
            <span>
              <QuestionMarkIcon className="h-4.5 w-4.5" />
            </span>
          </TooltipRadix>
        </div>
        <NutriScoreComp value={dish?.nutriScore} />
      </div>
    </div>
  );
}

function NutriScoreComp({ value }: { value: NutriScore }) {
  return (
    <div>
      <div className={classcat(['inline-flex flex-row-reverse items-center'])}>
        {NUTRI_SCORE.map((score, index) => {
          const isSelected = score.value === value;
          return (
            <div
              key={index}
              className={classcat([
                `isolate -me-1 flex h-6 w-6 items-center justify-center rounded-full border border-solid border-yel-25 text-12lig text-pastel-ash`,
                value === score.value && `h-9 w-9 text-18semib ow:text-white`,
                isSelected ? score.bgColorSelectedClasses : score.bgColorClasses,
              ])}
            >
              {score.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const NUTRI_SCORE = [
  {
    value: NutriScore.E,
    bgColorClasses: 'bg-pastel-rotate',
    bgColorSelectedClasses: 'bg-candy-red',
  },
  {
    value: NutriScore.D,
    bgColorClasses: 'bg-pastel-corak',
    bgColorSelectedClasses: 'bg-candy-orange',
  },
  {
    value: NutriScore.C,
    bgColorClasses: 'bg-pastel-lemon',
    bgColorSelectedClasses: 'bg-candy-yellow',
  },
  {
    value: NutriScore.B,
    bgColorClasses: 'bg-pastel-tea',
    bgColorSelectedClasses: 'bg-candy-olive',
  },
  {
    value: NutriScore.A,
    bgColorClasses: 'bg-pastel-sage',
    bgColorSelectedClasses: 'bg-candy-darkgre',
  },
];
