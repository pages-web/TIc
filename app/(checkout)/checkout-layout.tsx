import { Button } from '@/components/ui/button';
import PrivateRoute from '@/containers/auth/private-route';
import CheckoutRoute from '@/containers/orders/checkout-route';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

const CheckoutLayout = ({
  children,
  title,
  backTitle,
  backUrl,
}: React.PropsWithChildren & {
  title: string;
  backTitle: string;
  backUrl: string;
}) => {
  return (
    <div className="container pb-20 flex-auto">
      <PrivateRoute inCheckout>
        <CheckoutRoute>
          <div className="flex justify-between lg:mt-8 my-6 lg:mb-10 items-center">
            <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
            <Button size="lg" variant="secondary" asChild>
              <Link href={backUrl}>
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                {backTitle}
              </Link>
            </Button>
          </div>
          {children}
        </CheckoutRoute>
      </PrivateRoute>
    </div>
  );
};

export default CheckoutLayout;
