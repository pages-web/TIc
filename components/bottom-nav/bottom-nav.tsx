'use client';

import {
  HomeIcon,
  LucideIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCart,
  User2Icon,
} from 'lucide-react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BottomProfile from './bottom-profile';
import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import CartCount from '../cart/cart-count';
import { useSetAtom } from 'jotai';
import { cartSheetAtom } from '@/store';

const getItems = () => [
  {
    label: 'Эхлэл',
    Icon: HomeIcon,
    path: '/',
  },
  {
    label: 'Дэлгүүр',
    Icon: MenuIcon,
    path: '/category',
  },
  {
    label: 'Хайх',
    Icon: SearchIcon,
    path: '/search',
  },
  {
    label: 'Сагс',
    Icon: ShoppingCart,
    path: '/cart',
  },
  {
    label: 'Профайл',
    Icon: User2Icon,
    path: '/profile',
  },
];

const BottomNav = () => {
  const pathname = usePathname();
  const openCart = useSetAtom(cartSheetAtom);
  return (
    <div className="z-50 w-full fixed bottom-0 left-0 flex flex-row items-stretch lg:hidden bg-primary">
      {getItems().map(({ label, Icon, path }) => {
        if (path === '/profile')
          return <BottomProfile key={label} Icon={Icon} />;

        if (path === '/cart')
          return (
            <BottomNavItem
              label={label}
              Icon={Icon}
              pathname={pathname}
              path={pathname}
              onClick={() => openCart(true)}
              key={label}
              className="bg-primary hover:bg-primary"
            >
              <Badge
                variant="outline"
                className="absolute right-1/2 top-2 bg-background p-0 h-4 min-w-4 rounded-full justify-center text-xs text-center leading-none translate-x-5"
              >
                <CartCount />
              </Badge>
            </BottomNavItem>
          );

        return (
          <BottomNavItem
            label={label}
            Icon={Icon}
            path={path}
            pathname={pathname}
            key={label}
          />
        );
      })}
    </div>
  );
};

export const BottomNavItem = memo(function Item({
  children,
  path,
  pathname,
  label,
  Icon,
  onClick,
  className,
}: ButtonProps & {
  path: string;
  label: string;
  Icon: LucideIcon;
  pathname: string;
}) {
  return (
    <Button
      className={cn(
        'flex-col h-auto w-full gap-1 rounded-none px-0 pb-1.5 pt-3 relative hover:bg-active',
        path === pathname && 'bg-active',
        className
      )}
      key={label}
      asChild
      onClick={onClick}
    >
      <Link href={path}>
        <Icon className="h-6 w-6" strokeWidth={1.8} />
        <span className="capitalize text-xs font-bold">{label}</span>
        {children}
      </Link>
    </Button>
  );
});

export default BottomNav;
