//THIRD PARTY MODULES
import { ErrorBoundary } from 'react-error-boundary'
//RELATIVE MODULES
import FAQ from './comps/FAQ'
import Banner from './comps/Banner'
import AllPlan from './comps/AllPlan'
import ContactUs from '../comps/ContactUs'
import SampleMenu from './comps/SampleMenu'
import ExploreFood from './comps/ExploreFood'
import WhyMealPlan from './comps/WhyMealPlan'
import FAQFallback from './comps/FAQFallback'
import SampleMacros from './comps/SampleMacros'
import BannerFallback from './comps/BannerFallback'
import AllPlanFallback from './comps/AllPlanFallback'
import SampleMenuFallback from './comps/SampleMenuFallback'
import WhyMealPlanFallback from './comps/WhyMealPlanFallback'
import ExploreFoodFallback from './comps/ExploreFoodFallback'
import SampleMacrosFallback from './comps/SampleMacrosFallback'

const MealPlan = () => {
  return (
    <>
      <div className="!col-span-full">
        <ErrorBoundary fallback={<BannerFallback />}>
          <Banner />
        </ErrorBoundary>

        <div className="mt-20">
          <ErrorBoundary fallback={<AllPlanFallback />}>
            <AllPlan />
          </ErrorBoundary>
        </div>

        <ErrorBoundary fallback={<WhyMealPlanFallback />}>
          <WhyMealPlan />
        </ErrorBoundary>

        <div className="mt-20 md:mt-36">
          <ErrorBoundary fallback={<SampleMenuFallback />}>
            <SampleMenu />
          </ErrorBoundary>
        </div>

        <div className="mt-20 md:mt-36">
          <ErrorBoundary fallback={<SampleMacrosFallback />}>
            <SampleMacros />
          </ErrorBoundary>
        </div>

        <div className="mt-20 md:mt-36">
          <ErrorBoundary fallback={<FAQFallback />}>
            <FAQ />
          </ErrorBoundary>
        </div>

        <div className="mt-20 md:mt-36">
          <ErrorBoundary fallback={<ExploreFoodFallback />}>
            <ExploreFood />
          </ErrorBoundary>
        </div>

        <ContactUs />
      </div>
    </>
  )
}

export default MealPlan
