import Price from '@/components/price/price';
import { Badge } from '@/components/ui/badge';
import Image from '@/components/ui/image';
import { OrderItem } from '@/types/order.types';

const OrderProduct = ({
  productImgUrl,
  productName,
  status,
  count,
  unitPrice,
}: OrderItem) => {
  const name = productName?.split('-')[1];
  const code = productName?.split('-')[0];
  return (
    <div className="overflow-hidden flex p-2 border-b last-of-type:border-b-0 gap-2 lg:gap-0">
      <Image
        src={productImgUrl}
        alt=""
        height={200}
        width={200}
        className="h-20 w-20 lg:h-32 lg:w-32 rounded overflow-hidden flex-none"
      />

      <div className="flex justify-between flex-1 p-2 lg:p-6 flex-wrap text-sm lg:text-base gap-2 lg:gap-0">
        <div>
          <div className="text-sm text-neutral-500">#{code}</div>
          <h3 className="font-medium capitalize mb-1">{name || productName}</h3>
          <Badge>{status}</Badge>
        </div>
        <div>
          <div className="flex gap-4 pt-5">
            <Price amount={unitPrice} />
            <Badge variant="secondary">x{count}</Badge>
            <Price amount={unitPrice * count} className="font-semibold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
