//THIRD PARTY MODULES
import { Controller, useFormContext } from 'react-hook-form';
//RELATIVE MODULES
import DropdownSelect, { DropdownSelectProps } from './DropdownSelect';

const FormDropdownSelect = ({ name, onChange, ...props }: DropdownSelectProps) => {
  const { control } = useFormContext();

  if (!name) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DropdownSelect
          {...props}
          value={field.value}
          onChange={(value: any) => {
            if (onChange) onChange(value);
            field.onChange(value);
          }}
        />
      )}
    />
  );
};

export default FormDropdownSelect;
