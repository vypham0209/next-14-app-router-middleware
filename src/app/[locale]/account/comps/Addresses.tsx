//THIRD PARTY MODULES
import classcat from 'classcat';
import { debounce } from '_@landing/utils/debounce';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { phoneFormat } from '_@landing/utils/phoneFormat';
import { DELAY_RESEND } from '_@landing/constants/verity-phone';
import { useCallback, useEffect, useRef, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import PlusIcon from '_@shared/icons/PlusIcon';
import useProfile from '_@shared/hooks/useProfile';
import { RouterInputs, nextApi } from '_@shared/utils/api';
import { useToastStore } from '_@shared/stores/toast/useToastStore';
import { AddressFormValues, addressSchema } from '_@shared/schemas/address';
//RELATIVE MODULES
import Loading from './Loading';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import VerifyModal from './VerifyModal';
import { Mode, useAddressesContext } from '../context/AddressesContext';

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
export default function Addresses() {
  const newButtonRef = useRef<HTMLButtonElement>(null);
  const [enabledResend, setEnabledResend] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [createAddressId, setCreateAddressId] = useState<string>();
  const { isLoading, addresses, mode, setMode, editAddress, setEditAddress } =
    useAddressesContext();
  const utils = nextApi.useContext();
  const [user] = useProfile();
  const userId = user?.id;

  const showToast = useToastStore((state) => state.showToast);

  const methods = useForm<AddressFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues,
  });

  const { reset, setValue, getValues } = methods;

  const { mutate: checkPhone, isLoading: isChecking } =
    nextApi.address.checkPhoneNumberVerifiedByUser.useMutation({
      onSuccess: (data) => {
        setIsVerifyPhone(data);
      },
      onError: () => {
        showToast({ type: 'error', description: 'Verify phone failed!' });
      },
    });

  const resetDefault = () => {
    utils.address.getMyAddresses.invalidate(userId);
    utils.userProfile.getMyProfile.invalidate();
    setMode('idle');
    setEditAddress(undefined);
    setCreateAddressId(undefined);
    newButtonRef.current?.scrollIntoView();
  };

  const { mutate: createAddress, isLoading: isCreating } =
    nextApi.address.createUserAddress.useMutation({
      onSuccess: (rp) => {
        if (isVerifyPhone) {
          showToast({ type: 'success', description: 'Changes saved!' });
          resetDefault();
        } else {
          setIsModalOpen(true);
          setCreateAddressId(rp.addressId);
          setEnabledResend(false);
        }
      },
      onError: (error) => {
        if (error.data?.code === 'TOO_MANY_REQUESTS') {
          setIsModalOpen(true);
          return;
        }
        showToast({ type: 'error', description: error.message ?? 'Address created failed!' });
      },
    });

  const { mutate: updateAddress, isLoading: isUpdating } =
    nextApi.address.updateUserAddressById.useMutation({
      onSuccess: () => {
        showToast({ type: 'success', description: 'Changes saved!' });
        resetDefault();
      },
      onError: (error) => {
        showToast({ type: 'error', description: error.message ?? 'Address updated failed!' });
      },
    });

  const { mutate: updateAddressAfterVerify, isLoading: isUpdatingAfterVerify } =
    nextApi.address.updateUserAddressById.useMutation({
      onError: (error) => {
        showToast({ type: 'error', description: error.message ?? 'Address updated failed!' });
      },
    });

  const { mutate: sendVerifyPhone } = nextApi.address.sendVerifyPhone.useMutation({
    onSuccess: () => {
      setIsModalOpen(true);
      setEnabledResend(false);
    },
    onError: (error) => {
      if (error.data?.code === 'TOO_MANY_REQUESTS') {
        setIsModalOpen(true);
        return;
      }
      showToast({ type: 'error', description: error.message ?? 'Send OTP failed!' });
    },
  });

  const onVerify = () => {
    if (mode === 'edit') showToast({ type: 'success', description: 'Changes saved!' });
    resetDefault();
  };

  const getPayload = (values: AddressFormValues): RouterInputs['address']['createUserAddress'] => {
    return {
      ...values,
      phone: {
        phoneNumber: values.phoneNumber.split(' ').join(''),
        countryId: values.countryId,
      },
      userId,
      isDefault: values.default,
    };
  };

  const onUpdate = (verify = false) => {
    const payload = getPayload(getValues());
    const id = editAddress?.id;
    if (!id) return;
    if (verify) updateAddressAfterVerify({ ...payload, id });
    else updateAddress({ ...payload, id });
  };

  const onSubmit = (values: AddressFormValues) => {
    if (!userId) return;
    const payload = getPayload(values);
    if (mode === 'add') createAddress(payload);
    else if (mode === 'edit') {
      if (isVerifyPhone) onUpdate();
      else sendVerifyPhone(payload.phone);
    }
  };

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

  const _setValueForm = useCallback(
    (mode: Mode, editData: typeof editAddress) => {
      if (mode === 'add' || mode === 'idle') {
        reset({ ...defaultValues, default: addresses?.length === 0 });
        setIsVerifyPhone(false);
      } else if (mode === 'edit') {
        if (editData) {
          const newValue: AddressFormValues = {
            name: editData.name ?? '',
            address: editData.address,
            phoneNumber: phoneFormat(editData.phoneNumber),
            countryId: editData.countryId ?? 237,
            customerName: editData.customerName,
            email: editData.email ?? '',
            note: editData.note ?? '',
            default: editData.default,
          };
          reset(newValue);
          debounceCheckPhone(getValues('phoneNumber'), getValues('countryId'));
        }
      }
    },
    [addresses?.length, debounceCheckPhone, getValues, reset],
  );

  useEffect(() => {
    _setValueForm(mode, editAddress);
  }, [_setValueForm, editAddress, mode]);

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
      <Button
        ref={newButtonRef}
        color="navy"
        leadingIcon={<PlusIcon />}
        className="btn-big lg:btn-very-big sm:w-60"
        onClick={() => {
          setMode(mode === 'add' ? 'idle' : 'add');
          setEditAddress(undefined);
        }}
      >
        New address
      </Button>
      <FormProvider {...methods}>
        <div
          className={classcat([
            'mt-6 grid max-w-[theme(spacing.224)] gap-y-6',
            'lg:mt-10 lg:gap-y-10',
          ])}
        >
          <Show when={mode === 'add'}>
            <AddressForm
              isLoading={
                isCreating || isUpdating || isUpdatingAfterVerify || isDebouncing || isChecking
              }
              isVerifyPhone={isVerifyPhone}
              onChangeCountry={onChangeCountry}
              onChangePhoneNumber={onChangePhoneNumber}
              onSubmit={onSubmit}
            />
          </Show>
          <Switch.Root>
            <Switch.Case when={isLoading}>
              <Loading />
            </Switch.Case>
            <Switch.Case when={true}>
              <AddressList
                formProps={{
                  isLoading:
                    isCreating || isUpdating || isUpdatingAfterVerify || isDebouncing || isChecking,
                  isVerifyPhone: isVerifyPhone,
                  onChangeCountry: onChangeCountry,
                  onChangePhoneNumber: onChangePhoneNumber,
                  onSubmit: onSubmit,
                }}
              />
            </Switch.Case>
          </Switch.Root>
        </div>
      </FormProvider>
      <VerifyModal
        mode={mode}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        phoneNumber={getValues('phoneNumber')}
        countryId={getValues('countryId')}
        onVerify={onVerify}
        onUpdate={onUpdate}
        addressId={mode === 'add' ? createAddressId : editAddress?.id}
        enabledResend={enabledResend}
        setEnabledResend={setEnabledResend}
      />
    </>
  );
}
