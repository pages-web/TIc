import { Button } from '@/components/ui/button';
import RegisterForm from '@/containers/auth/register-form';
import { getConfig } from '@/sdk/queries/auth';
import { Metadata } from 'next/types';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getConfig();

  return {
    title: config.name + ' - Бүртгүүлэх',
    openGraph: {
      title: config.name + ' - Бүртгүүлэх',
    },
  };
}

const SignUp = () => {
  return (
    <>
      <div className="text-lg lg:text-2xl font-semibold mx-auto relative">
        Бүртгүүлэх
      </div>
      <div className="mb-auto mx-auto mt-4 lg:mt-8 w-full sm:max-w-lg">
        <div className="lg:border lg:rounded-xl w-full sm:py-10 px-3 sm:px-10 space-y-5  bg-background">
          <RegisterForm />
        </div>
        <div className="my-4 lg:my-8 text-center text-sm relative">
          <Button variant="link" className="text-sm" asChild>
            <Link href="/login">Нэвтрэх?</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
