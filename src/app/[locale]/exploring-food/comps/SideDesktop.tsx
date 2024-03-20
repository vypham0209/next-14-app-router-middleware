'use client';

//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import * as Accordion from '@radix-ui/react-accordion';
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

type Props = {
  rootClassName?: string;
};

const SideDesktop = ({ rootClassName }: Props) => {
  const { categories } = useGlobalContext();
  const { categoryActive } = useFoodContext();
  const segment = useSelectedLayoutSegment();
  const isRecommend = segment === 'recommend';
  const filter = useFilterQueryString();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const categoryId =
    keyword || isRecommend
      ? Number(searchParams.get('categoryId')) || 0
      : Number(searchParams.get('categoryId')) || -1;

  return (
    <Accordion.Root
      collapsible
      type="single"
      key={categoryActive.id}
      defaultValue={categoryActive.metaCategory}
      className={classcat(['space-y-4', rootClassName])}
    >
      {keyword || isRecommend ? (
        <Button
          color="navy"
          variant="ghost"
          className={classcat([
            'ow:[&_span]:text-18',
            !categoryId ? 'shadow-[inset_0_-1px] ow:text-yel-500' : 'ow:text-blu-400',
          ])}
          onClick={() => {
            filter({ categoryId: undefined });
          }}
        >
          All
        </Button>
      ) : null}
      {categories?.data.map((category) => (
        <AccordionItem key={category.title} className="space-y-2" value={category.title}>
          <AccordionTrigger>
            <p className="py-2 text-18 text-blu-400">{category.title}</p>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 pi-4">
              {category.data.map((subCategory) => (
                <li key={subCategory.id}>
                  <Button
                    color="navy"
                    variant="ghost"
                    className={classcat([
                      'btn-very-big',
                      categoryId === subCategory.id
                        ? 'shadow-[inset_0_-1px] ow:text-yel-500'
                        : 'ow:text-blu-400',
                    ])}
                    onClick={() => {
                      filter({ categoryId: subCategory.id });
                    }}
                  >
                    {subCategory.name}
                  </Button>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
};

const AccordionItem = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Accordion.Item>>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item className={classcat([className])} {...props} ref={forwardedRef}>
      {children}
    </Accordion.Item>
  ),
);

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header>
    <Accordion.Trigger
      className={classcat(['group flex w-full items-center justify-between', className])}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classcat([
      'overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down',
      className,
    ])}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
));

export default SideDesktop;
