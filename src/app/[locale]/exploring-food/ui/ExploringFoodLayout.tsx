'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider';
import { ICategories } from '_@landing/app/[locale]/global/GlobalProviderServer';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import Switch from '_@shared/components/conditions/Switch';
import { IAllergens, IIntolerances, ISiteContent } from '../layout';
//RELATIVE MODULES
import Filter from '../comps/Filter';
import SideMobile from '../comps/SideMobile';
import FoodBanner from '../comps/FoodBanner';
import SideDesktop from '../comps/SideDesktop';

type MetaCategoryActive = ICategories['data'][number]['data'][number];
type FoodContextType = {
  allergens: IAllergens;
  intolerances: IIntolerances;
  siteContent: ISiteContent;
  categoryActive: MetaCategoryActive;
};

const FoodContext = createContext<FoodContextType>({} as FoodContextType);
export const useFoodContext = () => useContext<FoodContextType>(FoodContext as any);

export default function ExploringFoodLayout({
  children,
  allergens,
  intolerances,
  siteContent,
}: PropsWithChildren<Omit<FoodContextType, 'categoryActive'>>) {
  const { categories } = useGlobalContext();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const activeTab = Number(searchParams.get('categoryId')) || categories?.defaultData.id;
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const segment = useSelectedLayoutSegment();
  const isRecommend = segment === 'recommend';

  useEffect(() => {
    const handleScroll = (e: CustomEvent<CustomEventMap['sticky-header']>) => {
      setIsHeaderSticky(e.detail.isSticky);
    };
    document.addEventListener('sticky-header', handleScroll);
    return () => document.removeEventListener('sticky-header', handleScroll);
  }, []);

  useLayoutEffect(() => {
    document.querySelector('#main')?.scrollTo({ top: 0 });
  }, [activeTab]);

  const categoryActive = useMemo(() => {
    let metaCategoryActive = {} as MetaCategoryActive;
    categories?.data.forEach((cur) => {
      const value = cur.data.find((item) => item.id === activeTab);
      if (value) {
        metaCategoryActive = value;
      }
    });

    return metaCategoryActive;
  }, [activeTab, categories]);

  return (
    <FoodContext.Provider value={{ allergens, intolerances, categoryActive, siteContent }}>
      {keyword || isRecommend ? (
        <h3 className="py-6 text-center text-28 text-blu-400 sm:hidden">
          <Switch.Root>
            <Switch.Case when={isRecommend}>Maybe you'll like</Switch.Case>
            <Switch.Case when={keyword}>Search results</Switch.Case>
            <Switch.Case when={true}>{categoryActive.metaCategory}</Switch.Case>
          </Switch.Root>
        </h3>
      ) : null}

      {!keyword && !isRecommend ? <FoodBanner /> : null}

      <section
        className={classcat([
          'sticky z-sticky block transition-[top] duration-500 full-fledge sm:hidden',
          isHeaderSticky ? 'top-[--h-header]' : 'top-0',
        ])}
      >
        <SideMobile />
      </section>

      <section className="py-4 sm:space-i-10 sm:flex sm:items-start sm:pb-32 sm:pt-6">
        <div className="sticky top-[--h-header] hidden h-[calc(100vh-var(--h-header))] w-50 overflow-auto scrollbar-hide sm:block sm:shrink-0">
          <SideDesktop />
        </div>

        <div className="grid gap-y-6 sm:grow sm:gap-y-8">{children}</div>
      </section>

      <Show when={!isRecommend}>
        <Filter />
      </Show>
    </FoodContext.Provider>
  );
}
