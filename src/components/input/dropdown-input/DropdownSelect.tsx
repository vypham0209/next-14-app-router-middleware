'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ComponentProps, Fragment, useMemo, useState } from 'react';
//SHARED
import { Assign } from '_@shared/utils/type';
import CheckIcon from '_@shared/icons/CheckIcon';
import SearchIcon from '_@shared/icons/SearchIcon';
import CheckboxIcon from '_@shared/icons/CheckboxIcon';
//RELATIVE MODULES
import ChevronDownIcon from './ChevronDownIcon';

export type Option = {
  value: string | number;
  label: string;
};

export type DropdownSelectProps = {
  options: Option[];
  placeholder?: string;
  owStyles?: {
    triggerClasses?: string | string[];
    contentClasses?: string | string[];
  };
  comboBoxStyles?: {
    inputClasses?: string | string[];
    optionClasses?: string | string[];
  };
  value?: (string | number) | Option[];
  renderValue?: (value?: (string | number) | Option[]) => string;
} & Assign<ComponentProps<typeof Combobox>, { multiple?: boolean }>;

const DropdownSelect = ({
  options = [] as any,
  owStyles,
  comboBoxStyles,
  placeholder,
  value,
  onChange,
  renderValue,
  ...rest
}: DropdownSelectProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredOptions = useMemo(
    () =>
      !query
        ? options
        : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  );

  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>
        <button
          className={classcat([
            'flex h-full w-full items-center justify-between py-0',
            'border-none outline-none',
            owStyles?.triggerClasses,
          ])}
          onClick={() => setOpen(true)}
        >
          <span>
            {renderValue
              ? renderValue(value)
              : Array.isArray(value)
              ? value.map((el: any) => el.label).join(', ')
              : options.find((opt) => opt.value === value)?.label || ''}
          </span>
          <ChevronDownIcon className="ms-0.5 h-3 w-3" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className={classcat([
            'z-dropdown border border-solid border-blu-300 bg-yel-50 p-4 will-change-[transform,opacity] focus:shadow-input',
            'h-96 w-81.5',
            'md:w-100',
            owStyles?.contentClasses,
          ])}
          sideOffset={-15}
          alignOffset={-1}
          onPointerDownOutside={() => {
            setOpen(false);
          }}
        >
          <Combobox
            {...(rest as ComponentProps<typeof Combobox>)}
            value={value}
            onChange={(value) => {
              if (onChange) {
                onChange(value);
              }
              setOpen(false);
              setQuery('');
            }}
          >
            {() => (
              <Fragment>
                <div
                  className={classcat([
                    'grid grid-flow-col grid-cols-[theme(spacing[4.5])_1fr] items-center ps-3',
                    'border border-solid border-blu-100',
                    'focus-within:border-blu-300 focus-within:shadow-input',
                  ])}
                >
                  <SearchIcon className="h-4.5 w-4.5 text-blu-200" />
                  <Combobox.Input
                    className={classcat([
                      'block w-full bg-transparent py-3.75 text-14lig leading-[theme(spacing[4.5])] text-blu-500 pi-3 placeholder:font-light placeholder:text-blu-200 focus:outline-none',
                      comboBoxStyles?.inputClasses,
                    ])}
                    autoComplete="off"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={placeholder}
                    displayValue={() => ''}
                  />
                </div>

                <ScrollArea.Root type="auto" className="mt-4 h-[calc(100%-4rem)] w-full">
                  <ScrollArea.Viewport className="h-full overflow-auto">
                    <Combobox.Options static>
                      {filteredOptions.map((item) => {
                        return (
                          <Combobox.Option
                            as="div"
                            key={item.value + item.label}
                            value={rest.multiple ? item : item.value}
                            className={classcat([
                              'cursor-pointer py-3.25 pi-3 hover:bg-yel-25',
                              comboBoxStyles?.optionClasses,
                            ])}
                          >
                            {rest.multiple
                              ? ({ selected }) => (
                                  <div className="space-i-2 flex items-center">
                                    <CheckboxIcon checked={selected} />
                                    <span className="text-14lig text-blu-400">{item.label}</span>
                                  </div>
                                )
                              : ({ selected }) => (
                                  <div className="space-i-2.5 flex items-center">
                                    {selected ? (
                                      <CheckIcon className="text-gre-300" />
                                    ) : (
                                      <div className="w-6" />
                                    )}
                                    <span className="text-14lig text-blu-400">{item.label}</span>
                                  </div>
                                )}
                          </Combobox.Option>
                        );
                      })}
                    </Combobox.Options>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar className="w-1.5 bg-yel-100" orientation="vertical">
                    <ScrollArea.Thumb className="w-1.5 bg-yel-200" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </Fragment>
            )}
          </Combobox>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DropdownSelect;
