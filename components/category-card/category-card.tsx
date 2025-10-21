import { getConfig } from "@/sdk/queries/auth";
import CategoryItem from "./item";
import CarouselCategoryCard from "./carousel";
import { getCategories } from "@/sdk/queries/products";
import { Suspense } from "react";
import { Heading } from "../heading/heading";

export async function CategoryCard({ activeOrder }: { activeOrder: string }) {
  const { config } = await getConfig();
  const { categories } = await getCategories();

  if (!(config.initialCategoryIds || []).length) return null;

  const primaryCategories = categories.filter((category) =>
    config.initialCategoryIds.includes(category._id)
  );

  const sortCategories = (categories: any[]) => {
    const specialCategory = categories.find(
      (cat) => cat._id === process.env.NEXT_PUBLIC_SPECIAL_CATEGORY_ID
    );
    const normalCategories = categories.filter(
      (cat) => cat._id !== process.env.NEXT_PUBLIC_SPECIAL_CATEGORY_ID
    );
    if (specialCategory) {
      return [specialCategory, ...normalCategories];
    }
    return normalCategories;
  };

  const orders = sortCategories(primaryCategories).map(
    (category) => category?.order || ""
  );

  return (
    <div className="my-10 md:my-16 container">
      <Heading title="Онцлох ангилалууд" className="mb-4 md:mb-6" />
      <Suspense>
        <CarouselCategoryCard orders={orders}>
          {sortCategories(primaryCategories).map((category) => (
            <CategoryItem
              {...category}
              key={category._id}
              length={config.initialCategoryIds.length}
              activeOrder={activeOrder}
            />
          ))}
        </CarouselCategoryCard>
      </Suspense>
    </div>
  );
}
