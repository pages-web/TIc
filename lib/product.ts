import { IProductDetail } from '@/types/products.types';

export const getActiveProduct = ({
  products,
  searchParams,
}: {
  products: IProductDetail[];
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const fallback = products[0];

  if (!Object.keys(searchParams).length) {
    return { product: fallback, acceptedProducts: products };
  }

  const acceptedProducts = products.filter((product) => {
    let filter = true;
    Object.keys(searchParams).forEach((param) => {
      if (
        product[param as keyof IProductDetail]?.toString() ===
        searchParams[param]
      ) {
        return;
      }

      filter = false;
    });

    return filter;
  });

  return { product: acceptedProducts[0] || fallback, acceptedProducts };
};
