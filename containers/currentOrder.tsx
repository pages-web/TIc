'use client';

import { useActiveOrder } from '@/sdk/queries/order';

const CurrentOrder = () => {
  useActiveOrder();
  return null;
};

export default CurrentOrder;
