//THIRD PARTY MODULES
import React, { Fragment } from 'react';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
//RELATIVE MODULES
import AddressItem from './AddressItem';
import AddressForm, { AddressFormProps } from './AddressForm';
import { useAddressesContext } from '../context/AddressesContext';

type Props = {
  formProps: AddressFormProps;
};

function AddressList(props: Props) {
  const { mode, addresses, editAddress } = useAddressesContext();

  if (!addresses) return null;
  return (
    <Fragment>
      {addresses.map((item) => (
        <Switch.Root key={item.id}>
          <Switch.Case when={mode === 'edit' && item.id === editAddress?.id}>
            <AddressForm {...props.formProps} />
          </Switch.Case>
          <Switch.Case when={true}>
            <AddressItem key={item.id} data={item} disabledDelete={addresses.length === 1} />
          </Switch.Case>
        </Switch.Root>
      ))}
    </Fragment>
  );
}

export default AddressList;
