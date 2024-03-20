//THIRD PARTY MODULES
import classcat from 'classcat';
import nextLoader from '_@landing/utils/nextLoader';
//LAYOUT, COMPONENTS
import Content from './components/Content';
import TitleAndFilter from './components/TitleAndFilter';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
import promiseAllSettled from '_@shared/utils/promiseAllSettled';
//RELATIVE MODULES
import { CustomizePlanContextProvider } from '../context/CustomizePlanContext';

const getAllergens = async () => {
  return await apiServer.allergens.getAll.query();
};

const getIntolerances = async () => {
  return await apiServer.intolerance.getAll.query();
};

const loader = nextLoader(async () => {
  const [allergens, intolerances] = await promiseAllSettled([getAllergens(), getIntolerances()]);
  return { allergens, intolerances };
});

async function Page() {
  const { allergens = [], intolerances = [] } = await loader();

  return (
    <CustomizePlanContextProvider allergens={allergens} intolerances={intolerances}>
      <div className="relative grid gap-0 px-0 pb-20 pt-10 full-fledge sm:max-content sm:gap-10 sm:pb-36">
        <h3
          className={classcat([
            'max-content pb-6 text-36 text-blu-400',
            'sm:px-0 sm:pb-0 sm:text-48',
          ])}
        >
          Customize your meal plan
        </h3>
        <TitleAndFilter />
        <Content />
      </div>
    </CustomizePlanContextProvider>
  );
}

export default Page;
