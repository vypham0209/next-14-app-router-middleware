'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import * as ScrollAreaRadix from '@radix-ui/react-scroll-area';

const scrollClasses = {
  thumb:
    "relative flex-1 bg-yel-200 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
};

type ScrollAreaProps = React.PropsWithChildren<{
  owStyle?: {
    viewPortClasses?: string;
    scrollbarVerticalClasses?: string;
    scrollbarHorizontalClasses?: string;
  };
}> &
  ScrollAreaRadix.ScrollAreaProps;

export default function ScrollArea({ owStyle, className, children, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaRadix.Root
      type="auto"
      className={classcat(['overflow-hidden', className])}
      {...props}
    >
      <ScrollAreaRadix.Viewport
        className={classcat(['mb-6 h-full w-full pe-4', owStyle?.viewPortClasses])}
      >
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        className={classcat([
          'flex w-2 touch-none select-none bg-yel-100 transition-colors duration-[160ms] ease-out',
          owStyle?.scrollbarVerticalClasses,
        ])}
        orientation="vertical"
      >
        <ScrollAreaRadix.Thumb className={classcat([scrollClasses.thumb])} />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Scrollbar
        className={classcat([
          'flex h-2 touch-none select-none flex-col bg-yel-100 transition-colors duration-[160ms] ease-out',
          owStyle?.scrollbarHorizontalClasses,
        ])}
        orientation="horizontal"
      >
        <ScrollAreaRadix.Thumb className={classcat([scrollClasses.thumb])} />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Corner className="bg-red-400" />
    </ScrollAreaRadix.Root>
  );
}
