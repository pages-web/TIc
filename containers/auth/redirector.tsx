'use client';

import { currentUserAtom } from '@/store/auth.store';
import { useAtomValue } from 'jotai';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Redirector = () => {
  const user = useAtomValue(currentUserAtom);
  const router = useRouter();
  const from = useSearchParams().get('from');

  useEffect(() => {
    if (user) {
      router.push(from ? from : '/');
    }
  }, [user?._id]);

  return <></>;
};

export default Redirector;
