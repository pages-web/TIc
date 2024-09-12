'use client';

import Image from '../ui/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { memo, useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { IAttachment } from '@/types';

const Gallery = ({ attachments = [] }: { attachments: IAttachment[] }) => {
  const [emblaMainApi, setApi] = useState<CarouselApi>();
  const [emblaThumbsApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex flex-row-reverse gap-6 justify-stretch">
      <Carousel className="flex-1" setApi={(ap) => setApi(ap)}>
        <CarouselContent className="ml-0">
          {attachments.map((attachment) => (
            <CarouselItem
              className="relative aspect-square pl-0"
              key={attachment?.url}
            >
              <Image
                src={attachment?.url || ''}
                height={1024}
                width={1024}
                quality={100}
                alt=""
                className="absolute inset-0 h-full w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        orientation="vertical"
        className={cn(
          'w-28 hidden lg:block',
          attachments.length === 1 && 'lg:hidden'
        )}
        opts={{ containScroll: 'keepSnaps', dragFree: true }}
        setApi={(ap) => setThumbApi(ap)}
      >
        <CarouselContent className="basis-[5rem] xl:max-h-[600px] mt-0">
          {attachments.map((item, index) => (
            <CarouselItem
              className={cn(
                'w-28 h-28 border-2 transition-colors pt-0 rounded-xl overflow-hidden p-0 aspect-square',
                selectedIndex === index
                  ? 'border-primary'
                  : 'border-transparent'
              )}
              key={item?.url}
              onClick={() => onThumbClick(index)}
            >
              <Image
                src={item?.url || ''}
                height={164}
                width={164}
                alt=""
                className="h-full w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default memo(Gallery);
