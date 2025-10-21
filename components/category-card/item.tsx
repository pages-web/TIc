"use client";

import Link from "next/link";
import Image from "../ui/image";
import { cn } from "@/lib/utils";
import { CarouselItem } from "../ui/carousel";
import { ICategory } from "@/types/products.types";

interface CategoryItemProps extends ICategory {
  length: number;
  activeOrder: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  order,
  name,
  activeOrder,
  attachment,
}) => {
  return (
    <CarouselItem className="basis-32 md:basis-36 pl-6 md:pl-10">
      <Link
        className="h-full z-[1] focus-visible:outline focus-visible:outline-offset-2 focus-visible:rounded-md flex flex-col items-center w-24"
        href={{ pathname: "/", query: { order } }}
        aria-label={name}
      >
        <div className="relative h-28 w-28">
          <Image
            src={attachment?.url ?? ""}
            alt={name}
            width={320}
            height={320}
            className={cn(
              "absolute h-full w-full top-0 left-0 object-contain rounded-[0.5rem] overflow-hidden"
            )}
            skipAnimation
          />
        </div>
        <div className="flex justify-center">
          <p
            className={cn(
              "mt-2 text-neutral-600 no-underline group-hover:underline group-hover:text-primary group-hover:font-normal group-active:text-primary max-w-40 text-center font-semibold text-sm",
              activeOrder === order && "text-primary"
            )}
          >
            {name}
          </p>
        </div>
      </Link>
    </CarouselItem>
  );
};

export default CategoryItem;
