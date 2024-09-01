'use client';
import { Button } from '@/components/ui/button';
import { userTypeAtom } from '@/store/auth.store';
import { useSetAtom } from 'jotai';
import Link from 'next/link';

const GuestLogin = () => {
  const setUserType = useSetAtom(userTypeAtom);
  return (
    <Button
      className="w-full mt-2 h-10"
      onClick={() => {
        setUserType('visitor');
      }}
      asChild
    >
      <Link href="/cart">Зочиноор нэвтрэх</Link>
    </Button>
  );
};

export default GuestLogin;
