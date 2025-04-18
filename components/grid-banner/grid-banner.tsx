import { getKbArticlesByCode } from "@/sdk/queries/kb";
import { Suspense } from "react";
import CarouselClient from "./carousel";

const GridBanner = async () => {
  const { articles } = await getKbArticlesByCode("main-banner");
  if (!articles.length) return null;
  return (
    <div className="block lg:grid-cols-4 gap-2 lg:gap-4">
      <Suspense>
        <BigBanners />
      </Suspense>
    </div>
  );
};

const BigBanners = async () => {
  const { articles } = await getKbArticlesByCode("main-banner");
  if (!articles.length) return null;
  return <CarouselClient size="lg" items={articles} />;
};

export default GridBanner;
