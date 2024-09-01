import { OrderItem } from '@/types/order.types';
import { IProduct } from '@/types/product.types';
import { atom } from 'jotai';
import { currentUserAtom } from './auth.store';
import { cudOrderAtom, itemsAtom, loadingOrderAtom } from './order.store';
import { splitAtom } from 'jotai/utils';

interface IUpdateItem {
  _id: string;
  count?: number;
}

export const changeCartItem = (
  product: IUpdateItem,
  cart: OrderItem[]
): OrderItem[] => {
  const { _id, count } = product;

  if (typeof count === 'number') {
    if (count === 0) return cart.filter((item) => item._id !== _id);

    return cart.map((item) => (item._id === _id ? { ...item, count } : item));
  }

  return cart;
};

export const addToCart = (
  product: IProduct & { count: number },
  cart: OrderItem[]
): OrderItem[] => {
  const prevItem = cart.find(({ productId }) => productId === product._id);

  if (prevItem) {
    const { _id, count } = prevItem;
    return changeCartItem({ _id, count: count + product.count }, cart);
  }

  const { unitPrice, _id, name, attachment, count } = product;

  const cartItem = {
    _id: Math.random().toString(),
    productId: _id,
    count,
    unitPrice,
    productName: name,
    productImgUrl: attachment?.url,
  };

  return [...cart, cartItem];
};

export const cartLengthAtom = atom((get) => get(itemsAtom).length);

export const cartTotalAtom = atom<number>((get) =>
  get(itemsAtom).reduce(
    (total, item) => total + (item?.count || 0) * (item.unitPrice || 0),
    0
  )
);

export const cartItemAtomAtoms = splitAtom(itemsAtom);

export const addToCartAtom = atom(
  (get) => get(loadingOrderAtom),
  (get, set, payload: IProduct & { count: number }) => {
    set(itemsAtom, (prev) => addToCart(payload, prev));
    set(cudOrderAtom, true);
  }
);

export const updateCartAtom = atom(
  (get) => get(loadingOrderAtom),
  (get, set, payload: IUpdateItem) => {
    set(itemsAtom, (prev) => changeCartItem(payload, prev));
    !!get(currentUserAtom) && set(cudOrderAtom, true);
  }
);
