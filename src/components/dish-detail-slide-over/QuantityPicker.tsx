'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import PlusIcon from '_@shared/icons/PlusIcon';
import MinusIcon from '_@shared/icons/MinusIcon';

const QuantityPicker = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) => {
  const onDecrement = () => {
    setQuantity(quantity - 1);
  };

  const onIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="filled"
        color="secondary"
        className={classcat([
          'py-2.25 ow:w-9',
          'ow:hover:border-white ow:hover:bg-white ow:hover:text-blu-500 ow:hover:shadow-none',
          'hover-hover:border-yel-50 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-secondary-filled-hover',
        ])}
        onClick={onDecrement}
        trailingIcon={<MinusIcon />}
        disabled={quantity === 0 ?? true}
      />
      <span className={classcat(['w-14 text-center text-blu-400'])}>{quantity}</span>
      <Button
        variant="filled"
        color="secondary"
        className={classcat([
          'py-2.25 ow:w-9',
          'ow:hover:border-white ow:hover:bg-white ow:hover:text-blu-500 ow:hover:shadow-none',
          'hover-hover:border-yel-50 hover-hover:bg-yel-50 hover-hover:text-yel-500 hover-hover:shadow-btn-secondary-filled-hover',
        ])}
        onClick={onIncrement}
        trailingIcon={<PlusIcon />}
      />
    </div>
  );
};

export default QuantityPicker;
