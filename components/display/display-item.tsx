import { IArticle } from '@/types/kb.types';
import { Button } from '../ui/button';
import Image from '../ui/image';
import Link from 'next/link';

const DisplayItem = ({ image, title, content, summary }: IArticle) => {
  return (
    <>
      <div className="overflow-hidden rounded-lg lg:rounded-2xl bg-neutral-100">
        <div className="relative aspect-square">
          <Image
            src={image?.url}
            width={480}
            height={480}
            className="absolute h-full w-full inset-0"
            skipAnimation
          />
        </div>
        <div className="p-8 pt-4 text-center">
          <h2 className="font-bold text-xl mb-2 line-clamp-1">{title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="[&_*]:!font-sans line-clamp-2 leading-snug [&_*]:!text-neutral-600"
          />
          <Button className="mt-3" variant="outline" size="lg" asChild>
            <Link href={summary || '/'}>Одоо үзэх</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default DisplayItem;
