import { getKbArticlesByCode } from '@/sdk/queries/kb';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { IArticle } from '@/types/kb.types';
import Link from 'next/link';
import Image from '../ui/image';

const MainBanner = async () => {
  const { articles } = await getKbArticlesByCode('main-banner');

  if (!(articles || []).length) return <div className="mt-6 lg:mt-12" />;

  return (
    <div className="lg:container">
      <Carousel className=" mb-4 lg:mt-4 lg:mb-8">
        <CarouselContent className="ml-0">
          {articles.map((article) => (
            <BannerItem key={article._id} {...article} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-8 hidden lg:inline-flex" />
        <CarouselNext className="right-8 hidden lg:inline-flex" />
      </Carousel>
    </div>
  );
};

const BannerItem = ({ _id, image, summary, attachments }: IArticle) => {
  return (
    <CarouselItem className="flex-basis-[1] pl-0" key={_id}>
      <Link
        className="relative aspect-[4/5] lg:aspect-[13/5] lg:rounded-2xl overflow-hidden block"
        href={summary || '/'}
      >
        <Image
          src={image?.url}
          alt=""
          width={1536}
          height={600}
          className="absolute object-cover inset-0 object-center hidden lg:block"
          skipAnimation
        />
        <Image
          src={(attachments || [])[0]?.url || ''}
          alt=""
          width={1536}
          height={600}
          skipAnimation
          className="absolute object-cover inset-0 object-center lg:hidden"
        />
      </Link>
    </CarouselItem>
  );
};

export default MainBanner;
