'use client';
//THIRD PARTY MODULES
import { useFooterContext } from '_@landing/app/[locale]/FooterProvider';
import classcat from 'classcat';
import { usePathname } from 'next-intl/client';
import { useEffect, useMemo } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
//SHARED
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
import CheckCircleIcon from '_@shared/icons/CheckCircleIcon';
//RELATIVE MODULES
import { CheckOutType } from '../../types/checkout-type';
import { useOrderContext } from '../context/OrderContext';
//RELATIVE MODULES

enum Step {
  information = 'information',
  'completeOrder' = 'complete-order',
}

const steps = {
  [Step.information]: 'Information',
  [Step.completeOrder]: 'Complete order',
} as const;

export default function Layout({ children }: any) {
  const { setShowFooter } = useFooterContext();
  const { type } = useOrderContext();
  const pathname = usePathname();
  const step = pathname?.match(/\/checkout\/(.*)/)?.[1];

  const backHref = useMemo(() => {
    return type === CheckOutType.MealPlan
      ? step === Step.information
        ? '/meal-plan/customize-plan'
        : '/checkout/information?type=meal-plan'
      : step === Step.information
      ? '/my-cart'
      : '/checkout/information';
  }, [step, type]);

  const backTitle = useMemo(() => {
    return type === CheckOutType.MealPlan
      ? 'Go back to Customize Meal Plan'
      : step === Step.information
      ? 'Go back to My cart'
      : 'Go back to previous step';
  }, [step, type]);

  useEffect(() => {
    setShowFooter(false);
    return () => setShowFooter(true);
  }, [setShowFooter]);

  return (
    <section className="grid gap-10 pt-6 md:pt-10">
      <div className="grid gap-6 md:gap-10">
        <div className="space-i-6 flex items-center">
          <Button
            as="link"
            href={backHref}
            variant="outlined"
            color="navy"
            className="flex h-9 items-center justify-center border border-blu-100 ow:w-9"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <span className="text-14 text-blu-500">{backTitle}</span>
        </div>

        <div className="flex flex-col justify-between space-y-6 md:flex-row md:items-center">
          <h3 className="text-36 text-blu-400 md:text-48">Checkout</h3>
          <div className="space-i-4 flex">
            <div className="space-i-2 flex items-center">
              <Show when={step === Step.completeOrder}>
                <CheckCircleIcon className="text-gre-300" />
              </Show>
              <span
                className={classcat([step === Step.information ? 'text-blu-500' : 'text-blu-100'])}
              >
                {steps[Step.information]}
              </span>
            </div>

            <div className="space-i-4 flex grow items-center">
              <span className="h-px grow bg-blu-100 md:w-10 md:grow-0"></span>
              <span
                className={classcat([
                  step === Step.completeOrder ? 'text-blu-500' : 'text-blu-100',
                ])}
              >
                {steps[Step.completeOrder]}
              </span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
