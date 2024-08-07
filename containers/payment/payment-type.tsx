import { memo } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { RadioGroupItem } from '@/components/ui/radio-group';

export interface IPaymentOption {
  _id: string;
  name: string;
  kind: string;
}

const PaymentType = ({
  selected,
  _id,
  kind,
}: IPaymentOption & { selected: boolean }) => {
  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          'h-auto flex-col items-center lg:items-start pt-5 pb-4 pl-6 gap-1 group rounded-2xl w-full border-2 border-border/10 shadow-md ease-in duration-100 transition-colors relative',
          selected && 'bg-primary/10 hover:bg-primary/10  border-primary'
        )}
        asChild
      >
        <div>
          <RadioGroupItem
            value={_id}
            id={_id}
            className={cn(
              'absolute right-5 top-5 h-5 w-5 border-2 shadow-none hidden lg:inline-flex',
              selected && 'border-primary'
            )}
          />

          <Image
            src={`/images/payments/${kind}.png`}
            alt={kind}
            className="object-contain rounded-lg mb-0.5"
            height={36}
            width={36}
          />
          <div className="flex-auto text-left">
            <div className={'font-medium capitalize text-black'}>
              {kind === 'qpayQuickqr' ? 'qpay' : kind}
            </div>
          </div>
          <label
            className={cn('absolute inset-0 rounded-2xl cursor-pointer')}
            htmlFor={_id}
          />
        </div>
      </Button>
    </div>
  );
};

export default memo(PaymentType);
