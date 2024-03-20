//THIRD PARTY MODULES
import * as z from 'zod';
import classcat from 'classcat';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { DELAY_AUTO_CLOSE, DELAY_RESEND } from '_@landing/constants/verity-phone';
import { formatPhoneNumber, getDialCodeFromId } from '_@landing/utils/phoneFormat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import { Modal } from '_@shared/components/dialog/Modal';
import Switch from '_@shared/components/conditions/Switch';
import BaseFormItem from '_@shared/components/BaseFormItem';
import FormOTPInput from '_@landing/components/input/FormOtpInput';
//SHARED
import { nextApi } from '_@shared/utils/api';
import CloseIcon from '_@shared/icons/CloseIcon';
import LoadingIcon from '_@shared/icons/LoadingIcon';
import PhoneVerifyIcon from '_@shared/icons/PhoneVerifyIcon';
import { useToastStore } from '_@shared/stores/toast/useToastStore';
//RELATIVE MODULES
import { Mode } from '../context/AddressesContext';
import { useGlobalContext } from '../../global/GlobalProvider';

const schema = z.object({
  otp: z
    .string({
      required_error: 'Please input code.',
    })
    .max(4, 'Code must be 4 digits.'),
});

type Values = z.infer<typeof schema>;

type VerifyModalProps = {
  mode: Mode;
  isModalOpen: boolean;
  phoneNumber: string;
  countryId: number;
  addressId?: string;
  enabledResend: boolean;
  setIsModalOpen: (value: boolean) => void;
  onVerify: () => void;
  onUpdate: (toast?: boolean) => void;
  setEnabledResend: Dispatch<SetStateAction<boolean>>;
};

export default function VerifyModal({
  mode,
  isModalOpen,
  phoneNumber,
  countryId,
  addressId,
  enabledResend,
  setIsModalOpen,
  onVerify,
  onUpdate,
  setEnabledResend,
}: VerifyModalProps) {
  const [isVerify, setIsVerify] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const showToast = useToastStore((state) => state.showToast);
  const global = useGlobalContext();
  const countryOptions = global?.countryOptions || [];

  const { mutate: sendVerifyPhone } = nextApi.address.sendVerifyPhone.useMutation({
    onSuccess: () => {
      showToast({ type: 'success', description: 'The OTP has been resent.' });
    },
    onError: (error) => {
      showToast({ type: 'error', description: error.message ?? 'Resend OTP failed!' });
    },
  });

  const { mutate: verifyPhoneNumber } = nextApi.address.verifyPhoneNumber.useMutation({
    onSuccess: () => {
      if (mode === 'edit') onUpdate(true);
      setIsVerify(true);
      setTimeout(onVerifySuccess, DELAY_AUTO_CLOSE);
    },
    onError: (error) => {
      methods.setError('otp', {
        type: 'custom',
        message: error.message ?? 'Verify phone failed!',
      });
    },
  });

  const methods = useForm<Values>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ otp }: Values) => {
    if (addressId) {
      verifyPhoneNumber({
        countryId,
        otpCode: otp,
        phoneNumber: phoneNumber.split(' ').join(''),
        addressId,
      });
    }
  };

  const onCloseModal = () => {
    setIsClose(false);
    setIsModalOpen(false);
    setIsVerify(false);
  };

  const onResend = () => {
    sendVerifyPhone({
      phoneNumber: phoneNumber.split(' ').join(''),
      countryId: countryId,
    });
    setEnabledResend(false);
  };

  const onVerifySuccess = () => {
    setIsClose(false);
    setIsModalOpen(false);
    setIsVerify(false);
    onVerify();
  };

  return (
    <Modal.Root open={isModalOpen}>
      <Modal.Overlay className="fixed bg-blu-600/30 dir-inset-0" />
      <Modal.Content
        className={classcat([
          'bg-transparent',
          ' w-[calc(100vw-2*var(--max-padding))] max-w-[theme(space.160)]  md:w-full',
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          isClose ? 'h-70.5 md:h-79' : 'h-116 md:h-135.5',
        ])}
      >
        <Switch.Root>
          <Switch.Case when={isClose}>
            <div className="flex h-full w-full flex-col bg-yel-25">
              <div className="flex justify-between border-b p-4 md:px-6">
                <span className="text-18 text-blu-400 md:text-28">Discard changes?</span>
                <button onClick={onCloseModal}>
                  <CloseIcon className="h-6 w-6 text-blu-500" />
                </button>
              </div>
              <p className="grow p-4 text-16lig text-blu-400 md:px-6 md:py-10">
                Hold on! You haven’t finish verifying. Without verifying phone number, you can not
                place the order. If you didn’t receive a code, please try “Click here to resend”
                button, or check your number if it’s correct.
              </p>
              <div className="space-i-4 flex justify-between bg-yel-50 p-4 md:space-i-6 md:justify-end md:p-6">
                <Button
                  color="navy"
                  variant="outlined"
                  onClick={onCloseModal}
                  className="btn-big w-full max-w-[theme(space.[52.25])] ow:pi-0.25 "
                >
                  Yes, discard changes
                </Button>
                <Button
                  color="navy"
                  onClick={() => setIsClose(false)}
                  className="btn-big w-full max-w-[theme(space.67)] ow:pi-1"
                >
                  No, take me back
                </Button>
              </div>
            </div>
          </Switch.Case>
          <Switch.Case when={isVerify}>
            <div className="relative h-auto w-full bg-yel-25 p-6 md:px-20 md:py-14">
              <button
                onClick={onVerifySuccess}
                className="absolute end-4 top-4 md:end-10 md:top-10"
              >
                <CloseIcon className="h-6 w-6 text-blu-500 md:h-8 md:w-8" />
              </button>

              <div className="flex h-full flex-col space-y-6 md:space-y-10">
                <div className="space-y-2 md:space-y-4">
                  <p className="text-18 text-blu-400 md:text-36">Verify your phone number</p>
                  <span className="inline-block rounded-full bg-yel-50 px-4 py-1.5 text-14lig text-blu-400 md:py-2.5 md:text-16lig">
                    {formatPhoneNumber(phoneNumber, getDialCodeFromId(countryOptions, countryId))}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-between space-y-6 md:items-start md:pb-8.5 md:pt-0">
                  <PhoneVerifyIcon />
                  <p className={classcat(['text-16 text-blu-400'])}>Phone verified! Thank you!</p>
                </div>
                <Button
                  onClick={onVerifySuccess}
                  className="btn-medium w-full py-3 md:btn-very-big md:max-w-[theme(spacing.[57.5])] md:py-3.75"
                  color="navy"
                >
                  Done
                </Button>
              </div>
            </div>
          </Switch.Case>
          <Switch.Case when={true}>
            <div className="relative h-full w-full bg-yel-25 p-6 md:px-20 md:py-14">
              <button
                onClick={() => setIsClose(true)}
                className="absolute end-4 top-4 md:end-10 md:top-10"
              >
                <CloseIcon className="h-6 w-6 text-blu-500 md:h-8 md:w-8" />
              </button>

              <FormProvider {...methods}>
                <form
                  className="flex h-full flex-col space-y-6 md:space-y-10"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <div className="space-y-2 md:space-y-4">
                    <p className="text-18 text-blu-400 md:text-36">Verify your phone number</p>
                    <span className="inline-block rounded-full bg-yel-50 px-4 py-1.5 text-14lig text-blu-400 md:py-2.5 md:text-16lig">
                      {formatPhoneNumber(phoneNumber, getDialCodeFromId(countryOptions, countryId))}
                    </span>
                  </div>

                  <div className="flex grow flex-col justify-between">
                    <div className="space-y-6">
                      <p className="text-16 text-blu-400">
                        We need to make sure we have the right number. Please enter the code we sent
                        you to verify your phone.
                      </p>
                      <BaseFormItem name="otp">
                        <FormOTPInput
                          type="number"
                          name="otp"
                          containerClasses="w-full flex md:justify-start justify-between ow:space-i-0 md:space-i-4"
                        />
                      </BaseFormItem>
                    </div>
                    <Switch.Root>
                      <Switch.Case when={enabledResend}>
                        <div className="space-y-1 md:flex md:space-x-1 md:space-y-0">
                          <span className="text-14lig text-blu-300">Didn’t received any code?</span>
                          <button
                            onClick={onResend}
                            className="text-14 text-yel-500 hover:underline"
                          >
                            Click here to resend
                          </button>
                        </div>
                      </Switch.Case>
                      <Switch.Case when={!enabledResend}>
                        <div className="space-x-1 md:flex ">
                          <span className="text-14lig text-blu-300">
                            Please wait for {DELAY_RESEND / 1000}s before requesting new code
                          </span>
                          <LoadingIcon className="h-[calc(15rem/16) inline w-[calc(15rem/16)]" />
                        </div>
                      </Switch.Case>
                    </Switch.Root>
                  </div>
                  <Button
                    className="btn-medium w-full py-3 md:btn-very-big md:max-w-[theme(spacing.[57.5])] md:py-3.75"
                    color="navy"
                    type="button"
                    onClick={methods.handleSubmit(onSubmit)}
                  >
                    Verify
                  </Button>
                </form>
              </FormProvider>
            </div>
          </Switch.Case>
        </Switch.Root>
      </Modal.Content>
    </Modal.Root>
  );
}
