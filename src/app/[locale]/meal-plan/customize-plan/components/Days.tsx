//THIRD PARTY MODULES
import classcat from 'classcat'
import { useFormContext } from 'react-hook-form'
import { dayOptionsObject } from '_@landing/constants/meal-plan'
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Switch from '_@shared/components/conditions/Switch'
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon'
//RELATIVE MODULES
import { CustomizePlanSchema } from '../../schema/customize-plan-schema'
import { useCustomizePlanContext } from '../../context/CustomizePlanContext'

function Days() {
  const { currentWeek, currentDay, setCurrentDay } = useCustomizePlanContext()
  const [state] = useMealPlanActor()
  const isSyncing = ['fetching-category', 'syncing'].some(state.matches)
  const {
    getValues,
    formState: { errors },
  } = useFormContext<CustomizePlanSchema>()
  const days = getValues(`weeks.${currentWeek}.days`)

  return (
    <div
      className={classcat([
        'flex min-h-[theme(spacing[12.75])] items-center justify-center border-b border-blu-100 bg-yel-25 py-3 ps-6 sm:min-h-[theme(spacing[14.25])] sm:px-6 sm:py-4 ',
      ])}
    >
      <div
        className={classcat([
          'grid grid-flow-col items-center justify-items-center gap-4 overflow-auto bg-yel-25 pe-6 scrollbar-hide sm:gap-6',
        ])}
      >
        <Switch.Root>
          <Switch.Case when={isSyncing}>
            {Array(6)
              .fill(1)
              .map((_, index) => (
                <div key={index} className="h-6.5 w-13 animate-pulse bg-skeleton sm:h-6 sm:w-15" />
              ))}
          </Switch.Case>
          <Switch.Case when={true}>
            {days?.map((day, index) => {
              const isValid = !errors.weeks?.[currentWeek]?.days?.[index]?.meals
              return (
                <Button
                  key={day.value}
                  onClick={() => setCurrentDay(index)}
                  className={classcat([
                    'btn-medium',
                    '[&>span]:ow:text-14 sm:[&>span]:ow:text-16',
                    currentDay === index ? 'text-yel-500 shadow-[inset_0_-1px] shadow-yel-500' : '',
                  ])}
                  color="navy"
                  variant="ghost"
                  trailingIcon={isValid ? <CheckIcon className="text-gre-300" /> : null}
                >
                  {dayOptionsObject[day.value].fullLabel}
                </Button>
              )
            })}
          </Switch.Case>
        </Switch.Root>
      </div>
    </div>
  )
}

export default Days
