'use client';
//HOOK, SERVER
import useQueryParams from '_@landing/hook/useQueryParams';
//RELATIVE MODULES
import OrdersTab from './comps/OrdersTab';
import MealPlanTab from './comps/MealPlanTab';
import AddressesTab from './comps/AddressesTab';
import Tabs, { type TabList } from './comps/Tabs';

interface QueryParams {
  tab: string;
}

export default function AccountPage() {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const { tab } = queryParams;

  const onChangeTab = (value: string) => {
    setQueryParams({ tab: value });
  };

  const TAB_LIST: TabList[] = [
    {
      value: 'addresses',
      label: 'Addresses',
      content: <AddressesTab />,
    },
    {
      value: 'orders',
      label: 'Orders',
      content: <OrdersTab />,
    },
    {
      value: 'meal-plans',
      label: 'Meal Plans',
      content: <MealPlanTab />,
    },
  ];

  return (
    <div className="pb-20 pt-6 full-fledge lg:pb-36 lg:pt-10">
      <div className="max-content truncate text-36 text-blu-400 lg:text-48">Account</div>
      <Tabs
        defaultValue={tab}
        onChange={onChangeTab}
        ariaLabel="Manage your account"
        tabList={TAB_LIST}
      />
    </div>
  );
}
