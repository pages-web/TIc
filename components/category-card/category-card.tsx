import { getConfig } from '@/sdk/queries/auth';
import { ICategory } from '@/types/products.types';
import Image from 'next/image';
import Link from 'next/link';
import CategoryItem from './item';
import { Heading } from '../heading/heading';

interface CategoryWithImage extends ICategory {
  image: string;
}

export type CategoryCardProps = {
  //   items: CategoryWithImage[];
};

const items = [
  {
    name: 'New',
    image: '/images/new-card.png',
    order: '/category',
  },
  {
    name: 'Men',
    image: '/images/men-card.png',
    order: '/category',
  },
  {
    name: 'Women',
    image: '/images/women-card.png',
    order: '/category',
  },
];

export async function CategoryCard({ ...attributes }: CategoryCardProps) {
  const { config } = await getConfig();

  if (!(config.initialCategoryIds || []).length) return null;

  return (
    <>
      <Heading title="Онцлох ангилалууд" className="lg:mt-16 lg:mb-8" />
      <div
        className="container mb-10 lg:mb-16 flex flex-nowrap lg:flex-wrap lg:justify-center overflow-x-scroll no-scrollbar"
        {...attributes}
      >
        {(config.initialCategoryIds || []).map((_id: string) => (
          <CategoryItem
            id={_id}
            key={_id}
            length={config.initialCategoryIds.length}
          />
        ))}
      </div>
    </>
  );
}
