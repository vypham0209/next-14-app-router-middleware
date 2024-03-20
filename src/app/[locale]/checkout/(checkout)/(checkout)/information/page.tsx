'use client';
//THIRD PARTY MODULES
import { useEffect, useState } from 'react';
import { useRouter } from 'next-intl/client';
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine';
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider';
//RELATIVE MODULES
import { CheckOutType } from '../../../types/checkout-type';
import { useOrderContext } from '../../context/OrderContext';
import OrderInformationForm from './comps/OrderInformationForm';

export default function CheckoutPage() {
  const [isVerifyPhone, setVerifyPhone] = useState(false);
  const { type } = useOrderContext();
  const global = useGlobalContext();
  const user = global.user;
  const [state] = useMealPlanActor();
  const { replace } = useRouter();
  const isSyncing = ['fetching-category', 'syncing'].some(state.matches);
  const plan = state.context.plan;

  useEffect(() => {
    if (!isSyncing && type === CheckOutType.MealPlan && !plan.weeks?.length) {
      replace('/meal-plan/customize-plan');
    }
  }, [isSyncing, plan, replace, type]);

  return (
    <div className="grid gap-6 pb-20 md:gap-10 md:pb-36">
      <span className="text-18 text-blu-400 md:text-24">Please fill in your information</span>
      <OrderInformationForm
        addresses={user?.addresses}
        isVerifyPhone={isVerifyPhone}
        setVerifyPhone={setVerifyPhone}
      />
    </div>
  );
}
