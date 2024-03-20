//THIRD PARTY MODULES
import { useSearchParams } from 'next/navigation';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
//RELATIVE MODULES
import { CheckOutType } from '../../types/checkout-type';
import { OrderInformationValues, ShowAddressFormType } from '../(checkout)/information/interface';

export type OrderInfo = OrderInformationValues & { id: string };

type PhoneData = { countryId: number; phone: string };

type OrderContextType = {
  type: CheckOutType;
  orderInfo?: OrderInfo;
  phoneData: PhoneData;
  currentAddressId: string;
  showAddressFormType: ShowAddressFormType;
  guestVerifiedPhones: PhoneData[];
  timesOfFailedPayments: number;
  setOrderInfo: (order?: OrderInfo) => void;
  setPhoneData: (phone: PhoneData) => void;
  setCurrentAddressId: (id: string) => void;
  setShowAddressFormType: (type: ShowAddressFormType) => void;
  setGuestVerifiedPhones: Dispatch<SetStateAction<PhoneData[]>>;
  setTimesOfFailedPayments: Dispatch<SetStateAction<number>>;
};

const OrderContext = createContext<OrderContextType>({} as any);

export const useOrderContext = () => useContext(OrderContext);

const defaultPhoneData = { countryId: 237, phone: '' };

const OrderContextProvider = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();
  const [orderInfo, setOrderInfo] = useState<OrderInfo>();
  const [phoneData, setPhoneData] = useState(defaultPhoneData);
  const [showAddressFormType, setShowAddressFormType] = useState<ShowAddressFormType>('DEFAULT');
  const [currentAddressId, setCurrentAddressId] = useState<string>('');
  const [guestVerifiedPhones, setGuestVerifiedPhones] = useState<PhoneData[]>([]);
  const [timesOfFailedPayments, setTimesOfFailedPayments] = useState<number>(0);
  const type = useRef<CheckOutType>(
    (searchParams?.get('type') || CheckOutType.Order) as CheckOutType,
  );

  return (
    <OrderContext.Provider
      value={{
        type: type.current,
        orderInfo,
        phoneData,
        currentAddressId,
        showAddressFormType,
        guestVerifiedPhones,
        timesOfFailedPayments,
        setOrderInfo,
        setPhoneData,
        setCurrentAddressId,
        setShowAddressFormType,
        setGuestVerifiedPhones,
        setTimesOfFailedPayments,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
