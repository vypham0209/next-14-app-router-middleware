//THIRD PARTY MODULES
import { PropsWithChildren, ReactElement } from 'react'

const MealPlanModal = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <div>
      {children}
      <p>MealPlanModal</p>
    </div>
  )
}

export default MealPlanModal
