'use client';

//THIRD PARTY MODULES
import { createContext, useContext, useLayoutEffect, useState } from 'react';
//TYPES MODULES
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export const FooterContext = createContext<{
  showFooter: boolean;
  setShowFooter: Dispatch<SetStateAction<boolean>>;
}>({
  showFooter: true,
  setShowFooter: () => {},
});

export const useFooterContext = () => useContext(FooterContext);

export const useHideFooter = () => {
  const { setShowFooter } = useContext(FooterContext);

  useLayoutEffect(() => {
    setShowFooter(false);

    return () => setShowFooter(true);
  }, [setShowFooter]);
};

export default function FooterProvider({ children }: PropsWithChildren) {
  const [showFooter, setShowFooter] = useState(true);

  return (
    <FooterContext.Provider value={{ showFooter, setShowFooter }}>
      {children}
    </FooterContext.Provider>
  );
}
