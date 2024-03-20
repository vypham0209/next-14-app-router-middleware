//THIRD PARTY MODULES
import nextLoader from '_@landing/utils/nextLoader';
import { Category, MetaCategory } from '@prisma/client';
import { metaCategoriesId } from '_@landing/constants/metaCategory';
import GlobalProvider from '_@landing/app/[locale]/global/GlobalProvider';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
import promiseAllSettled from '_@shared/utils/promiseAllSettled';

const getCategories = async () => {
  const categoriesReq = await apiServer.categories.getAll.query();

  const categories = categoriesReq.reduce((acc, item) => {
    const metaCategoryOfItem = item.metaCategory;
    const metaCategory = acc.find((item) => item.title === metaCategoryOfItem);

    if (metaCategory) {
      metaCategory.data.push(item);
    } else {
      acc.push({
        title: metaCategoryOfItem,
        data: [
          {
            id: metaCategoriesId[metaCategoryOfItem],
            metaCategory: metaCategoryOfItem,
            name: 'All',
          },
          item,
        ],
      });
    }
    return acc;
  }, [] as { title: MetaCategory; data: Category[] }[]);

  const metaCategory = categories.reduce((acc, item) => {
    if (Object.values(metaCategoriesId as any).includes(item.data[0].id)) {
      return [...acc, item.data[0]] as any;
    }
  }, [] as Category[]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const defaultData = metaCategory.find((item) => item.id === metaCategoriesId.Ordinary)!;

  return {
    data: categories,
    defaultData,
    metaCategory,
  };
};

const getPhoneCodes = async () => {
  const phoneCodes = await apiServer.country.getAllCountry.query();
  return {
    data: phoneCodes,
  };
};

const getUser = async (isAuth: boolean) => {
  if (!isAuth) return undefined;

  const { user } = await apiServer.userProfile.getMyProfile.query();
  return user;
};

export type ICategories = Awaited<ReturnType<typeof getCategories>>;

const loader = nextLoader(async (_, isAuth) => {
  const [categories, country, user] = await promiseAllSettled([
    getCategories(),
    getPhoneCodes(),
    getUser(isAuth),
  ]);

  const countryOptions =
    country?.data?.map((item) => ({
      value: item.id,
      label: `+${item.dialCode} ${item.name}`,
      ...item,
    })) || [];

  return {
    user,
    categories,
    country,
    countryOptions,
  };
});

export type LoaderType = Awaited<ReturnType<typeof loader>>;

async function GlobalProviderServer({ children }: { children: React.ReactNode }) {
  const data = await loader();
  return <GlobalProvider data={data}>{children}</GlobalProvider>;
}

export default GlobalProviderServer as unknown as (props: {
  children: React.ReactNode;
}) => JSX.Element;
