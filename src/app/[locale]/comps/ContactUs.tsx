'use client';

//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import BaseFormItem from '_@shared/components/BaseFormItem';
import FormInput from '_@shared/components/input/FormInput';
import { contactUsAnchor } from '_@landing/layout/header/constants';
//SHARED
import { nextApi } from '_@shared/utils/api';
import CheckIcon from '_@shared/icons/CheckIcon';
import { useToastStore } from '_@shared/stores/toast/useToastStore';

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .max(50, {
      message: 'First name should not exceed 50 characters',
    })
    .nonempty('Please fill out this field.'),
  lastName: z
    .string()
    .trim()
    .max(50, {
      message: 'Last name should not exceed 50 characters',
    })
    .nonempty('Please fill out this field.'),
  email: z
    .string()
    .trim()
    .max(50, {
      message: 'Email should not exceed 50 characters',
    })
    .nonempty('Please fill out this field.')
    .email('Please use a valid email address'),
  message: z
    .string()
    .max(500, {
      message: 'Message should not exceed 500 characters',
    })
    .nonempty('Please fill out this field.'),
  recaptchaToken: z.optional(z.string()),
});

type FormValues = z.infer<typeof schema>;

const ContactUs = () => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const { showToast } = useToastStore();
  const methods = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { mutateAsync: submitFeedback, isLoading } =
    nextApi.contactUs.createContactUs.useMutation();

  const { reset, register, setValue, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (isLoading) return;

    try {
      await submitFeedback({ ...data, recaptchaToken: data.recaptchaToken || '' });
      reset();
      setIsSubmitSuccessful(true);
      setTimeout(() => setIsSubmitSuccessful(false), 2000);
    } catch (error) {
      console.log('Failed to submit data!', error);
      showToast({ type: 'error', description: 'Failed to submit data!' });
      setIsSubmitSuccessful(false);
    }
  });

  const _handleVerifyReCaptcha = (token: string) => {
    setValue('recaptchaToken', token);
  };

  return (
    <section
      id={contactUsAnchor}
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <div className="max-content grid gap-6 bg-yel-50 py-20 md:gap-16 md:py-36">
        <h2 className="text-36 text-blu-400 md:text-48">
          Got questions in mind?
          <br className="hidden md:block" />
          <span className="md:hidden">&nbsp;</span>
          Contact us.
        </h2>

        <div className="h-px bg-blu-200" />

        <div className="grid gap-10 md:grid-cols-[516fr_700fr] md:items-start md:gap-16">
          <div className="grid gap-2.5 text-blu-400 md:gap-4 [&>p]:text-14lig md:[&>p]:text-20lig">
            <p>
              Many thanks for your interest in discovering more about West African gourmet cuisine.
              Please fill out the form to ask questions or report a technical issue.
            </p>
            <p>
              Please note: while we value your questions, we are unable to respond to all inquiries.
            </p>
          </div>

          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          >
            <GoogleReCaptcha onVerify={_handleVerifyReCaptcha} />
            <FormProvider {...methods}>
              <form onSubmit={onSubmit} className="grid gap-10">
                <div className="grid gap-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <input type="hidden" {...register('recaptchaToken')} />
                    <BaseFormItem name="firstName" label="First name">
                      <FormInput
                        placeholder="Type here"
                        className="input-large ow:hover:bg-yel-50"
                      />
                    </BaseFormItem>
                    <BaseFormItem name="lastName" label="Last name">
                      <FormInput
                        placeholder="Type here"
                        className="input-large ow:hover:bg-yel-50"
                      />
                    </BaseFormItem>
                  </div>
                  <BaseFormItem name="email" label="Email">
                    <FormInput placeholder="Type here" className="input-large ow:hover:bg-yel-50" />
                  </BaseFormItem>
                  <BaseFormItem name="message" label="Message">
                    <FormInput
                      rows={5}
                      as="textarea"
                      placeholder="Type here"
                      className="area-large ow:hover:bg-yel-50"
                    />
                  </BaseFormItem>
                </div>
                <Button
                  type="submit"
                  color="navy"
                  isLoading={isLoading}
                  leadingIcon={isSubmitSuccessful ? <CheckIcon /> : null}
                  className={classcat([
                    'btn-big',
                    isSubmitSuccessful
                      ? 'ow:bg-gre-400 hover:ow:bg-gre-600 md:w-65.25'
                      : 'md:w-48.75',
                  ])}
                >
                  {isSubmitSuccessful ? 'SUBMITTED!' : 'SUBMIT'}
                </Button>
              </form>
            </FormProvider>
          </GoogleReCaptchaProvider>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
