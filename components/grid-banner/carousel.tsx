"use client";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "../ui/image";
import { IArticle } from "@/types/kb.types";

const settings = {
  delay: {
    lg: 3000,
    sm: 3000,
    long: 3000,
  },
  width: {
    lg: 768,
    sm: 364,
    long: 768,
  },
  orientation: {
    lg: "horizontal",
    sm: "horizontal",
    long: "vertical",
  },
  className: {
    lg: "col-span-1 row-span-2 aspect-square md:aspect-auto h-auto md:mb-4",
    sm: "col-span-1 row-span-2  aspect-square md:aspect-auto h-auto md:mb-4",
    long: "col-span-1 aspect-[4/1] rounded-[0.5em]",
  },
};

type IOrientation = "horizontal" | "vertical";

const CarouselClient = ({
  items,
  size,
}: {
  items: IArticle[];
  size: "lg" | "sm" | "long";
}) => {
  return (
    <Carousel
      className={settings.className[size]}
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: settings.delay[size],
          stopOnMouseEnter: true,
        }),
      ]}
      orientation={settings.orientation[size] as IOrientation}
    >
      <CarouselContent containerClassname="h-full mt-5">
        {items.map((car) => (
          <CarouselItem className="h-full flex justify-center" key={car._id}>
            <Image
              src={car.image?.url}
              width={900}
              height={400}
              className="w-full h-[70vh] object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselClient;
