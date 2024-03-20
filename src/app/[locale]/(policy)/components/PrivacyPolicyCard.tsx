//THIRD PARTY MODULES
import classcat from 'classcat';
import * as Collapsible from '@radix-ui/react-collapsible';
//SHARED
import PlusIcon from '_@shared/icons/PlusIcon';
import MinusIcon from '_@shared/icons/MinusIcon';

export interface PrivacyPolicyCardProps {
  index?: number;
  title: string;
  content: string;
  open?: boolean;
  setOpen?: (index?: number) => void;
}

const PrivacyPolicyCard = ({ index, title, content, open, setOpen }: PrivacyPolicyCardProps) => {
  const onChangeOpen = () => {
    if (setOpen) {
      setOpen(open ? undefined : index);
    }
  };

  return (
    <Collapsible.Root className="scroll-mt-[--h-header]" open={open} onOpenChange={onChangeOpen}>
      <Collapsible.Trigger asChild>
        <div
          className={classcat([
            'space-i-6 cursor-pointer select-none appearance-none',
            'flex items-center justify-between [&>*]:pointer-events-none',
          ])}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const main = document.getElementById('main') as HTMLDivElement;
            const header = document.getElementById('header') as HTMLDivElement;
            if (!target || !main) return;
            setTimeout(() => {
              const position = target.getBoundingClientRect();
              const margin = header.offsetHeight;
              main.scrollTo({
                top: position.top - margin + main.scrollTop,
                behavior: 'smooth',
              });
            }, 180);
          }}
        >
          <h2 className="flex-1 text-24 text-blu-400">{title}</h2>
          <div className="flex-[32px] shrink-0 grow-0">
            {open ? <MinusIcon className="h-8 w-8" /> : <PlusIcon className="h-8 w-8" />}
          </div>
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down space-y-2.5 overflow-hidden">
        <div dangerouslySetInnerHTML={{ __html: `${content}` }} className="ckEditor" />
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default PrivacyPolicyCard;
