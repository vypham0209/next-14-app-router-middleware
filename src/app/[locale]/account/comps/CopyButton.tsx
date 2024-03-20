'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { copyToClipboard } from '_@landing/utils/copy-to-clipboard';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import CopyIcon from '_@shared/icons/CopyIcon';
import CheckIcon from '_@shared/icons/CheckIcon';

//RELATIVE MODULES

interface Props {
  id: string;
  wrapperClassname?: string;
  textClassname?: string;
  iconClassname?: string;
}

function CopyButton({ id, wrapperClassname, textClassname, iconClassname }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const onCopyId = () => {
    copyToClipboard(id);
    setOpen(true);
    setTimeout(() => setOpen(false), 1000);
  };
  return (
    <div
      className={classcat([
        'mt-1.5 flex shrink items-center space-x-2 truncate',
        'md:mt-0',
        wrapperClassname,
      ])}
    >
      <p className={classcat(['truncate text-14lig text-blu-300', textClassname])}>#{id}</p>
      <Popover.Root open={open}>
        <Popover.Trigger asChild>
          <button
            onClick={onCopyId}
            className={`shrink-0 ${open ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <Switch.Root>
              <Switch.Case when={open}>
                <CheckIcon className={classcat(['h-4.5 w-4.5 text-gre-300', iconClassname])} />
              </Switch.Case>
              <Switch.Case when={true}>
                <CopyIcon className={classcat(['h-4.5 w-4.5 text-blu-500', iconClassname])} />
              </Switch.Case>
            </Switch.Root>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="top"
            align="center"
            sideOffset={2.5}
            className={classcat([['rounded-[2px] bg-blu-600 py-1 pi-2']])}
          >
            <p className="text-12 text-white">Copied!</p>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default CopyButton;
