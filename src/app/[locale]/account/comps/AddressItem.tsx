//THIRD PARTY MODULES
import classcat from 'classcat';
import { formatPhoneNumber } from '_@landing/utils/phoneFormat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
//SHARED
import EditIcon from '_@shared/icons/EditIcon';
import MailIcon from '_@shared/icons/MailIcon';
import NoteIcon from '_@shared/icons/NoteIcon';
import UserIcon from '_@shared/icons/UserIcon';
import PhoneIcon from '_@shared/icons/PhoneIcon';
import DeleteIcon from '_@shared/icons/DeleteIcon';
import { RouterOutputs } from '_@shared/utils/api';
import LocationIcon from '_@shared/icons/LocationIcon';
//RELATIVE MODULES
import DeleteTrigger from './DeleteTrigger';
import { useAddressesContext } from '../context/AddressesContext';

type Props = {
  data: RouterOutputs['address']['getMyAddresses'][number];
  disabledDelete?: boolean;
};

export default function AddressItem({ data, disabledDelete }: Props) {
  const { setMode, setEditAddress } = useAddressesContext();

  return (
    <div className={classcat(['relative', 'border border-blu-100', 'grid gap-y-3 p-3.75'])}>
      <div className="grid auto-cols-max grid-flow-col gap-x-3 lg:pe-33.5">
        <p className="text-14 font-bold text-blu-400 lg:text-base lg:font-medium">{data.name}</p>
        <Show when={data.default}>
          <div className="rounded-full border border-yel-200 bg-yel-50 px-2.75 py-px text-12lig text-yel-900">
            Default
          </div>
        </Show>
      </div>

      <div className="grid grid-cols-[theme(spacing.4)_1fr] gap-x-2 lg:grid-cols-[theme(spacing[4.5])_1fr]">
        <LocationIcon className="h-4 w-4 lg:h-4.5 lg:w-4.5" />
        <p className="text-12lig text-blu-400 lg:text-14lig">{data.address}</p>
      </div>

      <div className="grid grid-cols-[theme(spacing.4)_1fr] gap-x-2 lg:grid-cols-[theme(spacing[4.5])_1fr]">
        <PhoneIcon className="h-4 w-4 lg:h-4.5 lg:w-4.5" />
        <p className="text-12lig text-blu-400 lg:text-14lig">
          {formatPhoneNumber(data.phoneNumber, data.country?.dialCode)}
        </p>
      </div>

      <div className="grid grid-cols-[theme(spacing.4)_1fr] gap-x-2 lg:grid-cols-[theme(spacing[4.5])_1fr]">
        <UserIcon className="h-4 w-4 lg:h-4.5 lg:w-4.5" />
        <p className="text-12lig text-blu-400 lg:text-14lig">{data.customerName}</p>
      </div>

      <div className="grid grid-cols-[theme(spacing.4)_1fr] gap-x-2 lg:grid-cols-[theme(spacing[4.5])_1fr]">
        <MailIcon className="h-4 w-4 lg:h-4.5 lg:w-4.5" />
        <p className="text-12lig text-blu-400 lg:text-14lig">{data.email}</p>
      </div>

      <Show when={data.note}>
        <div className="grid grid-cols-[theme(spacing.4)_1fr] gap-x-2 lg:grid-cols-[theme(spacing[4.5])_1fr]">
          <NoteIcon className="h-4 w-4 lg:h-4.5 lg:w-4.5" />
          <p className="text-12lig text-blu-400 lg:text-14lig">{data.note}</p>
        </div>
      </Show>

      <div
        className={classcat([
          'grid auto-cols-max grid-flow-col justify-end gap-x-6',
          'lg:absolute lg:top-4 lg:dir-right-3.75',
        ])}
      >
        <DeleteTrigger id={data.id}>
          <Button
            disabled={disabledDelete}
            variant="ghost"
            leadingIcon={<DeleteIcon className="h-4 w-4" />}
          >
            Delete
          </Button>
        </DeleteTrigger>
        <Button
          color="navy"
          variant="ghost"
          leadingIcon={<EditIcon className="h-4 w-4" />}
          onClick={() => {
            setMode('edit');
            setEditAddress(data);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
