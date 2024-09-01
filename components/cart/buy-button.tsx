import { Button } from '@/components/ui/button';
import { currentUserAtom, userTypeAtom } from '@/store/auth.store';
import { useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import storefront from '@/storefront.json';
import { cartSheetAtom } from '@/store';

const BuyButton = () => {
  const user = useAtomValue(currentUserAtom);
  const setOpenSheet = useSetAtom(cartSheetAtom);
  const userType = useAtomValue(userTypeAtom);

  return (
    <Button
      size="lg"
      asChild
      onClick={() => {
        setOpenSheet(false);
      }}
      className="flex-none"
    >
      <Link
        href={
          storefront.allowGuestAccount && !user && !userType ? '/auth' : '/cart'
        }
      >
        Худалдан авах
      </Link>
    </Button>
  );
};

export default BuyButton;
