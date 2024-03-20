//THIRD PARTY MODULES
import classcat from 'classcat';
import { debounce } from '_@landing/utils/debounce';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { DELAY_RESEND } from '_@landing/constants/verity-phone';
import { getDialCodeFromId, phoneFormat } from '_@landing/utils/phoneFormat';
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
import Switch from '_@shared/components/conditions/Switch';
import BaseFormItem from '_@shared/components/BaseFormItem';
import FormInput from '_@shared/components/input/FormInput';
import FormCheckbox from '_@shared/components/checkbox/FormCheckbox';
import DropdownInput from '_@landing/components/input/dropdown-input/DropdownInput';
//SHARED
import { RouterInputs, nextApi } from '_@shared/utils/api';
import { useToastStore } from '_@shared/stores/toast/useToastStore';
import { AddressFormValues, addressSchema } from '_@shared/schemas/address';
//RELATIVE MODULES
import UserVerifyModal from './VerifyModal';
import { useOrderContext } from '../../../context/OrderContext';

const defaultValues = {
  name: '',
  address: '',
  phoneNumber: '',
  countryId: 237,
  customerName: '',
  email: '',
  note: '',
  default: false,
};

export default function CreateAddressForm() {
  const utils = nextApi.useContext();
  const global = useGlobalContext();
  const user = global.user;
  const userId = global.user?.id;
  const countryOptions = global?.countryOptions || [];

  const { setShowAddressFormType, setCurrentAddressId } = useOrderContext();
  const [enabledResend, setEnabledResend] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_, setIsVerifyOtp] = useState(false);
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const showToast = useToastStore((state) => state.showToast);

  const methods = useForm<AddressFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isDirty, errors },
  } = methods;

  const { mutate: checkPhone, isLoading: isChecking } =
    nextApi.address.checkPhoneNumberVerifiedByUser.useMutation({
      onSuccess: (data) => {
        setIsVerifyPhone(data);
        setIsVerifyOtp(false);
      },
      onError: () => {
        showToast({ type: 'error', description: 'Verify phone failed!' });
      },
    });

  const resetDefault = async (addressId: string) => {
    await utils.userProfile.getMyProfile.invalidate();
    setShowAddressFormType('DEFAULT');
    setCurrentAddressId(addressId);
    setIsVerifyOtp(false);
  };

  const {
    data: dataCreate,
    mutate: createAddress,
    isLoading: isCreating,
  } = nextApi.address.createUserAddress.useMutation({
    onSuccess: ({ addressId }) => {
      if (isVerifyPhone) {
        showToast({ type: 'success', description: 'Changes saved!' });
        resetDefault(addressId);
        return;
      }
      setIsModalOpen(true);
      setEnabledResend(false);
    },
    onError: (error) => {
      if (error.data?.code === 'TOO_MANY_REQUESTS') {
        setIsModalOpen(true);
        return;
      }
      showToast({ type: 'error', description: error.message ?? 'Address created failed!' });
    },
  });

  const onVerify = () => {
    setIsVerifyPhone(true);
    setIsVerifyOtp(true);
  };

  const onSubmit = handleSubmit((values) => {
    if (!userId) return;
    const payload: RouterInputs['address']['createUserAddress'] = {
      ...values,
      phone: {
        phoneNumber: values.phoneNumber.split(' ').join(''),
        countryId: values.countryId,
      },
      userId,
      isDefault: values.default,
    };

    createAddress(payload);
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCheckPhone = useCallback(
    debounce((phoneNumber, countryId) => {
      if (!phoneNumber || !countryId) return;
      checkPhone({
        phone: {
          phoneNumber: phoneNumber.split(' ').join(''),
          countryId,
        },
      });
      setIsDebouncing(false);
    }, 300),
    [],
  );

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericInput = value.replace(/\D/g, '');
    setValue('phoneNumber', phoneFormat(numericInput), { shouldDirty: true });
    setIsDebouncing(true);
    debounceCheckPhone(getValues('phoneNumber'), getValues('countryId'));
  };

  const onChangeCountry = (value: {}[]) => {
    setIsDebouncing(true);
    debounceCheckPhone(getValues('phoneNumber'), Number(value));
  };

  const onUseDefaultMail = () => {
    setValue('email', user?.email ?? '', {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    let timeOut: any;
    if (!enabledResend) {
      timeOut = setTimeout(() => {
        setEnabledResend(true);
      }, DELAY_RESEND);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [enabledResend]);

  return (
    <>
      <div className={classcat(['grid max-w-[theme(spacing.224)] gap-y-6', 'lg:gap-y-10'])}>
        <FormProvider {...methods}>
          <div
            className={classcat([
              'relative',
              'border border-blu-100',
              'grid gap-y-6 p-3.75',
              'lg:gap-y-8 lg:p-6',
              'scroll-mt-[--h-header]',
            ])}
          >
            <p className="text-18 text-blu-400 lg:pe-57.5 lg:text-24">New Address</p>

            <BaseFormItem name="name" label="Address name">
              <FormInput placeholder="Type here" className="py-3.75 pi-3" />
            </BaseFormItem>

            <div className="h-px bg-blu-100" />

            <BaseFormItem name="address" label="Address">
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
                      : '';
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
                );
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
                );
              }}
            >
              <FormInput as="textarea" placeholder="Type here" className="h-30 py-3.75 pi-3" />
            </BaseFormItem>

            <BaseFormItem name="default">
              <FormCheckbox
                label="Save as default"
                labelClassName={classcat(['text-14lig text-blu-400'])}
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
                type="button"
                className="btn-medium lg:w-18.75"
                onClick={() => setShowAddressFormType('DEFAULT')}
              >
                Cancel
              </Button>
              <Button
                disabled={isDebouncing || isChecking || !isDirty || isCreating}
                type="button"
                color="navy"
                className="btn-medium lg:w-27.75"
                onClick={onSubmit}
              >
                Save
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
      <UserVerifyModal
        isModalOpen={isModalOpen}
        addressId={dataCreate?.addressId || ''}
        onVerify={onVerify}
        resetDefault={resetDefault}
        phoneNumber={getValues('phoneNumber')}
        countryId={getValues('countryId')}
        setIsModalOpen={setIsModalOpen}
        enabledResend={enabledResend}
        setEnabledResend={setEnabledResend}
      />
    </>
  );
}
