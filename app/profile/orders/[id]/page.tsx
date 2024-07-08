import { IPageProps } from '@/types';
import ProfileLayout from '../../profile-layout';
import OrderDetailContent from '@/components/order-detail/order-detail';

const OrderDetail = ({ params }: IPageProps) => {
  return (
    <ProfileLayout title="Захиалгын мэдээлэл" description="">
      <div className="space-y-8 pb-10">
        <OrderDetailContent id={params.id} />
      </div>
    </ProfileLayout>
  );
};

export default OrderDetail;
