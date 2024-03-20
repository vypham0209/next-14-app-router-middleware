'use client';

//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import { useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import BuildPlanModal from '../components/build-plan/BuildPlanModal';

const SampleMenuFallback = () => {
  const [selectedType, setSelectedType] = useState(0);

  return (
    <div className={classcat(['flex flex-col gap-y-10 px-6', 'md:gap-y-16 md:px-0'])}>
      <div
        className={classcat([
          'mx-auto flex flex-col gap-y-4 text-center',
          'md:max-w-[800px] md:gap-y-6',
        ])}
      >
        <h2 className={classcat(['text-28 font-medium text-blu-400', 'md:text-48'])}>
          Sample menu
        </h2>

        <p className={classcat(['text-14 font-light text-blu-300', 'md:text-20'])}>
          Tristique semper diam felis sed morbi parturient. Condimentum cursus convallis ornare
          volutpat rhoncus hendrerit commodo. Vulputate sapien aenean accumsan auctor. Tincidunt
          amet commodo venenatis vel aliquet convallis dictum aliquet.
        </p>
      </div>

      <div className={classcat(['flex flex-col gap-y-6', 'md:max-content md:gap-y-10'])}>
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
              <div key={index} className={classcat(['flex max-w-[200px] shrink-0 flex-col'])}>
                <p className="bg-yel-50 py-2 text-center text-14 font-light text-blu-400">
                  Breakfast
                </p>

                <div className="relative pb-[83.3%]">
                  <Image
                    src="/img/meal-plan/sample_menu_food.png"
                    alt="sample menu food"
                    layout="fill"
                  />
                </div>

                <p
                  className={classcat([
                    'mt-2 text-14 font-medium text-blu-400',
                    'md:mt-4 md:text-16',
                  ])}
                >
                  Vegetable frittata with hash browns
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="md:pt-9">
        <BuildPlanModal>
          <Button
            className={classcat(['btn-medium mx-auto uppercase ow:py-3', 'md:max-w-[348px]'])}
          >
            Build your plan now
          </Button>
        </BuildPlanModal>
      </div>
    </div>
  );
};

export default SampleMenuFallback;
