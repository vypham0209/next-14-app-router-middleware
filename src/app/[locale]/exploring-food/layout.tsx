//THIRD PARTY MODULES
import { cookies } from 'next/headers';
import { prisma } from '_@rpc/services/db';
import nextLoader from '_@landing/utils/nextLoader';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import DishDetailSlideOver from '_@landing/components/dish-detail-slide-over';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
import promiseAllSettled from '_@shared/utils/promiseAllSettled';
//RELATIVE MODULES
import ExploringFoodLayout from './ui/ExploringFoodLayout';

const getAllergens = async () => {
  return await prisma.allergens.findMany();
};

const getIntolerances = async () => {
  return await prisma.intolerance.findMany();
};

const getSiteContent = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.EXPLORE_FOOD_HERO],
  });
  if (data.status) return data.data[0];
};

export type IAllergens = Awaited<ReturnType<typeof getAllergens>>;
export type IIntolerances = Awaited<ReturnType<typeof getIntolerances>>;
export type ISiteContent = Awaited<ReturnType<typeof getSiteContent>>;

const loader = nextLoader(async () => {
  const [allergens, intolerances, siteContent] = await promiseAllSettled([
    getAllergens(),
    getIntolerances(),
    getSiteContent(),
  ]);

  return { allergens, intolerances, siteContent };
});

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { allergens = [], intolerances = [], siteContent } = await loader();

  return (
    <ExploringFoodLayout
      allergens={allergens}
      intolerances={intolerances}
      siteContent={siteContent}
    >
      {children}
      <DishDetailSlideOver />
    </ExploringFoodLayout>
  );
}
