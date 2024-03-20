//THIRD PARTY MODULES
import classcat from 'classcat';

function DeliveryDateFallback() {
  return (
    <div className={classcat(['grid grid-cols-1 gap-2', 'md:gap-4'])}>
      <h3 className="text-18 text-blu-400 md:text-24">Delivery date & time</h3>
      <div className="h-4.5 bg-skeleton sm:h-5.5" />
    </div>
  );
}

export default DeliveryDateFallback;
