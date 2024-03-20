//THIRD PARTY MODULES
import React from 'react'
import classcat from 'classcat'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
//SHARED
import NoMealPlanIcon from '_@shared/icons/NoOrderIcon'

function NoMealPlan({
  description = 'You are currently not subscribed to any Meal Plan.',
}: {
  description?: string
}) {
  return (
    <div
      className={classcat([
        'flex flex-col items-center justify-center space-y-6 pb-4 pt-20',
        'md:space-y-10 md:py-20',
      ])}
    >
      <NoMealPlanIcon className={classcat(['h-30 w-35', 'md:h-auto md:w-auto'])} />
      <p
        className={classcat(['text-center text-16lig text-blu-400', 'md:max-w-175 md:text-20lig'])}
      >
        {description}
      </p>
      <Button
        as="link"
        href="/meal-plan"
        color="navy"
        className={classcat([
          'btn-big',
          'ow:md:w-fit',
          'ow:hover:border-blu-500 ow:hover:bg-blu-500 ow:hover:text-white ow:hover:shadow-none',
          'hover-hover:border-blu-300 hover-hover:bg-blu-300 hover-hover:shadow-btn-navy-filled-hover ',
        ])}
      >
        Explore our Meal Plan
      </Button>
    </div>
  )
}

export default NoMealPlan
