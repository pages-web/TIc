'use client';

import { Button } from '../ui/button';
import { useAtomValue } from 'jotai';
import { activeOrderAtom } from '@/store/order.store';
import { LoadingIcon } from '../ui/loading';
import { IOrder } from '@/types/order.types';
import { useOrderChangeSaleStatus } from '@/sdk/hooks/order';
import Link from 'next/link';
import { currentUserAtom } from '@/store/auth.store';

const VerifyButton = () => {
  const user = useAtomValue(currentUserAtom);
  const { _id } = useAtomValue(activeOrderAtom) as IOrder;
  const { handleConfirm, loading } = useOrderChangeSaleStatus();

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={loading}
      onClick={() => handleConfirm()}
      asChild
    >
      <Link
        href={user ? `/profile/orders/${_id}` : `orders/${_id}`}
        prefetch={true}
      >
        {loading && <LoadingIcon />}
        Төлбөр төлөх
      </Link>
    </Button>
  );
};

export default VerifyButton;
