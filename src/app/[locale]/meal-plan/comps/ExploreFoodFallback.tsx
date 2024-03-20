//THIRD PARTY MODULES
import classcat from 'classcat'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import BuildPlanModal from '../components/build-plan/BuildPlanModal'

//THIRD PARTY MODULES
//SHARED

const ExploreFoodFallback = () => {
  return (
    <div
      className={classcat([
        'flex flex-col items-center gap-y-10 bg-yel-1000 px-6 py-14',
        'md:py-16',
      ])}
    >
      <div className={classcat(['flex flex-col gap-y-4 md:gap-y-6', 'md:max-w-[800px]'])}>
        <h2 className={classcat(['text-center text-36 font-medium text-white', 'text-48'])}>
          Lorem ipsum
        </h2>
        <p className={classcat(['text-center text-white', 'md:text-20'])}>
          Ornare lectus id sed ullamcorper tristique tempus. Dignissim pulvinar egestas platea mi
          consectetur aliquam et turpis donec. Quam tristique vitae iaculis fringilla.
        </p>
      </div>

      <BuildPlanModal>
        <Button
          className="btn-medium bg-white uppercase ow:py-3 ow:text-blu-500 md:max-w-[348px]"
          variant="outlined"
        >
          Build your plan now
        </Button>
      </BuildPlanModal>
    </div>
  )
}

export default ExploreFoodFallback
