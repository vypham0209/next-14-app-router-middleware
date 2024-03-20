//RELATIVE MODULES
import Step1 from './Step1'
import Step2 from './Step2'
import { TStep, useBuildPlanContext } from '../../context/BuildPlanContext'

const stepComponents = {
  1: Step1,
  2: Step2,
} as Record<TStep, () => JSX.Element>

function Content() {
  const { step } = useBuildPlanContext()
  const StepComponent = stepComponents[step]

  return <StepComponent />
}

export default Content
