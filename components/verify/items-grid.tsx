'use client';
import Image from '@/components/ui/image';
import { Badge } from '../ui/badge';
import { useAtomValue } from 'jotai';
import { itemsAtom } from '@/store/order.store';

const ItemsGrid = () => {
  const cart = useAtomValue(itemsAtom);

  return (
    <div className="flex items-center flex-wrap gap-4 mt-4 pb-7">
      {cart.map((item) => (
        <div
          className="border rounded-lg aspect-square overflow-hidden w-24 lg:w-32 relative"
          key={item._id}
        >
          <Image
            src={item.productImgUrl}
            height={120}
            width={120}
            className="absolute inset-0 h-full w-full"
            alt={item.productName}
          />
          <Badge variant="secondary" className="absolute right-2 bottom-2">
            x{item.count}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default ItemsGrid;
