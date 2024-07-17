import { OperationVariables, useQuery } from '@apollo/client';
import { queries } from '@/sdk/graphql/ecommerce';
import { onError } from '@/lib/utils';

export const useProductReviews = ({
  variables,
}: {
  variables: OperationVariables;
}) => {
  const { data, loading } = useQuery(queries.productreviews, {
    variables: {
      perPage: 10,
      ...variables,
    },
    onError,
  });

  const { productreviews: reviews } = data || {};

  return { reviews, loading };
};
