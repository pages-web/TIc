import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import OrderProduct from '../profile/order/order-product';
import { useDetail } from './order-detail';
import { useAtomValue } from 'jotai';
import { deliveryItemIdAtom } from '@/store/auth.store';
import { filterDeliveryProduct } from '@/store/order.store';

const OrderProducts = () => {
  const { items } = useDetail();
  const deliveryProductId = useAtomValue(deliveryItemIdAtom);
  return (
    <Card>
      <CardHeader className="lg:py-4">
        <CardTitle className="text-lg font-semibold">Бүтээгдэхүүнүүд</CardTitle>
      </CardHeader>
      <Separator />
      {filterDeliveryProduct(items, deliveryProductId).map((item) => (
        <OrderProduct {...item} key={item._id} />
      ))}
    </Card>
  );
};

export default OrderProducts;
