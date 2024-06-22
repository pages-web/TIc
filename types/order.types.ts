import { Customer, CustomerType } from './auth.types';
import { IProduct } from './product.types';

export type IOrderItemStatus = 'new' | 'done' | 'confirm';
export interface OrderItemInput {
  _id: string;
  productId: string;
  count: number;
  unitPrice: number;
  isPackage?: boolean;
  isTake?: boolean;
  status?: IOrderItemStatus;
  manufacturedDate?: string;
}

export interface IAddToCartInput extends IProduct {
  manufactureDate?: string;
}

export interface OrderItem extends OrderItemInput {
  createdAt?: string;
  categoryId?: string;
  orderId?: string;
  discountAmount?: number;
  productName?: string;
  productImgUrl?: string;
  attachment?: { url?: string } | null;
  description?: string;
}

export type IOrderStatus =
  | 'new'
  | 'doing'
  | 'done'
  | 'complete'
  | 'reDoing'
  | 'pending';

export type IOrderType =
  | 'eat'
  | 'take'
  | 'delivery'
  | 'loss'
  | 'spend'
  | 'reject';

export type IBillType = '1' | '3' | '9' | null;

export type IOrigin = '' | 'kiosk';

export interface IOrderCommon {
  totalAmount: number;
  type?: IOrderType;
  customerId?: string;
  customerType?: CustomerType;
  description?: string;
  billType?: IBillType;
  registerNumber?: string;
  slotCode?: string;
  origin?: IOrigin;
  dueDate?: string;
  branchId?: string;
}

export interface IOrderCreate extends IOrderCommon {
  items: OrderItemInput[];
}

export interface IOrderUpdate extends IOrderCreate {
  _id: string;
}

export interface IPutResponse {
  id?: string;
  lottery?: string;
  qrData?: string;
  totalAmount?: number;
  customerTin?: string;
  customerName?: string;
}
export interface IOrderUser {
  _id: string;
  primaryPhone: string | null;
  firstName: string | null;
  primaryEmail: string | null;
  lastName: string | null;
}

export interface IPaidAmount {
  _id: string;
  amount: number;
  info?: { [key: string]: any } | null;
  type: string;
}

export interface IDeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  street: string;
  detail: string;
  haveBaby: boolean;
  callBefore: boolean;
  onlyAfternoon: boolean;
  companyName?: string;
}

export interface IOrder extends IOrderCommon {
  _id: string;
  createdAt: string;
  modifiedAt?: string;
  paidDate?: string;
  cashAmount?: number;
  mobileAmount?: number;
  directDiscount?: number;
  billType: IBillType;
  registerNumber?: string;
  deliveryInfo?: IDeliveryInfo | null;
  description?: string;
  number?: string;
  status?: IOrderStatus;
  customer?: Customer;
  items: OrderItem[];
  putResponses: IPutResponse[];
  user: IOrderUser;
  sloteCode?: string;
  isPre?: boolean;
  saleStatus: string;
}

export interface IOrderHistory {
  _id: string;
  status: string;
  number: string;
  totalAmount: number;
  type: string;
  createdAt: string;
  modifiedAt: string;
  paidDate: string;
}

export type IPaymentAmountType = 'amount' | 'percent' | 'items';
export type PayByProductItem = {
  _id: string;
  count: number;
  unitPrice: number;
};
