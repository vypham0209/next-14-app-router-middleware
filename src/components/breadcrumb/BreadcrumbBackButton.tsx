'use client';

//THIRD PARTY MODULES
import { useRouter } from 'next-intl/client';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
//RELATIVE MODULES
import { useBreadcrumbContext } from './Breadcrumb';

const BreadcrumbBackButton = () => {
  const router = useRouter();
  const { onBack } = useBreadcrumbContext();

  return (
    <Button
      color="navy"
      variant="outlined"
      className="btn-medium ow:p-1.75"
      leadingIcon={<ArrowLeftIcon />}
      onClick={onBack || router.back}
    />
  );
};

export default BreadcrumbBackButton;
