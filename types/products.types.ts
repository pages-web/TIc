import { IProduct } from './product.types';
import { CommonParams, IAttachment } from '.';

export interface CustomField {
  field: string;
  value: string;
  stringValue: string;
}

export interface Group {
  fieldId: string;
  title: string;
}

export interface ProductField extends Group {
  variants: string[];
}

export type ProductFields = { [key: string]: ProductField };

export interface IProductDetail extends IProduct {
  attachmentMore?: IAttachment[];
  category?: ICategory;
}

export interface IUseProducts {
  loading: boolean;
  products: IProduct[];
  productsCount: number;
  handleLoadMore: () => void;
}

export interface ICategory {
  _id: string;
  name: string;
  isRoot: boolean;
  order: string;
  parentId: string;
  code: string;
  attachment: IAttachment;
}

export type IGetParent = (parentId: string) => ICategory | undefined;

export type GetCategories = (params?: CommonParams) => Promise<{
  categories: ICategory[];
  error_msg: string | undefined;
  primaryCategories: ICategory[];
  getParent: IGetParent;
}>;
