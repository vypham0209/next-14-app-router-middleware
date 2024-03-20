'use client';

//THIRD PARTY MODULES
import { usePathname, useRouter } from 'next-intl/client';
//LAYOUT, COMPONENTS
import Breadcrumb, { BreadcrumbItem } from '_@landing/components/breadcrumb/Breadcrumb';

type Props = {
  list?: BreadcrumbItem[];
};

const WrapBreadcrumb = ({ list }: Props) => {
  const { replace } = useRouter();
  const pathName = usePathname();
  const pathList = pathName.split('/');
  pathList.pop();
  const onBackLink = pathList.join('/');

  return <Breadcrumb onBack={() => replace(onBackLink || '/')} list={list} />;
};

export default WrapBreadcrumb;
