//THIRD PARTY MODULES
import { notFound } from 'next/navigation';
//LAYOUT, COMPONENTS
import OrderDetailSection from './components/OrderDetailSection';
//SHARED
import { loaderOrderDetail } from './loader';
//SHARED

export default async function OrderDetailPage({ params: { id } }: { params: { id: string } }) {
  const data = await loaderOrderDetail(id);

  if (!data) {
    notFound();
  }
  return (
    <>
      <OrderDetailSection data={data} />
    </>
  );
}
