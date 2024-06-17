'use client';

import { cartTotalAtom } from '@/store/cart.store';
import Price from '../price/price';
import { useAtomValue } from 'jotai';

const CartTotal = () => {
  const totalAmount = useAtomValue(cartTotalAtom);
  return <Price amount={totalAmount} />;
};

export default CartTotal;
