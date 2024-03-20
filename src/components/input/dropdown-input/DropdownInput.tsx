//THIRD PARTY MODULES
import classcat from 'classcat';
import { useFormContext } from 'react-hook-form';
//LAYOUT, COMPONENTS
import BaseInput, { type BaseInputProps } from '_@shared/components/input/BaseInput';
//RELATIVE MODULES
import FormDropdownSelect from './FormDropdownSelect';
import { DropdownSelectProps } from './DropdownSelect';
//TYPES MODULES
import type { As } from '_@shared/components/input/BaseInput';

const baseClasses = [
  'w-full border border-blu-100 bg-transparent transition relative',
  'text-blu-500 placeholder:text-blu-200',
  'focus-visible:outline-none',
  'focus-within:border-blu-300 focus-within:bg-yel-25 focus-within:shadow-input',
  'hover:border-blu-300 hover:bg-yel-25 hover:shadow-input',
  "data-[invalid='true']:border-red-500 data-[invalid='true']:bg-red-100",
  'before:absolute before:z-[1] before:left-15.5 before:top-1/2 before:h-4.5 before:w-0.25 before:-translate-y-1/2 before:bg-blu-100 before:content-[""]',
];

export type DropdownInputProps<T extends As> = BaseInputProps<T> & {
  dropdownProps: Omit<DropdownSelectProps, 'value'>;
  wrapperClassName?: string;
};

const DropdownInput = <T extends As = 'input'>({
  dropdownProps,
  wrapperClassName,
  name,
  ...props
}: DropdownInputProps<T>) => {
  const { register, formState } = useFormContext();

  if (!name) return null;
  const errMessage = formState.errors[name]?.['message'] as unknown as string;

  return (
    <div
      className={classcat([
        'grid grid-flow-col grid-cols-[theme(spacing[15.5])_1fr]',
        baseClasses,
        wrapperClassName,
      ])}
      data-invalid={errMessage ? true : undefined}
      aria-describedby={errMessage ? `err-${props.id}` : undefined}
    >
      <FormDropdownSelect {...dropdownProps} />
      <BaseInput
        {...register(name)}
        {...props}
        data-invalid={errMessage ? true : undefined}
        aria-describedby={errMessage ? `err-${props.id}` : undefined}
      />
    </div>
  );
};

export type TDropdownInput = <T extends As>(props: DropdownInputProps<T>) => JSX.Element;
export default DropdownInput;
