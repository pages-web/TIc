'use client';
import { useCallback, useEffect, useState } from 'react';
import { Carousel, type CarouselApi, CarouselContent } from '../ui/carousel';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const CarouselCategoryCard = ({
  children,
  orders,
}: React.PropsWithChildren<{ orders: string[] }>) => {
  const order = useSearchParams().get('order');
  const [emblaMainApi, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (order) {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(orders.indexOf(order));
    }
  }, [order, emblaMainApi]);

  const updateScrollState = useCallback(() => {
    if (!emblaMainApi) return;
    setCanScrollPrev(emblaMainApi.canScrollPrev());
    setCanScrollNext(emblaMainApi.canScrollNext());
    setIsScrollable(emblaMainApi.scrollSnapList().length < orders.length);
  }, [emblaMainApi, orders.length]);

  useEffect(() => {
    if (!emblaMainApi) return;
    updateScrollState();
    emblaMainApi.on('select', updateScrollState);
    emblaMainApi.on('resize', updateScrollState);
  }, [emblaMainApi, updateScrollState]);

  return (
    <div className="relative">
      <Carousel
        className="mx-auto"
        opts={{
          dragFree: true,
        }}
        setApi={(ap) => setApi(ap)}
      >
        <CarouselContent className="-ml-6">{children}</CarouselContent>
      </Carousel>
      {isScrollable && (
        <>
          {canScrollPrev && (
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-7 p-2 rounded-full"
              onClick={() => emblaMainApi?.scrollTo(0)}
            >
              <ChevronLeft />
            </Button>
          )}
          {canScrollNext && (
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-7 p-2 rounded-full"
              onClick={() => emblaMainApi?.scrollTo(orders.length - 1)}
            >
              <ChevronRight />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default CarouselCategoryCard;
