//LAYOUT, COMPONENTS
import { Modal } from '_@shared/components/dialog/Modal';
import Button from '_@shared/components/DeprecatedButton';

const ModalExample = () => {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button> hello world</Button>
      </Modal.Trigger>
      <Modal.BaseModal className="p-10">
        <Modal.Title>This is title</Modal.Title>
        <Modal.Description>This is Description</Modal.Description>
        <Modal.Close className="absolute end-2 top-2">x</Modal.Close>
      </Modal.BaseModal>
    </Modal.Root>
  );
};

export default ModalExample;
