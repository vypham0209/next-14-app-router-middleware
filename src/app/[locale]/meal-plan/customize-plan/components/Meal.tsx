//THIRD PARTY MODULES
import classcat from 'classcat';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useRef, useState } from 'react';
import { MealType } from '@prisma/client';
import 'slick-carousel/slick/slick-theme.css';
import { Controller, useFormContext } from 'react-hook-form';
import { mealPlanOptionsObject } from '_@landing/constants/meal-plan';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
//RELATIVE MODULES
import './slick.css';
import DishCard from './DishCard';
import { CustomizePlanSchema } from '../../schema/customize-plan-schema';
import { useCustomizePlanContext } from '../../context/CustomizePlanContext';

const arrowClasses = classcat([
  'transition-all',
  'focus-visible:outline-none focus-visible:ring',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'grid auto-cols-max grid-flow-col items-center justify-center',
  'h-7.5 w-7.5 rounded-full border border-solid border-blu-100 pb-0',
  'border-blu-100 text-blu-500',
  'focus-visible:ring-yellow-600 hover-hover:border-blu-100 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-navy-outlined-hover',
]);

type TMealProps = {
  index: number;
  data: {
    value: MealType;
    dishes: RouterOutputs['mealPlan']['getMealPlanDishes']['dishesInMealPlan'][MealType];
  };
  totalShow: number;
};

function Meal({ data, index, totalShow }: TMealProps) {
  const ref = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { currentWeek, currentDay } = useCustomizePlanContext();
  const { control } = useFormContext<CustomizePlanSchema>();

  const settings: React.ComponentProps<typeof Slider> = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    swipeToSlide: false,
    afterChange: (index) => setCurrentIndex(index),
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          swipeToSlide: false,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 1.65,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
    ],
  };

  const handleSlickPrev = () => ref.current?.slickPrev();
  const handleSlickNext = () => ref.current?.slickNext();

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-16 text-blu-400"> {mealPlanOptionsObject[data.value].label}</p>
        <div className="hidden grid-flow-col items-center justify-items-end gap-2 md:grid">
          <button
            onClick={handleSlickPrev}
            disabled={currentIndex === 0}
            className={classcat([arrowClasses])}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleSlickNext}
            disabled={currentIndex >= (data.dishes?.length || 0) - totalShow}
            className={classcat([arrowClasses])}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Controller
        name={`weeks.${currentWeek}.days.${currentDay}.meals.${index}.dish`}
        control={control}
        render={({ field }) => {
          return (
            <div ref={field.ref}>
              <Slider ref={ref} {...settings} className="slick-meal">
                {data.dishes?.map((dish) => {
                  return (
                    <DishCard
                      key={dish.id}
                      data={dish}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                })}
              </Slider>
            </div>
          );
        }}
      />
    </div>
  );
}

export default Meal;
