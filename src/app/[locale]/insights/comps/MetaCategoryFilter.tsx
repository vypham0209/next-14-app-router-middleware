//THIRD PARTY MODULES
import classcat from 'classcat';
import { MetaCategory } from '@prisma/client';
import { BaseSyntheticEvent, useState } from 'react';
//LAYOUT, COMPONENTS
import FilterItem from '_@landing/components/FilterItem';

const LIST = Object.entries(MetaCategory).map(([label, value]) => ({ label, value }));

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
};

const MetaCategoryFilter = ({ value, onChange = () => {}, onSubmit = async () => {} }: Props) => {
  const [innerValue, setInnerValue] = useState(value);

  const handleSelect = (newValue: string) => () => {
    onChange(newValue);
    setInnerValue(newValue);
    onSubmit();
  };

  return (
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
            label={item.label}
            className="lg:filter-item-big"
            onClick={handleSelect(item.value === innerValue ? '' : item.value)}
            isSelected={item.value === innerValue}
          />
        ))}
      </div>
    </div>
  );
};

export default MetaCategoryFilter;
