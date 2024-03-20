'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import * as Select from '@radix-ui/react-select';
import { Controller, useFormContext } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon';
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
//HOOK, SERVER

type TDeliverySlotSelect = {
  name?: string;
  options: {
    value: string;
    label: string;
  }[];
};

const DeliverySlotSelect = ({ name = '', options }: TDeliverySlotSelect) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select.Root value={field.value} onValueChange={(value) => field.onChange(value)}>
          <Select.Trigger asChild>
            <button
              type="button"
              className={classcat([
                'flex items-center justify-between',
                'px-3 py-3.75',
                'border-[1px] border-solid border-blu-100',
                'focus-visible:outline-none',
                'hover:border-blu-300 hover:bg-yel-25 hover:shadow-input',
                'data-[state=open]:border-blu-300 data-[state=open]:bg-yel-25 data-[state=open]:shadow-input',
                "data-[invalid='true']:border-red-500",
                '[&>span]:text-14lig [&>span]:text-blu-500',
              ])}
            >
              <Select.Value placeholder={<span className="text-14lig text-blu-200">Choose</span>} />
              <Select.Icon>
                <ChevronDownIcon className="h-4.5 w-4.5" />
              </Select.Icon>
            </button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              side="bottom"
              className={classcat([
                'max-h-[theme(spacing[94]) flex bg-yel-50',
                'z-dropdown w-[theme(spacing[81.75])]',
                'md:w-[theme(spacing[160])]',
              ])}
            >
              <Select.Viewport className="border border-blu-300 p-2.75">
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    selected={option.value === field.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )}
    />
  );
};

export default DeliverySlotSelect;

const SelectItem = ({
  children,
  className,
  selected,
  ...props
}: Select.SelectItemProps & { selected: boolean }) => {
  return (
    <Select.Item
      className={classcat([
        'grid grid-cols-[24px_1fr] items-center gap-2',
        'py-2.5 pe-4 ps-3',
        'cursor-pointer outline-none',
        'last:[&>span]:col-start-2 last:[&>span]:text-14lig last:[&>span]:text-blu-400',
        'hover:bg-yel-25',
        className,
      ])}
      {...props}
    >
      <Show when={selected}>
        <Select.ItemIndicator>
          <CheckIcon className="h-6 w-6 text-gre-300" />
        </Select.ItemIndicator>
      </Show>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};
