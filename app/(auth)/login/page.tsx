import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FacebookLogin from '@/containers/auth/facebook-login';
import GoogleLogin from '@/containers/auth/google-login';
import LoginForm from '@/containers/auth/login-form';
import { Metadata } from 'next/types';
import Link from 'next/link';
import { Suspense } from 'react';
import { getConfig } from '@/sdk/queries/auth';

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getConfig();

  return {
    title: config.name + ' - Тавтай морил',
    openGraph: {
      title: config.name + ' - Тавтай морил',
    },
  };
}

const Login = () => {
  return (
    <>
      <div className="text-lg lg:text-2xl font-semibold mx-auto relative lg:mt-20">
        Тавтай морил
      </div>
      <div className="mb-auto mx-auto mt-4 lg:mt-8 w-full sm:max-w-md">
        <div className="lg:border lg:rounded-xl w-full sm:py-10 px-3 sm:px-10 space-y-5 bg-background relative">
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
      </div>
      <div className="mt-8 text-center text-sm relative lg:mb-20">
        <Button variant="link" className="text-sm" asChild>
          <Link href="/signup">Бүртгэл үүсгэх?</Link>
        </Button>
      </div>
    </>
  );
};

export default Login;
