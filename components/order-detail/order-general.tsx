import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { format } from 'date-fns';
import Price from '../price/price';
import { useDetail } from './order-detail';
import { useAtomValue } from 'jotai';
import { deliveryItemIdAtom } from '@/store/auth.store';
import { getDeliveryProduct } from '@/store/order.store';

const OrderGeneral = () => {
  const { number, createdAt, totalAmount, items } = useDetail();
  const deliveryProductId = useAtomValue(deliveryItemIdAtom);
  const deliveryProduct = getDeliveryProduct(items, deliveryProductId);

  return (
    <Card>
      <CardHeader className="justify-between flex-row items-center lg:py-3 space-y-0 lg:space-y-2">
        <div>
          <div className="text-sm text-black/60 font-medium text-nowrap">
            Захиалгын дугаар
          </div>
          <div className="font-semibold lg:font-bold text-base lg:text-lg">
            {number}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-black/60 font-medium text-nowrap">
            Захиалга хийсэн огноо
          </div>
          <div className="font-semibold lg:font-bold text-base lg:text-lg">
            {format(createdAt, 'yyyy/MM/dd hh:mm')}
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="py-3 lg:py-4 text-sm lg:text-base">
        <div className="flex justify-between items-center">
          <span>Барааны дүн</span>
          <Price amount={totalAmount - (deliveryProduct?.unitPrice || 0)} />
        </div>
        <div className="flex justify-between items-center">
          <span>Хүргэлтийн төлбөр</span>
          <Price amount={deliveryProduct?.unitPrice || 0} />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="justify-between py-3 lg:py-4 font-bold text-base lg:text-lg text-nowrap">
        <div>Нийт төлөх дүн</div>
        <Price amount={totalAmount} />
      </CardFooter>
    </Card>
  );
};

export default OrderGeneral;
