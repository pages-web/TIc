import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { Alert } from '../ui/alert';
import CancelOrder from '@/containers/orders/cancel-order';
import BuyButton from '@/containers/payment/buy-button';
import OrderStatus from './order-status';
import { ORDER_STATUSES } from '../../lib/constants';
import { useDetail } from './order-detail';
import GetEbarimt from '@/containers/payment/get-ebarimt';

const OrderHeader = () => {
  const { status, paidDate } = useDetail();
  return (
    <Card>
      <CardHeader className="justify-between flex-row items-center lg:py-5 gap-1 lg:gap-0">
        <h3 className="text-base text-nowrap lg:text-xl font-semibold">
          Захиалгын мэдээлэл
        </h3>
        <div className="text-sm font-medium w-full lg:w-auto text-right"></div>
      </CardHeader>
      <Separator />
      <CardContent className="px-2">
        <h4 className="text-lg lg:text-xl font-medium text-center my-5 lg:mt-0">
          <OrderStatus />
        </h4>
        {status === ORDER_STATUSES.NEW && !paidDate && (
          <Alert
            variant="warning"
            className="lg:font-medium text-black text-center"
          >
            Төлбөр төлөгдсөний дараа таны захиалга баталгаажихыг анхаарна уу!
          </Alert>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="justify-between pt-4 lg:py-4 gap-2">
        <CancelOrder />
        {!paidDate ? <BuyButton /> : <GetEbarimt />}
      </CardFooter>
    </Card>
  );
};

{
  /* <div className="text-black/60 lg:mb-1 lg:text-right">
            Төлбөр төлөх хугацаа
          </div>
          <div>
            <span className="font-bold text-sm">01</span> өдөр:
            <span className="font-bold text-sm ml-1">23</span> цаг:
            <span className="font-bold text-sm ml-1">54</span> минут
          </div> */
}

export default OrderHeader;
