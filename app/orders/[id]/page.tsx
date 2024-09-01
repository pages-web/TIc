import { IPageProps } from '@/types';
import OrderDetailContent from '@/components/order-detail/order-detail';

const OrderPage = ({ params }: IPageProps) => {
  return (
    <div className="flex-auto container">
      <div className="space-y-8 py-10">
        <OrderDetailContent id={params.id} />
      </div>
    </div>
  );
};

export default OrderPage;
