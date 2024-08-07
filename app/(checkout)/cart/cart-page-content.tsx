'use client';

import CartProductList from '@/components/cart-product-list/cart-product-list';

const CartPageContent = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <div className="col-span-7 pb-10 lg:pb-0">
        <CartProductList />
      </div>
      {children}
    </>
  );
};

export default CartPageContent;
