'use client';
//THIRD PARTY MODULES
import { useActor } from '@xstate/react';
import { createContext, useContext, useEffect } from 'react';
import { DishesType, Prisma, Sizes, SpicyLevel } from '@prisma/client';
import { useAddCartToastStore } from '_@landing/stores/toast/useAddCartToastStore';
import { assign, createMachine, fromCallback, fromPromise, GuardPredicate, raise } from 'xstate';
//SHARED
import { Prettify } from '_@shared/utils/type';
import useProfile from '_@shared/hooks/useProfile';
import { useToastStore } from '_@shared/stores/toast/useToastStore';
import { api, RouterInputs, RouterOutputs } from '_@shared/utils/api';

export type DishType = NonNullable<RouterOutputs['dishes']['getDishById']>;

export type AddToCartInput = Prettify<
  Omit<RouterInputs['cart']['addToCart'], 'addons'> & {
    addons: Record<string, string | string[] | undefined>;
  } & {
    dishInCartId?: string;
    sameDishId?: string;
    currentId?: string;
    targetId?: string;
    type: DishesType;
    name?: string;
    spicyLevel?: SpicyLevel;
  }
>;
export type UpdateToCartInput = Prettify<
  Omit<RouterInputs['cart']['updateCartDish'], 'addons'> & {
    addons: Record<string, string | string[] | undefined>;
  }
>;
type AddToCartEvent = { event: { payload: AddToCartInput }; context: Context };
type AddToCartEventObject = { payload: AddToCartInput; type: string };
type AddToCartOutput = { output: { payload: AddToCartInput }; type: string };
type RemoveFromCartInput = { id: string };
type RemoveFromCartEvent = { event: { payload: RemoveFromCartInput } };
type UpdateToCartEvent = { event: { payload: UpdateToCartInput }; context: Context };

export type DishesInContext = Prisma.DishInCartGetPayload<{
  select: {
    id: true;
    name: true;
    images: true;
    sizeId: true;
    note: true;
    amount: true;
    calories: true;
    originDishId: true;
    type: true;
    spicyLevel: true;
    type: true;
    size: {
      select: {
        name: true;
        calories: true;
        price: true;
        originSizeId: true;
      };
    };
    addons: {
      select: {
        originAddonId: true;
        name: true;
        options: {
          select: {
            originAddonOptionId: true;
            name: true;
            price: true;
            calories: true;
          };
        };
      };
    };
  };
}>[];
type Context = {
  dishes: DishesInContext;
  selectedDish: DishType | undefined;
  defaultDish: DishesInContext[number] | undefined;
  userId: string | undefined;
  cartId: string | undefined;
};

const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCGAnALgYgMoFEAZfAYQBUB9AEQElcAJCsgeQoEEqqBtABgF1EoAA4B7WAEtM4kQDtBIAB6IAjACYALAFYAdDwAcqzZsOaeqgOwBOVQBoQAT0SqeOgMyvTPV8suWeANlVlfwBfELs0LDwiUkpaBiZWfFoyXgEkEFEJKVl5JQQ1dXVtV3NXPR5zZXNVCvU7RwL9bX9-c1NlTV9Nb30wiIwcKnwCYnJqOno0+SzJaTkM-LV-PW0ivT1OoxXLfwaVVX6QSMxtKABXOBxcGgBxADkKGnvpjNmchdB86x41y3a9LtTLUavsEP9zNpgjxKjD1BsNHojiczpdYKdxBAADZgbAcKhPMj4ACyr2EYjmuUWiHcq3K7U0-ks6n8pWUejBTOK5VMO3UQQCSPCx0GqKu2kxOLxnEJJK4ynS5Oy8zyNPKJT0DK5rKqHIcKgCrl0rkM-3UlmCvmRoou4sluIAqgAFKhsImy0n8GYUj6qhC0jVa5k69lgvTqoqmcwGfw8LSadTWrBi9ES7G4gBKJOYADV8B6yZkfSrqf71fTtsG2XrGmp3NpLB5lMotJV1CbDsKUbbU-a8ABNe4kCiEZgkNiERIUccZ1Jet7FqlfRDmcxgsqrQyA2OacON9TmJOnHunVAQCDiGRQbAQWRgCUyABuIgA1vfu2jT+fL1AEJfn2gHxpIW7wlsuZZ0pqlYstWYYbNo4YwnoXR6G05j8keKanOcQgQKgUhXmwAC2IjnDIOC3jI97-q+742p+2g4XhBFQMRpHkX+T4iIB8zAfOSqUp8ig0oy2iMgyJrWKYrj+JoYLGL87ImOh1Y+JhJ6Mbh+E-jed4Ps+b7aB+4pMdpV6cQB2myHxipFsqS7Cf6onibuejtlU1iWOuRTaKuMLmK0Kz8oy6kMegYAkY+OmUdRXGGcZqbhZFP4WdxVkyDZ3r2UJ+QeP4YltEYkmGF4ez6gUzZGuo1RdM4FaWJomHnLAYDoNgo63BQzAOnOtmgQ53zOH8AJAmYmq2OV-g+S4yiuDwvhNtVrhNS16BplK+IFvxdmCX6ziWKsU0Ba45rOKoslgs250Ie2gSxoEqiqDJK2tetuKbTQRKkgqWW7aW+2HQerKnWYF3lS27LaOdpRFA97Jxi9a19s6rrup9crbf1OVOPNgPHSD51yeDsk6L4qFtG0+geIjb3YFmxK5vm6Oen1i7YwgAMtEDJ0-ITl2AkaZQyRaAVxlUiZdqKzWvWeF5XrpVH6bRRlS6t2iyylNE8dZ-AgWze2zfliGVHN0n8vU4MWL8filDwagBahWg0xr8utegIhrUIWL4QAZh7REq8m0trS7v5a+lmULtlBvqvDyheJo6HNiyl3VJCj2O0ybQVMoNOmSxbFkRRek0fFquvfnP6Fxx4dAbrmP6-9zaQhspgGIYLYJmVtZeEawSoRoB528yedaQXJFF9gbse9oXu+-7gfYWrleERPNdcdrGX16z0dNz4UMePNCm1AYYKNpYfwyRn0bBEUo-MdFJdxXRQfL2PmsbxH2+-b6e8t8h+hHqaE7incGjJVAlCeoFSoGwXASwGK-Cu79XboHdp7b2mA-boADiiYOmkH7mVrrxb+Uc-rgSCPvJ6vIYS7h8K4S6LJAbk3WGhUIktEFrSSiIKK8sYpKzLhw7QXCeFh0-nXPgetd7kNxlzfGvMwa1gqL8FwqE-D9yKJ2BBS9XrCJ0tPdB89sGL0YmrXRhCxHEIkQ3KRjl9oX18AFWSRR1BeDXODcwAQNQyVbgFaqj0aawHsDIZAP4yAiFwK1R8rUFaxQMi-bRa1AnBNCeEyJrVUqb0jgJX+4FZqGAbJ0To7R2SuH+JdO2yhfLlGQu4J6JpOgBKCSEq8YSInoCiW1fRs8MFYJweXRJTSUltI6Rkr+Vid5kMcnk0mhTE7AL3G4xouxuQwQCAENotRGrsISdoH2YBMDIAABY-hIIMGJ-D4kmNensg5xyrynKwKM8RkjJlLHQhAp651VAQhqcEM+okTpuTmv4K6jiwjChkCICAcB5AnB-mBRyABaHwYILCVJhCVA8B0ugmngSKZMJ54UDScF5cqHhVgi2ASyeaKxvl4oShidMRL2adF+Jqdl8I2jxlDOVPcDZzpD12LscoudtlYXVt+K8zK-SxjZe0Fw5R+SGFKWfdsaxowwjaNYGorJQomWQaxNemBpWlllQheVPQ3JAJVeVROxRELwmqjQ9uerUwrygCa8CZqoIKqtcq0ljR2gX06ObDuVg5qiq0eKsxHrSE5Mct6i1irrUBpUBDKGT0zDVTcr3NhUbg6eqmWYC+5Roa1F8FsbuiBkKVMTqhWaAQPHoUPGKvB9pC1LAtMo6orJASPVZGoM+0Y1iOu8B4PwWrnaStjdkhF+QqGVNQsAuM-wfCBEut8w6PQaguG+e0FY98zKGvYsauNc6nBNgQrJeO5oPLrvBl4YolRYweLUMyeakb8U7PdR2i9wCr3LtvWuiatZGRGies2Ka8Y4F5q-VczhEVuE-l-RzS9S6b2rt2CBlQSiGytHZMhWGFpGnJJaak9prUUPx1XBqMtgILTbH+UaawhgNWbDclYGmNyjknMGFRowEDvBfMZD0FsFh-nFAZJqQIHjzRqXBUAA */
  id: 'cart',

  //@ts-ignore
  types: {} as {
    typegen: {};
    context: Context;
    actors: {
      addToCart: ({ event }: AddToCartEvent) => void;
      addToServerCart: ({ event }: AddToCartEvent) => void;
      formatDataBeforeAdding: ({ event }: AddToCartEvent) => void;

      removeFromCart: ({ event }: RemoveFromCartEvent) => void;
      removeFromServerCart: ({ event }: RemoveFromCartEvent) => void;

      updateToCart: ({ event }: UpdateToCartEvent) => void;
      updateAmountToServerCart: ({ event }: UpdateToCartEvent) => void;
      updateToServerCart: ({ event }: UpdateToCartEvent) => void;
      fetchCart: () => void;
    };
    actions: {
      addToCart: ({ event }: AddToCartEvent) => void;
      addToServerCart: ({ event }: AddToCartEvent) => void;

      removeFromCart: ({ event }: RemoveFromCartEvent) => void;

      updateToCart: ({ event }: UpdateToCartEvent) => void;
      updateToServerCart: ({ event }: UpdateToCartEvent) => void;

      syncWholeCartToLocalStore: () => void;
      syncLocalStoreToCart: () => void;
      syncServerToCart: () => void;
      notifySyncContext: () => void;
      syncContextDone: () => void;
      clearCart: () => void;
      clearLocalStore: () => void;
      showErrorToast: () => void;
      showAddSuccessToast: () => void;
      showUpdateSuccessToast: () => void;
      showDeleteSuccessfulToast: () => void;
      mergeDishToServerCart: () => void;
    };
    events:
      | { type: 'SELECT_DISH_TO_ADD'; payload: DishType }
      | { type: 'SELECT_DISH_TO_EDIT'; payload: DishType; defaultDish?: DishesInContext[number] }
      | { type: 'DESELECT_DISH' }
      | { type: 'ADD_ITEM'; payload: AddToCartInput }
      | { type: 'VERIFIED_ADD'; payload: AddToCartInput }
      | { type: 'UPDATE_ITEM'; payload: AddToCartInput }
      | { type: 'REMOVE_ITEM'; payload: { id: string } }
      | { type: 'FETCH_CART' }
      | { type: 'SIGN_IN'; payload: { userId: string } }
      | { type: 'LOG_OUT' }
      | { type: 'SYNC_LOCAL_TO_CART' }
      | { type: 'CHECKOUT_CART_DONE' };
    guards: {
      checkExistence: (input: any) => boolean;
    };
  },
  context: {
    dishes: [],
    selectedDish: undefined,
    defaultDish: undefined,
    userId: undefined,
    cartId: undefined,
  } as Context,

  initial: 'guest',

  states: {
    guest: {
      initial: 'idle',
      entry: 'syncLocalStoreToCart',
      invoke: {
        src: 'syncLocalToCartOnStorageChange',
      },
      states: {
        idle: {
          on: {
            ADD_ITEM: [
              { target: 'mergingDish', guard: 'checkIdExistAndExistence' },
              { target: 'updating', guard: 'checkIdExist' },
              { target: 'updatingAmount', guard: 'checkExistence' },
              { target: 'adding' },
            ],
            UPDATE_ITEM: {
              target: 'updating',
            },
            REMOVE_ITEM: {
              target: 'removing',
            },
            SYNC_LOCAL_TO_CART: {
              actions: 'syncLocalStoreToCart',
            },
            CHECKOUT_CART_DONE: {
              actions: 'clearCart',
            },
          },
        },
        adding: {
          invoke: {
            src: 'formatDataBeforeAdding',
            input: ({ event, context }: AddToCartEvent) => ({
              payload: event.payload,
              context,
            }),
            onDone: {
              actions: [
                'addToCart',
                'syncWholeCartToLocalStore',
                'showAddSuccessToast',
                raise({ type: 'DESELECT_DISH' }),
              ],
              target: 'idle',
            },
          },
        },
        mergingDish: {
          invoke: {
            src: 'mergeDish',
            input: ({ event, context }: AddToCartEvent) => ({
              payload: event.payload,
              context,
            }),
            onDone: {
              actions: [
                assign(({ event }) => ({ dishes: event.output })),
                'syncWholeCartToLocalStore',
                'showUpdateSuccessToast',
                raise({ type: 'DESELECT_DISH' }),
              ],
              target: 'idle',
            },
          },
        },
        updatingAmount: {
          invoke: {
            src: 'updateDishAmount',
            input: ({ event, context }: AddToCartEvent) => ({
              payload: event.payload,
              context,
            }),
            onDone: {
              actions: [
                assign(({ event }) => ({ dishes: event.output })),
                'syncWholeCartToLocalStore',
                raise({ type: 'DESELECT_DISH' }),
              ],
              target: 'idle',
            },
          },
        },
        updating: {
          invoke: {
            src: 'updateToCart',
            input: ({ event, context }: UpdateToCartEvent) => ({
              payload: event.payload,
              context,
            }),
            onDone: {
              actions: [
                assign(({ event }) => ({ dishes: event.output })),
                'syncWholeCartToLocalStore',
                'showUpdateSuccessToast',
                raise({ type: 'DESELECT_DISH' }),
              ],
              target: 'idle',
            },
          },
        },
        removing: {
          invoke: {
            src: 'removeFromCart',
            input: ({ event }: RemoveFromCartEvent) => ({
              payload: event.payload,
            }),
            onDone: {
              actions: [
                assign(({ event, context }) => ({
                  dishes: context.dishes.filter((dish) => dish.id !== event.output),
                })),
                'syncWholeCartToLocalStore',
                'showDeleteSuccessfulToast',
                raise({ type: 'DESELECT_DISH' }),
              ],
              target: 'idle',
            },
          },
        },
      },
      on: {
        SIGN_IN: {
          target: 'user.syncingToServer',
          actions: assign(({ event }) => ({
            userId: event.payload.userId,
          })),
        },
      },
    },
    user: {
      initial: 'idle',
      invoke: {
        src: 'syncCartOnUpdateDBSuccess',
      },
      states: {
        idle: {
          on: {
            ADD_ITEM: [
              { target: 'mergingDish', guard: 'checkIdExistAndExistence' },
              { target: 'updating', guard: 'checkIdExist' },
              { target: 'updatingAmount', guard: 'checkExistence' },
              { target: 'adding' },
            ],
            UPDATE_ITEM: {
              target: 'updating',
            },
            REMOVE_ITEM: {
              target: 'removing',
            },
            CHECKOUT_CART_DONE: {
              actions: 'clearCart',
            },
          },
        },
        adding: {
          invoke: {
            src: 'addToServerCart',
            input: ({ event }: AddToCartEvent) => ({
              payload: event.payload,
            }),
            onDone: {
              target: 'idle',
              actions: [
                raise({ type: 'FETCH_CART' }),
                'notifySyncContext',
                'showAddSuccessToast',
                raise({ type: 'DESELECT_DISH' }),
              ],
            },
            onError: {
              target: 'idle',
              actions: 'showErrorToast',
            },
          },
        },
        mergingDish: {
          invoke: {
            src: 'mergeDishToServerCart',
            input: ({ event, context }: AddToCartEvent) => ({
              payload: event.payload,
              context,
            }),
            onDone: {
              actions: [
                raise({ type: 'FETCH_CART' }),
                'notifySyncContext',
                'showUpdateSuccessToast',
                raise({ type: 'DESELECT_DISH' }),
              ],
              target: 'idle',
            },
            onError: {
              target: 'idle',
              actions: 'showErrorToast',
            },
          },
        },
        updatingAmount: {
          invoke: {
            src: 'updateAmountToServerCart',
            input: ({ event, context }: UpdateToCartEvent) => ({
              payload: event.payload,
              context,
            }),
            onDone: {
              target: 'idle',
              actions: [
                raise({ type: 'FETCH_CART' }),
                'notifySyncContext',
                'updateToCart',
                raise({ type: 'DESELECT_DISH' }),
              ],
            },
            onError: {
              target: 'idle',
              actions: 'showErrorToast',
            },
          },
        },
        updating: {
          invoke: {
            src: 'updateToServerCart',
            input: ({ event }: UpdateToCartEvent) => ({
              payload: event.payload,
            }),
            onDone: {
              target: 'idle',
              actions: [
                raise({ type: 'FETCH_CART' }),
                'notifySyncContext',
                'showUpdateSuccessToast',
                'updateToCart',
                raise({ type: 'DESELECT_DISH' }),
              ],
            },
            onError: {
              target: 'idle',
              actions: 'showErrorToast',
            },
          },
        },
        removing: {
          invoke: {
            src: 'removeFromServerCart',
            input: ({ event }: UpdateToCartEvent) => ({
              payload: event.payload,
            }),
            onDone: {
              target: 'idle',
              actions: [
                assign(({ event, context }) => ({
                  dishes: context.dishes.filter((dish) => dish.id !== event.output),
                })),
                'notifySyncContext',
                'showDeleteSuccessfulToast',
                raise({ type: 'DESELECT_DISH' }),
              ],
            },
            onError: {
              target: 'idle',
              actions: 'showErrorToast',
            },
          },
        },
        syncingToServer: {
          invoke: {
            src: 'syncLocalToServer',
            onDone: {
              actions: 'clearLocalStore',
              target: 'fetchingCart',
              // actions: ['syncServerToCart', 'clearLocalStore'],
            },
            onError: {
              target: 'fetchingCart',
            },
          },
        },
        fetchingCart: {
          invoke: {
            src: 'fetchCart',
            input: ({ context }: { context: Context }) => ({ userId: context.userId }),
            onDone: {
              actions: [
                assign(
                  ({ event }) => (
                    console.log({ action: 'assignAfterFetch', event }),
                    { dishes: event.output.dishes || [], cartId: event.output.id }
                  ),
                ),
                'syncContextDone',
              ],
              target: 'idle',
            },
          },
        },
      },
      on: {
        LOG_OUT: {
          target: 'guest',
          actions: ['clearCart', assign({ userId: undefined })],
        },
      },
    },
  },
  on: {
    SELECT_DISH_TO_ADD: {
      actions: assign(({ event }) => ({ selectedDish: event.payload })),
    },
    SELECT_DISH_TO_EDIT: {
      actions: assign(({ event }) => ({
        selectedDish: event.payload,
        defaultDish: event.defaultDish,
      })),
    },
    DESELECT_DISH: {
      actions: assign(() => ({ selectedDish: undefined, defaultDish: undefined })),
    },
    FETCH_CART: [
      {
        target: '.user.fetchingCart',
        guard: ({ context }) => !!context.userId,
      },
    ],
  },
});

const CartMachineContext = createContext<{ machine: ReturnType<typeof useActor<typeof machine>> }>({
  machine: [],
} as any);

export const CartProvider = ({ children }: any) => {
  const [profile] = useProfile();
  const showToast = useToastStore((state) => state.showToast);
  const showAddCartToast = useAddCartToastStore((state) => state.showToast);

  const hookMachine = useActor(
    typeof window === 'undefined'
      ? machine
      : machine.provide({
          //@ts-ignore
          actions: {
            addToCart,
            removeFromCart,
            updateToCart,
            syncWholeCartToLocalStore,
            syncLocalStoreToCart,
            clearLocalStore,
            clearCart,
            syncServerToCart: syncServerToCart(profile?.id),
            notifySyncContext,
            syncContextDone,
            showErrorToast: () => {
              showToast({ type: 'error', description: 'Something went wrong!' });
            },
            showAddSuccessToast: (e: any) => {
              const dish = e.event.output.payload as AddToCartInput & {
                name: string;
                images: string[];
              };

              showAddCartToast({
                title: 'Added To cart',
                description: dish.name,
                quantity: dish.amount,
                image: dish.images?.[0],
              });
            },
            showUpdateSuccessToast: () => {
              showToast({ type: 'success', description: 'Change saved!' });
            },
            showDeleteSuccessfulToast: () => {
              showToast({ type: 'success', description: 'Delete successful!' });
            },
          },
          //@ts-ignore
          actors: {
            addToCart: fromPromise((arg) => {
              console.log({ actor: 'addToCart' }, { arg });
              return arg.input;
            }),
            formatDataBeforeAdding,
            updateToCart: fromPromise(async (arg) => {
              console.log({ actor: 'updateToCart', arg });
              const { payload, context } = arg.input as {
                context: Context;
                payload: AddToCartInput;
              };
              const addOns = formatAddOns(payload.addons, context.selectedDish as DishType);
              const selectedSize = context.selectedDish?.sizes.find(
                (size) => size.id === payload.sizeId,
              ) as Sizes;
              return context.dishes.map((dish) => {
                if (dish.id === payload.dishInCartId) {
                  return {
                    ...dish,
                    ...payload,
                    addons: addOns,
                    size: {
                      name: selectedSize.name,
                      price: selectedSize.price,
                      calories: selectedSize.calories,
                      originSizeId: selectedSize.id,
                    },
                  };
                } else return dish;
              });
            }),
            mergeDish: fromPromise(async (arg) => {
              const { payload, context } = arg.input as {
                context: Context;
                payload: AddToCartInput;
              };
              console.log({ actor: 'mergeDish', arg });
              return context.dishes
                .filter((item) => item.id !== payload.dishInCartId)
                .map((dish) =>
                  dish.id === payload.sameDishId
                    ? { ...dish, amount: dish.amount + payload.amount }
                    : dish,
                );
            }),
            updateDishAmount: fromPromise(async (arg) => {
              const { payload, context } = arg.input as {
                context: Context;
                payload: AddToCartInput;
              };
              console.log({ actor: 'updateDishAmount', arg });
              const dish = context.dishes.find(
                (dish) => dish.originDishId === payload.originDishId,
              );
              showAddCartToast({
                title: 'Added To cart',
                description: dish?.name || '',
                quantity: payload.amount,
                image: dish?.images?.[0] || '',
              });
              return context.dishes.map((dish) =>
                dish.id === payload.dishInCartId
                  ? { ...dish, amount: dish.amount + payload.amount }
                  : dish,
              );
            }),
            removeFromCart: fromPromise(async (arg) => {
              const data = await new Promise((resolve) => {
                resolve({ actor: 'removeFromCart', arg });
              });
              console.log(data);
              return arg.input.payload.id;
            }),
            addToServerCart,
            updateAmountToServerCart: fromPromise(async (arg) => {
              console.log({ actor: 'Update amount to server cart', arg });
              const { payload, context } = arg.input as {
                context: Context;
                payload: AddToCartInput;
              };
              const body = {
                id: payload.dishInCartId ?? '',
                amount: payload.amount ?? 0,
              };
              const data = await api.cart.updateAmountOfDishOnCart.mutate(body);

              if (data) {
                const dish = context.dishes.find(
                  (dish) => dish.originDishId === payload.originDishId,
                );
                showAddCartToast({
                  title: 'Added To cart',
                  description: dish?.name || '',
                  quantity: payload.amount,
                  image: dish?.images?.[0] || '',
                });
              }
              return data;
            }),
            updateToServerCart,
            removeFromServerCart,
            syncLocalToCartOnStorageChange,
            syncCartOnUpdateDBSuccess,
            syncLocalToServer,
            fetchCart: fromPromise(async ({ input }) => {
              console.log({ actor: 'fetchCart', userId: input.userId });
              const cart = await api.cart.getCartByUserId.query(input.userId);
              return {
                id: cart?.id || '',
                dishes: cart?.dishesInCart || [],
              };
            }),
            clearCart,
            mergeDishToServerCart,
          },
          //@ts-ignore
          guards: {
            checkExistence,
            checkIdExist,
            checkIdExistAndExistence,
          },
        }),
  );
  const [_, send] = hookMachine;

  useEffect(() => {
    profile?.id
      ? send({ type: 'SIGN_IN', payload: { userId: profile.id } })
      : send({ type: 'LOG_OUT' });
  }, [profile?.id, send]);

  return (
    <CartMachineContext.Provider value={{ machine: hookMachine }}>
      {children}
    </CartMachineContext.Provider>
  );
};

export const useCartActor = () => {
  const { machine } = useContext(CartMachineContext);

  return machine;
};

type CheckExistenceInput = Parameters<GuardPredicate<Context, AddToCartEventObject>>[0];
//If 2 dishes have all same sized, note and addons, they are the same dish, return true
function checkExistence({ event, context }: CheckExistenceInput) {
  console.log({ guard: 'checkExistence' });
  const dishes = context.dishes;
  const newDish = event.payload;
  const sameOriginDishes = dishes.filter((dish) => dish.originDishId === newDish.originDishId);
  const newAddons = convertAddOns(newDish.addons);
  const sameDish = sameOriginDishes.find((dish) => {
    if (!dish.addons && !newDish.addons)
      return dish.sizeId === newDish.sizeId && dish.note === newDish.note;
    if (!dish.addons || !newDish.addons) return false;

    if (dish.addons.length !== newAddons?.length) return false;
    const isSameAddons = dish.addons.every((addon) =>
      newAddons?.some((a) => a.originAddonId === addon.originAddonId),
    );
    if (!isSameAddons) return false;
    const allOldOptions = dish.addons.flatMap((addon) =>
      addon.options.map((opt) => opt.originAddonOptionId),
    );
    const allNewOptions = newAddons.flatMap((addon) => addon?.addonOptionIds);

    if (allNewOptions.length !== allOldOptions.length) return false;

    const isSameOptions = allOldOptions.every((opt) => allNewOptions.includes(opt));
    console.log({
      isSameOptions,
      sameOther: dish.sizeId === newDish.sizeId && (dish.note || '') === (newDish.note || ''),
    });

    return (
      dish.size?.originSizeId === newDish.sizeId &&
      (dish.note || '') === (newDish.note || '') &&
      isSameOptions
    );
  });
  event.payload.dishInCartId = sameDish?.id;

  return !!sameDish;
}
function checkIdExist({ event, context }: CheckExistenceInput) {
  console.log({ guard: 'checkIdExist' });
  const dishes = context.dishes;
  const newDish = event.payload;

  const dish = dishes.find((item) => item.id === newDish.dishInCartId);

  return !!dish;
}
function checkIdExistAndExistence({ event, context }: CheckExistenceInput) {
  console.log({ guard: 'checkIdExistAndExistence' });
  const dishes = context.dishes;
  const newDish = event.payload;
  const sameOriginDishes = dishes.filter((dish) => dish.originDishId === newDish.originDishId);
  const newAddons = convertAddOns(newDish.addons);
  const sameDish = sameOriginDishes.find((dish) => {
    if (!dish.addons && !newDish.addons)
      return dish.sizeId === newDish.sizeId && dish.note === newDish.note;
    if (!dish.addons || !newDish.addons) return false;

    if (dish.addons.length !== newAddons?.length) return false;
    const isSameAddons = dish.addons.every((addon) =>
      newAddons?.some((a) => a.originAddonId === addon.originAddonId),
    );
    if (!isSameAddons) return false;
    const allOldOptions = dish.addons.flatMap((addon) =>
      addon.options.map((opt) => opt.originAddonOptionId),
    );
    const allNewOptions = newAddons.flatMap((addon) => addon?.addonOptionIds);

    if (allNewOptions.length !== allOldOptions.length) return false;

    const isSameOptions = allOldOptions.every((opt) => allNewOptions.includes(opt));
    console.log({
      isSameOptions,
      sameOther: dish.sizeId === newDish.sizeId && (dish.note || '') === (newDish.note || ''),
    });

    return (
      dish.size?.originSizeId === newDish.sizeId &&
      (dish.note || '') === (newDish.note || '') &&
      isSameOptions &&
      newDish.dishInCartId &&
      newDish.dishInCartId !== dish.id
    );
  });
  //for GUEST
  event.payload.sameDishId = sameDish?.id;
  //for USER
  event.payload.targetId = sameDish?.id;
  event.payload.currentId = newDish?.dishInCartId;
  return !!sameDish;
}

const addToCart = assign((arg) => {
  const { event, context } = arg as any as { event: AddToCartOutput; context: Context };
  console.log({ action: 'Add to cart' }, arg);

  return { dishes: [...context.dishes, event.output.payload] };
});

const addToServerCart = fromPromise(async (arg) => {
  console.log({ actor: 'Add To Server Cart' }, arg);
  const dish = arg.input.payload as AddToCartInput;
  const body = { ...dish, addons: convertAddOns(dish.addons) };
  const data = await api.cart.addToCart.mutate(body);

  console.log(data);
  return {
    payload: data,
  };
});

const removeFromCart = ({ event }: RemoveFromCartEvent) => {
  console.log({ action: 'Remove from cart' }, event);
};
const removeFromServerCart = fromPromise(async (arg) => {
  const payload = arg.input.payload as RemoveFromCartInput;
  await api.cart.removeDishInCart.mutate(payload.id);

  return payload.id;
});

const updateToCart = ({ event }: UpdateToCartEvent) => {
  console.log({ action: 'update to cart' }, event);
};

const updateToServerCart = fromPromise(async (arg) => {
  console.log({ actor: 'Update to server cart', arg });
  const dish = arg.input.payload as UpdateToCartInput;
  console.log({ dish });
  const body = { ...dish, addons: convertAddOns(dish.addons) };

  const data = await api.cart.updateCartDish.mutate(body);
  return data;
});

const syncWholeCartToLocalStore = (arg: any) => {
  localStorage.setItem('dishes', JSON.stringify(arg.context.dishes));
  console.log({ action: 'Sync whole cart to local store' }, arg);
};

const clearLocalStore = (arg: any) => {
  localStorage.removeItem('dishes');
  console.log({ action: 'clearLocalStore' }, arg);
};

const notifySyncContext = () => {
  localStorage.setItem('syncContext', 'true');
};

const syncContextDone = () => {
  localStorage.removeItem('syncContext');
};

const clearCart = assign(() => {
  console.log({ action: 'cleart cart' });
  localStorage.removeItem('dishes');
  return { dishes: [], cartId: undefined };
});

const syncLocalStoreToCart = assign(() => {
  console.log({ action: 'Sync local store to cart' });
  const dishes = JSON.parse(localStorage.getItem('dishes') || 'null') || [];

  return { dishes };
});

const syncServerToCart = (userClerkId?: string) =>
  assign(async () => {
    if (!userClerkId) return null;
    const user = await api.users.getUserIdByClerkId.query(userClerkId);
    if (!user) return null;
    const dishes = await api.cart.getCartByUserId.query(user.id);
    console.log({ action: 'sync server to cart', dishes });
    return { dishes };
  });

const formatDataBeforeAdding = fromPromise(
  async (arg): Promise<{ payload: DishesInContext[number] }> => {
    const input = arg.input as { payload: AddToCartInput; context: Context };
    const { context, payload } = input;
    const { addons, note, ...rest } = payload;
    const { selectedDish } = context;
    if (!selectedDish) throw new Error('No selected dish');

    const selectedSize = selectedDish.sizes.find((size) => size.id === payload.sizeId) as Sizes;
    console.log({ actor: 'formatDataBeforeAdding' }, { arg });

    const formattedAddon = formatAddOns(addons, selectedDish);

    return {
      payload: {
        ...rest,
        note: note || null,
        id: Date.now().toString(),
        addons: formattedAddon,
        images: selectedDish.images,
        name: selectedDish.name,
        originDishId: selectedDish.id,
        size: {
          name: selectedSize.name,
          price: selectedSize.price,
          calories: selectedSize.calories,
          originSizeId: selectedSize.id,
        },
      },
    };
  },
);

const syncLocalToServer = fromPromise(async () => {
  const dishes = JSON.parse(localStorage.getItem('dishes') || 'null') as DishesInContext | null;
  if (!dishes) throw new Error('No dishes in local storage');

  const dishInput = dishes.map((dish) => ({
    originDishId: dish.originDishId,
    sizeId: dish.sizeId,
    calories: dish.calories,
    amount: dish.amount,
    note: dish.note || undefined,
    addons: dish.addons.map((addon) => ({
      originAddonId: addon.originAddonId,
      addonOptionIds: addon.options.map((opt) => opt.originAddonOptionId),
    })),
  }));
  await api.cart.syncToCart.mutate(dishInput);
});

const syncLocalToCartOnStorageChange = fromCallback((sendBack) => {
  if (typeof window === 'undefined') return;

  const callbackRef = (e: StorageEvent) => {
    if (e.key !== 'dishes') return;
    console.log('Storage change');
    sendBack({ type: 'SYNC_LOCAL_TO_CART' });
  };
  window.addEventListener('storage', callbackRef);
  return () => window.removeEventListener('storage', callbackRef);
});
const syncCartOnUpdateDBSuccess = fromCallback((sendBack) => {
  if (typeof window === 'undefined') return;

  const callbackRef = (e: StorageEvent) => {
    if (e.key !== 'syncContext') return;
    const syncContext = localStorage.getItem(e.key);

    if (syncContext === 'true') {
      sendBack({ type: 'FETCH_CART' });
    }
  };
  window.addEventListener('storage', callbackRef);

  return () => window.removeEventListener('storage', callbackRef);
});

const convertAddOns = (addOns: Record<string, string | string[] | undefined>) =>
  Object.entries(addOns)
    .filter(([_, value]) => value && value.length > 0)
    .map(([key, value]) => ({
      originAddonId: key,
      addonOptionIds: Array.isArray(value) ? value : ([value] as string[]),
    }));
const formatAddOns = (addOns: Record<string, string | string[] | undefined>, dish: DishType) => {
  const formattedAddon =
    convertAddOns(addOns)
      ?.map((addon) => {
        const dishAddon = dish.addons.find((item) => item.id === addon.originAddonId);
        if (!dishAddon) return;
        return {
          originAddonId: addon.originAddonId,
          name: dishAddon.name,
          // multiple: dishAddon.multiple,
          options: addon.addonOptionIds
            .map((optId) => {
              const dishAddonOption = dishAddon.options.find((item) => item.id === optId);
              if (!dishAddonOption) return;
              return {
                originAddonOptionId: optId,
                name: dishAddonOption.name,
                price: dishAddonOption.price || 0,
                calories: dishAddonOption.calories || 0,
              };
            })
            .filter(Boolean),
        };
      })
      .filter(Boolean) || [];

  return formattedAddon;
};

const mergeDishToServerCart = fromPromise(async (arg) => {
  console.log({ actor: 'Merge dish to server cart', arg });
  // targetId, currentId has set in checkIdExistAndExistence guard
  const dish = arg.input.payload as AddToCartInput;
  const body = {
    currentId: dish.currentId || '',
    targetId: dish.targetId || '',
    newAmountOfCurrent: dish.amount ?? 0,
  };

  const data = await api.cart.mergeDishInCart.mutate(body);
  return data;
});

export type BillSumary = {
  kcalTotal: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingCost: number;
  promoCode?: string;
  promoDiscount?: number;
};
