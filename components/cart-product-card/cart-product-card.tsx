import { IProduct } from '@/types/product.types';
import Link from 'next/link';
import Image from '../ui/image';
import { TagIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useAtom, useAtomValue, useSetAtom, type Atom } from 'jotai';
import { OrderItem } from '@/types/order.types';
import Price from '../price/price';
import { Counter, CounterButton, CounterInput } from '../counter/counter';
import { updateCartAtom } from '@/store/cart.store';

const CartProductCard = ({
  cartItemAtom
}: {
  cartItemAtom: Atom<OrderItem>;
}) => {
  const { _id, productName, unitPrice, count, productImgUrl, discountAmount } =
    useAtomValue(cartItemAtom);
  const [loading, changeCartItem] = useAtom(updateCartAtom);
  return (
    <div className="relative flex first:border-t border-b border-neutral-200 hover:shadow-lg min-w-[320px] py-4 md:px-4 last:mb-0 last:border-b-0 md:last:border-b">
      <div className="relative overflow-hidden rounded-md w-[100px] md:w-[176px]">
        <Link href={`/product/${_id}`}>
          <Image src={productImgUrl} alt="" width={300} height={300} />
        </Link>
        {(discountAmount || 0) > 0 && (
          <div className="absolute top-0 left-0 text-white bg-indigo-600 py-1 pl-1.5 pr-2 text-xs font-medium inline-flex items-center">
            <TagIcon className="mr-1 h-3 w-3" />
            {(
              ((discountAmount || 0) / (unitPrice + (discountAmount || 0))) *
              100
            ).toFixed(1)}
            % Хямдрал
          </div>
        )}
      </div>
      <div className="flex flex-col pl-4 min-w-[180px] flex-1 ">
        <Button
          className="text-lg justify-start px-0 mb-2 md:mb-0"
          asChild
          variant="link"
        >
          <Link href={`/product/${_id}`}>{productName}</Link>
        </Button>
        <div className="items-center md:mt-auto flex flex-wrap md:flex-nowrap md:justify-between md:w-full gap-2">
          <Counter>
            <CounterButton
              disabled={loading}
              minus
              onClick={() => changeCartItem({ _id, count: count - 1 })}
            />
            <CounterInput
              value={count}
              onChange={e =>
                changeCartItem({ _id, count: Number(e.target.value) })
              }
              disabled={loading}
            />
            <CounterButton
              onClick={() => changeCartItem({ _id, count: count + 1 })}
              disabled={loading}
            />
          </Counter>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => changeCartItem({ _id, count: 0 })}
            disabled={loading}
          >
            Хасах
          </Button>
          <span className="font-bold md:ml-auto md:order-1 text-sm md:text-lg">
            <Price amount={unitPrice} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
