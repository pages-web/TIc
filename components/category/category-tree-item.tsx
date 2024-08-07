'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ICategory } from '@/types/products.types';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export type CategoryTreeItemProps =
  | (ICategory & { parent?: boolean })
  | ICategory;

export function CategoryTreeItem({
  parent,
  name,
  order,
}: ICategory & { parent?: boolean }): JSX.Element {
  const sort = useSearchParams().get('sort');

  return (
    <Button
      variant={'ghost'}
      className="lg:py-1.5 w-full font-normal"
      asChild
      size="sm"
    >
      <Link href={{ pathname: '/category', query: { order, sort } }}>
        <span
          className={cn('flex gap-2 items-center w-full', !parent && 'pl-6')}
        >
          {parent && <ArrowLeftIcon className="text-neutral-600 h-4 w-4" />}
          <span className="text-base lg:text-sm capitalize flex items-center">
            {name || 'Дэлгүүр'}
          </span>
        </span>
      </Link>
    </Button>
  );
}

{
  /* {Number(count) > -1 && (
            <span className="lg:text-sm font-normal text-neutral-600">
              ({count})
            </span>
          )} */
}
