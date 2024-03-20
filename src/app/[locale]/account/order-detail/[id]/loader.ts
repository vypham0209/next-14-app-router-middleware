//SHARED
import { apiServer } from '_@shared/utils/apiServer';

export const loaderOrderDetail = async (id: string) => {
  try {
    return await apiServer.order.getOrderById.query(id);
  } catch (err) {
    console.log('Failed to get order detail.');
  }
};
