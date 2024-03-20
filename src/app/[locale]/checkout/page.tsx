//THIRD PARTY MODULES
import { getUrlOnServer } from '_@landing/utils/getUrlOnServer';
//HOOK, SERVER
import { redirect } from 'next-intl/server';

export default function Page() {
  const url = getUrlOnServer();

  if (url?.pathname === '/checkout') {
    redirect('/checkout/information');
  }

  return null;
}
