import { DialogHeader } from '@/components/ui/dialog';
import { handleMethodAtom, invoiceDetailAtom } from '@/store/payment.store';
import { useAtomValue } from 'jotai';
import Image from '@/components/ui/image';
import { usePaymentConfig } from '@/sdk/queries/payment';
import { IPayment } from '@/types/payment.types';
import { Loading } from '@/components/ui/loading';
import { useEffect } from 'react';
import QrDetail, { QrContainer } from './qr-detail';
import PhoneDetail from './phone-detail';
import { Badge } from '@/components/ui/badge';
import { useMutation } from '@apollo/client';
import { mutations } from '@/sdk/graphql/payment';

const QR_PAYMENTS = ['qpay', 'monpay', 'pocket', 'qpayQuickqr'];
const PHONE_PAYMENTS = ['socialpay', 'storepay'];

const PaymentDetail = () => {
  const selectedMethod = useAtomValue(handleMethodAtom);
  const invoiceDetail = useAtomValue(invoiceDetailAtom);
  const { payments, loading } = usePaymentConfig();

  const kind = payments?.find((p: IPayment) => p._id === selectedMethod)?.kind;
  const isQr = QR_PAYMENTS.includes(kind || '');
  const isPhone = PHONE_PAYMENTS.includes(kind || '');

  const [addTransaction, { loading: addingTransaction, reset, data }] =
    useMutation(mutations.addTransaction);

  useEffect(() => {
    if (selectedMethod) {
      reset();
    }
    if (!isPhone && selectedMethod) {
      addTransaction({
        variables: {
          invoiceId: invoiceDetail?._id,
          paymentId: selectedMethod,
          amount: invoiceDetail?.amount,
        },
      });
    }
  }, [selectedMethod]);

  if (loading) return <Loading className="py-32" />;

  const { _id, status, response } = data?.paymentTransactionsAdd || {};

  return (
    <>
      <DialogHeader className="flex-row gap-4 items-center justify-between my-2 lg:mt-0">
        <div className="flex items-center gap-4">
          <Image
            src={`/images/payments/${kind}.png`}
            className="object-contain rounded-lg flex-none"
            height={36}
            width={36}
          />
          <div className="text-left">
            <div className="font-medium capitalize leading-none mb-0.5">
              {kind}
            </div>
            <div className="text-neutral-500 text-xs lg:text-md">
              {isQr
                ? 'Qr кодыг уншуулж төлбөрөө төлнө үү'
                : 'Бүртгэлтэй утасны дугаараа оруулна уу'}
            </div>
          </div>
        </div>
        {!addingTransaction && !!status && (
          <Badge
            variant="outline"
            className="p-2 px-4 rounded-xl bg-yellow-100, border-amber-200 text-yellow-500"
          >
            {status}
          </Badge>
        )}
      </DialogHeader>
      {isQr &&
        (addingTransaction ? (
          <QrContainer loading />
        ) : (
          (!!response?.qrData || (isQr && response?.error)) && (
            <QrDetail
              errorDescription={response?.error}
              status={status}
              qrCode={response?.qrData}
              urls={response?.urls}
              id={_id}
            />
          )
        ))}
      {isPhone && (
        <PhoneDetail
          kind={kind}
          loading={loading}
          handleCreate={(values) =>
            addTransaction({
              variables: {
                invoiceId: invoiceDetail?._id,
                paymentId: selectedMethod,
                amount: invoiceDetail?.amount,
                details: { phone: values?.phone },
              },
            })
          }
          data={data}
        />
      )}

      {addingTransaction && (
        <Loading className="absolute inset-0 bg-background/40" />
      )}
    </>
  );
};

export default PaymentDetail;
