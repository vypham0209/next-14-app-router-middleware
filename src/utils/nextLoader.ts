//THIRD PARTY MODULES
import { headers } from 'next/headers';
import { getUrlOnServer } from '_@landing/utils/getUrlOnServer';

const nextLoader =
  <T>(func: (url: Partial<URL>, isAuth: boolean) => Promise<T>) =>
  async () => {
    const url = getUrlOnServer();
    const isAuth = headers().get('x-is-auth');

    try {
      return await func(url, Boolean(isAuth));
    } catch (e) {
      console.log('error: ', e);
      return {} as T;
    }
  };

export default nextLoader;
