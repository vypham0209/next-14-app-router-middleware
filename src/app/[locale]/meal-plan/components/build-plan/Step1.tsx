//THIRD PARTY MODULES
import { useCallback, useEffect } from 'react';
import { MealPlanCategory } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import BaseFormItem from '_@shared/components/BaseFormItem';
//RELATIVE MODULES
import StepWrapper from './StepWrapper';
import CategorySelect from './CategorySelect';
import { TStep, useBuildPlanContext } from '../../context/BuildPlanContext';
import { BuildPlanStep1Schema, buildPlanStep1Schema } from '../../schema/build-plan-schema';

function Step1() {
  const { data, setStep, setData } = useBuildPlanContext();
  const methods = useForm<BuildPlanStep1Schema>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(buildPlanStep1Schema),
    defaultValues: {
      category: MealPlanCategory.Ordinary,
    },
  });

  const { setValue, handleSubmit } = methods;

  const onNext = (values: BuildPlanStep1Schema) => {
    setData((prev) => ({
      ...prev,
      step1: values,
    }));
    setStep((prev) => (prev + 1) as TStep);
  };

  const _resetValues = useCallback(() => {
    setValue('category', data.step1.category);
  }, [data.step1.category, setValue]);

  useEffect(() => {
    _resetValues();
  }, [_resetValues]);

  return (
    <FormProvider {...methods}>
      <StepWrapper onNext={handleSubmit(onNext)}>
        <BaseFormItem
          name="category"
          label="Choose a plan which works best for you"
          description="You will be able to customize your preferred food and drinks later."
          labelClassName="text-16"
          descriptionClassName="ow:md:text-14lig text-blu-300"
        >
          <CategorySelect />
        </BaseFormItem>
      </StepWrapper>
    </FormProvider>
  );
}

export default Step1;
