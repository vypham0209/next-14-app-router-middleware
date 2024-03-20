//THIRD PARTY MODULES
import { headers } from 'next/headers';

export const getUrlOnServer = (): URL | null => {
  try {
    const xUrl = headers().get('x-url') || process.env.NEXT_PUBLIC_REDIRECT_URL || '';
    return new URL(xUrl);
  } catch (_error) {
    return null;
  }
};
