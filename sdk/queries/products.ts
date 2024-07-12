import { getClient } from '@/sdk/ssClient';
import { queries } from '../graphql/products';
import { IProduct } from '@/types/product.types';
import {
  GetCategories,
  IProductDetail,
  IGetParent,
  ICategory,
  ProductFields,
} from '@/types/products.types';
import type { LinkProps } from 'next/link';
import { Breadcrumb } from '@/components/breadcrumb/breadcrumb';
import { cache } from 'react';
import { CommonParams } from '@/types';

export const getCategories: GetCategories = cache(async (params) => {
  const { data, error } = await getClient().query({
    query: queries.productCategories,
    variables: params?.variables,
  });
  const { poscProductCategories: categories } = data || {};

  const getParent: IGetParent = (parentId: string) =>
    categories.find((c: ICategory) => c._id === parentId);

  const primaryCategories = (categories || []).filter(
    (category: ICategory) => !getParent(category.parentId)
  );
  return {
    categories:
      primaryCategories.length === 1
        ? categories.filter(
            (cat: ICategory) => cat._id !== primaryCategories[0]._id
          )
        : categories,
    error_msg: error?.message,
    primaryCategories:
      primaryCategories.length === 1
        ? categories.filter(
            (cat: ICategory) => cat.parentId === primaryCategories[0]._id
          )
        : primaryCategories,
    getParent,
  };
});

type GetProducts = (params?: CommonParams) => Promise<{
  products: IProduct[];
  count: number;
  error_msg: string | undefined;
}>;

type GetProductsMeta = (params?: CommonParams) => Promise<{
  products: { _id: string; modifiedAt: string }[];
  error_msg: string | undefined;
}>;

export const getProducts: GetProducts = cache(async (params) => {
  const { perPage, page, sortField, sortDirection, ...variables } =
    params?.variables || {};
  const { data, error } = await getClient().query({
    query: queries.products,
    variables: params?.variables,
  });
  const count = await getClient().query({
    query: queries.productsCount,
    variables: variables,
  });
  const { poscProducts: products } = data || {};
  return {
    products,
    count: count?.data?.poscProductsTotalCount,
    error_msg: error?.message,
  };
});

export const getProductsMeta: GetProductsMeta = async (params) => {
  const { data, error } = await getClient().query({
    query: queries.productsMeta,
    variables: params?.variables,
  });

  const { poscProducts: products } = data || {};

  return { products, error_msg: error?.message };
};

type GetProductDetail = (params?: CommonParams) => Promise<{
  product: IProductDetail;
  error_msg: string | undefined;
}>;

export const getProductDetail: GetProductDetail = cache(async (params) => {
  const { data, error } = await getClient().query({
    query: queries.productDetail,
    variables: params?.variables,
  });
  const { poscProductDetail: product } = data || {};
  return { product, error_msg: error?.message };
});

type GetProductSimilarities = (params?: CommonParams) => Promise<{
  products: IProductDetail[];
  error_msg: string | undefined;
  groups: { fieldId: string; title: string }[];
  fields: ProductFields;
}>;

export const getProductSimilarities: GetProductSimilarities = cache(
  async (params) => {
    const { data, error } = await getClient().query({
      query: queries.productSimilarities,
      variables: params?.variables,
    });
    const { products, groups } = data?.poscProductSimilarities || {};

    const customFields: any = [...products]
      .sort((a: IProduct, b: IProduct) => a.unitPrice - b.unitPrice)
      .map((product: IProduct) => product.customFieldsData);

    const getFieldValues = (fieldId: string) => {
      const array: string[] = customFields.map(
        (data: CustomField[]) =>
          data.find((field) => field.field === fieldId)?.value
      );
      const uniqueArray: string[] = [];

      for (const element of array) {
        if (!uniqueArray.includes(element)) {
          uniqueArray.push(element);
        }
      }
      return uniqueArray;
    };

    let fields = {};

    if (groups?.length) {
      groups.map(
        (group: Group) =>
          (fields = {
            ...fields,
            [group.fieldId]: {
              ...group,
              variants: getFieldValues(group.fieldId),
            },
          })
      );
    }

    const flattenProducts = (products || []).map(
      ({ customFieldsData, ...product }: IProduct) => {
        let flattenProduct: any = { ...product };
        (customFieldsData || []).forEach((field) => {
          flattenProduct[field.field] = field.value;
        });
        return flattenProduct;
      }
    );

    return {
      fields,
      products: flattenProducts,
      groups,
      error_msg: error?.message,
    };
  }
);

export interface Group {
  fieldId: string;
  title: string;
}

export interface CustomField {
  field: string;
  value: string;
  stringValue: string;
}

type GetBreadcrumbs = (order: string, categories: ICategory[]) => Breadcrumb[];

export const getBreadcrumbs: GetBreadcrumbs = cache((order, categories) => {
  return order
    .split('/')
    .map((code) => {
      const cat = categories.find((c) => c.code === code);
      if (!cat) return null;
      return {
        name: cat?.name,
        link: {
          pathname: '/category',
          query: { order: cat?.order },
        } as LinkProps['href'],
      };
    })
    .filter((cat) => cat !== null) as Breadcrumb[];
});

type GetProductReview = (params?: CommonParams) => Promise<{
  review: { average: number; length: number; productId: string };
  error_msg: string | undefined;
}>;

export const getProductReview: GetProductReview = cache(async (params) => {
  const { data, error } = await getClient().query({
    query: queries.productReview,
    variables: params?.variables,
  });
  const { productreview: review } = data || {};
  return { review, error_msg: error?.message };
});
