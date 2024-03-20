//THIRD PARTY MODULES
import { Address } from '@prisma/client';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';

export type Mode = 'idle' | 'add' | 'edit';

type Addresses = RouterOutputs['address']['getMyAddresses'];

type AddressContextProvider = {
  addresses?: Addresses;
  isLoading?: boolean;
};

type AddressesContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  editAddress?: Addresses[number];
  setEditAddress: (address?: Addresses[number]) => void;
} & AddressContextProvider;

const AddressesContext = createContext<AddressesContextType>({
  addresses: [],
  mode: 'idle',
  setMode: (_: Mode) => {},
  editAddress: undefined,
  setEditAddress: (_?: Address) => {},
});

export const useAddressesContext = () => useContext(AddressesContext);

const AddressesContextProvider = ({
  children,
  ...props
}: AddressContextProvider & PropsWithChildren) => {
  const [mode, setMode] = useState<Mode>('idle');
  const [editAddress, setEditAddress] = useState<Addresses[number] | undefined>(undefined);

  return (
    <AddressesContext.Provider value={{ ...props, mode, setMode, editAddress, setEditAddress }}>
      {children}
    </AddressesContext.Provider>
  );
};

export default AddressesContextProvider;
