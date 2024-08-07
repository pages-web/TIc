import { cn } from '@/lib/utils';

export interface ContainerProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const ProductsContainer = ({ className, ...rest }: ContainerProps) => {
  return (
    <section
      className={cn(
        'grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mb-10 lg:mb-5',
        className
      )}
      {...rest}
    />
  );
};

export default ProductsContainer;
