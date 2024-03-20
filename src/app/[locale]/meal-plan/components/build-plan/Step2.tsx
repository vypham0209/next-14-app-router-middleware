//THIRD PARTY MODULES
import classcat from 'classcat';
import { useRouter } from 'next-intl/client';
import { useCallback, useEffect } from 'react';
import { DayOfWeek, MealType } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine';
import {
  dayOptions,
  mealOptions,
  otherRepeatOptions,
  repeatOptions,
} from '_@landing/constants/meal-plan';
//LAYOUT, COMPONENTS
import BaseFormItem from '_@shared/components/BaseFormItem';
import FormTagSelect from '_@shared/components/tag-select/FormTagSelect';
//RELATIVE MODULES
import RepeatTooltip from './RepeatTooltip';
import StepFormWrapper from './StepWrapper';
import OtherRepeatSelect from './OtherRepeatSelect';
import { TStep, useBuildPlanContext } from '../../context/BuildPlanContext';
import { BuildPlanStep2Schema, buildPlanStep2Schema } from '../../schema/build-plan-schema';

function Step2() {
  const { data, setStep, setData } = useBuildPlanContext();
  const { push } = useRouter();
  const [_, send] = useMealPlanActor();
  const methods = useForm<BuildPlanStep2Schema>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(buildPlanStep2Schema),
    defaultValues: {
      meals: [MealType.Breakfasts, MealType.Lunch, MealType.Dinner],
      days: [
        DayOfWeek.Mon,
        DayOfWeek.Tue,
        DayOfWeek.Wed,
        DayOfWeek.Thu,
        DayOfWeek.Fri,
        DayOfWeek.Sat,
        DayOfWeek.Sun,
      ],
      repeat: 4,
    },
  });

  const {
    setValue,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = methods;

  const onPrev = () => {
    const values = getValues();
    setData((prev) => ({
      ...prev,
      step2: values,
    }));
    setStep((prev) => (prev - 1) as TStep);
  };

  const onFinish = (values: BuildPlanStep2Schema) => {
    send({
      type: 'CHANGE_CONFIG',
      payload: {
        category: data.step1.category,
        ...values,
      },
    });
    push('/meal-plan/customize-plan');
  };

  const _resetValues = useCallback(() => {
    setValue('days', data.step2.days);
    setValue('meals', data.step2.meals);
    setValue('repeat', data.step2.repeat);
  }, [data.step2.days, data.step2.meals, data.step2.repeat, setValue]);

  useEffect(() => {
    _resetValues();
  }, [_resetValues]);

  return (
    <FormProvider {...methods}>
      <StepFormWrapper onNext={handleSubmit(onFinish)} onPrev={onPrev} disableNext={!isValid}>
        <div className="grid gap-6 md:gap-10">
          <BaseFormItem
            name="meals"
            label="How many meals per day?"
            labelClassName="text-16"
            className="ow:space-y-2 md:space-y-4"
          >
            <FormTagSelect
              mode="multiple"
              options={mealOptions}
              styles={{
                containerClassName: '[&>*]:md:mb-0 [&>*:last-child]:mb-0',
              }}
            />
          </BaseFormItem>
          <BaseFormItem
            name="days"
            label="Deliver on"
            labelClassName="text-16"
            className="ow:space-y-2 md:space-y-4"
          >
            <FormTagSelect
              mode="multiple"
              options={dayOptions}
              styles={{
                containerClassName: '[&>*]:md:mb-0 [&>*:nth-child(n+5)]:mb-0',
              }}
            />
          </BaseFormItem>
          <BaseFormItem
            name="repeat"
            label="Repeats"
            className="ow:space-y-2 md:space-y-4"
            renderLabel={(label) => (
              <label className={classcat(['flex items-center space-x-2', 'text-16'])}>
                <p>{label.label}</p>
                <RepeatTooltip />
              </label>
            )}
          >
            <FormTagSelect
              mode="single"
              options={repeatOptions}
              styles={{
                containerClassName: '[&>*]:md:mb-0 [&>*:nth-child(n+3)]:mb-0',
              }}
              suffixElement={<OtherRepeatSelect name="repeat" options={otherRepeatOptions} />}
            />
          </BaseFormItem>
        </div>
      </StepFormWrapper>
    </FormProvider>
  );
}

export default Step2;
