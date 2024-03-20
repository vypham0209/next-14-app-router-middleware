//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
//RELATIVE MODULES
import Action, { TActionProps } from './Action';

type TStepWrapperProps = TActionProps;

function StepWrapper({ children, ...props }: PropsWithChildren<TStepWrapperProps>) {
  return (
    <>
      <div className="flex-1">
        <ScrollArea.Root type="auto" className="-me-2">
          <ScrollArea.Viewport className="h-[calc(100vh-theme(spacing[79.5]))] overflow-auto pe-2">
            {children}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="w-1.5 bg-yel-100" orientation="vertical">
            <ScrollArea.Thumb className="w-1.5 bg-yel-200" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-red-400" />
        </ScrollArea.Root>
      </div>
      <Action {...props} />
    </>
  );
}

export default StepWrapper;
