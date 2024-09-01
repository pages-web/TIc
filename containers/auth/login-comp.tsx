import { Suspense } from 'react';
import LoginForm from './login-form';
import { Separator } from '@/components/ui/separator';
import FacebookLogin from './facebook-login';
import GoogleLogin from './google-login';
import { cn } from '@/lib/utils';

const LoginComp = ({ className }: { className?: string }) => {
  return (
    <div className={cn('w-full space-y-5 bg-background relative', className)}>
      <Suspense>
        <LoginForm />
      </Suspense>
      <Separator />
      <div className="space-y-3">
        {process.env.NEXT_PUBLIC_FACEBOOK_ID && (
          <Suspense>
            <FacebookLogin />
          </Suspense>
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ID && (
          <Suspense>
            <GoogleLogin />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default LoginComp;
