//THIRD PARTY MODULES
import { SpicyLevel } from '@prisma/client';
import nextLoader from '_@landing/utils/nextLoader';
import { getUrlOnServer } from '_@landing/utils/getUrlOnServer';
import { metaCategoriesId } from '_@landing/constants/metaCategory';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
//RELATIVE MODULES
import ExploringFood from './ui/ExploringFood';
import { SortingOptions, sortingOptions } from './constants/sortingOptions';

const loader = nextLoader(async () => {
  const url = getUrlOnServer();
  const searchParams = url?.searchParams;
  const keyword = searchParams?.get('keyword') || '';
  const categoryId = keyword
    ? searchParams?.get('categoryId') || '0'
    : searchParams?.get('categoryId') || '-1';
  const allergenIds = searchParams?.get('allergens')?.split(',');
  const intoleranceIds = searchParams?.get('intolerances')?.split(',');
  const spiceLevel = searchParams?.get('spiceLevel')?.split(',') as SpicyLevel[];
  const priceFrom = searchParams?.get('priceFrom');
  const priceTo = searchParams?.get('priceTo');
  const caloriesFrom = searchParams?.get('caloriesFrom');
  const caloriesTo = searchParams?.get('caloriesTo');
  const sortBy = (searchParams?.get('sortBy') || 'best-seller') as SortingOptions;

  let allIds: string[] = [];
  if (Number(categoryId) < 0) {
    const categories = await apiServer.categories.getAll.query();
    const metaCategory = Object.keys(metaCategoriesId).find((item) => {
      const meta = metaCategoriesId[item as keyof typeof metaCategoriesId] as number;
      return meta === Number(categoryId);
    });
    allIds = categories
      .filter((item) => item.metaCategory === metaCategory)
      .map((item) => String(item.id));
  }

  const dishes = await apiServer.dishes.searchDishes.query({
    page: 1,
    size: 999,
    allergenIds,
    intoleranceIds,
    spiceLevel,
    calories: {
      min: Number(caloriesFrom),
      max: Number(caloriesTo),
    },
    price: {
      min: Number(priceFrom),
      max: Number(priceTo),
    },
    orderBy: sortingOptions[sortBy],
    ...(keyword && { keyword }),
    ...(categoryId === '0' ? {} : { categoryIds: allIds.length > 0 ? allIds : [categoryId] }),
  });

  type Dishes = (typeof dishes.data)[0];

  const formatDishes = {
    ...dishes,
    data: dishes.data.map(({ spicy_level, ...item }: any) => ({
      ...item,
      spicyLevel: spicy_level as SpicyLevel,
      inStock: item.in_stock,
    })) as Dishes[],
  };

  return {
    dishes: formatDishes,
  };
});

export type LoaderType = Awaited<ReturnType<typeof loader>>;

export default async function Page() {
  const data = await loader();
  return <ExploringFood data={data} />;
}
