'use client';

import { Button } from '../ui/button';
import { useAtomValue } from 'jotai';
import { activeOrderAtom } from '@/store/order.store';
import { LoadingIcon } from '../ui/loading';
import { IOrder } from '@/types/order.types';
import { useOrderChangeSaleStatus } from '@/sdk/hooks/order';
import Link from 'next/link';

const VerifyButton = () => {
  const { _id } = useAtomValue(activeOrderAtom) as IOrder;
  const { handleConfirm, loading } = useOrderChangeSaleStatus();

  const handleClick = () => handleConfirm();

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={loading}
      onClick={handleClick}
      asChild
    >
      <Link href={`/profile/orders/${_id}`}>
        {loading && <LoadingIcon />}
        Төлбөр төлөх
      </Link>
    </Button>
  );
};

export default VerifyButton;
