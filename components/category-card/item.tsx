import Link from 'next/link';
import Image from '../ui/image';
import { getCategories } from '@/sdk/queries/products';
import { cn } from '@/lib/utils';

const CategoryItem = async ({ id, length }: { id: string; length: number }) => {
  const { categories } = await getCategories();
  const category = categories.find((cat) => cat._id === id);

  if (!category) return null;

  const { order, attachment, name } = category;

  return (
    <div className="mr-2 lg:mr-6 group">
      <Link
        className="w-full h-full z-[1] focus-visible:outline focus-visible:outline-offset-2 focus-visible:rounded-md"
        href={`/category?order=${order}`}
        aria-label={name}
      >
        <div className="relative h-40 lg:h-48 w-40 lg:w-48">
          <Image
            src={attachment?.url || ''}
            alt={name}
            width={320}
            height={320}
            className="absolute h-full w-full top-0 left-0 object-contain"
            skipAnimation
          />
        </div>
        <div className="flex justify-center">
          <p
            className={cn(
              'mt-4 font-semibold no-underline text-base group-hover:underline group-hover:text-primary group-hover:font-normal group-active:text-primary max-w-40 text-center',
              length > 5 && 'font-medium text-sm'
            )}
          >
            {name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
