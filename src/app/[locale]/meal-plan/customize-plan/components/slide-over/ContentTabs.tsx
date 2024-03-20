'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { useMemo } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//RELATIVE MODULES
import Allergens from './Allergens';
import InfoContent from './InfoContent';
import Ingredients from './Ingredients';

type TabProps = {
  dish?: RouterOutputs['dishes']['getDishById'];
  value: string;
  onValueChange: (value: string) => void;
};

export default function ContentTabs({ dish, value, onValueChange }: TabProps) {
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
      value={value}
      onValueChange={onValueChange}
      className={classcat(['grid px-6 pb-6 sm:px-10 sm:pb-10'])}
    >
      <RadixTabs.List
        className={classcat([
          'space-i-1 relative flex justify-start text-16 text-blu-400',
          'overflow-auto whitespace-nowrap scrollbar-hide',
        ])}
      >
        {TABS.map((tab) => (
          <RadixTabs.Trigger
            key={tab.key}
            value={tab.key}
            className={classcat([
              'px-2 pb-1',
              'data-[state=active]:border-b-[1px] data-[state=active]:border-yel-500 data-[state=active]:text-yel-500',
            ])}
          >
            {tab.title}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      <div className={classcat(['-mt-px mb-6 h-px bg-blu-100'])} />

      {TABS.map((tab) => (
        <RadixTabs.Content key={tab.key} value={tab.key}>
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
