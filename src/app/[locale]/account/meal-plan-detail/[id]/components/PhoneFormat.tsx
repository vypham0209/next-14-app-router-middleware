'use client';
//THIRD PARTY MODULES
import { formatPhoneNumber } from '_@landing/utils/phoneFormat';
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider';

type TPhoneFormatProps = {
  phoneNumber: string;
  countryId: number;
};

function PhoneFormat({ phoneNumber, countryId }: TPhoneFormatProps) {
  const global = useGlobalContext();
  const dialCode = (global.country?.data || []).find((item) => item.id === countryId)?.dialCode;
  return <span>{formatPhoneNumber(phoneNumber, dialCode)}</span>;
}

export default PhoneFormat;
