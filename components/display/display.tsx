import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

const items = [
  {
    image: '/images/display-1.png',
    title: 'Fresh and Bold',
    subtitle: 'New collection',
    description: 'Add a pop up color to your outfit',
    buttonText: 'Discover now',
    reverse: true,
    backgroundColor: 'bg-secondary-200',
    buttonLink: '/category',
    titleClass: 'lg:typography-headline-2',
    subtitleClass: 'lg:typography-headline-6',
  },
  {
    image: '/images/display-2.png',
    title: 'Sunny Days Ahead',
    subtitle: 'Be inspired',
    description: 'Step out in style with our sunglasses collection',
    buttonText: 'Discover now',
    reverse: true,
    backgroundColor: 'bg-negative-200',
    buttonLink: '/category',
  },
  {
    image: '/images/display-3.png',
    title: 'Gear up and get ready',
    subtitle: 'Be active',
    description: 'Explore the great outdoors with our backpacks',
    buttonText: 'Discover now',
    reverse: true,
    backgroundColor: 'bg-warning-200',
    buttonLink: '/category',
  },
];

export type DisplayProps = {
  //   items: {
  //     image: string;
  //     title: string;
  //     subtitle: string;
  //     description: string;
  //     buttonText: string;
  //     reverse: boolean;
  //     titleClass: string;
  //     subtitleClass: string;
  //   }[];
};
const Display = ({ ...attributes }: DisplayProps) => {
  return (
    <div
      className="flex flex-col lg:flex-row flex-wrap gap-6 container mb-10"
      data-testid="display"
      {...attributes}
    >
      {items.map(
        ({
          image,
          title,
          subtitle,
          description,
          buttonText,
          reverse,
          titleClass,
          subtitleClass,
        }) => (
          <div
            key={title}
            className="relative flex lg:[&:not(:first-of-type)]:flex-1 lg:first-of-type:w-full first:bg-indigo-200 last:bg-rose-200 even:bg-amber-200 rounded-2xl overflow-hidden"
          >
            <div
              className={cn('flex overflow-hidden grow flex-col', {
                'flex-col-reverse': reverse,
                'lg:flex-row-reverse': reverse,
              })}
            >
              <div className="flex flex-1 flex-col justify-center items-center lg:items-start p-6 lg:p-10 max-w-1/2">
                <p
                  className={cn(
                    'uppercase text-xs block font-bold tracking-widest',
                    subtitleClass
                  )}
                >
                  {subtitle}
                </p>
                <h2 className={cn('mb-4 mt-2 font-bold text-2xl', titleClass)}>
                  {title}
                </h2>
                <p className="text-base block text-center lg:text-left mb-4">
                  {description}
                </p>
                <Button className="bg-primary" asChild>
                  <Link href="/category">{buttonText}</Link>
                </Button>
              </div>
              <Image
                src={image}
                alt={title}
                className="w-full lg:w-1/2 lg:max-w-lg self-end object-contain flex-1"
                height={400}
                width={400}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Display;
