'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import * as Popover from '@radix-ui/react-popover';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
//SHARED
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
//RELATIVE MODULES
import AllergensAndIntolerance from './AllergensAndIntolerance';

function Filter() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const allergenIds = searchParams?.get('allergens')?.split(',') || [];
  const intoleranceIds = searchParams?.get('intolerances')?.split(',') || [];
  const totalFilter = allergenIds?.length + intoleranceIds?.length;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          color="navy"
          className="btn-big ow:hidden ow:gap-2 ow:px-4 ow:sm:grid"
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
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end" className="z-dropdown w-screen sm:w-[theme(spacing[135])]">
          <AllergensAndIntolerance onClose={() => setOpen(false)} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default Filter;
