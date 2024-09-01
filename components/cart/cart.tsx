import { useAtom, useAtomValue } from 'jotai';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { cartSheetAtom } from '@/store';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';
import { cartItemAtomAtoms } from '@/store/cart.store';
import CartItem from './cart-item';
import CartTotal from './cart-total';
import CartEmpty from './cart-empty';
import BuyButton from './buy-button';

const Cart = () => {
  const [openSheet, setOpenSheet] = useAtom(cartSheetAtom);
  const cart = useAtomValue(cartItemAtomAtoms);

  return (
    <Sheet open={openSheet} onOpenChange={(op) => setOpenSheet(op)}>
      <SheetContent className="flex flex-col h-screen gap-2 p-4">
        <SheetHeader className="flex-row justify-between items-center space-y-0">
          <SheetTitle>Таны сагс</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size={'icon'} className="-mr-2">
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <div className="flex-auto overflow-auto">
              {cart.map((cartItemAtom) => (
                <CartItem
                  key={`${cartItemAtom}`}
                  cartItemAtom={cartItemAtom}
                  setOpenSheet={setOpenSheet}
                />
              ))}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                <p>Хүргэлт</p>
                <p className="text-right">Нийт үнэ дээр нэмэгдэнэ</p>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                <p>Нийт үнэ</p>
                <CartTotal />
              </div>
            </div>
            <BuyButton />
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center gap-6">
            <div className="h-28 w-28">
              <CartEmpty />
            </div>
            <p className="font-semibold">Сагс хоосон байна</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
