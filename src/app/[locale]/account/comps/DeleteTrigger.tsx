//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import ConfirmModal, { useConfirmModal } from '_@shared/components/dialog/ConfirmModal';
//SHARED
import { nextApi } from '_@shared/utils/api';
import DeleteIcon from '_@shared/icons/DeleteIcon';
import { useToastStore } from '_@shared/stores/toast/useToastStore';
//RELATIVE MODULES
import { useGlobalContext } from '../../global/GlobalProvider';
//RELATIVE MODULES

const DeleteTrigger = ({ id, children }: { id: string } & PropsWithChildren) => {
  const { closeModal } = useConfirmModal();
  const showToast = useToastStore((state) => state.showToast);
  const utils = nextApi.useContext();
  const global = useGlobalContext();
  const userId = global.user?.id;

  const { mutate: removeAddress, isLoading: isRemoving } =
    nextApi.address.removeAddressById.useMutation({
      onSuccess: () => {
        showToast({ type: 'success', description: 'Changes saved!' });
        closeModal();
        utils.address.getMyAddresses.invalidate(userId);
        utils.userProfile.getMyProfile.invalidate();
      },
      onError: (error) => {
        showToast({ type: 'error', description: error.message ?? 'Address removed failed!' });
      },
    });

  const onDelete = () => {
    removeAddress(id);
  };

  return (
    <ConfirmModal.Trigger
      asChild
      title="Hey, wait!"
      description="Deleted items cannot be recovered. Are you sure?"
      ActionComponent={
        <>
          <Button
            onClick={closeModal}
            className="btn-big ml-auto w-26.75 px-8 py-3.25 sm:w-max sm:px-10"
            color="navy"
            variant="outlined"
            isLoading={isRemoving}
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            className="btn-big px-10 py-3.25 sm:w-max md:px-20"
            color="red"
            leadingIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </>
      }
    >
      {children}
    </ConfirmModal.Trigger>
  );
};

export default DeleteTrigger;
