'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useEffect } from 'react';
import { usePathname } from 'next-intl/client';
import { useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
//HOOK, SERVER
import useFilterQueryString from '_@landing/hook/useFilterQueryString';

type TPaginationProps =
  | {
      perPage: number;
      totalItems: number;
      page: number;
      onChange: (page: number, size: number) => void;
    }
  | {
      perPage: number;
      totalItems: number;
      page?: number;
      onChange?: undefined;
    };

function Pagination({ page, totalItems, perPage, onChange }: TPaginationProps) {
  const params = useSearchParams();
  const pathName = usePathname();
  const filter = useFilterQueryString();

  const totalPage = Math.ceil(totalItems / perPage);
  const currentPage = page || +(params.get('page') || 1);

  const pages = getPagesWithFirstAndLast(currentPage, totalPage);

  const setPageToUrl = (pageNumber: number) => {
    onChange ? onChange(pageNumber, perPage) : filter({ page: pageNumber, size: perPage });
  };

  const handleChangePage = (pageNumber: number) => () => {
    setPageToUrl(pageNumber);
  };

  const changePageBy = (increment: 1 | -1) => () => {
    setPageToUrl(currentPage + increment);
  };

  useEffect(() => {
    if (currentPage > totalPage && totalPage > 0) {
      filter({ page: 1, size: perPage });
    }
  }, [totalPage, currentPage, params, pathName, filter, perPage]);
  return (
    <div className={classcat(['grid grid-flow-col content-center justify-start gap-4'])}>
      <Button
        disabled={currentPage === 1}
        color="navy"
        variant="ghost"
        onClick={changePageBy(-1)}
        className={classcat([
          'ow:btn-small ow:w-6 ow:py-0.5',
          'ow:hover:border-none ow:hover:text-blu-500',
          'hover-hover:text-yel-500 hover-hover:shadow-[inset_0_-1px] hover-hover:shadow-yel-500',
        ])}
      >
        <ArrowLeftIcon />
      </Button>
      <div className={classcat(['grid grid-flow-col content-center justify-start gap-2'])}>
        {pages.map((page, index) => (
          <Button
            key={index}
            color={currentPage === page ? 'primary' : 'navy'}
            variant={currentPage === page ? 'filled' : 'outlined'}
            disabled={!page}
            onClick={handleChangePage(page)}
            className={classcat([
              'ow:btn-small ow:py-0.5',
              page < 100 ? 'ow:w-6' : '',
              currentPage === page
                ? classcat([
                    'ow:hover:border-yel-500 ow:hover:bg-yel-500 ow:hover:text-white',
                    'hover-hover:border-yel-700 hover-hover:bg-yel-700 hover-hover:shadow-btn-primary-filled-hover',
                  ])
                : classcat([
                    'ow:hover:border-blu-100 ow:hover:text-blu-500',
                    'hover-hover:border-blu-100 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-navy-outlined-hover',
                  ]),
            ])}
          >
            {page || '...'}
          </Button>
        ))}
      </div>
      <Button
        disabled={currentPage === totalPage}
        color="navy"
        variant="ghost"
        onClick={changePageBy(1)}
        className={classcat([
          'ow:btn-small ow:w-6 ow:py-0.5',
          'ow:hover:border-none ow:hover:text-blu-500',
          'hover-hover:text-yel-500 hover-hover:shadow-[inset_0_-1px] hover-hover:shadow-yel-500',
        ])}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

export default Pagination;

const getPagesWithFirstAndLast = (currentPage: number, totalPage: number): number[] => {
  const pages = [];
  const maxPageShow = 7;

  if (totalPage < maxPageShow) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
  } else {
    if (
      currentPage === 1 ||
      currentPage === 2 ||
      currentPage === totalPage ||
      currentPage === totalPage - 1
    ) {
      pages.push(1, 2, 3, 0, totalPage - 2, totalPage - 1, totalPage);
    } else if (currentPage === 3) {
      pages.push(1, 2, 3, 4, 0, totalPage - 1, totalPage);
    } else if (currentPage === totalPage - 2) {
      pages.push(1, 2, 0, totalPage - 3, totalPage - 2, totalPage - 1, totalPage);
    } else {
      pages.push(1, 0, currentPage - 1, currentPage, currentPage + 1, 0, totalPage);
    }
  }
  return pages;
};
