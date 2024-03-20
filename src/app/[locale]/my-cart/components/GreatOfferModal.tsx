//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import { Modal } from '_@shared/components/dialog/Modal';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
import LimitTimeIcon from '_@shared/icons/LimitTimeIcon';

function GreatOfferModal({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Overlay className="fixed z-overlay bg-blu-600 opacity-30 dir-inset-0" />
      <Modal.Content
        className={classcat([
          'z-toast w-[calc(100vw-2*var(--max-padding))] max-w-[theme(space.160)]',
          'fixed start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-yel-25 outline-none',
        ])}
      >
        <LimitTimeIcon
          className={classcat([
            'absolute -left-5 -top-6 h-12.5 w-12.5 md:-left-13.5 md:-top-13.5 md:h-auto md:w-auto',
          ])}
        />
        <div className={classcat(['grid gap-6 p-6 md:gap-10 md:px-20 md:py-15'])}>
          <Modal.Title className="text-18 text-blu-400 md:text-36">Great offer for you</Modal.Title>
          <Modal.Close className={classcat(['absolute right-4 top-4 md:right-10 md:top-10 '])}>
            <CloseIcon className="h-6 w-6 text-blu-500 md:h-8 md:w-8" />
          </Modal.Close>
          <div className="grid grid-flow-row gap-2 md:gap-4">
            <p className={classcat(['text-14lig text-blu-400 md:text-20lig'])}>Just a moment!</p>
            <div>
              <p className={classcat(['text-14lig text-blu-400 md:text-20lig'])}>
                Checking out as a registered user gives you a{' '}
              </p>
              <p className={classcat(['text-14lig text-blu-400 md:text-20lig'])}>
                <span className={classcat(['text-16 text-gre-300 md:text-24'])}>5% OFF</span> on
                your first order!
              </p>
            </div>
            <p className={classcat(['text-14lig text-blu-400 md:text-20lig'])}>
              Do you want to sign up now?
            </p>
          </div>
          <div className="flex space-x-2 md:space-x-6">
            <Button
              as="link"
              href="/checkout/information"
              className="btn-medium max-w-[50%] basis-1/2 md:btn-very-big"
              color="navy"
              variant="outlined"
            >
              Continue as a guest
            </Button>
            <Button
              as="link"
              href="/auth?redirect=/checkout"
              className="btn-medium max-w-[50%] basis-1/2 md:btn-very-big"
              color="navy"
            >
              Sign me up!
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

export default GreatOfferModal;
