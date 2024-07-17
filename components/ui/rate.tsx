'use client';
import { StarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

const Rate = ({
  rate,
  onChange,
  rateClassname,
  className,
}: {
  rate: number;
  rateClassname?: string;
  onChange?: (value: number) => void;
  className?: string;
}) => {
  const intRate = Math.floor(rate);
  return (
    <div className={cn('inline-flex text-neutral-300 gap-1', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          strokeWidth={2.5}
          className={cn(
            'h-4 w-4',
            rateClassname,
            intRate >= i + 1 && 'fill-amber-400 text-amber-400',
            onChange && 'hover:scale-110 cursor-pointer transition-transform'
          )}
          onClick={() => onChange && onChange(i + 1)}
        />
      ))}
    </div>
  );
};

export default Rate;
