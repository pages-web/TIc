import { Button } from '@/components/ui/button';
import ResetPasswordForm from '@/containers/auth/reset-password';
import Link from 'next/link';
import { Suspense } from 'react';

const ResetPassword = () => {
  return (
    <>
      <div className="text-lg lg:text-2xl font-semibold mx-auto relative lg:mt-20">
        Нууц үг шинэчлэх
      </div>
      <div className="mb-auto mx-auto mt-4 lg:mt-8 w-full sm:max-w-md">
        <div className="lg:border lg:rounded-xl w-full sm:py-10 px-3 sm:px-10 space-y-5 bg-background">
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
      <div className="mt-8 text-center text-sm relative lg:mb-20">
        <Button variant="link" className="text-sm" asChild>
          <Link href="/login">Нэвтрэх?</Link>
        </Button>
      </div>
    </>
  );
};

export default ResetPassword;
