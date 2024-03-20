'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import BuildPlanModal from '../components/build-plan/BuildPlanModal';

const SampleMacrosFallback = () => {
  const [selectedType, setSelectedType] = useState(0);

  return (
    <div className={classcat(['flex flex-col gap-y-10 px-6', 'md:max-content md:gap-y-16'])}>
      <div
        className={classcat([
          'mx-auto flex flex-col gap-y-4 text-center',
          'md:max-w-[800px] md:gap-y-6',
        ])}
      >
        <h2 className={classcat(['px-10 text-28 font-medium text-blu-400', 'md:text-48'])}>
          Sample macros for weight loss
        </h2>

        <p className={classcat(['text-14 font-light text-blu-300', 'md:text-20'])}>
          Tristique semper diam felis sed morbi parturient. Condimentum cursus convallis ornare
          volutpat rhoncus hendrerit commodo. Vulputate sapien aenean accumsan auctor. Tincidunt
          amet commodo venenatis vel aliquet convallis dictum aliquet.
        </p>
      </div>

      <div className={classcat(['flex flex-col gap-y-6', 'md:gap-y-16'])}>
        <div
          className={classcat(['mx-auto flex max-w-full gap-x-10 overflow-x-auto', 'md:gap-x-16'])}
        >
          {Array(5)
            .fill(0)
            .map((item, index) => (
              <div
                key={index}
                className={classcat([
                  'pb-1 text-16 font-medium text-blu-400',
                  'md:text-24',
                  selectedType === index
                    ? 'border-b border-yel-500 text-yel-500 md:border-b-[2px]'
                    : '',
                ])}
                onClick={() => setSelectedType(index)}
              >
                Healthy
              </div>
            ))}
        </div>

        <div className="flex gap-x-4 overflow-x-auto">
          {Array(10)
            .fill(0)
            .map((item, index) => (
              <div
                key={index}
                className={classcat([
                  'flex w-full max-w-[240px] shrink-0 flex-col gap-y-[10px] bg-yel-50 p-4',
                  'md:max-w-[calc((100%_-_32px)_/_3)]',
                  'md:gap-y-6 md:px-10 md:py-16',
                ])}
              >
                <p
                  className={classcat([
                    'text-center text-14 font-medium text-blu-400',
                    'md: text-18',
                  ])}
                >
                  Breakfast, Lunch, Dinner, Morning snacks, Afternoon snacks, Drinks
                </p>

                <div
                  className={classcat([
                    'text-center text-12 font-light text-blu-400',
                    'md:text-16',
                  ])}
                >
                  <span
                    className={classcat([
                      'text-14 font-medium text-yel-500',
                      'md:text-18 md:font-semibold',
                    ])}
                  >
                    1300
                  </span>{' '}
                  to{' '}
                  <span
                    className={classcat([
                      'text-14 font-medium text-yel-500',
                      'md:text-18 md:font-semibold',
                    ])}
                  >
                    1600
                  </span>{' '}
                  kcal
                </div>

                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center justify-between gap-x-2 border-b border-dashed border-blu-100 pb-1">
                    <span className="text-14 font-light text-blu-400">Protein</span>
                    <span className="text-14 font-medium text-blu-400">{`6g`}</span>
                  </div>
                  <div className="flex items-center justify-between gap-x-2 border-b border-dashed border-blu-100 pb-1">
                    <span className="text-14 font-light text-blu-400">Carbohydrates</span>
                    <span className="text-14 font-medium text-blu-400">{`6g`}</span>
                  </div>
                  <div className="flex items-center justify-between gap-x-2 border-b border-dashed border-blu-100 pb-1">
                    <span className="text-14 font-light text-blu-400">Fats</span>
                    <span className="text-14 font-medium text-blu-400">{`6g`}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <BuildPlanModal>
        <Button className={classcat(['btn-medium mx-auto uppercase ow:py-3', 'md:max-w-[348px]'])}>
          Build your plan now
        </Button>
      </BuildPlanModal>
    </div>
  );
};

export default SampleMacrosFallback;
