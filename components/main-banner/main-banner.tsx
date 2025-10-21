import { getKbArticlesByCode } from "@/sdk/queries/kb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { IArticle } from "@/types/kb.types";
import Link from "next/link";
import Image from "../ui/image";

const MainBanner = async () => {
  const { articles } = await getKbArticlesByCode("main-banner");

  if (!(articles || []).length) return <div className="mt-6 lg:mt-12" />;

  return (
    <div className="lg:container">
      <Carousel className="mb-4 lg:mt-4 lg:mb-8">
        {/* ✅ зургуудын хооронд 24px (gap-6) зай */}
        <CarouselContent className="ml-0 gap-x-6">
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
    <CarouselItem className="pl-0" key={_id}>
      <Link
        className="relative aspect-[4/5] lg:aspect-[14/5] lg:rounded-2xl overflow-hidden block"
        href={summary || "/"}
      >
        {/* Desktop image */}
        <Image
          src={image?.url}
          alt=""
          width={1536}
          height={400}
          className="absolute object-cover inset-0 object-center hidden lg:block"
          skipAnimation
        />
        {/* Mobile image */}
        <Image
          src={(attachments || [])[0]?.url || ""}
          alt=""
          width={1536}
          height={400}
          skipAnimation
          className="absolute object-cover inset-0 object-center lg:hidden"
        />
      </Link>
    </CarouselItem>
  );
};

export default MainBanner;
