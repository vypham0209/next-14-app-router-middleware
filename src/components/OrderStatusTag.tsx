//THIRD PARTY MODULES
import classcat from 'classcat';
import { OrderStatus } from '@prisma/client';
import React, { ComponentPropsWithoutRef } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
//SHARED
import CookIcon from '_@shared/icons/CookIcon';
import ErrorIcon from '_@shared/icons/ErrorIcon';
import SuccessIcon from '_@shared/icons/SuccessIcon';
import DeliveryIcon from '_@shared/icons/DeliveryIcon';
import ProcessingIcon from '_@shared/icons/ProcessingIcon';
import OrderAcceptIcon from '_@shared/icons/OrderAcceptIcon';

const orderStatus = {
  [OrderStatus.PLACED]: {
    icon: ProcessingIcon,
    label: 'Processing',
    className: 'bg-cya-300',
  },
  [OrderStatus.ACCEPT]: {
    icon: OrderAcceptIcon,
    label: 'Accepted',
    className: 'bg-frgre-2',
  },
  [OrderStatus.PREPARING]: {
    icon: CookIcon,
    label: 'Preparing',
    className: 'bg-org-200',
  },
  [OrderStatus.DELIVERING]: {
    icon: DeliveryIcon,
    label: 'Delivering',
    className: 'bg-pur-light',
  },
  [OrderStatus.FINISHED]: {
    icon: SuccessIcon,
    label: 'Completed',
    className: 'bg-gre-200',
  },
  [OrderStatus.CANCELLED]: {
    icon: ErrorIcon,
    label: 'Cancelled',
    className: 'bg-red-200',
  },
};

type Props = ComponentPropsWithoutRef<'div'> & { status: OrderStatus };

function OrderStatusTag({ status, className = '', ...props }: Props) {
  const value = orderStatus?.[status as keyof typeof orderStatus];
  const Icon = value?.icon || undefined;
  return (
    <div
      className={classcat([
        'grid w-fit grid-flow-col grid-cols-[theme(spacing.6)_1fr] items-center justify-center gap-3 rounded-full py-2 pi-4',
        'md:py-3 md:pi-6',
        value?.className,
        className,
      ])}
      {...props}
    >
      <Show when={!!Icon}>
        <Icon className={classcat('h-6 w-6')} />
      </Show>
      <p className={classcat(['text-16 text-blu-500'])}>{value?.label}</p>
    </div>
  );
}

export default OrderStatusTag;
