//THIRD PARTY MODULES
import { useMemo } from 'react';
import classcat from 'classcat';
//RELATIVE MODULES
import VerticalTab, { TVerticalTabProps } from './VerticalTab';
import HorizontalTab, { THorizontalTabProps } from './HorizontalTab';

type TTwoDirectionTab = {
  verticalProps: TVerticalTabProps;
  horizontalProps: THorizontalTabProps;
  type?: 'vertical-in-horizontal' | 'horizontal-in-vertical';
};

function TwoDirectionTab({
  verticalProps,
  horizontalProps,
  type = 'vertical-in-horizontal',
}: TTwoDirectionTab) {
  const isHorizontal = type === 'vertical-in-horizontal';
  const Wrapper = isHorizontal ? HorizontalTab : VerticalTab;
  const Child = isHorizontal ? VerticalTab : HorizontalTab;
  const childProps = isHorizontal ? verticalProps : horizontalProps;
  const wrapperProps = isHorizontal ? horizontalProps : verticalProps;

  const tabList = useMemo(() => {
    const { tabList } = wrapperProps;
    return tabList.map((tab) => {
      return {
        ...tab,
        content: (
          <Child
            {...childProps}
            {...(!isHorizontal
              ? {
                  wrapperClasses: classcat([
                    'ow:sm:w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2_+_theme(spacing[47])))]',
                  ]),
                }
              : {})}
          />
        ),
      };
    });
  }, [Child, childProps, isHorizontal, wrapperProps]);

  return <Wrapper {...wrapperProps} tabList={tabList} />;
}

export default TwoDirectionTab;
