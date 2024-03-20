//THIRD PARTY MODULES
import classcat from 'classcat'
//LAYOUT, COMPONENTS
import PriceCard from './components/PriceCard'
import Description from './components/Description'
import ShippingInfo from './components/ShippingInfo'
import Button from '_@shared/components/button/Button'
//SHARED
import { apiServer } from '_@shared/utils/apiServer'
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon'
//RELATIVE MODULES
import CopyButton from '../../comps/CopyButton'
import MealPlanModal from '../../comps/MealPlanModal'

async function MealPlanDetailPage({ params: { id } }: { params: { id: string } }) {
  const data = await apiServer.mealPlan.getMealPlanOrderDetail.query({
    mealPlanOrderId: id,
  })
  return (
    <div
      id="order-detail-section"
      className={classcat([
        'max-content relative space-y-6 pb-0 pt-6 full-fledge md:pb-36 md:pt-10',
        'md:space-y-10 ',
      ])}
    >
      <div className="space-i-6 flex items-center">
        <Button
          as="link"
          href={'/account?tab=meal-plans'}
          variant="outlined"
          color="navy"
          className="flex h-9 items-center justify-center border border-blu-100 ow:w-9"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <span className="text-14 text-blu-500">Go back to Meal Plans</span>
      </div>
      <div
        className={classcat([
          'flex flex-col items-start justify-between space-x-0 space-y-6',
          'md:flex-row md:items-center md:space-x-10 md:space-y-0',
        ])}
      >
        <div className={classcat(['shrink-0 text-36 text-blu-400 lg:text-48'])}>
          Healthy Meal Plan
        </div>
        <div
          className={classcat([
            'flex w-full flex-col-reverse flex-wrap justify-between',
            'md:space-i-2 md:flex-row md:flex-nowrap',
          ])}
        >
          <MealPlanModal id={data.data.id}>
            <Button
              color="navy"
              className={classcat([
                'btn-big ow:w-full',
                'ow:md:w-fit',
                'ow:hover:border-blu-500 ow:hover:bg-blu-500 ow:hover:text-white ow:hover:shadow-none',
                'hover-hover:border-blu-300 hover-hover:bg-blu-300 hover-hover:shadow-btn-navy-filled-hover ',
              ])}
            >
              View menu
            </Button>
          </MealPlanModal>
          <CopyButton
            id={data.data.id}
            textClassname="ow:md:text-20lig ow:text-16lig"
            iconClassname="ow:w-6 ow:h-6"
            wrapperClassname="pb-6 md:pb-0 ow:space-x-3"
          />
        </div>
      </div>
      <div
        className={classcat(['flex flex-col space-y-6', 'lg:space-i-15 lg:flex-row lg:space-y-0'])}
      >
        <div className={classcat(['flex flex-1 flex-col space-y-10'])}>
          <Description data={data.data} />
          <ShippingInfo data={data.data.address} />
          {/*
          //TODO show and call api when have integrate with delivery 
           <DeliveryHistory /> 
           */}
        </div>
        <PriceCard data={data.data} />
      </div>
    </div>
  )
}

export default MealPlanDetailPage
