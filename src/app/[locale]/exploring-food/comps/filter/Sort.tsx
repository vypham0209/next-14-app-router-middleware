//THIRD PARTY MODULES
import { useSearchParams } from 'next/navigation';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import BaseRadioGroup from '_@shared/components/radio/BaseRadioGroup';
//HOOK, SERVER
import useSetSearchParam from '_@landing/hook/useSetSearchParams';
//RELATIVE MODULES
import { SortingOptions } from '../../constants/sortingOptions';

export default function Sort() {
  const { setSearchParams } = useSetSearchParam();
  const searchParams = useSearchParams();
  const sortBy = (searchParams.get('sortBy') || 'best-seller') as SortingOptions;

  return (
    <div className="flex h-79 max-h-[60vh] flex-col space-y-6 bg-blu-500 pb-8 pt-4 pi-6 md:h-85 md:pb-10 md:pt-6 md:pi-10">
      <div className="flex flex-col space-y-4">
        <div className="grow">
          <BaseRadioGroup
            options={options}
            value={sortBy}
            name="sort"
            className="space-y-4"
            owClassName={{ label: 'text-white' }}
            onValueChange={(value) => {
              setSearchParams({ sortBy: value });
            }}
          />
        </div>

        <Button
          variant="outlined"
          color="secondary"
          className="ms-auto md:btn-medium ow:w-27 ow:md:w-30"
          onClick={() => {
            setSearchParams({ sortBy: undefined });
          }}
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
}

const options: { label: string; value: SortingOptions; id: string }[] = [
  { label: 'Best sellers', value: 'best-seller', id: 'bs' },
  { label: 'Price (Ascending)', value: 'price-asc', id: 'pa' },
  { label: 'Price (Descending)', value: 'price-desc', id: 'pd' },
  { label: 'Calories (Ascending)', value: 'calories-asc', id: 'ca' },
  { label: 'Calories (Descending)', value: 'calories-desc', id: 'cd' },
  { label: 'Newest', value: 'newest', id: 'n' },
];
