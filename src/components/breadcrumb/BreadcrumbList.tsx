'use client';

//THIRD PARTY MODULES
import { Fragment } from 'react';
import { usePathname } from 'next-intl/client';
import { firstUpper } from '_@landing/utils/wordFormat';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import Button from '_@shared/components/button/Button';
//RELATIVE MODULES
import { useBreadcrumbContext } from './Breadcrumb';

const BreadcrumbList = () => {
  const { list } = useBreadcrumbContext();
  const pathname = usePathname();

  const LIST = pathname.split('/').map((item) => ({
    url: `/${item}`,
    name: item ? firstUpper(item.split('-').join(' ')) : 'Homepage',
  }));

  return (
    <Show when={(list || LIST).length > 0}>
      <div className="space-i-2 flex overflow-hidden">
        {(list || LIST).map((item, index, arr) => {
          const isLast = index === arr.length - 1;
          return (
            <Fragment key={item.name}>
              {isLast ? (
                <span className="truncate pb-1 text-12 text-blu-500">{item.name}</span>
              ) : (
                <Button as="link" href={item.url} color="navy" variant="ghost">
                  {item.name}
                </Button>
              )}
              {isLast ? null : <span className="text-12 text-blu-400">/</span>}
            </Fragment>
          );
        })}
      </div>
    </Show>
  );
};

export default BreadcrumbList;
