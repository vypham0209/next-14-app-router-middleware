'use client';
//THIRD PARTY MODULES
import { useActor } from '@xstate/react';
import { PropsWithChildren, createContext, useContext } from 'react';
import { DayOfWeek, MealPlanCategory, MealType } from '@prisma/client';
import { assign, createMachine, fromCallback, fromPromise } from 'xstate';
import { CustomizePlanSchema } from '_@landing/app/[locale]/meal-plan/schema/customize-plan-schema';
//SHARED
import { RouterOutputs, api } from '_@shared/utils/api';

const MEAL_PLAN = 'meals-plan';

export type TConfig = {
  category: MealPlanCategory;
  meals: MealType[];
  days: DayOfWeek[];
  repeat: number;
  categoryValue?: RouterOutputs['mealPlan']['getMealPlanMenus']['data'][number];
};
type TPlan = CustomizePlanSchema;
type TCategoryList = RouterOutputs['mealPlan']['getMealPlanMenus']['data'];

type TContext = TConfig & TPlan & TCategoryList;

type TSyncLocalToMealPlanEvent = { type: 'SYNC_LOCAL_STORAGE_TO_MEAL_PLAN' };
type TChangeConfigEvent = { type: 'CHANGE_CONFIG'; payload: TConfig };
type TChangePlanEvent = { type: 'CHANGE_PLAN'; payload: TPlan };
type TCheckOutDoneEvent = { type: 'CHECKOUT_DONE' };

type TChangeConfig = { event: { payload: TConfig }; context: TContext };
type TChangePlan = { event: { payload: TPlan }; context: TContext };

type TChangeConfigInput = {
  payload: TConfig;
  context: TContext;
};
type TChangePlanInput = {
  payload: TPlan;
  context: TContext;
};

export const machine = createMachine(
  {
    context: {
      config: {} as TConfig,
      plan: {} as TPlan,
      category: [] as TCategoryList,
    },
    id: 'meal-plan-machine',
    initial: 'fetching-category',
    invoke: {
      src: 'syncLocalStorageToMealPlanOnStorageChange',
      id: 'invoke-sync-lc-to-mc',
    },
    states: {
      'fetching-category': {
        invoke: {
          src: 'fetchCategoryList',
          id: 'invoke-fetch-category-list',
          onDone: [
            {
              target: 'syncing',
              actions: assign(({ event }) => ({ category: event.output })),
              reenter: false,
            },
          ],
        },
      },
      syncing: {
        invoke: {
          src: 'syncLocalStorageToMealPlan',
          id: 'invoke-sync-local-storage-to-meal-plan',
          onDone: [
            {
              target: 'idle',
              actions: assign(({ event, context }) => {
                const { config, plan } = event.output;
                return {
                  config: {
                    ...config,
                    categoryValue: context.category.find(
                      (category) => category.category === config.category,
                    ),
                  },
                  plan,
                };
              }),
              reenter: false,
            },
          ],
        },
      },
      idle: {
        on: {
          CHANGE_CONFIG: {
            target: 'updating-config',
            reenter: false,
          },
          SYNC_LOCAL_STORAGE_TO_MEAL_PLAN: {
            target: 'syncing',
            reenter: false,
          },
          CHANGE_PLAN: {
            target: 'updating-plan',
            reenter: false,
          },
          CHECKOUT_DONE: {
            target: 'idle',
            actions: ['clearConfigAndPlan'],
            reenter: false,
          },
        },
      },
      'updating-config': {
        invoke: {
          src: 'changeConfig',
          id: 'invoke-updating-config',
          input: ({ event, context }: TChangeConfig): TChangeConfigInput => ({
            payload: event.payload,
            context,
          }),
          onDone: [
            {
              target: 'idle',
              actions: [
                assign(({ event, context }) => ({
                  config: {
                    ...event.output,
                    categoryValue: context.category.find(
                      (category) => category.category === event.output.category,
                    ),
                  },
                  plan: {} as TPlan,
                })),
                'syncMealPlanToLocalStorage',
              ],
              reenter: false,
            },
          ],
        },
      },
      'updating-plan': {
        invoke: {
          src: 'changePlan',
          id: 'invoke-updating-plan',
          input: ({ event, context }: TChangePlan): TChangePlanInput => ({
            payload: event.payload,
            context,
          }),
          onDone: [
            {
              target: 'idle',
              actions: [
                assign(({ event }) => ({
                  plan: event.output,
                })),
                'syncMealPlanToLocalStorage',
              ],
              reenter: false,
            },
          ],
        },
      },
    },
    types: {
      events: {} as
        | TChangeConfigEvent
        | TSyncLocalToMealPlanEvent
        | TChangePlanEvent
        | TCheckOutDoneEvent,
    },
  },
  {
    actions: {
      syncMealPlanToLocalStorage: ({ context }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { category, ...ctx } = context;
        localStorage.setItem(MEAL_PLAN, JSON.stringify(ctx) ?? '');
      },
      clearConfigAndPlan: assign(() => {
        localStorage.removeItem(MEAL_PLAN);
        return {
          config: {} as TConfig,
          plan: {} as TPlan,
        };
      }),
    },
    actors: {
      syncLocalStorageToMealPlan: fromPromise(async () => {
        if (typeof window === 'undefined') return { config: {}, plan: {} };
        const meal = localStorage.getItem(MEAL_PLAN);
        const data = meal
          ? JSON.parse(meal)
          : {
              config: {},
              plan: {},
            };
        return data;
      }),
      syncLocalStorageToMealPlanOnStorageChange: fromCallback((sendBack) => {
        if (typeof window === 'undefined') return;
        const callbackRef = (e: StorageEvent) => {
          if (e.key !== MEAL_PLAN) return;
          sendBack({ type: 'SYNC_LOCAL_STORAGE_TO_MEAL_PLAN' });
        };
        window.addEventListener('storage', callbackRef);
        return () => window.removeEventListener('storage', callbackRef);
      }),

      changeConfig: fromPromise(async ({ input }) => {
        return {
          ...input.payload,
        };
      }),

      changePlan: fromPromise(async ({ input }) => {
        return {
          ...input.payload,
        };
      }),
      fetchCategoryList: fromPromise(async () => {
        const data = await api.mealPlan.getMealPlanMenus.query();
        return data.data;
      }),
    },
    guards: {},
    delays: {},
  },
);

const MealPlanMachineContext = createContext<{
  machine: ReturnType<typeof useActor<typeof machine>>;
}>({
  machine: {},
} as any);

export const MealPlanProvider = ({ children }: PropsWithChildren) => {
  const hookMachine = useActor(machine);

  return (
    <MealPlanMachineContext.Provider value={{ machine: hookMachine }}>
      {children}
    </MealPlanMachineContext.Provider>
  );
};

export const useMealPlanActor = () => {
  const { machine } = useContext(MealPlanMachineContext);
  return machine;
};
