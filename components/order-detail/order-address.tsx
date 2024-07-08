import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { useDetail } from './order-detail';

const OrderAddress = () => {
  const { deliveryInfo } = useDetail();
  const { phone, city, district, street, detail, email } = deliveryInfo || {};

  return (
    <Card>
      <CardHeader className="md:py-4">
        <CardTitle className="text-lg font-semibold">
          Хүргэлтийн мэдээлэл
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex items-center md:justify-between text-sm flex-wrap md:flex-nowrap gap-4 py-4">
        <div>
          <div className="text-foreground/60">Хүргэлтийн мэдээлэл</div>
          <div className="font-medium">
            {city}, {district} дүүрэг, {street} хороо, {detail}
          </div>
        </div>

        <div>
          <div className="text-foreground/60">Утас</div>
          <div className="font-medium">{phone}</div>
        </div>
        <div>
          <div className="text-foreground/60">Цахим хаяг</div>
          <div className="font-medium">{email}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderAddress;
