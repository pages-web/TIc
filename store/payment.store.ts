import { IInvoice, IPayment } from '@/types/payment.types';
import { atom } from 'jotai';

export const openMethodsAtom = atom<boolean>(true);
export const openDetailAtom = atom<boolean>(false);
export const showSuccessAtom = atom<boolean>(false);
export const selectedMethodAtom = atom<string>('');
export const invoiceDetailAtom = atom<IInvoice | null>(null);

export const handleMethodAtom = atom(
  get => get(selectedMethodAtom),
  (_, set, method: string) => {
    set(selectedMethodAtom, method);
    if (method) {
      set(openMethodsAtom, false);
      set(openDetailAtom, true);
    } else {
      set(openMethodsAtom, true);
      set(openDetailAtom, false);
    }
  }
);

export const handleCompleteAtom = atom(
  () => '',
  (get, set) => {
    set(openMethodsAtom, false);
    set(openDetailAtom, false);
    set(showSuccessAtom, true);
  }
);

export const refetchOrderDetailAtom = atom<boolean>(false);
