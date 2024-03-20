//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import ConfirmModal, { useConfirmModal } from '_@shared/components/dialog/ConfirmModal';
//SHARED

type Props = { onConfirm: () => void };

function TroublePayingModal({ children, onConfirm }: PropsWithChildren<Props>) {
  const { closeModal } = useConfirmModal();

  const _onConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <ConfirmModal.Trigger
      asChild
      title="Trouble paying?"
      description="There seems to be a problem with the selected payment method. Do you want to change to Cash?"
      ActionComponent={
        <>
          <Button
            onClick={closeModal}
            className="btn-big ml-auto shrink px-8 py-3.25 ow:w-24.5 sm:px-10 "
            color="navy"
            variant="outlined"
          >
            No
          </Button>
          <Button
            onClick={_onConfirm}
            className="btn-big grow px-10 py-3.25 uppercase ow:w-45.25 md:grow-0 md:px-20"
            color="navy"
          >
            Ok
          </Button>
        </>
      }
    >
      {children}
    </ConfirmModal.Trigger>
  );
}

export default TroublePayingModal;
