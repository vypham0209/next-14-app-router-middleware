//THIRD PARTY MODULES
import classcat from 'classcat';
import { ComponentPropsWithoutRef } from 'react';
//SHARED
import ErrorIcon from '_@shared/icons/ErrorIcon';
import SuccessIcon from '_@shared/icons/SuccessIcon';

const deliveryStatus = {
  completed: {
    icon: SuccessIcon,
    label: 'Completed',
    className: 'bg-gre-200',
  },

  'not-specified': {
    icon: null,
    label: 'Not specified',
    className: 'bg-transparent border border-blu-100',
  },
  failed: {
    icon: ErrorIcon,
    label: 'Failed',
    className: 'bg-red-200',
  },
};

type TDeliveryStatusTagProps = ComponentPropsWithoutRef<'div'> & { status: string };

function DeliveryStatusTag({ status, className = '', ...props }: TDeliveryStatusTagProps) {
  const value = deliveryStatus?.[status as keyof typeof deliveryStatus];
  const Icon = value?.icon || undefined;
  return (
    <div
      className={classcat([
        'grid w-fit grid-flow-col items-center justify-center gap-1 rounded-full py-1 pi-2',
        value?.className,
        className,
      ])}
      {...props}
    >
      {Icon && <Icon className={classcat('h-4.5 w-4.5')} />}
      <p className={classcat(['text-12 text-blu-500'])}>{value?.label}</p>
    </div>
  );
}

export default DeliveryStatusTag;
