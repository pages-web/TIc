import OrderSummary from '@/components/order-summary/order-summary';
import CheckoutLayout from '../checkout-layout';
import { Separator } from '@/components/ui/separator';
import ItemsSummary from '@/components/verify/items-summary';
import ItemsGrid from '@/components/verify/items-grid';
import VerifyAddress from '@/components/verify/verify-address';
import VerifyButton from '@/components/verify/verifyButton';
import VerifyLayout from '@/containers/orders/verify-layout';

const Verify = () => {
  return (
    <CheckoutLayout title="Баталгаажуулах" backTitle="Буцах" backUrl="/address">
      <VerifyLayout>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="col-span-7">
            <div className="text-black/60 ">Захиалга</div>
            <ItemsGrid />
            <Separator />
            <VerifyAddress />
          </div>
          <OrderSummary
            className="col-span-5 lg:sticky lg:top-20 h-fit"
            content={<ItemsSummary />}
          >
            <VerifyButton />
          </OrderSummary>
        </div>
      </VerifyLayout>
    </CheckoutLayout>
  );
};

export default Verify;
