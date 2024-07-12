import { getProductSimilarities } from '@/sdk/queries/products';
import { IProductDetail } from '@/types/products.types';
import { Suspense } from 'react';
import VariantSelector from './variant-selector';

const ChooseProduct = async ({ _id }: IProductDetail) => {
  const { products, fields } = await getProductSimilarities({
    variables: {
      id: _id,
      groupedSimilarity: 'config',
    },
  });

  if (products.length <= 1) return null;

  return (
    <Suspense>
      <VariantSelector fields={fields} products={products} />
    </Suspense>
  );
};

export default ChooseProduct;
