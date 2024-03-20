//THIRD PARTY MODULES
import classcat from 'classcat'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
//RELATIVE MODULES

export type TActionProps = {
  disablePrev?: boolean
  disableNext?: boolean
  onPrev?: () => void
  onNext?: () => void
}

function Action({ disablePrev, disableNext, onPrev, onNext }: TActionProps) {
  return (
    <div className="sticky inset-x-0 bottom-0 z-[1] grid gap-2 bg-yel-25 px-6 pb-8 pt-4 sm:relative sm:gap-4 sm:py-0">
      <div
        className={classcat([
          'grid grid-flow-col items-center gap-4',
          'md:grid-cols-none md:justify-start md:gap-10',
          'grid-cols-2',
        ])}
      >
        <Button
          color="navy"
          variant="outlined"
          onClick={onPrev}
          className={classcat([
            'btn-big w-full uppercase md:min-w-[200px]',
            'ow:hover:border-blu-100 ow:hover:bg-transparent ow:hover:text-blu-500 ow:hover:shadow-none',
            'hover-hover:border-blu-100 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-navy-outlined-hover',
          ])}
          disabled={disablePrev}
        >
          Previous
        </Button>
        <Button
          color="navy"
          onClick={onNext}
          className={classcat([
            'btn-big w-full uppercase md:min-w-[200px]',
            'ow:hover:border-blu-500 ow:hover:bg-blu-500 ow:hover:text-white ow:hover:shadow-none',
            'hover-hover:border-blu-300 hover-hover:bg-blu-300 hover-hover:shadow-btn-navy-filled-hover ',
          ])}
          disabled={disableNext}
        >
          Next
        </Button>
      </div>
      <p className="text-14lig text-blu-300 sm:text-16lig">
        Please select your preferred food & drinks for all days and weeks.
      </p>
    </div>
  )
}

export default Action
