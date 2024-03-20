'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { Address } from '@prisma/client';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import PlusIcon from '_@shared/icons/PlusIcon';
//RELATIVE MODULES
import { useOrderContext } from '../../../context/OrderContext';
type AddressSwitcherProps = {
  addresses: Address[];
  setAddressValue: (address: Address) => void;
};

const AddressSwitcher = ({ addresses, setAddressValue }: AddressSwitcherProps) => {
  const { setOrderInfo, currentAddressId, setCurrentAddressId, setShowAddressFormType } =
    useOrderContext();

  return (
    <div className="flex flex-col">
      <p className="mb-6 text-14lig text-blu-500">
        You can select pre-filled shipping information or create new one
      </p>
      <div className="-mb-4 flex w-[calc(min(100vw,var(--max-bound))-(var(--site-pad)*2))] max-w-[calc(896rem/16)] flex-wrap [&>*]:mb-4 [&>*]:mr-4">
        {addresses
          .reduce((arr: Address[], item) => {
            if (item.default) return [item, ...arr];
            return [...arr, item];
          }, [])
          .map((address) => (
            <button
              onClick={() => {
                setCurrentAddressId(address.id);
                setAddressValue(address);
                setShowAddressFormType('DEFAULT');
                setOrderInfo(undefined);
              }}
              className={classcat([
                'cursor-pointer rounded-full border py-2 text-center text-14 font-normal pi-4',
                'md:py-3 md:pi-6',
                'disabled:opacity-50',
                currentAddressId === address.id
                  ? 'border-yel-500 bg-yel-200 text-blu-500 hover:bg-yel-400 '
                  : 'border-blu-100 text-blu-400 hover:bg-yel-50 ',
              ])}
              key={address.id}
            >
              {address.default ? 'Default' : address.name}
            </button>
          ))}
        <Button
          onClick={() => setShowAddressFormType('NEW')}
          className={classcat([
            'max-w-fit py-2 pi-4 ow:border-dashed ow:border-blu-200 ow:bg-white ow:text-blu-500  [&>span]:text-14',
            'focus-visible:ring-yel-300 ow:hover:bg-white ow:hover:text-yel-500 ow:hover:shadow-btn-secondary-filled-hover',
          ])}
          color="secondary"
          variant="outlined"
          leadingIcon={<PlusIcon className={classcat(['h-5 w-5'])} />}
        >
          New
        </Button>
      </div>
    </div>
  );
};

export default AddressSwitcher;
