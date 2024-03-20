//THIRD PARTY MODULES
import classcat from 'classcat';
import { SocialPlatform } from '@prisma/client';
import { firstUpper } from '_@landing/utils/wordFormat';
//LAYOUT, COMPONENTS
import FilterItem from '_@landing/components/FilterItem';
import BaseInput from '_@shared/components/input/BaseInput';
//SHARED
import SearchIcon from '_@shared/icons/SearchIcon';

const LIST = Object.entries(SocialPlatform).map(([label, value]) => ({ label, value }));

const SocialPageFilterLoading = () => {
  return (
    <form
      className={classcat([
        'grid gap-10',
        'lg:grid-cols-[theme(spacing.135)_1fr] lg:items-center lg:justify-between',
      ])}
    >
      <div className="max-w-[theme(spacing.135)]">
        <BaseInput
          placeholder="Search"
          className="input-large"
          trailingComponent={<SearchIcon className="h-4.5 w-4.5 cursor-pointer" />}
        />
      </div>

      <div className="grid lg:justify-end">
        <div
          className={classcat([
            // 'w-fit max-w-[100%]',
            'overflow-auto scrollbar-hide',
            'grid auto-cols-max grid-flow-col items-center gap-4',
          ])}
        >
          {LIST.map((item) => (
            <FilterItem
              key={item.value}
              label={firstUpper(item.label.toLowerCase())}
              isSelected={false}
              className="lg:filter-item-big"
            />
          ))}
        </div>
      </div>
    </form>
  );
};

export default SocialPageFilterLoading;
