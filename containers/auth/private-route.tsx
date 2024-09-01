'use client';

import { currentUserAtom, loadingUserAtom } from '@/store/auth.store';
import { useAtomValue } from 'jotai';
import { Loader2Icon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import storefront from '@/storefront.json';

const PrivateRoute = ({
  children,
  inCheckout,
}: React.PropsWithChildren<{ inCheckout?: boolean }>) => {
  const currentUser = useAtomValue(currentUserAtom);
  const loading = useAtomValue(loadingUserAtom);
  const pathname = usePathname();
  const router = useRouter();
  const guest = storefront.allowGuestAccount && inCheckout;

  useEffect(() => {
    if (guest) {
      return;
    }
    if (!loading && !currentUser) {
      router.push(`/login?from=${pathname}`);
    }
  }, [loading, currentUser]);

  if (currentUser || guest) return children;

  return (
    <div className="flex-auto flex justify-center items-center py-32">
      <Loader2Icon className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default PrivateRoute;
