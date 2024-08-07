import { ICategory } from '@/types/products.types';
import { CategoryTreeItem } from './category-tree-item';
import CategoryFilter from './category-filter';

const CategoryTree = ({
  categories,
}: {
  categories: (ICategory & { parent?: true })[];
}) => {
  return (
    <div className="space-y-4">
      <div>
        <span className="block py-2 px-4 mb-4 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest lg:rounded-md">
          Ангилал
        </span>
        {categories.map((cat) => (
          <CategoryTreeItem {...cat} key={cat._id} />
        ))}
      </div>
      <CategoryFilter />
    </div>
  );
};

export default CategoryTree;
