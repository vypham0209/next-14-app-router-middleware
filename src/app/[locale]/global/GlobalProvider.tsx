'use client';

//THIRD PARTY MODULES
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext } from 'react';
//SHARED
import useProfile from '_@shared/hooks/useProfile';
import { RouterOutputs, nextApi } from '_@shared/utils/api';
//RELATIVE MODULES
import { LoaderType } from './GlobalProviderServer';

type GlobalContextType = LoaderType & {
  setUser: Dispatch<
    SetStateAction<RouterOutputs['userProfile']['getMyProfile']['user'] | undefined>
  >;
};

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);

type Props = {
  data: LoaderType;
};

export default function GlobalProvider({ children, data }: PropsWithChildren<Props>) {
  const utils = nextApi.useContext();
  const [user] = useProfile(data.user);

  return (
    <GlobalContext.Provider
      value={{
        ...data,
        user,
        setUser: (user) => {
          if (!user) {
            utils.userProfile.getMyProfile.setData(undefined, null);
          } else {
            utils.userProfile.getMyProfile.setData(undefined, {
              user: user as any,
            });
          }
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
