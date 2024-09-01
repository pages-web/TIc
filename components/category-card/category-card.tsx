import { getConfig } from '@/sdk/queries/auth';
import CategoryItem from './item';
import { Heading } from '../heading/heading';

export type CategoryCardProps = {
  //   items: CategoryWithImage[];
};

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
