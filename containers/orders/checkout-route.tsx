'use client';

import CartEmpty from '@/components/cart/cart-empty';
import { Button } from '@/components/ui/button';
import { LoadingIcon } from '@/components/ui/loading';
import { cartLengthAtom } from '@/store/cart.store';
import { initialLoadingOrderAtom } from '@/store/order.store';
import { useAtomValue } from 'jotai';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

const CheckoutRoute = ({ children }: React.PropsWithChildren) => {
  const cartLength = useAtomValue(cartLengthAtom);
  const loadingOrder = useAtomValue(initialLoadingOrderAtom);

  if (loadingOrder)
    return (
      <>
        <div className="flex items-center justify-center py-40 col-span-7 mb-10 lg:mb-0">
          <LoadingIcon />
        </div>
      </>
    );

  if (!cartLength)
    return (
      <div className="flex items-center justify-center flex-col pt-24 pb-32 col-span-12">
        <div className="w-48 h-48">
          <CartEmpty />
        </div>
        <h2 className="mt-8 text-xl sm:text-2xl font-bold">Сагс хоосон</h2>
        <Button variant="secondary" className="mt-4" asChild>
          <Link href={'/category'}>
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Дэлгүүр лүү буцах
          </Link>
        </Button>
      </div>
    );

  return <>{children}</>;
};

export default CheckoutRoute;
