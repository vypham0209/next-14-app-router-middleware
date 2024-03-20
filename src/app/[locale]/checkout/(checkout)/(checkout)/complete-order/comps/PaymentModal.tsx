//THIRD PARTY MODULES
import classcat from 'classcat';
import { useEffect, useState } from 'react';
import { useCartActor } from '_@landing/machine/cart';
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine';
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CheckOutType } from '_@landing/app/[locale]/checkout/types/checkout-type';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import { Modal } from '_@shared/components/dialog/Modal';
//SHARED
import { nextApi } from '_@shared/utils/api';
import { useToastStore } from '_@shared/stores/toast/useToastStore';
//HOOK, SERVER
import useFilterQueryString from '_@landing/hook/useFilterQueryString';
//RELATIVE MODULES
import { useOrderContext } from '../../../context/OrderContext';
//RELATIVE MODULES

type PaymentModalProps = {
  open: boolean;
  orderId: string;
  deliveryType: string;
  checkOutType?: CheckOutType;
  setOpen: (isOpen: boolean) => void;
};

const PaymentModal = ({
  open,
  orderId,
  deliveryType,
  checkOutType = CheckOutType.Order,
  setOpen,
}: PaymentModalProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const toast = useToastStore((state) => state);
  const { setTimesOfFailedPayments } = useOrderContext();
  const [_, orderSend] = useCartActor();
  const [__, mealPlanSend] = useMealPlanActor();
  const filter = useFilterQueryString();
  const utils = nextApi.useContext();
  const global = useGlobalContext();
  const userId = global.user?.id;

  const cancelPayment = () => {
    setOpen(false);
  };

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret || !stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return;
      switch (paymentIntent.status) {
        case 'succeeded':
          toast.showToast({ description: 'Payment succeeded!', type: 'success' });
          break;
        case 'processing':
          toast.showToast({ description: 'Your payment is processing.', type: 'help' });
          break;
        case 'requires_payment_method':
          toast.showToast({
            description: 'Your payment was not successful, please try again.',
            type: 'error',
          });
          break;
        case 'canceled':
          toast.showToast({ description: 'Your payment was canceled', type: 'help' });
          break;
        default:
          toast.showToast({ description: 'Something went wrong.', type: 'help' });
      }
    });
  }, [stripe, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then(({ error }) => {
        if (!error) {
          if (checkOutType === CheckOutType.MealPlan) mealPlanSend({ type: 'CHECKOUT_DONE' });
          else orderSend({ type: 'CHECKOUT_CART_DONE' });
          setTimesOfFailedPayments(0);
          filter(
            { order_id: orderId, delivery_type: deliveryType, checkout_type: checkOutType },
            '/checkout/done',
          );
          if (userId) utils.userProfile.getMyProfile.invalidate();
          return;
        }
        if (error && error.type !== 'validation_error') {
          setTimesOfFailedPayments((prev) => prev + 1);
        }
        filter({}, '/checkout/failed');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal.Root open={open}>
      <Modal.Overlay className="fixed z-overlay bg-blu-600/30 dir-inset-0" />
      <Modal.Content
        className={classcat([
          'z-overlay bg-yel-25 p-6 outline-none',
          'w-[327px]',
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'lg:w-[800px] lg:py-14 lg:pi-20',
        ])}
      >
        <h3 className="mb-6 text-18 text-blu-400 lg:mb-10 lg:text-36">
          Please enter your card information
        </h3>

        <form className="m-auto w-full" id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
          <div className="mt-4 flex items-center">
            <div className="flex-1 text-14">
              <span className="cursor-pointer text-blu-500" onClick={cancelPayment}>
                CANCEL
              </span>
            </div>
            <Button
              className="btn-big max-w-[282px] flex-1 py-3 text-14"
              color="navy"
              disabled={loading || !stripe || !elements}
              id="submit"
              type="submit"
            >
              PAY
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
};

export default PaymentModal;
