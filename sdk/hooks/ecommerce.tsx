import { useMutation } from '@apollo/client';
import mutations from '@/sdk/graphql/ecommerce/mutations';

export const useAddReview = () => {
  const [addReview, { data, loading }] = useMutation(
    mutations.productReviewAdd,
    { refetchQueries: ['productreviewAdd'] }
  );

  const { productreviewAdd: review } = data || {};

  return { loading, addReview, review };
};
