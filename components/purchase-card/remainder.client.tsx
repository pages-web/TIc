'use client';

import { checkRemainderAtom } from '@/store/auth.store';
import { useAtomValue } from 'jotai';
import { Badge } from '@/components/ui/badge';

const Remainder = ({ remainder }: { remainder?: number | null }) => {
  const checkRemainder = useAtomValue(checkRemainderAtom);
  if (!checkRemainder) return <></>;
  return (
    <div className="flex items-center pt-2">
      {remainder ? (
        <>
          Таны сонгосон бараа агуулахад:
          <Badge className="mx-2 bg-green-700">{remainder || 0}ш</Badge> байна.
        </>
      ) : (
        <>Таны сонгосон бараа агуулахад дууссан байна.</>
      )}
    </div>
  );
};

export default Remainder;
