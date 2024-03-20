'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
//SHARED
import PlusIcon from '_@shared/icons/PlusIcon';
import MinusIcon from '_@shared/icons/MinusIcon';

const FAQFallback = () => {
  const [openMapping, setOpenMapping] = useState<Record<number, boolean | undefined>>({});

  return (
    <div
      className={classcat([
        'flex flex-col gap-y-10 px-6 md:max-content',
        'md:flex-row md:gap-x-16',
      ])}
    >
      <div className={classcat(['flex flex-col gap-y-4', 'md:flex-[42%] md:gap-y-10'])}>
        <h2 className={classcat(['text-28 font-medium text-blu-400', 'md:text-48'])}>
          Frequently Asked Questions
        </h2>
        <p className={classcat(['text-14 font-light text-blu-300', 'md:text-20'])}>
          Risus consectetur tristique est donec proin dictum. Amet dui dolor id purus eget
          scelerisque vitae risus. Risus nec elementum sed ridiculus quis amet non. Arcu ut tellus
          sit amet a pellentesque sollicitudin. Cursus orci risus.
        </p>
        <div className={classcat(['h-[1px] bg-blu-200', 'md:hidden'])}></div>
      </div>

      <div className={classcat(['flex flex-col gap-y-6', 'md:flex-[58%]'])}>
        <div className={classcat(['flex flex-col gap-y-4', 'md:gap-y-10'])}>
          {Array(5)
            .fill(0)
            .map((item, index) => (
              <Collapsible.Root
                className="scroll-mt-[--h-header] border-b border-b-blu-100 pb-4 md:pb-10"
                open={openMapping[index]}
                key={index}
                onOpenChange={(open) => setOpenMapping((prev) => ({ ...prev, [index]: open }))}
              >
                <Collapsible.Trigger asChild>
                  <div
                    className={classcat([
                      'space-i-6 appearance-none cursor-pointer select-none',
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
                    <p
                      className={classcat(['flex-1 font-medium text-blu-400', 'md:text-18'])}
                    >{`Question ${index + 1}`}</p>
                    <div className="shrink-0 grow-0">
                      {openMapping[index] ? (
                        <MinusIcon className="h-4 w-4 md:h-6 md:w-6" />
                      ) : (
                        <PlusIcon className="h-4 w-4 md:h-6 md:w-6" />
                      )}
                    </div>
                  </div>
                </Collapsible.Trigger>
                <Collapsible.Content className="data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down mt-2 overflow-hidden md:mt-6">
                  <p className={classcat(['text-12 font-light text-blu-300', 'md:text-16'])}>
                    Lorem ipsum dolor sit amet consectetur. Nunc at id proin feugiat cursus. Vel a
                    elementum commodo in nec eget. Nunc tortor venenatis consequat malesuada erat
                    sagittis et consectetur. Mattis urna nibh semper. Nunc at id proin feugiat
                    cursus. Vel a elementum commodo in nec eget. Nunc at id proin feugiat cursus.
                    Vel a elementum commodo in nec eget.
                  </p>
                </Collapsible.Content>
              </Collapsible.Root>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FAQFallback;
