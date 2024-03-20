//THIRD PARTY MODULES
import { Country } from '@prisma/client';

export const phoneFormat = (phone: string, defaultValue = '') => {
  const _phone = phone.split(' ').join('');
  if (_phone?.length > 0) {
    const count = Math.floor(_phone.length / 4);
    const arr = _phone.split('');
    for (let i = 0; i < count; i++) {
      arr.splice(-4 + -i * 5, 0, ' ');
    }
    return arr.join('');
  }
  return defaultValue;
};

export const formatPhoneNumber = (phoneNumber: string, phoneCode?: string): string => {
  return `+${phoneCode} ${phoneFormat(phoneNumber)}`;
};

type Option = {
  value: string | number;
  label: string;
};

export const getDialCodeFromId = (country: (Country & Option)[], id?: number | null) => {
  if (!id) return '';
  return country.find((item) => item.id === id)?.dialCode;
};
