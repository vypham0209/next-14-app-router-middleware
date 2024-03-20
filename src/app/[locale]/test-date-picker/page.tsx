'use client';
//THIRD PARTY MODULES
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import FormDatePicker from '_@shared/components/date-picker/FormDatePicker';
import BaseTimePicker from '_@shared/components/time-picker/BaseTimePicker';
import FormTimePicker from '_@shared/components/time-picker/FormTimePicker';
import BaseDatePicker from '_@shared/components/date-picker/BaseDatePicker/BaseDatePicker';

export default function Page() {
  const [baseDate, setBaseDate] = useState<string | undefined>();
  const [baseTime, setBaseTime] = useState<string | undefined>();
  const formMethods = useForm();
  return (
    <div className="h-[700px] py-10">
      <BaseDatePicker
        name=""
        value={baseDate}
        onChange={(date) => {
          setBaseDate(date);
        }}
        triggerClasses="input-large"
      />
      <BaseTimePicker
        name=""
        value={baseTime}
        onChange={(date) => {
          setBaseTime(date);
        }}
        triggerClasses="input-large"
      />
      <FormProvider {...formMethods}>
        <FormDatePicker name="date" triggerClasses="input-large" />
        <FormTimePicker name="time" triggerClasses="input-large" />
      </FormProvider>
    </div>
  );
}
