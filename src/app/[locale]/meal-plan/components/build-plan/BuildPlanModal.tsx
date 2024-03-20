'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { PropsWithChildren } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import { Modal } from '_@shared/components/dialog/Modal';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
//RELATIVE MODULES
import Content from './Content';
import BuildPlanContextProvider from '../../context/BuildPlanContext';

function BuildPlanModal({ children }: PropsWithChildren) {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        {children || <Button className="md:btn-medium">Build Your Plan Now</Button>}
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay className="fixed z-overlay bg-blu-600 opacity-30 dir-inset-0 " />
        <div className="fixed z-toast flex items-end justify-start dir-inset-0 md:items-center md:justify-center">
          <Modal.Content
            className={classcat([
              'relative z-toast w-full',
              'bg-yel-25 outline-none',
              'md:w-[calc(100vw-2*var(--site-pad))]',
            ])}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <Modal.Close
              className={classcat([
                'absolute -top-9 right-0 flex h-9 w-9 items-center justify-center bg-yel-25 md:right-10 md:top-10 ',
              ])}
            >
              <CloseIcon className="h-5 w-5 text-blu-500 md:h-8 md:w-8" />
            </Modal.Close>
            <div
              className={classcat([
                'flex w-full flex-col space-y-6 p-6 md:space-y-10 md:p-10',
                'md:h-full md:max-h-full md:min-h-[44.5rem]',
              ])}
            >
              <Modal.Title className="text-36 text-blu-400 md:text-48">Build my plan</Modal.Title>
              <BuildPlanContextProvider>
                <Content />
              </BuildPlanContextProvider>
            </div>
          </Modal.Content>
        </div>
      </Modal.Portal>
    </Modal.Root>
  );
}

export default BuildPlanModal;
