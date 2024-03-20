//LAYOUT, COMPONENTS
import DishDetailSlideOver from '_@landing/components/dish-detail-slide-over';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
//RELATIVE MODULES
import ContentDish from './comps/ContentDish';

const getData = async (slug: string) => apiServer.dishes.getDishById.query(Number(slug) || 0);

const DishDetail = async ({ params }: { params: { slug: string } }) => {
  const data = await getData(params.slug);

  if (!data) throw new Error('Failed to fetch data');

  return (
    <>
      <DishDetailSlideOver />
      <ContentDish dish={data} />
    </>
  );
};

export default DishDetail;
