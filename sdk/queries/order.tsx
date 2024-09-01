import {
  type OperationVariables,
  useQuery,
  useLazyQuery,
} from '@apollo/client';
import { queries } from '../graphql/order';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currentUserAtom } from '@/store/auth.store';
import {
  initialLoadingOrderAtom,
  loadingOrderAtom,
  activeOrderAtom,
  temporaryOrderIdAtom,
} from '@/store/order.store';
import { cudOrderAtom } from '@/store/order.store';
import { OrderItem } from '@/types/order.types';
import { useEffect, useMemo } from 'react';
import { ORDER_SALE_STATUS, ORDER_STATUSES } from '@/lib/constants';
import { onError } from '@/lib/utils';
import { refetchOrderDetailAtom } from '@/store/payment.store';
import { useMergeOrder } from '../hooks/order';

export const useActiveOrder = () => {
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const setLoadingOrder = useSetAtom(loadingOrderAtom);
  const setInitialLoadingOrder = useSetAtom(initialLoadingOrderAtom);
  const setTriggerCRUD = useSetAtom(cudOrderAtom);

  const { merge } = useMergeOrder();
  const setActiveOrder = useSetAtom(activeOrderAtom);

  const stopLoading = () => {
    setLoadingOrder(false);
    setInitialLoadingOrder(false);
    setTriggerCRUD(false);
  };

  const temporaryOrderId = useAtomValue(temporaryOrderIdAtom);
  const customerOrderQuery = useQuery(queries.currentOrder, {
    variables: {
      customerId: erxesCustomerId,
      statuses: ORDER_STATUSES.ALL,
      saleStatus: ORDER_SALE_STATUS.CART,
      perPage: 1,
      page: 1,
      sortField: 'createdAt',
      sortDirection: -1,
    },
    skip: !erxesCustomerId,
  });

  const visitorOrderQuery = useQuery(queries.activeOrderDetail, {
    variables: {
      id: temporaryOrderId,
      customerId: 'visitor',
    },
    skip: !temporaryOrderId,
    onError,
  });

  const customerOrder = (customerOrderQuery?.data?.fullOrders || [])[0];
  const visitorOrder = visitorOrderQuery?.data?.orderDetail;

  useEffect(() => {
    if (!erxesCustomerId && visitorOrder) {
      stopLoading();
      setActiveOrder(visitorOrder);
      return;
    }

    if (customerOrder) {
      stopLoading();
      if (!temporaryOrderId) {
        setActiveOrder(customerOrder);
        return;
      }
      if (visitorOrder) {
        merge(customerOrder, visitorOrder);
      }
    }
  }, [customerOrder, temporaryOrderId, visitorOrder]);
};

export const syncCarts = (
  localCart: OrderItem[],
  items: OrderItem[]
): OrderItem[] => {
  const itemMap = new Map<string, OrderItem>();

  // Add all local items to the map
  localCart.forEach((localItem) => {
    itemMap.set(localItem.productId, localItem);
  });

  // Merge saved items into the map
  items.forEach((savedItem) => {
    const existingItem = itemMap.get(savedItem.productId);
    if (existingItem) {
      itemMap.set(savedItem.productId, {
        ...existingItem,
        count: existingItem.count + savedItem.count,
      });
    } else {
      itemMap.set(savedItem.productId, savedItem);
    }
  });

  // Convert map back to array
  return Array.from(itemMap.values());
};

export const useFullOrders = (props?: { variables?: OperationVariables }) => {
  const { variables } = props || {};
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const { data, loading, refetch } = useQuery(queries.fullOrders, {
    variables: {
      customerId: erxesCustomerId,
      statuses: ORDER_STATUSES.ALL,
      saleStatus: ORDER_SALE_STATUS.CONFIRMED,
      sortField: 'createdAt',
      sortDirection: -1,
      ...variables,
    },
    onError,
    skip: !erxesCustomerId,
  });

  const fullOrders = useMemo(() => data?.fullOrders, [data]);

  return { fullOrders, loading, refetch };
};

export const useOrderDetail = (id: string) => {
  const { erxesCustomerId } = useAtomValue(currentUserAtom) || {};
  const [refetchOrder, setRefetchOrder] = useAtom(refetchOrderDetailAtom);
  const { data, loading, refetch } = useQuery(queries.orderDetail, {
    variables: {
      customerId: erxesCustomerId,
      id,
    },
    onCompleted() {
      setRefetchOrder(false);
    },
    onError,
  });

  const { orderDetail } = data || {};
  const { _id } = orderDetail || {};

  useEffect(() => {
    if (_id && refetchOrder) {
      refetch();
    }
  }, [_id, refetchOrder]);

  return { orderDetail, loading };
};

export const useCheckRegister = (onCompleted?: (name: string) => void) => {
  const [checkRegister, { loading }] = useLazyQuery(
    queries.ordersCheckCompany,
    {
      onError,
      onCompleted(data) {
        const { found, name } = (data || {}).ordersCheckCompany || {};

        onCompleted && onCompleted(!found ? '' : name || 'Demo company');
      },
    }
  );
  return { checkRegister, loading };
};
