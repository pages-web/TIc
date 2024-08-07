import { ChevronDownIcon } from '@radix-ui/react-icons';
import { NavbarTop } from './navbar-top';
import { Button } from '../ui/button';
import Search from '../search/search';
import BottomNav from '../bottom-nav/bottom-nav';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Footer from '../footer/footer';
import Link from 'next/link';
import CartTrigger from '../cart/cart-trigger';
import CurrentUser from '@/containers/auth/current-user';
import { Suspense } from 'react';

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <NavbarTop>
        <Button
          variant="ghost"
          className="hover:bg-background/10 hover:text-white hidden lg:inline-flex"
          asChild
        >
          <Link href={'/category'}>
            Дэлгүүр
            <ChevronDownIcon className="h-4 w-4 ml-1" />
          </Link>
        </Button>
        <Suspense fallback={<div className="hidden lg:block flex-1" />}>
          <Search className="hidden lg:block flex-1 max-w-2xl mr-auto" />
        </Suspense>
        <nav className="hidden lg:flex lg:flex-row lg:flex-nowrap gap-4">
          <CartTrigger />
          <CurrentUser />
        </nav>
      </NavbarTop>
      {children}
      <ScrollToTop />
      <Suspense>
        <BottomNav />
      </Suspense>
      <Footer />
    </>
  );
};

export default DefaultLayout;
