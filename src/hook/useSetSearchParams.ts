//THIRD PARTY MODULES
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next-intl/client';

export default function useSetSearchParam() {
  //Read search params from the URL
  const readSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(readSearchParams);
  const router = useRouter();
  const pathName = usePathname();

  //Set new search params
  const setSearchParam = (key: string, value: string, multiple?: boolean) => {
    if (multiple) {
      //If multiple, get the founds
      const founds = searchParams.get(key)?.split(',');

      if (founds) {
        //If there are founds, check if the value is one of the founds
        const index = founds.findIndex((item) => item === value);
        if (index > -1) {
          //If the value is one of the founds, delete the value
          founds.splice(index, 1);
        } else {
          //If the value is not one of the founds, push the value
          founds.push(value);
        }
        //Set the key with the founds
        searchParams.set(key, founds.join(','));
      } else {
        //If no founds, set the key with the value
        searchParams.set(key, value);
      }
    } else {
      if (value) {
        //If no multiple and there is value, set the key with the value
        searchParams.set(key, value);
      } else {
        //If no multiple and no value, delete the key
        searchParams.delete(key);
      }
    }

    //Remove all keys without values
    for (const [key, value] of searchParams.entries()) {
      if (!value) {
        searchParams.delete(key);
      }
    }

    //Convert the search params to string
    const newParams = searchParams.toString();
    //Create the new url with the new search params
    const newUrl = `${pathName}${newParams ? `?${newParams}` : ''}`;

    //Navigate to the new url
    router.push(newUrl);
  };

  const setSearchParams = (data: Record<string, boolean | number | string | null | undefined>) => {
    //Set the new search params
    for (const key in data) {
      const value = data[key];
      if (!value) {
        searchParams.delete(key);
        continue;
      }
      searchParams.set(key, String(value));
    }

    //Convert the search params to string
    const newParams = searchParams.toString();
    //Create the new url with the new search params
    const newUrl = `${pathName}${newParams ? `?${newParams}` : ''}`;

    //Navigate to the new url
    router.push(newUrl);
  };

  return { setSearchParam, setSearchParams };
}
