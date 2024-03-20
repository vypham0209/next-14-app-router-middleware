//THIRD PARTY MODULES
import classcat from 'classcat'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
//RELATIVE MODULES
import { FINISH_STEP, START_STEP } from '../../constants/build-plan'
import { useBuildPlanContext } from '../../context/BuildPlanContext'

export type TActionProps = {
  disablePrev?: boolean
  disableNext?: boolean
  onPrev?: () => void
  onNext?: () => void
}

function Action({ disablePrev, disableNext, onPrev, onNext }: TActionProps) {
  const { step } = useBuildPlanContext()

  return (
    <div
      className={classcat([
        'grid grid-flow-col  items-center gap-4',
        'md:grid-cols-none md:justify-start md:gap-10',
        onPrev ? 'grid-cols-2' : 'grid-cols-1',
      ])}
    >
      <Show when={onPrev}>
        <Button
          color="navy"
          variant="outlined"
          onClick={onPrev}
          className={classcat([
            'btn-big w-full uppercase md:min-w-[200px]',
            'ow:hover:border-blu-100 ow:hover:bg-transparent ow:hover:text-blu-500 ow:hover:shadow-none',
            'hover-hover:border-blu-100 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-navy-outlined-hover',
          ])}
          disabled={step === START_STEP || disablePrev}
        >
          Previous
        </Button>
      </Show>
      <Button
        color="navy"
        onClick={onNext}
        className={classcat([
          'btn-big w-full uppercase md:min-w-[200px]',
          'ow:hover:border-blu-500 ow:hover:bg-blu-500 ow:hover:text-white ow:hover:shadow-none',
          'hover-hover:border-blu-300 hover-hover:bg-blu-300 hover-hover:shadow-btn-navy-filled-hover ',
        ])}
        disabled={step > FINISH_STEP || disableNext}
      >
        Next
      </Button>
    </div>
  )
}

export default Action
