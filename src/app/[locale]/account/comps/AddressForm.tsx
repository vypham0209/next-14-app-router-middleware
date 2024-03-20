//THIRD PARTY MODULES
import React from 'react'
import classcat from 'classcat'
import { FormProvider, useFormContext } from 'react-hook-form'
import { getDialCodeFromId } from '_@landing/utils/phoneFormat'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
import Switch from '_@shared/components/conditions/Switch'
import BaseFormItem from '_@shared/components/BaseFormItem'
import FormInput from '_@shared/components/input/FormInput'
import FormCheckbox from '_@shared/components/checkbox/FormCheckbox'
import DropdownInput from '_@landing/components/input/dropdown-input/DropdownInput'
//SHARED
import useProfile from '_@shared/hooks/useProfile'
import { AddressFormValues } from '_@shared/schemas/address'
//RELATIVE MODULES
import { useGlobalContext } from '../../global/GlobalProvider'
import { useAddressesContext } from '../context/AddressesContext'

export type AddressFormProps = {
  isVerifyPhone: boolean
  isLoading: boolean
  onChangeCountry: (value: {}[]) => void
  onChangePhoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (values: AddressFormValues) => void
}

function AddressForm(props: AddressFormProps) {
  const { isVerifyPhone, isLoading, onChangeCountry, onChangePhoneNumber, onSubmit } = props
  const { countryOptions = [] } = useGlobalContext()
  const [user] = useProfile()
  const { addresses, mode, setMode, editAddress, setEditAddress } = useAddressesContext()

  const methods = useFormContext<AddressFormValues>()
  const {
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = methods

  const onUseDefaultMail = () => {
    setValue('email', user?.email ?? '', {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const onCancel = () => {
    setMode('idle')
    setEditAddress(undefined)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classcat([
          'relative',
          'border border-blu-100',
          'grid gap-y-6 p-3.75',
          'lg:gap-y-8 lg:p-6',
          'scroll-mt-[--h-header]',
        ])}
      >
        <p className="text-18 text-blu-400 lg:pe-57.5 lg:text-24">
          {mode === 'add' ? 'New' : 'Edit'} Address
        </p>

        <BaseFormItem name="name" label="Address name">
          <FormInput placeholder="Type here" className="py-3.75 pi-3" />
        </BaseFormItem>

        <div className="h-px bg-blu-100" />

        <BaseFormItem
          name="address"
          label="Address"
          description={
            <span className="text-12lig text-blu-200">
              We only operate and deliver to Dubai address.
            </span>
          }
        >
          <FormInput placeholder="Type here" className="py-3.75 pi-3" />
        </BaseFormItem>

        <BaseFormItem
          labelClassName="text-14"
          name="phoneNumber"
          label="Phone"
          description={
            <Switch.Root>
              <Switch.Case when={!errors['phoneNumber'] && isVerifyPhone}>
                <p className="text-12lig text-gre-300">Verified!</p>
              </Switch.Case>
              <Switch.Case when={!errors['phoneNumber'] && !isVerifyPhone}>
                <p className="text-12lig text-blu-200">Will need to be verified!</p>
              </Switch.Case>
              <Switch.Case when={errors['phoneNumber']}>{null}</Switch.Case>
            </Switch.Root>
          }
        >
          <DropdownInput
            dropdownProps={{
              name: 'countryId',
              options: countryOptions,
              renderValue: (value) => {
                return typeof value === 'number'
                  ? `+${getDialCodeFromId(countryOptions, value) ?? ''}`
                  : ''
              },
              owStyles: {
                triggerClasses:
                  'ow:justify-end [&>span]:text-14lig [&>span]:leading-[theme(spacing[4.5])] pe-2',
                contentClasses: 'ow:h-84',
              },
              placeholder: 'Type here',
              onChange: onChangeCountry,
            }}
            placeholder="Type here"
            className={classcat([' border-none py-3.75 ps-0 pi-3', 'hocus:shadow-none'])}
            onChange={onChangePhoneNumber}
            inputMode="numeric"
          />
        </BaseFormItem>

        <BaseFormItem name="customerName" label="Name">
          <FormInput placeholder="Type here" className="py-3.75 pi-3" />
        </BaseFormItem>

        <BaseFormItem
          name="email"
          label="Email"
          renderLabel={({ label }) => {
            return (
              <div className={classcat(['flex items-center justify-between'])}>
                <p className="text-14 text-blu-400">{label}</p>
                <Button
                  onClick={onUseDefaultMail}
                  variant="ghost"
                  className="btn-medium text-yel-500"
                >
                  Use my account's email
                </Button>
              </div>
            )
          }}
          description={
            <Show when={!errors['email']}>
              <p className="text-12lig text-blu-200">
                Please provide correct and working email address, we will send you an electronic
                invoice via this email.
              </p>
            </Show>
          }
        >
          <FormInput placeholder="Type here" className="py-3.75 pi-3" />
        </BaseFormItem>

        <BaseFormItem
          name="note"
          label="Any note for us?"
          renderLabel={({ label }) => {
            return (
              <label className={classcat(['flex items-center justify-start space-x-1'])}>
                <p className="text-14 text-blu-400">{label}</p>
                <p className="text-12lig text-blu-200">(optional)</p>
              </label>
            )
          }}
        >
          <FormInput as="textarea" placeholder="Type here" className="h-30 py-3.75 pi-3" />
        </BaseFormItem>

        <BaseFormItem name="default">
          <FormCheckbox
            label="Save as default"
            labelClassName={classcat(['text-14lig text-blu-400'])}
            disabled={addresses?.length === 0 || editAddress?.default}
          />
        </BaseFormItem>

        <div
          className={classcat([
            'grid grid-cols-2 gap-x-5.5',
            'lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none',
            'lg:absolute lg:top-5.75 lg:dir-right-5.75',
          ])}
        >
          <Button
            color="navy"
            variant="outlined"
            className="btn-medium lg:w-18.75"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={!isDirty || isLoading}
            type="submit"
            color="navy"
            className="btn-medium lg:w-27.75"
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default AddressForm
