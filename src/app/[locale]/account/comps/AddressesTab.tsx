'use client';
//THIRD PARTY MODULES
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider';
//SHARED
import { nextApi } from '_@shared/utils/api';
//RELATIVE MODULES
import Addresses from './Addresses';
import AddressesContextProvider from '../context/AddressesContext';

function AddressesTab() {
  const global = useGlobalContext();
  const userId = global.user?.id;
  const { data, isLoading } = nextApi.address.getMyAddresses.useQuery(userId || '', {
    enabled: !!userId,
  });
  if (!userId) return null;

  return (
    <AddressesContextProvider isLoading={isLoading} addresses={data}>
      <Addresses />
    </AddressesContextProvider>
  );
}

export default AddressesTab;
