//THIRD PARTY MODULES
import React from 'react';
import { SpicyLevel } from '@prisma/client';
import nextLoader from '_@landing/utils/nextLoader';
import { getUrlOnServer } from '_@landing/utils/getUrlOnServer';
import { metaCategoriesId } from '_@landing/constants/metaCategory';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
//RELATIVE MODULES
import ExploringFood from '../ui/ExploringFood';

const loader = nextLoader(async () => {
  const url = getUrlOnServer();
  const searchParams = url?.searchParams;
  const dishIds = searchParams?.get('dishIds')?.split(',');
  const categoryId = searchParams?.get('categoryId') || '0';
  let allIds: string[] = [];
  if (Number(categoryId) < 0) {
    const categories = await apiServer.categories.getAll.query();
    const metaCategory = Object.entries(metaCategoriesId).find(
      ([_, value]) => value === Number(categoryId),
    )?.[0];
    allIds = categories
      .filter((item) => item.metaCategory === metaCategory)
      .map((item) => String(item.id));
  }

  const dishes = await apiServer.dishes.getRecommendedByDishIds.query({
    page: 1,
    size: 999,
    ids: dishIds?.map((dishId) => Number(dishId)) || [],
    ...(categoryId === '0' ? {} : { categoryIds: allIds.length > 0 ? allIds : [categoryId] }),
  });
  type Dishes = (typeof dishes.data)[0];

  const formatDishes = {
    ...dishes,
    data: dishes.data.map(({ spicy_level, in_stock, ...item }: any) => ({
      ...item,
      spicyLevel: spicy_level as SpicyLevel,
      inStock: in_stock,
    })) as Dishes[],
  };

  return {
    dishes: formatDishes,
  };
});

export type LoaderMaybeYouWillLikeType = Awaited<ReturnType<typeof loader>>;

export default async function Page() {
  const data = await loader();
  return <ExploringFood data={data} />;
}
