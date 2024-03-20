'use client';
//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { dishTypeLabel } from '_@landing/constants/dish-type';
import { DishType, useCartActor } from '_@landing/machine/cart';
//LAYOUT, COMPONENTS
import Portal from '_@shared/components/Portal';
import Button from '_@shared/components/button/Button';
import ScrollArea from '_@landing/components/ScrollArea';
import BaseFormItem from '_@shared/components/BaseFormItem';
import FormInput from '_@shared/components/input/FormInput';
//SHARED
import PlusIcon from '_@shared/icons/PlusIcon';
import CloseIcon from '_@shared/icons/CloseIcon';
import useProfile from '_@shared/hooks/useProfile';
import DeleteIcon from '_@shared/icons/DeleteIcon';
//HOOK, SERVER
import useClickOutside from '_@landing/hook/useClickOutside';
//RELATIVE MODULES
import Options from './Options';
import ItemHeader from './ItemHeader';
import QuantityPicker from './QuantityPicker';
//TYPES MODULES
import type { Dishes } from '_@landing/server/dish/dish.type';
export type Addons = Dishes['addons'][number];

export const schema = z.object({
  sizeId: z.string().nonempty({ message: 'Please select a portion' }),
  note: z.string().max(200, 'It should not exceed 200 characters').optional(),
  addons: z.record(z.string(), z.string().or(z.array(z.string())).optional()),
});

type FormType = z.infer<typeof schema>;

function getMultipleOptionAddonDefault(addon: Addons) {
  return addon.options.filter((opt) => opt.default).map((opt) => opt.id);
}

function getSingleOptionAddonDefault(addon: Addons) {
  const defaultValues = addon.options.find((option) => option.default)?.id;
  return defaultValues || undefined;
}

function getOptionAddonsDefault(selectedDish?: DishType) {
  return selectedDish?.addons.reduce((acc, addon) => {
    return {
      ...acc,
      [addon.id]: addon.multiple
        ? getMultipleOptionAddonDefault(addon)
        : getSingleOptionAddonDefault(addon),
    };
  }, {});
}

function DishDetailSlideOver() {
  const [amount, setAmount] = useState(1);
  const [state, send] = useCartActor();
  const { selectedDish, defaultDish } = state.context;
  const ref = useRef<HTMLFormElement>(null);
  const [user] = useProfile();
  const [openWithAnimation, setOpen] = useState(false);
  const isLoading = !['user.idle', 'guest.idle'].some(state.matches);

  const formMethods = useForm<FormType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      sizeId: defaultDish
        ? defaultDish.sizeId
        : selectedDish?.sizes.find((size) => size.default)?.id,
      addons: getOptionAddonsDefault(selectedDish),
    },
  });
  const { watch, handleSubmit, reset } = formMethods;
  const sizeIdSelected = watch('sizeId');
  const currentAddOns = watch('addons');
  const userId = user?.id;
  const optionsSelectedSet = Object.keys(currentAddOns ?? {}).map((addOnId) => {
    const optionsSelected = currentAddOns[addOnId];
    return optionsSelected && optionsSelected?.length > 0
      ? [...(typeof optionsSelected === 'string' ? [optionsSelected] : optionsSelected)]
      : [];
  });

  const flattenedOptionsSelected = optionsSelectedSet.flat().filter((item) => item !== '');
  const flattenedAddons = selectedDish?.addons?.flatMap((item) => item.options) || [];
  const addOnsPrice = flattenedOptionsSelected.map(
    (id) => flattenedAddons.find((option) => option?.id === id)?.price || 0,
  );
  const addOnsCalories = flattenedOptionsSelected.map(
    (id) => flattenedAddons.find((option) => option?.id === id)?.calories || 0,
  );

  const addOnPriceTotal = addOnsPrice.reduce((sum, price) => sum + price, 0);
  const addOnsCaloriesTotal = addOnsCalories.reduce((sum, price) => sum + price, 0);

  const sizePrice = selectedDish?.sizes.find((size) => size.id === sizeIdSelected)?.price;
  const sizeCalories = selectedDish?.sizes.find((size) => size.id === sizeIdSelected)?.calories;

  const totalPrice = (addOnPriceTotal || 0) + (sizePrice || 0);
  const totalCalories = (addOnsCaloriesTotal || 0) + (sizeCalories || 0);

  const closeSlideOver = () => {
    send({ type: 'DESELECT_DISH' });
  };

  useClickOutside(ref, () => {
    if (selectedDish) closeSlideOver();
  });

  const handleDeleteDish = () => {
    send({ type: 'REMOVE_ITEM', payload: { id: defaultDish?.id || '' } });
  };

  const validateValue = (value: FormType) => {
    return selectedDish?.addons.every((addon) => {
      if (addon.required) {
        const data = value.addons?.[addon.id];
        const hasData = Array.isArray(data) ? data.length > 0 : !!data;
        return hasData;
      }
      return true;
    });
  };

  const onSubmit = handleSubmit((value) => {
    if (!selectedDish?.id) return;
    if (!validateValue(value)) return;

    send({
      type: 'ADD_ITEM',
      payload: {
        dishInCartId: defaultDish?.id,
        originDishId: +selectedDish.id,
        userId: userId,
        calories: 0,
        amount,
        type: selectedDish.type,
        name: selectedDish.name,
        spicyLevel: selectedDish.spicyLevel,
        ...value,
      },
    });
  });

  useEffect(() => {
    if (!defaultDish) return;
    reset({
      sizeId: defaultDish?.size?.originSizeId,
      note: defaultDish?.note || undefined,
      addons:
        defaultDish?.addons.reduce(
          (acc, addon) => ({
            ...acc,
            [addon.originAddonId]: selectedDish?.addons.find((a) => a.id === addon.originAddonId)
              ?.multiple
              ? addon.options.map((opt) => opt.originAddonOptionId)
              : addon.options[0].originAddonOptionId,
          }),
          {},
        ) || {},
    });
    setAmount(defaultDish?.amount || 1);
  }, [defaultDish, reset, selectedDish]);

  useEffect(() => {
    setTimeout(() => setOpen(true));
  }, []);

  useEffect(() => {
    const main = document.querySelector('#main') as HTMLElement;
    if (!main) return;
    if (openWithAnimation) {
      const scrollWidth = window.innerWidth - main.clientWidth;
      main.style.overflow = 'hidden';
      main.style.paddingInlineEnd = `${scrollWidth}px`;
    }
    return () => {
      main.style.overflow = 'auto';
      main.style.paddingInlineEnd = `${0}px`;
    };
  }, [openWithAnimation]);

  return (
    <Portal asChild>
      <div
        className={classcat([
          'fixed inset-0 z-overlay flex items-end',
          openWithAnimation
            ? 'pointer-events-auto top-[calc(var(--h-header)_-_2px)] bg-blu-600/30 transition-[background] duration-300'
            : 'pointer-events-none bottom-full',
        ])}
      >
        <div className={classcat(['relative h-full w-full overflow-hidden'])}>
          <FormProvider {...formMethods}>
            <form
              onSubmit={onSubmit}
              ref={ref}
              className={classcat([
                'absolute grid gap-4 bg-yel-25 p-4',
                'h-[calc(597rem/16)] w-full',
                'max-h-[calc(100%-3.5rem)]',
                'md:h-full md:max-h-full md:max-w-[calc(609rem/16)] md:p-10',
                'transition-[bottom_right] duration-300 md:bottom-0',
                openWithAnimation ? 'bottom-0 md:right-0' : '-bottom-full md:-right-full',
              ])}
            >
              <button
                type="button"
                onClick={closeSlideOver}
                className="absolute bottom-full right-0 grid h-12 w-12 place-items-center bg-yel-25 md:right-full md:top-0"
              >
                <CloseIcon className="h-5 w-5 text-blu-500" />
              </button>
              <div className="flex flex-col overflow-hidden ow:mt-0">
                <ItemHeader
                  className="mb-6 hidden md:flex"
                  title={selectedDish?.name || ''}
                  imageSrc={selectedDish?.images?.[0]}
                />
                <ScrollArea>
                  <div className={classcat(['grid gap-2 pb-6', 'md:gap-4'])}>
                    <ItemHeader
                      className="md:hidden"
                      title={selectedDish?.name || ''}
                      imageSrc={selectedDish?.images?.[0]}
                    />
                    {selectedDish && (
                      <>
                        <Options
                          dishId={selectedDish?.id}
                          id="sizes"
                          multiple={false}
                          name={'sizeId'}
                          label={dishTypeLabel?.[selectedDish.type]}
                          required
                          options={selectedDish?.sizes?.sort((a, b) => a.price - b.price)}
                        />
                        {selectedDish.addons?.map((addOn) => (
                          <Options
                            key={addOn.id}
                            id={addOn.id}
                            name={`addons.${addOn.id}`}
                            label={addOn.name}
                            dishId={selectedDish?.id}
                            multiple={addOn.multiple}
                            required={addOn.required}
                            options={addOn.options}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </ScrollArea>
              </div>
              <div className="grid content-end gap-4">
                <BaseFormItem name="note">
                  <FormInput
                    className="input-large"
                    as="textarea"
                    rows={4}
                    placeholder="Add any special instructions?"
                  />
                </BaseFormItem>

                <div className="justify-between space-y-4 md:flex md:space-y-0">
                  <div className="flex items-center justify-between">
                    <QuantityPicker quantity={amount} setQuantity={setAmount} />
                    <span className="text-18 font-bold text-blu-400 md:hidden">
                      {(totalPrice * amount).toFixed(2)} AED
                    </span>
                  </div>
                  <div className="flex items-center justify-end md:space-i-4">
                    <span className="hidden text-18 font-bold text-blu-400 md:block">
                      {(totalPrice * amount).toFixed(2)} AED
                    </span>
                    <span className="hidden rounded-full bg-yel-50 px-2.5 py-1 text-14lig text-blu-300 md:block">
                      {totalCalories * amount} kcal
                    </span>
                    {defaultDish?.id && amount === 0 ? (
                      <Button
                        isLoading={isLoading}
                        onClick={handleDeleteDish}
                        color="red"
                        className="btn-big sm:w-28.5"
                        variant="filled"
                        leadingIcon={<DeleteIcon className="h-5 w-5 text-white" />}
                        disabled={amount === 0 && !defaultDish?.id}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        isLoading={isLoading}
                        type="submit"
                        color="navy"
                        className="btn-big sm:w-28.5"
                        variant="filled"
                        leadingIcon={!defaultDish?.id && <PlusIcon className="h-4 w-4" />}
                        disabled={
                          (amount === 0 && !defaultDish?.id) ||
                          !(schema.safeParse(watch()).success && validateValue(watch()))
                        }
                      >
                        {!defaultDish?.id ? 'Add' : 'Save'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Portal>
  );
}

export default function Wrapper() {
  const [{ context }] = useCartActor();
  const { selectedDish } = context;

  if (!selectedDish) return null;
  return <DishDetailSlideOver />;
}
