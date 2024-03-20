//THIRD PARTY MODULES
import * as z from 'zod';
import classcat from 'classcat';
import { SpicyLevel } from '@prisma/client';
import isNumeric from '_@landing/utils/isNumeric';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import BaseFormItem from '_@shared/components/BaseFormItem';
import FormInput from '_@shared/components/input/FormInput';
import FormCheckboxArray from '_@shared/components/checkbox/FormCheckboxArray';
//HOOK, SERVER
import useSetSearchParam from '_@landing/hook/useSetSearchParams';

const numberValidation = z.string().refine(isNumeric, { message: 'Invalid number' }).optional();

const valuesSchema = z
  .object({
    spiceLevel: z.array(z.enum(Object.values(SpicyLevel) as any)),
    price: z.object({
      from: numberValidation,
      to: numberValidation,
    }),
    calories: z.object({
      from: numberValidation,
      to: numberValidation,
    }),
  })
  .refine(
    (data) => {
      const { from, to } = data.price;
      const formNumber = Number(from);
      const toNumber = Number(to);
      if (!formNumber || !toNumber) return true;
      if (formNumber < toNumber) return true;
    },
    { message: 'Please enter the correct number', path: ['price.to'] },
  )
  .refine(
    (data) => {
      const { from, to } = data.calories;
      const formNumber = Number(from);
      const toNumber = Number(to);
      if (!formNumber || !toNumber) return true;
      if (formNumber < toNumber) return true;
    },
    { message: 'Please enter the correct number', path: ['calories.to'] },
  );

type Values = z.infer<typeof valuesSchema>;

export default function FilterOther({ onClose }: { onClose: () => void }) {
  const { setSearchParams } = useSetSearchParam();
  const searchParams = useSearchParams();
  const spiceLevelParams = searchParams.get('spiceLevel');
  const priceFrom = searchParams.get('priceFrom');
  const priceTo = searchParams.get('priceTo');
  const caloriesFrom = searchParams.get('caloriesFrom');
  const caloriesTo = searchParams.get('caloriesTo');

  const methods = useForm<Values>({
    mode: 'onBlur',
    resolver: zodResolver(valuesSchema),
    defaultValues: {
      spiceLevel: spiceLevelParams?.split(',') || [],
      price: {
        from: priceFrom ? `${parseFloat(priceFrom)}` : '',
        to: priceTo ? `${parseFloat(priceTo)}` : '',
      },
      calories: {
        from: caloriesFrom ? `${parseFloat(caloriesFrom)}` : '',
        to: caloriesTo ? `${parseFloat(caloriesTo)}` : '',
      },
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(({ spiceLevel, price, calories }) => {
    setSearchParams({
      spiceLevel: spiceLevel ? spiceLevel.join(',') : undefined,
      priceFrom: price?.from,
      priceTo: price?.to,
      caloriesFrom: calories?.from,
      caloriesTo: calories?.to,
    });

    onClose();
  });

  const clearFilter = () => {
    setSearchParams({
      spiceLevel: '',
      priceFrom: '',
      priceTo: '',
      caloriesFrom: '',
      caloriesTo: '',
    });
    reset({
      spiceLevel: [],
      calories: {
        from: '',
        to: '',
      },
      price: {
        from: '',
        to: '',
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        key={searchParams.toString()}
        onSubmit={onSubmit}
        className={classcat([
          'flex  flex-col space-y-6 bg-blu-500 ',
          'max-h-[60vh] min-h-[calc(460rem/16)] sm:min-h-[calc(356rem/16)]',
          'pb-8 pt-4 pi-6 md:pb-10 md:pt-6 md:pi-10',
        ])}
      >
        <div className="flex flex-col space-y-6 overflow-hidden">
          <div className="grow space-y-6 overflow-auto">
            <div className="space-y-2">
              <p className="text-start text-16 text-white">Spice level</p>
              <div
                key={'spiceLevel' + spiceLevelParams}
                className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4"
              >
                {spicyLevel.map((spice) => (
                  <div key={spice.value} className="w-full">
                    <FormCheckboxArray
                      name="spiceLevel"
                      value={spice.value}
                      labelClassName="text-white text-14lig"
                      label={spice.label}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-start text-16 text-white">Price</p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(calc(222rem/16),1fr))] gap-x-4 gap-y-2">
                <FormPriceInput prefix="AED" name="price.from" placeholder="From" />
                <FormPriceInput prefix="AED" name="price.to" placeholder="To" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-start text-16 text-white">Calories</p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(calc(222rem/16),1fr))] gap-x-4 gap-y-2">
                <FormPriceInput prefix="kcal" name="calories.from" placeholder="From" />
                <FormPriceInput prefix="kcal" name="calories.to" placeholder="To" />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={clearFilter} variant="ghost">
              Clear filter
            </Button>
            <Button type="submit" className="ow:w-30">
              Apply
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

const FormPriceInput = ({
  name,
  placeholder,
  prefix,
}: {
  name: string;
  placeholder: string;
  prefix: string;
}) => {
  return (
    <BaseFormItem className="relative" name={name}>
      <>
        <FormInput name={name} theme="dark" className="ow:pr-12" placeholder={placeholder} />
        <span className="absolute end-2.75 top-2 text-14lig text-white">{prefix}</span>
      </>
    </BaseFormItem>
  );
};

const spicyLevel = [
  {
    value: SpicyLevel.NON,
    label: 'Not spicy',
  },
  {
    value: SpicyLevel.LIG,
    label: 'Mild',
  },
  {
    value: SpicyLevel.MED,
    label: 'Spicy',
  },
  {
    value: SpicyLevel.HOT,
    label: 'Hot',
  },
];
