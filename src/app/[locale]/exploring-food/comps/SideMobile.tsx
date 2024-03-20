//THIRD PARTY MODULES
import classcat from 'classcat';
import { useEffect, useState } from 'react';
import { metaCategoriesId } from '_@landing/constants/metaCategory';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
//HOOK, SERVER
import useFilterQueryString from '_@landing/hook/useFilterQueryString';
//RELATIVE MODULES
import { useFoodContext } from '../ui/ExploringFoodLayout';

export default function SideMobile() {
  const { categoryActive } = useFoodContext();
  const { categories } = useGlobalContext();
  const filter = useFilterQueryString();
  const segment = useSelectedLayoutSegment();
  const isRecommend = segment === 'recommend';
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const categoryId =
    keyword || isRecommend
      ? Number(searchParams.get('categoryId')) || 0
      : Number(searchParams.get('categoryId')) || -1;

  const [idKey, setIdKey] = useState(0);

  const subTabs = categories?.data.find((category) =>
    category.data.some((subCategory) => categoryId === subCategory.id),
  );

  useEffect(() => {
    setIdKey((prev) => prev + 1);
    return () => setIdKey(0);
  }, [categoryId]);

  useEffect(() => {
    const activeTabs = document.querySelectorAll<HTMLButtonElement>(`[data-active="true"]`);
    if (activeTabs.length > 0) {
      activeTabs.forEach((item) => {
        item.parentElement?.scrollBy({ left: item.offsetLeft - 24, behavior: 'smooth' });
      });
    }
  }, [categoryActive, idKey]);

  return (
    <>
      <div className="w-screen overflow-hidden bg-yel-50">
        <div key={idKey} className="flex overflow-auto bg-yel-50 scrollbar-hide">
          {keyword || isRecommend ? (
            <button
              type="button"
              data-state={!categoryId ? 'open' : 'closed'}
              className={classcat([
                'w-36.75 shrink-0 py-3',
                'text-center text-16 text-blu-500',
                'data-[state=open]:bg-yel-200',
              ])}
              onClick={() => {
                filter({ categoryId: undefined });
              }}
            >
              All
            </button>
          ) : null}
          {categories?.data.map((category) => {
            return (
              <button
                type="button"
                key={category.title}
                data-state={
                  category.data.some((subCategory) => categoryId === subCategory.id)
                    ? 'open'
                    : 'closed'
                }
                className={classcat([
                  'group flex shrink-0 gap-2 px-6 py-3 text-16 text-blu-500',
                  'data-[state=open]:bg-yel-200',
                ])}
                onClick={() => {
                  filter({ categoryId: metaCategoriesId[category.title] });
                }}
              >
                <span>{category.title}</span>
                <ChevronDownIcon
                  className={classcat([
                    'shrink-0 transition-transform',
                    'group-data-[state=closed]:rotate-180',
                  ])}
                />
              </button>
            );
          })}
        </div>
      </div>

      {subTabs ? (
        <div className="overflow-hidden border-b border-blu-50">
          <div
            key={idKey}
            className="relative flex w-full snap-x snap-proximity gap-8 overflow-auto bg-yel-25 px-6 py-2 scrollbar-hide"
          >
            {subTabs.data.map((subCategory) => (
              <Button
                key={subCategory.id}
                color="navy"
                variant="ghost"
                data-active={categoryId === subCategory.id}
                className={classcat([
                  'shrink-0 snap-start scroll-mx-6 ow:bg-transparent [&>span]:text-16',
                  categoryId === subCategory.id
                    ? 'shadow-[inset_0_-1px] shadow-yel-500 [&>span]:text-yel-500'
                    : '[&>span]:text-blu-400',
                ])}
                onClick={() => {
                  filter({ categoryId: subCategory.id });
                }}
              >
                {subCategory.name}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
