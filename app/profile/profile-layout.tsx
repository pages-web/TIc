import { SidebarNav } from '@/components/sidebar-nav/sidebar-nav';
import { Separator } from '@/components/ui/separator';
import PrivateRoute from '@/containers/auth/private-route';
import { Suspense } from 'react';

const ProfileLayout = ({
  children,
  title,
  description,
}: React.PropsWithChildren & { title: string; description: string }) => {
  return (
    <PrivateRoute>
      <div className="space-y-3 lg:space-y-6 pt-6 lg:pt-10 flex-auto container">
        <div className="space-y-0.5 -mx-2 lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Separator className="-mx-2 lg:mx-0" />
        <div className="flex flex-col space-y-4 lg:space-y-8 lg:flex-row lg:space-x-10 lg:space-y-0">
          <aside className="lg:w-1/5 overflow-auto -mx-2 lg:mx-0">
            <Suspense>
              <SidebarNav items={sidebarNavItems} />
            </Suspense>
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

const sidebarNavItems = [
  {
    title: 'Хувийн мэдээлэл',
    href: '/profile',
  },
  {
    title: 'Захиалгууд',
    href: '/profile/orders',
  },
  {
    title: 'Хүслийн жагсаалт',
    href: '/profile/wishlist',
  },
  {
    title: 'Үзсэн',
    href: '/profile/viewed',
  },
  {
    title: 'Гарах',
    href: '/logout',
  },
];

export default ProfileLayout;
