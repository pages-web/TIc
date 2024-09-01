'use client';

import { itemsAtom } from '@/store/order.store';
import { useAtomValue } from 'jotai';
import { Badge } from '../ui/badge';
import Price from '../price/price';
import { getProductNameCode } from '@/lib/utils';

const ItemsSummary = () => {
  const items = useAtomValue(itemsAtom);

  return (
    <>
      {items.map((item) => (
        <div className="flex justify-between items-start" key={item._id}>
          <div className="line-clamp-1 pr-2 text-sm">
            {getProductNameCode(item.productName).name}
          </div>
          <div className="flex justify-between w-1/3 flex-none">
            <Badge variant="secondary">x{item.count}</Badge>
            <Price amount={item.unitPrice} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemsSummary;
