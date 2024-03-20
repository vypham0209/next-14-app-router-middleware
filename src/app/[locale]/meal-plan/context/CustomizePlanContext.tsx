'use client';
//THIRD PARTY MODULES
import { useSearchParams } from 'next/navigation';
import { mealOptions } from '_@landing/constants/meal-plan';
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
//SHARED
import { RouterOutputs, nextApi } from '_@shared/utils/api';
//RELATIVE MODULES

type TCustomizePlanContext = {
  isLoadingDishes: boolean;
  dishes: RouterOutputs['mealPlan']['getMealPlanDishes']['dishesInMealPlan'];
  currentWeek: number;
  currentDay: number;
  openDetail: boolean;
  detailId: number;
  setCurrentWeek: Dispatch<SetStateAction<number>>;
  setCurrentDay: Dispatch<SetStateAction<number>>;
  setOpenDetail: Dispatch<SetStateAction<boolean>>;
  setDetailId: Dispatch<SetStateAction<number>>;
  viewDetail: (id: number) => void;
  closeViewDetail: () => void;
};

type TCustomizePlanContextValue = {
  allergens: RouterOutputs['allergens']['getAll'];
  intolerances: RouterOutputs['intolerance']['getAll'];
};

const CustomizePlanContext = createContext<TCustomizePlanContext & TCustomizePlanContextValue>(
  {} as any,
);

export const useCustomizePlanContext = () => useContext(CustomizePlanContext);

const emptyDishes = mealOptions.reduce((prev, cur) => ({ ...prev, [cur.value]: [] }), {});

export const CustomizePlanContextProvider = ({
  children,
  ...props
}: PropsWithChildren<TCustomizePlanContextValue>) => {
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<number>(0);
  const [state] = useMealPlanActor();
  const config = state.context.config;
  const isSyncing = ['fetching-category', 'syncing'].some(state.matches);

  const searchParams = useSearchParams();
  const allergenIds = searchParams
    ?.get('allergens')
    ?.split(',')
    .map((item) => Number(item));
  const intoleranceIds = searchParams
    ?.get('intolerances')
    ?.split(',')
    .map((item) => Number(item));

  const { data, isLoading } = nextApi.mealPlan.getMealPlanDishes.useQuery(
    {
      mealPlanId: config.categoryValue?.id || 0,
      mealType: config.meals,
      allergenIds: allergenIds,
      intoleranceIds: intoleranceIds,
    },
    {
      enabled: !isSyncing,
      retry: false,
    },
  );

  const viewDetail = (id: number) => {
    setDetailId(id);
    setOpenDetail(true);
  };

  const closeViewDetail = () => {
    setDetailId(0);
    setOpenDetail(false);
  };

  return (
    <CustomizePlanContext.Provider
      value={{
        ...props,
        isLoadingDishes: isLoading,
        dishes: data?.dishesInMealPlan || emptyDishes,
        currentDay,
        currentWeek,
        openDetail,
        detailId,
        setCurrentDay,
        setCurrentWeek,
        setOpenDetail,
        setDetailId,
        viewDetail,
        closeViewDetail,
      }}
    >
      {children}
    </CustomizePlanContext.Provider>
  );
};
