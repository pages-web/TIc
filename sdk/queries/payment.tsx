import { useQuery } from '@apollo/client';
import { queries } from '../graphql/payment';
import { IPayment } from '@/types/payment.types';
import { useAtomValue } from 'jotai';
import { configAtom } from '@/store/auth.store';
import { useDetail } from '@/components/order-detail/order-detail';

const usePaymentConfig = (onCompleted?: (data: any) => void) => {
  const config = useAtomValue(configAtom);
  const { erxesAppToken, paymentIds, name } = config || {};
  const { totalAmount } = useDetail();

  const { data, loading } = useQuery(queries.payment, {
    context: {
      headers: {
        'erxes-app-token': erxesAppToken
      }
    },
    nextFetchPolicy: 'cache-first',
    skip: !erxesAppToken,
    onCompleted
  });

  const { payments } = data || {};

  const selectedPayments: IPayment[] = (payments || []).filter(
    (payment: IPayment) =>
      paymentIds?.includes(payment._id) &&
      (totalAmount < 100000 ? payment.kind !== 'storepay' : true)
  );

  return {
    loading,
    payments: selectedPayments,
    name,
    erxesAppToken
  };
};

export { usePaymentConfig };
