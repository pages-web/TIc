import { gql } from '@apollo/client';

const productreviews = gql`
  query productreviews(
    $productIds: [String]
    $customerId: String
    $page: Int
    $perPage: Int
  ) {
    productreviews(
      productIds: $productIds
      customerId: $customerId
      page: $page
      perPage: $perPage
    ) {
      _id
      productId
      customerId
      review
      description
      info
    }
  }
`;

const queries = {
  productreviews,
};

export default queries;
