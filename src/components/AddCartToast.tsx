'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useAddCartToastStore } from '_@landing/stores/toast/useAddCartToastStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
import CheckCircleIcon from '_@shared/icons/CheckCircleIcon';
//TYPES MODULES
import type { ToastProps as ToastRootProps } from '@radix-ui/react-toast';

const baseClasses = classcat([
  'flex max-w-[288px] md:max-w-[400px]',
  'data-[state=closed]:animate-toast-hide data-[state=open]:animate-toast-slide-in-right',
]);

const AddToCartToast = (props: ToastRootProps) => {
  const { open, title, image, quantity, description, onOpenChange } = useAddCartToastStore(
    (state) => state,
  );

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        className={classcat([
          'items-stretch',
          'data-[state=open]:animate-toast-in',
          'data-[state=closed]:animate-toast-out',
          'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
          'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]',
          'data-[swipe=end]:animate-toast-swipe-out',
          'bg-gre-300 text-white',
          baseClasses,
        ])}
        duration={3000}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        <div className={classcat(['relative grid w-full'])}>
          <ToastPrimitive.Close
            className={classcat([
              'absolute right-full top-0 flex h-8 w-8 items-center justify-center bg-gre-300 ',
              'md:h-12 md:w-12',
            ])}
          >
            <CloseIcon className={classcat(['h-5 w-5 text-white'])} />
          </ToastPrimitive.Close>
          <div className={classcat(['grid gap-4  px-3 pb-3 pt-2', 'md:px-6 md:pb-6 md:pt-4'])}>
            <ToastPrimitive.Title className="grid grid-flow-col items-center justify-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-white md:h-6 md:w-6" />
              <p className={classcat(['text-12 uppercase text-white md:text-14'])}>{title}</p>
            </ToastPrimitive.Title>
            <div
              className={classcat([
                'grid grid-flow-col grid-cols-[theme(spacing[16])_1fr] items-start  gap-4 md:grid-cols-[theme(spacing[25])_1fr]',
              ])}
            >
              <div className={classcat(['h-16 w-16 shrink-0 md:h-25 md:w-25'])}>
                <img
                  className={classcat(['h-full w-full object-cover'])}
                  src={process.env.NEXT_PUBLIC_CDN_HOST + image}
                  alt="Dish image"
                />
              </div>
              <div className={classcat(['grid grid-cols-1 gap-1 md:gap-2 '])}>
                <ToastPrimitive.Description
                  className={classcat(['line-clamp-2 text-14 text-white md:text-16'])}
                >
                  {description}
                </ToastPrimitive.Description>
                <div className={classcat(['grid grid-flow-col justify-start gap-1'])}>
                  <p className={classcat(['text-14lig text-white'])}>Qty:</p>
                  <p className={classcat(['text-14 text-white'])}>{quantity}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <Button
              as="link"
              href="/checkout/information"
              className="btn-medium max-w-[50%] basis-1/2 md:btn-very-big"
              color="secondary"
              variant="filled"
              onClick={() => onOpenChange(false)}
            >
              Checkout
            </Button>
            <Button
              as="link"
              href="/my-cart"
              className="btn-medium max-w-[50%] basis-1/2 md:btn-very-big"
              color="navy"
              onClick={() => onOpenChange(false)}
            >
              View cart
            </Button>
          </div>
        </div>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport
        className={classcat([
          'fixed end-0 top-[--h-header] p-0',
          'z-toast w-full max-w-[288px] md:max-w-[400px]',
        ])}
      />
    </ToastPrimitive.Provider>
  );
};

export default AddToCartToast;
