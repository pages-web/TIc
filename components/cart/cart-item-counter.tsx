import Price from '../price/price';
import { Counter, CounterButton, CounterInput } from '../counter/counter';
import { useAtom } from 'jotai';
import { updateCartAtom } from '@/store/cart.store';
import { memo } from 'react';

const CartItemCounter = ({
  unitPrice,
  _id,
  count,
}: {
  _id: string;
  unitPrice: number;
  count: number;
}) => {
  const [loading, changeCartItem] = useAtom(updateCartAtom);

  return (
    <div className="flex h-16 flex-col justify-between">
      <Price
        className="flex justify-end space-y-2 text-right text-sm"
        amount={unitPrice * count}
      />
      <Counter size="sm">
        <CounterButton
          minus
          disabled={loading}
          onClick={() => changeCartItem({ _id, count: count - 1 })}
        />
        <CounterInput
          value={count}
          disabled={loading}
          onChange={(e) =>
            changeCartItem({ _id, count: Number(e.target.value) })
          }
        />
        <CounterButton
          disabled={loading}
          onClick={() => changeCartItem({ _id, count: count + 1 })}
        />
      </Counter>
    </div>
  );
};

export default memo(CartItemCounter);
