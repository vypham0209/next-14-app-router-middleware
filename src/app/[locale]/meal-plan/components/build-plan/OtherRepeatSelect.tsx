'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import * as Select from '@radix-ui/react-select';
import { useFormContext } from 'react-hook-form';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon';
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
//HOOK, SERVER
import useWindowSize from '_@landing/hook/useWindowSize';

type TOtherRepeatSelect = {
  name: string;
  options: {
    value: number;
    label: string;
  }[];
};

const OtherRepeatSelect = ({ name, options }: TOtherRepeatSelect) => {
  const { watch, setValue } = useFormContext();
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const value = options.find((option) => option.value === watch(name));

  return (
    <Select.Root
      value={value?.value ? String(value.value) : undefined}
      onValueChange={(value) => setValue(name, Number(value))}
    >
      <Select.Trigger asChild>
        <button
          type="button"
          data-selected={!!value}
          className={classcat([
            'flex items-center space-x-2',
            'filter-item-small',
            'transition-colors',
            'rounded-full border text-blu-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[selected=true]:shadow-input',
            'border-blu-100 hover:border-blu-300 hover:disabled:border-blu-100',
            'data-[selected=true]:border-yel-500 hover:data-[selected=true]:border-yel-500 hover:disabled:data-[selected=true]:border-yel-500',
            'data-[selected=true]:bg-yel-200 hover:data-[selected=true]:bg-yel-300 hover:disabled:data-[selected=true]:bg-yel-200',
            '[&>span]:text-14 [&>span]:font-normal [&>span]:text-blu-400',
            'ow:py-1',
          ])}
        >
          {value ? <Select.Value /> : <p className="text-14 font-normal text-blu-400">Other</p>}
          <Select.Icon>
            <ChevronDownIcon className="h-4 w-4" />
          </Select.Icon>
        </button>
      </Select.Trigger>
      <Select.Content
        position="popper"
        side="top"
        alignOffset={isMobile ? -90 : 0}
        sideOffset={-10}
        className={classcat([
          'max-h-[theme(spacing[94]) flex bg-yel-50',
          'z-toast w-[theme(spacing[81.75])]',
          'md:w-[theme(spacing[145])]',
        ])}
      >
        <Select.Viewport className="border border-blu-300 p-2.75">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={String(option.value)}
              selected={option.value === value?.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};

export default OtherRepeatSelect;

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
