'use client';
import Autoplay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Image from '../ui/image';
import { IArticle } from '@/types/kb.types';

const settings = {
  delay: {
    lg: 4000,
    sm: 2000,
    long: 3000,
  },
  width: {
    lg: 768,
    sm: 364,
    long: 768,
  },
  orientation: {
    lg: 'horizontal',
    sm: 'horizontal',
    long: 'vertical',
  },
  className: {
    lg: 'col-span-2 row-span-2  aspect-square lg:aspect-auto h-auto lg:mb-4',
    sm: 'aspect-square rounded-[0.5em]',
    long: 'col-span-2 aspect-[3/1] rounded-[0.5em]',
  },
};

type IOrientation = 'horizontal' | 'vertical';

const CarouselClient = ({
  items,
  size,
}: {
  items: IArticle[];
  size: 'lg' | 'sm' | 'long';
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
      <CarouselContent containerClassname="h-full" className="h-full">
        {items.map((car) => (
          <CarouselItem
            className="h-full relative overflow-hidden rounded-[0.5em]"
            key={car._id}
          >
            <Image
              src={car.image?.url}
              width={settings.width[size]}
              height={400}
              className="absolute h-full w-full  object-cover overflow-hidden rounded-[0.5em]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {size === 'long' && (
        <div className="h-4 w-full absolute left-0 bottom-0 bg-white" />
      )}
    </Carousel>
  );
};

export default CarouselClient;
