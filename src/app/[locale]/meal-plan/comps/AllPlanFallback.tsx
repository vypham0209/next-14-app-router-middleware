'use client';

//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import { useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import BuildPlanModal from '../components/build-plan/BuildPlanModal';

const AllPlanFallback = () => {
  const [selectedType, setSelectedType] = useState(0);

  return (
    <div>
      <div
        className={classcat([
          'mb-10 flex flex-col gap-y-6 px-6',
          'text-center',
          'md:mx-auto md:mb-14 md:max-w-[848px]',
        ])}
      >
        <h2 className="text-28 font-medium text-blu-400 md:text-48">All plans</h2>
        <p className="text-14 font-light text-blu-300 md:text-16lig">
          Pretium cum porttitor interdum id. Eu gravida sed fringilla quam ultricies cras velit.
          Diam ac ac sed purus feugiat sit ut interdum dictum. Fermentum ipsum fusce faucibus cras
          massa feugiat sem nulla felis. Arcu faucibus pretium a elementum. Ut non sit at pharetra.
        </p>
      </div>

      <div className="bg-yel-50 pt-6 md:pt-10">
        <div className="flex flex-nowrap overflow-x-auto md:max-content md:gap-x-17">
          {Array(10)
            .fill(0)
            .map((item, index) => (
              <div
                key={index}
                className={classcat([
                  'flex flex-col items-center gap-y-2',
                  'px-10 py-2',
                  selectedType === index ? 'bg-yel-100' : '',
                  'md:gap-y-6 md:pb-10 md:pt-4',
                ])}
                onClick={() => setSelectedType(index)}
              >
                <div className="relative h-10 w-10 md:h-30 md:w-30">
                  <Image src="/img/meal-plan/healthy.png" alt="food" layout="fill" />
                </div>

                <span className="font-medium text-blu-400 md:text-24">Healthy</span>
              </div>
            ))}
        </div>

        <div
          className={classcat([
            'bg-yel-100 p-6 pb-12',
            'flex flex-col gap-y-6',
            'md:max-content md:flex-row-reverse md:gap-x-10 md:py-14',
          ])}
        >
          <div className="md:w-[56%] md:max-w-[700px] md:shrink-0">
            <div className="relative pb-[83.3%]">
              <Image src="/img/meal-plan/all-plan-food.png" alt="food" layout="fill" />
            </div>
          </div>

          <div className="flex flex-col gap-y-4 md:gap-y-10">
            <p className="text-14 font-light text-blu-400 md:text-16">
              Mattis turpis condimentum turpis faucibus aliquet. Tincidunt lacus sed egestas
              condimentum non vulputate consequat ut urna. Sed posuere quis feugiat et lorem velit
              tristique non egestas. Malesuada praesent tristique euismod ut ut venenatis. Consequat
              donec semper donec ultricies ut ac ridiculus nam.
            </p>

            <div className="flex flex-col gap-y-1 md:gap-y-[10px]">
              {Array(10)
                .fill(0)
                .map((item, index) => (
                  <div key={index} className="flex gap-x-2 md:gap-x-4">
                    <div className="relative h-6 w-6 shrink-0">
                      <Image
                        src="/img/meal-plan/bullet-list.png"
                        alt="bullet list checked"
                        layout="fill"
                      />
                    </div>

                    <p className="font-georgia text-12 italic text-blu-400 md:text-14">
                      Maecenas amet at quis imperdiet tristique risus malesuada.
                    </p>
                  </div>
                ))}
            </div>
            <BuildPlanModal>
              <Button className="btn-medium uppercase ow:py-3">Build your plan now</Button>
            </BuildPlanModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPlanFallback;
