'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
//LAYOUT, COMPONENTS
import Portal from '_@shared/components/Portal';
import Show from '_@shared/components/conditions/Show';
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
//HOOK, SERVER
import useClickOutside from '_@landing/hook/useClickOutside';
//RELATIVE MODULES
import Sort from './filter/Sort';
import FilterOther from './filter/FilterOther';
import AllergensAndIntolerance from './filter/AllergensAndIntolerance';

export enum FilterEnum {
  ALLERGENS_AND_INTOLERANCE = 'ALLERGENS & INTOLERANCES',
  FILTER = 'FILTER',
  SORT = 'SORT',
}
export const filter = [FilterEnum.ALLERGENS_AND_INTOLERANCE, FilterEnum.FILTER, FilterEnum.SORT];

const getLength = (value: string | null) => (value ? value.split(',').length : 0);

export default function Filter() {
  const [selected, setSelected] = useState<FilterEnum>();
  const refContainer = useRef<HTMLDivElement>(null);
  const refFilter = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const isPrice = searchParams.get('priceFrom') || searchParams.get('priceTo');
  const isCalories = searchParams.get('caloriesFrom') || searchParams.get('caloriesTo');
  const countFilter = {
    [FilterEnum.ALLERGENS_AND_INTOLERANCE]:
      getLength(searchParams.get('intolerances')) + getLength(searchParams.get('allergens')),
    [FilterEnum.FILTER]:
      getLength(searchParams.get('spiceLevel')) + (isPrice ? 1 : 0) + (isCalories ? 1 : 0),
    [FilterEnum.SORT]: 0,
  };

  const onSelect = (item: (typeof filter)[number]) => () => {
    if (selected === item) {
      setSelected(undefined);
      return;
    }
    setSelected(item);
  };

  const onClose = () => {
    setSelected(undefined);
  };

  useEffect(() => {
    if (!refContainer.current) return;
    const containerEl = refContainer.current;

    const selectedEl = refContainer.current.querySelector('[data-state="open"]');
    if (!selectedEl) {
      containerEl.style.removeProperty('--offset-x');
      return;
    }

    const handleResize = () => {
      const { right: rightSelected } = selectedEl.getBoundingClientRect();
      const { left: leftContainer } = containerEl.getBoundingClientRect();

      let offsetX = rightSelected - leftContainer - 540;
      const over = 540 - rightSelected;
      offsetX = over > 0 ? offsetX + over : offsetX;
      containerEl.style.setProperty('--offset-x', `${offsetX}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selected]);

  useClickOutside(refFilter, () => setSelected(undefined));

  return (
    <Portal asChild>
      <div
        ref={refFilter}
        className={classcat([
          'fixed bottom-8 z-[calc(theme(zIndex[sticky])-1)] sm:end-10',
          'sm:block sm:max-w-[theme(space[115.25])]',
          'grid w-screen sm:w-[var(--max-content)]',
          'grid-cols-[1fr_calc(min(100vw,_var(--max-bound))_-_(var(--site-pad)*2))_1fr]',
        ])}
      >
        <div
          className={classcat([
            'col-span-1 col-start-2 h-13 sm:h-13.5 ',
            'grid grid-cols-[156fr_116fr_81fr] md:grid-cols-[264fr_116fr_81fr]',
            'items-center drop-shadow-[0px_0px_30px_rgba(86,_62,_38,_0.3)]',
            'relative md:static',
          ])}
          ref={refContainer}
        >
          {filter.map((item) => (
            <button
              key={item}
              data-state={selected === item ? 'open' : 'closed'}
              className={classcat([
                'group relative flex h-full items-center justify-between gap-1 pi-2 sm:ps-3',
                selected === item ? 'bg-blu-500 text-white' : 'bg-white text-blu-500',
              ])}
              onClick={onSelect(item)}
            >
              <span className="grow text-12 md:text-14">{item}</span>
              <p className="flex shrink-0 items-center gap-2">
                <Show when={item !== 'SORT' && countFilter[item]}>
                  <span
                    className={classcat([
                      'grid place-items-center rounded-sm bg-yel-50 ',
                      'h-4 w-4 md:h-4.5 md:w-4.5',
                      'select-none text-12 text-yel-800',
                    ])}
                  >
                    {countFilter?.[item]}
                  </span>
                </Show>

                <ChevronDownIcon
                  className={classcat([
                    'h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.87,_0,_0.13,_1)]',
                    selected === item ? 'rotate-180 text-white' : '',
                  ])}
                />
              </p>
            </button>
          ))}
          <Show when={selected}>
            <div
              className={classcat([
                'absolute w-screen sm:max-w-[calc(540rem/16)]',
                '-bottom-8 sm:bottom-full',
                'dir-left-[calc(0px-var(--site-pad))] sm:dir-left-[calc(var(--offset-x))]',
              ])}
            >
              <div className="absolute bottom-full end-0 block bg-blu-500 sm:hidden">
                <button
                  onClick={() => {
                    setSelected(undefined);
                  }}
                  className="grid h-9 w-9 place-items-center"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              <Switch.Root>
                <Switch.Case when={selected === FilterEnum.ALLERGENS_AND_INTOLERANCE}>
                  <AllergensAndIntolerance onClose={onClose} />
                </Switch.Case>
                <Switch.Case when={selected === FilterEnum.FILTER}>
                  <FilterOther onClose={onClose} />
                </Switch.Case>
                <Switch.Case when={selected === FilterEnum.SORT}>
                  <Sort />
                </Switch.Case>
              </Switch.Root>
            </div>
          </Show>
        </div>
      </div>
    </Portal>
  );
}
