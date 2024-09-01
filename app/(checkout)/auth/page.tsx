import GuestLogin from '@/containers/auth/guestLogin';
import LoginComp from '@/containers/auth/login-comp';
import { UserCircle } from 'lucide-react';

const AuthPage = () => {
  return (
    <div className="flex-auto container flex items-center justify-center">
      <div className="grid grid-cols-2 w-full max-w-4xl border rounded-lg">
        <div className="flex flex-col justify-center items-center gap-3 border-r p-8">
          <div className="inline-flex h-20 w-20 bg-primary/10 rounded-full justify-center items-center">
            <UserCircle className="h-8 w-8 text-primary/80" strokeWidth={1.5} />
          </div>
          <h2 className="font-semibold text-xl">Зочиноор нэвтрэх</h2>
          <div className="text-sm text-center text-neutral-500 mb-4">
            Та бүртгэл үүсгэхгүйгээр худалдан авалт хийж болно. Та дараа нь
            бүртгэл үүсгэх боломжтой.
          </div>
          <GuestLogin />
        </div>
        <div className="p-8">
          <LoginComp />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
