'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';

type Props = {
  label: string;
  isSelected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const FilterItem = ({
  label,
  isSelected = false,
  disabled = false,
  className = '',
  onClick = () => {},
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-selected={isSelected}
      className={classcat([
        'filter-item-small',
        'transition-colors',
        'rounded-full border text-blu-400',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[selected=true]:shadow-input',
        'border-blu-100 hover:border-blu-300 hover:disabled:border-blu-100',
        'data-[selected=true]:border-yel-500 hover:data-[selected=true]:border-yel-500 hover:disabled:data-[selected=true]:border-yel-500',
        'data-[selected=true]:bg-yel-200 hover:data-[selected=true]:bg-yel-300 hover:disabled:data-[selected=true]:bg-yel-200',
        className,
      ])}
    >
      {label}
    </button>
  );
};

export default FilterItem;
