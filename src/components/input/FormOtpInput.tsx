'use client'

//THIRD PARTY MODULES
import { Controller, useFormContext } from 'react-hook-form'
//LAYOUT, COMPONENTS
import OtpInput from '_@landing/components/input/OtpInput'
//TYPES MODULES
import type { OtpInputProps } from '_@landing/components/input/OtpInput'

type FormOTPInputProps = {
  name: string
} & OtpInputProps

const FormOTPInput = ({ name, ...props }: FormOTPInputProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { invalid } }) => (
        <OtpInput {...props} onChange={onChange} onBlur={onBlur} isError={invalid} />
      )}
    />
  )
}

export type TFormOTPInput = (props: FormOTPInputProps) => JSX.Element
export default FormOTPInput
