//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import * as ScrollArea from '@radix-ui/react-scroll-area';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import FormCheckboxArray from '_@shared/components/checkbox/FormCheckboxArray';
//SHARED
import AllergenIcon from '_@shared/icons/AllergenIcon';
//HOOK, SERVER
import useSetSearchParam from '_@landing/hook/useSetSearchParams';
//RELATIVE MODULES
import { useCustomizePlanContext } from '../../../context/CustomizePlanContext';
//RELATIVE MODULES

function AllergensList({
  title,
  data,
}: {
  title: string;
  data: {
    id: number;
    name: string;
  }[];
}) {
  return (
    <div className="flex flex-col space-y-2 overflow-hidden">
      <p className="text-start text-16 text-white">{title}</p>
      <ScrollArea.Root type="auto" className={classcat(['overflow-hidden'])}>
        <ScrollArea.Viewport className={classcat(['mb-4 h-full w-full pr-3'])}>
          <div className="grow overflow-auto pb-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {data.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center justify-between gap-2"
                >
                  <p className="flex grow items-center gap-2 text-12 text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-blu-200 bg-yel-25 text-blu-500 transition-colors">
                      <AllergenIcon className="scale-75" name={item.name}></AllergenIcon>
                    </span>

                    <span className="text-12lig">{item.name}</span>
                  </p>
                  <FormCheckboxArray name="allergens" value={item.id} />
                </label>
              ))}
            </div>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex w-1.5 touch-none select-none bg-blu-600 transition-colors duration-[160ms] ease-out"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="!w-full rounded-[1px] bg-blu-400" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

function IntoleranceList({
  title,
  data,
}: {
  title: string;
  data: {
    id: number;
    name: string;
  }[];
}) {
  return (
    <div className="flex flex-col space-y-2 overflow-hidden">
      <p className="text-start text-16 text-white">{title}</p>
      <ScrollArea.Root type="auto" className={classcat(['overflow-hidden'])}>
        <ScrollArea.Viewport className={classcat(['mb-4 h-full w-full pr-3'])}>
          <div className="grow overflow-auto pb-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {data.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center justify-between gap-2"
                >
                  <p className="flex grow items-center gap-2 text-12 text-white">
                    <span className="text-12lig">{item.name}</span>
                  </p>
                  <FormCheckboxArray name="intolerances" value={item.id} />
                </label>
              ))}
            </div>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex w-1.5 touch-none select-none bg-blu-600 transition-colors duration-[160ms] ease-out"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="!w-full rounded-[1px] bg-blu-400" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

type Values = {
  allergens: string[];
  intolerances: string[];
};

export default function AllergensAndIntolerance({ onClose }: { onClose: () => void }) {
  const { allergens, intolerances } = useCustomizePlanContext();
  const { setSearchParams } = useSetSearchParam();
  const searchParams = useSearchParams();
  const allergensParams = searchParams.get('allergens');
  const intolerancesParams = searchParams.get('intolerances');

  const methods = useForm<Values>({
    mode: 'onBlur',
    defaultValues: {
      allergens: allergensParams?.split(',') || [],
      intolerances: intolerancesParams?.split(',') || [],
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(({ allergens, intolerances }) => {
    setSearchParams({
      allergens: allergens.join(','),
      intolerances: intolerances.join(','),
    });
    onClose();
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="flex h-106 max-h-[60vh] flex-col space-y-6 bg-blu-500 pb-8 pt-4 pi-6 md:h-110 md:pb-10 md:pt-6 md:pi-10"
      >
        <div className="grid grow grid-rows-2 gap-y-6 overflow-hidden">
          <AllergensList
            key={'allergens' + allergensParams}
            data={allergens}
            title="Which of the following are you allergic to?"
          />
          <IntoleranceList
            key={'intolerances' + intolerancesParams}
            data={intolerances}
            title="Intolerances"
          />
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => {
              setSearchParams({
                allergens: '',
                intolerances: '',
              });
              methods.setValue('allergens', []);
              methods.setValue('intolerances', []);
              onClose();
            }}
            variant="ghost"
          >
            Clear filter
          </Button>
          <Button type="submit" className="ow:w-fit">
            Hide these from the list
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
