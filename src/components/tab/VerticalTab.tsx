'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import {
  Content,
  List,
  Root,
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
  Trigger,
} from '@radix-ui/react-tabs';

export type TTabList = {
  value: string;
  label: string;
  content?: React.ReactNode;
};

export type TVerticalTabProps = {
  defaultValue?: string;
  ariaLabel: string;
  tabList: TTabList[];
  onChange?: (value: string) => void;
  listProps?: TabsListProps;
  triggerProps?: TabsTriggerProps;
  contentProps?: TabsContentProps;
} & Omit<TabsProps, 'onChange'>;

function VerticalTab({
  defaultValue,
  ariaLabel,
  tabList,
  onChange,
  triggerProps,
  listProps,
  contentProps,
  ...props
}: TVerticalTabProps) {
  const onValueChange = (value: string) => {
    if (onChange) onChange(value);
  };

  return (
    <Root
      defaultValue={defaultValue || tabList[0]?.value || ''}
      onValueChange={onValueChange}
      {...props}
      className={classcat(['flex flex-col', 'md:space-i-6 md:flex-row', props.className])}
    >
      <List
        aria-label={ariaLabel}
        {...listProps}
        className={classcat([
          'flex w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2_+_theme(spacing[6])))] snap-x snap-mandatory text-14 text-blu-400',
          'overflow-x-auto whitespace-nowrap scrollbar-hide',
          'md:w-35 md:shrink-0 md:flex-col',
          listProps?.className,
        ])}
      >
        {tabList.map((tab) => (
          <Trigger
            key={tab.value}
            value={tab.value}
            {...triggerProps}
            className={classcat([
              'block snap-start py-1.25 text-14 pi-2 data-[state=active]:bg-yel-50 data-[state=active]:text-yel-500',
              'md:min-w-[theme(spacing.35)] md:bg-yel-25 md:py-1.5 md:text-start md:text-16 md:pi-4',
              'md:data-[state=active]:border-l-4 md:data-[state=active]:border-yel-500 md:data-[state=active]:ps-5',
              triggerProps?.className,
            ])}
          >
            {tab.label}
          </Trigger>
        ))}
      </List>

      {tabList.map((tab) => (
        <Content
          key={tab.value}
          value={tab.value}
          {...contentProps}
          className={classcat(['w-full', contentProps?.className])}
        >
          {tab.content}
        </Content>
      ))}
    </Root>
  );
}

export default VerticalTab;
