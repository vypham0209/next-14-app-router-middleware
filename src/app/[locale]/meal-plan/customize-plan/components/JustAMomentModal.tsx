//THIRD PARTY MODULES
import classcat from 'classcat'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import { Modal } from '_@shared/components/dialog/Modal'
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon'

export type TJustAMomentModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  onContinue: () => void
}

function JustAMomentModal({ open, setOpen, onContinue }: TJustAMomentModalProps) {
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Overlay className="fixed z-overlay bg-blu-600 opacity-30 dir-inset-0" />
      <Modal.Content
        className={classcat([
          'z-toast w-[calc(100vw-2*var(--max-padding))] max-w-[theme(space.160)]',
          'fixed start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-yel-25 outline-none',
        ])}
      >
        <div className="grid content-start">
          <div className="grid grid-flow-col justify-between gap-2 border-b border-blu-50 p-4 md:gap-6 md:px-6 md:py-4">
            <Modal.Title className="text-18 text-blu-400 md:text-28">Just a moment!</Modal.Title>
            <Modal.Close>
              <CloseIcon className="h-6 w-6 text-blu-500" />
            </Modal.Close>
          </div>
          <div className="grid gap-3 p-4 md:px-6 md:py-10">
            <p className="text-14lig text-blu-400 md:text-16lig">
              You’re checking out as a guest. We recommend signing up for an account to make it more
              convenient for you to track your orders and meal plans.
            </p>
            <p className="text-14lig text-blu-400 md:text-16lig">Would you like to sign up now?</p>
          </div>
          <div className="grid grid-flow-col grid-cols-2 justify-end gap-6 bg-yel-50 p-4 md:grid-cols-none md:p-6">
            <Button
              as="link"
              href="/checkout/information?type=meal-plan"
              className="btn-very-big ow:md:w-[theme(spacing[50.25])] ow:[&>span]:text-14"
              color="navy"
              variant="outlined"
              onClick={onContinue}
            >
              Continue as a guest
            </Button>
            <Button
              as="link"
              href="/auth?redirect=/checkout/information?type=meal-plan"
              className="btn-very-big ow:md:w-[theme(spacing[57.75])] ow:[&>span]:text-14"
              color="navy"
              onClick={onContinue}
            >
              Sign me up!
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  )
}

export default JustAMomentModal
