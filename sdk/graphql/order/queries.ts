import { gql } from '@apollo/client';

export const orderItemFields = `
    _id
    unitPrice
    orderId
    productName
    count
    productId
    isPackage
    isTake
    status
    productImgUrl
    discountAmount
    discountPercent
    bonusCount
`;

const activeOrderFields = `
    _id
    deliveryInfo
    description
    billType
    registerNumber
    items {
      ${orderItemFields}
    }
`;

const currentOrder = gql`
  query CurrentOrder(
    $customerId: String
    $saleStatus: String
    $perPage: Int
    $sortField: String
    $sortDirection: Int
    $statuses: [String]
  ) {
    fullOrders(
      customerId: $customerId
      saleStatus: $saleStatus
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
      statuses: $statuses
    ) {
      ${activeOrderFields}
    }
  }
`;

const activeOrderDetail = gql`
query ActiveOrderDetail($id: String, $customerId: String) {
  orderDetail(_id: $id, customerId: $customerId) {
      ${activeOrderFields}
    }
  }
`;

export const fullOrders = gql`
  query FullOrders(
    $customerId: String
    $statuses: [String]
    $perPage: Int
    $sortField: String
    $sortDirection: Int
    $saleStatus: String
  ) {
    fullOrders(
      customerId: $customerId
      statuses: $statuses
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
      saleStatus: $saleStatus
    ) {
      _id
      createdAt
      paidDate
      status
      totalAmount
      number
      items {
        productName
        productImgUrl
      }
    }
  }
`;

const ordersCheckCompany = gql`
  query ordersCheckCompany($registerNumber: String!) {
    ordersCheckCompany(registerNumber: $registerNumber)
  }
`;

export const orderFields = `
  _id
  createdAt
  modifiedAt
  number
  status
  paidDate
  mobileAmount
  totalAmount
  slotCode
  registerNumber
  customerId
  printedEbarimt
  billType
  billId
  origin
  type
  deliveryInfo
  description
`;

const customerFields = `
  _id
  primaryPhone
  firstName
  primaryEmail
  lastName
`;

const putResponseFields = `
  totalAmount
  customerTin
  customerName
  id
  qrData
  lottery
`;

const orderDetail = gql`
query OrderDetail($id: String, $customerId: String) {
  orderDetail(_id: $id, customerId: $customerId) {
      ${orderFields}

      items {
        ${orderItemFields}
      }

      customer {
        firstName
        lastName
        primaryEmail
        primaryPhone
        code
      }

      user {
        ${customerFields}
      }

      putResponses {
        ${putResponseFields}
      }
    }
  }
`;

const invoices = `
  query Invoices($contentType: String, $contentTypeId: String) {
    invoices(contentType: $contentType, contentTypeId: $contentTypeId) {
      _id
      amount
      status
    }
  }
`;

const orderItemDetail = gql`
  query OrderItemDetail($id: String) {
    poscProductDetail(_id: $id) {
      remainder
      category {
        name
      }
    }
  }
`;

const addresses = gql`
  query Addresses {
    clientPortalCurrentUser {
      customer {
        addresses
      }
    }
  }
`;

const queries = {
  orderItemDetail,
  currentOrder,
  activeOrderDetail,
  ordersCheckCompany,
  fullOrders,
  orderDetail,
  invoices,
  addresses,
};

export default queries;
