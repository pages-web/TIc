import { type ApolloError, useMutation } from '@apollo/client';
import { mutations } from '../graphql/order';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  activeOrderAtom,
  cudOrderAtom,
  defaultActiveOrder,
  loadingOrderAtom,
  orderParamsAtom,
  temporaryOrderIdAtom,
} from '@/store/order.store';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { IOrder } from '@/types/order.types';
import { ORDER_SALE_STATUS } from '@/lib/constants';
import { onError } from '@/lib/utils';
import { syncCarts } from '../queries/order';
import { currentUserAtom, userTypeAtom } from '@/store/auth.store';

const refetchQueries = ['CurrentOrder', 'ActiveOrderDetail'];

export const useOrderCUD = () => {
  const params = useAtomValue(orderParamsAtom);
  const [triggerCUDOrder, changeTrigger] = useAtom(cudOrderAtom);
  const setLoading = useSetAtom(loadingOrderAtom);
  const setTemporaryOrderId = useSetAtom(temporaryOrderIdAtom);
  const { _id, items } = params;

  const onError = (error: ApolloError) => {
    setLoading(false);
    changeTrigger(false);
    toast.error(error.message);
  };

  const [add] = useMutation(mutations.ordersAdd, {
    onError,
    refetchQueries,
    onCompleted({ ordersAdd }) {
      !params.customerId && setTemporaryOrderId(ordersAdd?._id);
    },
  });
  const [edit] = useMutation(mutations.ordersEdit, {
    onError,
    refetchQueries,
  });

  const [remove] = useMutation(mutations.ordersCancel, {
    onError,
    refetchQueries,
  });

  useEffect(() => {
    if (triggerCUDOrder) {
      setLoading(true);
      if (_id) {
        if (items.length > 0) {
          edit({ variables: params });
        } else {
          remove({
            variables: params,
          });
        }
      } else {
        add({
          variables: params,
        });
      }
    }
  }, [triggerCUDOrder]);

  return {};
};

export const useOrderChangeSaleStatus = () => {
  const { _id } = useAtomValue(activeOrderAtom) as IOrder;
  const user = useAtomValue(currentUserAtom);
  const setUserType = useSetAtom(userTypeAtom);
  const setTemporaryOrderId = useSetAtom(temporaryOrderIdAtom);
  const setActiveOrder = useSetAtom(activeOrderAtom);

  const [change, { loading }] = useMutation(mutations.orderChangeSaleStatus, {
    refetchQueries,
    onError,
  });

  const handleConfirm = () => {
    change({
      variables: {
        _id,
        saleStatus: ORDER_SALE_STATUS.CONFIRMED,
      },
      onCompleted() {
        if (!user) {
          setUserType(null);
          setTemporaryOrderId(undefined);
        }
        setActiveOrder(defaultActiveOrder as IOrder);
      },
    });
  };

  return { handleConfirm, loading };
};

export const useCancelOrder = () => {
  const [cancel, { loading }] = useMutation(mutations.ordersCancel, {
    onError,
  });

  return { cancel, loading };
};

export const useMergeOrder = () => {
  const setActiveOrder = useSetAtom(activeOrderAtom);
  const { cancel } = useCancelOrder();
  const setTriggerCRUD = useSetAtom(cudOrderAtom);
  const setTemporaryOrderId = useSetAtom(temporaryOrderIdAtom);

  const merge = (customerOrder: IOrder, visitorOrder: IOrder) => {
    const mergedItems = syncCarts(
      customerOrder.items || [],
      visitorOrder.items || []
    );
    const params = {
      ...customerOrder,
      ...visitorOrder,
      _id: visitorOrder?._id,
      items: mergedItems,
      deliveryInfo: customerOrder?.deliveryInfo || visitorOrder?.deliveryInfo,
      description: customerOrder?.description || visitorOrder?.description,
      billType: customerOrder?.billType || visitorOrder?.billType,
      registerNumber:
        customerOrder?.registerNumber || visitorOrder?.registerNumber,
    };

    setActiveOrder(params);
    setTriggerCRUD(true);
    cancel({ variables: { _id: customerOrder._id } });
    setTemporaryOrderId(undefined);

    return { params };
  };

  return { merge };
};
