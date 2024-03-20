'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
import { Modal } from '_@shared/components/dialog/Modal';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
//RELATIVE MODULES
import AllergensAndIntolerance from './AllergensAndIntolerance';

function BuildPlanModal() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const allergenIds = searchParams?.get('allergens')?.split(',') || [];
  const intoleranceIds = searchParams?.get('intolerances')?.split(',') || [];
  const totalFilter = allergenIds?.length + intoleranceIds?.length;

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>
        <Button
          color="navy"
          className="btn-big ow:gap-2 ow:px-4 sm:hidden"
          trailingIcon={
            <div className="grid grid-flow-col items-start justify-start gap-2">
              <Show when={totalFilter}>
                <div className="w-fit min-w-[theme(spacing[4.5])] rounded-sm bg-yel-50 text-center text-yel-800 ow:text-12">
                  {totalFilter}
                </div>
              </Show>
              <ChevronDownIcon
                className={classcat([
                  'h-4 w-4 text-white transition-transform duration-200 ease-[cubic-bezier(0.87,_0,_0.13,_1)]',
                  open ? 'rotate-180' : '',
                ])}
              />
            </div>
          }
        >
          Allergens & Intolerance
        </Button>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay className="fixed z-overlay bg-blu-600 opacity-30 dir-inset-0 " />
        <div className="fixed z-toast flex items-end justify-start dir-inset-0">
          <Modal.Content
            className={classcat(['relative z-toast w-full', 'bg-yel-25 outline-none'])}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <Modal.Close
              className={classcat([
                'absolute -top-9 right-0 flex h-9 w-9 items-center justify-center bg-blu-500',
              ])}
            >
              <CloseIcon className="h-5 w-5 text-white" />
            </Modal.Close>
            <div className={classcat(['flex w-full flex-col space-y-6'])}>
              <AllergensAndIntolerance onClose={() => setOpen(false)} />
            </div>
          </Modal.Content>
        </div>
      </Modal.Portal>
    </Modal.Root>
  );
}

export default BuildPlanModal;
