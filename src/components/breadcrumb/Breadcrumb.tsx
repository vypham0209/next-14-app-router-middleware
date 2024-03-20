'use client';

//THIRD PARTY MODULES
import { createContext, useContext } from 'react';
//RELATIVE MODULES
import BreadcrumbList from './BreadcrumbList';
import BreadcrumbBackButton from './BreadcrumbBackButton';

export type BreadcrumbItem = {
  url: string;
  name: string;
};

type BreadcrumbContextType = {
  onBack?: () => void;
  list?: BreadcrumbItem[];
};

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  onBack: () => {},
});

export const useBreadcrumbContext = () => useContext(BreadcrumbContext);

const Breadcrumb = (props: BreadcrumbContextType) => {
  return (
    <BreadcrumbContext.Provider value={props}>
      <div className="max-content grid grid-cols-[auto_1fr] items-center gap-6">
        <BreadcrumbBackButton />
        <BreadcrumbList />
      </div>
    </BreadcrumbContext.Provider>
  );
};

export default Breadcrumb;
