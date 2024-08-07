import { Button } from '@/components/ui/button';
import CheckoutLayout from '../checkout-layout';
import OrderSummary from '@/components/order-summary/order-summary';
import Link from 'next/link';
import CartPageContent from './cart-page-content';

const Cart = () => {
  return (
    <CheckoutLayout
      title="Таны сагс"
      backTitle="Дэлгүүр рүү буцах"
      backUrl="/category"
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
        <CartPageContent>
          <OrderSummary className="col-span-5 lg:sticky lg:top-32 h-fit">
            <Button asChild size={'lg'} className="w-full">
              <Link href="/address">Худалдан авах</Link>
            </Button>
          </OrderSummary>
        </CartPageContent>
      </div>
    </CheckoutLayout>
  );
};

export default Cart;
