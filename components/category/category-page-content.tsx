import { PropsWithChildren, ReactNode } from 'react';
import { IProduct } from '@/types/product.types';
import CategorySidebar from './category-sidebar';
import CategorySidebarTrigger from './category-sidebar-trigger';
import ProductCard from '../product-card/product-card';
import ProductPagination from '../product-pagination/product-pagination';
import { IPageProps } from '@/types';
import ProductsContainer from '../product-card/products-container';
import SearchBadge from './search-badge';

export interface CategoryPageContentProps extends PropsWithChildren {
  title: string;
  products: IProduct[];
  totalProducts: number;
  sidebar?: ReactNode;
  searchParams: IPageProps['searchParams'];
}

const CategoryPageContent = ({
  title,
  sidebar,
  products,
  totalProducts,
  searchParams,
}: CategoryPageContentProps) => {
  return (
    <div className="mb-20">
      <h1 className="lg:my-6 font-bold text-2xl lg:text-4xl">{title}</h1>
      <div className="lg:flex gap-6">
        <CategorySidebar>{sidebar}</CategorySidebar>
        <div className="flex-1">
          <div className="flex justify-between items-center py-3 mb-2 sticky lg:py-0 lg:static top-0 z-50 bg-background">
            <span className="font-bold lg:text-lg inline-flex items-center">
              {totalProducts} бүтээгдэхүүн <SearchBadge />
            </span>
            <CategorySidebarTrigger />
          </div>
          <ProductsContainer>
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </ProductsContainer>
          <ProductPagination
            searchParams={searchParams}
            totalProducts={totalProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPageContent;

export interface CategoryPageContentProps extends PropsWithChildren {
  title: string;
  products: IProduct[];
  totalProducts: number;
  sidebar?: ReactNode;
  itemsPerPage?: number;
}

export interface CategorySidebarProps extends PropsWithChildren {
  isOpen: boolean;
  closeSidebar: () => void;
}
