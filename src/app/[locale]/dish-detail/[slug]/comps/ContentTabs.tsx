'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { useMemo } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//RELATIVE MODULES
import Allergens from '../comps/Allergens';
import InfoContent from '../comps/InfoContent';
import Ingredients from '../comps/Ingredients';

type ScrollProps = ScrollArea.ScrollAreaProps;

const ScrollAreaRoot = ({ children, className, ...rest }: ScrollProps) => {
  return (
    <ScrollArea.Root className={classcat(['mb-6 h-0 lg:flex-[1]', className || ''])} {...rest}>
      <ScrollArea.Viewport className="h-full w-full">{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="scroll-area-scrollbar" orientation="vertical">
        <ScrollArea.Thumb className="flex-1 bg-yel-200" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

type TabProps = { dish?: RouterOutputs['dishes']['getDishById'] } & RadixTabs.TabsProps;

export default function Tabs({ dish, className, ...rest }: TabProps) {
  const TABS = useMemo(
    () => [
      {
        key: 'info',
        title: 'Info',
        content: <InfoContent dish={dish} />,
      },
      {
        key: 'allergens-intolerance',
        title: 'Allergens & Intolerances',
        content: <Allergens dish={dish} />,
      },
      {
        key: 'ingredients-recipe',
        title: 'Ingredients & Recipe',
        content: <Ingredients dish={dish} />,
      },
    ],
    [dish],
  );

  return (
    <RadixTabs.Root
      defaultValue="info"
      className={classcat([
        'radix-tabs-style-custom mx-[calc(var(--site-pad)_*_-1)] mt-2 bsm:-mx-6 blg:full-fledge',
        'lg:mt-6 lg:flex lg:h-0 lg:flex-[1] lg:flex-col lg:px-[unset]',
        className || '',
      ])}
      {...rest}
    >
      <RadixTabs.List
        className={classcat([
          'space-i-1 relative flex text-16 text-blu-400 pi-6',
          'overflow-auto whitespace-nowrap scrollbar-hide',
          'md:justify-center md:pi-0',
        ])}
      >
        {TABS.map((tab) => (
          <RadixTabs.Trigger
            key={tab.key}
            value={tab.key}
            className={classcat([
              'data-[state=active]:border-b-[1px] data-[state=active]:border-yel-500 data-[state=active]:text-yel-500',
            ])}
          >
            {tab.title}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      <div className={classcat(['-mt-px mb-6 h-px bg-blu-100'])} />
      <ScrollAreaRoot className="blg:hidden">
        {TABS.map((tab) => (
          <RadixTabs.Content key={tab.key} value={tab.key}>
            {tab.content}
          </RadixTabs.Content>
        ))}
      </ScrollAreaRoot>
      <div className="lg:hidden">
        {TABS.map((tab) => (
          <RadixTabs.Content key={tab.key} value={tab.key}>
            {tab.content}
          </RadixTabs.Content>
        ))}
      </div>
    </RadixTabs.Root>
  );
}
