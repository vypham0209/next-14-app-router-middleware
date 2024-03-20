//THIRD PARTY MODULES
import { ComponentPropsWithoutRef } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import ConfirmModal, { useConfirmModal } from '_@shared/components/dialog/ConfirmModal';
//SHARED
import DeleteIcon from '_@shared/icons/DeleteIcon';
import { useToastStore } from '_@shared/stores/toast/useToastStore';
//TYPES MODULES
import type { Optional } from '_@shared/utils/type';

type Error = { message: string };
type Props = {
  onDelete: () => Promise<Error | null | undefined | void>;
  isShowToast?: boolean;
} & Optional<
  ComponentPropsWithoutRef<typeof ConfirmModal.Trigger>,
  'title' | 'description' | 'ActionComponent'
>;

export default function DeleteModal({
  onDelete,
  title,
  description,
  ActionComponent,
  isShowToast = true,
  ...props
}: Props) {
  const { closeModal } = useConfirmModal();
  const { showToast } = useToastStore();
  return (
    <ConfirmModal.Trigger
      title={title || 'Hey, wait!'}
      description={description || 'Deleted items cannot be recovered. Are you sure?'}
      ActionComponent={
        ActionComponent || (
          <>
            <Button
              onClick={closeModal}
              className="btn-big ml-auto w-26.75 px-8 py-3.25 sm:w-max sm:px-10"
              color="navy"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                const err = await onDelete();
                if (isShowToast) {
                  if (err) return showToast({ type: 'error', description: err.message });
                  showToast({ type: 'success', description: 'Delete successful!' });
                }
                closeModal();
              }}
              className="btn-big px-10 py-3.25 sm:w-max md:px-20"
              color="red"
              leadingIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </>
        )
      }
      {...props}
    />
  );
}
