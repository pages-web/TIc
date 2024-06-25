import { type OperationVariables, useMutation } from '@apollo/client';
import { mutations } from '../graphql/payment';
import { useDetail } from '@/components/order-detail/order-detail';
import { useAtomValue, useSetAtom } from 'jotai';
import { onError } from '@/lib/utils';
import { configAtom } from '@/store/auth.store';
import { invoiceDetailAtom } from '@/store/payment.store';

const useCreateInvoice = ({
  appToken,
  posName
}: {
  appToken: string;
  posName: string;
}) => {
  const context = {
    headers: {
      'erxes-app-token': appToken
    }
  };
  const { paymentIds } = useAtomValue(configAtom) || {};
  const { totalAmount, _id, customerId, customerType, number, deliveryInfo } =
    useDetail();
  const setInvoice = useSetAtom(invoiceDetailAtom);

  const [createInvoice, { reset, data, loading }] = useMutation(
    mutations.createInvoice,
    {
      onCompleted(data) {
        setInvoice(data?.invoiceCreate);
      },
      context,
      onError
    }
  );

  const handleCreateInvoice = (variables?: OperationVariables) =>
    createInvoice({
      variables: {
        amount: totalAmount,
        contentType: 'pos:orders',
        contentTypeId: _id,
        customerId: customerId || 'empty',
        customerType: customerType || 'customer',
        description: `${number} - ${posName.toUpperCase()} - ${_id}`,
        data: { posToken: process.env.NEXT_PUBLIC_POS_TOKEN },
        paymentIds,
        phone: deliveryInfo?.phone,
        ...variables
      }
    });

  const { invoiceCreate } = data || {};

  return { loading, reset, data: invoiceCreate, handleCreateInvoice };
};

export const useCheckInvoice = () => {
  const [checkInvoice, { data, loading }] = useMutation(mutations.checkInvoice);

  const { invoiceCheck } = data || {};

  return { loading, checkInvoice, status: invoiceCheck };
};

export default useCreateInvoice;
