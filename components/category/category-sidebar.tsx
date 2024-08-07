'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Mobile = dynamic(() => import('./category-sidebar-mobile'), {
  loading: () => <div className="lg:w-[303px]"></div>,
});

const CategorySidebar = ({ children }: React.PropsWithChildren) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop)
    return (
      <div className="w-[303px]">
        <div className="sticky lg:top-28 min-h-[900px]">{children}</div>
      </div>
    );

  return (
    <div className="lg:w-[303px]">
      <Suspense>
        <Mobile>
          <div className="grid grid-rows-category-sidebar h-full">
            {children}
          </div>
        </Mobile>
      </Suspense>
    </div>
  );
};

export default CategorySidebar;
