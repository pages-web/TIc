import { getKbArticlesByCode } from '@/sdk/queries/kb';
import { Suspense } from 'react';
import CarouselClient from './carousel';

const GridBanner = async () => {
  const { articles } = await getKbArticlesByCode('big-banner');
  if (!articles.length) return null;
  return (
    <div className="container grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-10">
      <Suspense>
        <BigBanners />
        <SmallBanners />
        <LongBanners />
      </Suspense>
    </div>
  );
};

const BigBanners = async () => {
  const { articles } = await getKbArticlesByCode('big-banner');
  if (!articles.length) return null;
  return <CarouselClient size="lg" items={articles} />;
};

const LongBanners = async () => {
  const { articles } = await getKbArticlesByCode('long-banner');
  if (!articles.length) return null;
  return <CarouselClient size="long" items={articles} />;
};

const SmallBanners = async () => {
  const { articles } = await getKbArticlesByCode('small-banner');
  if (!articles.length) return null;
  return (
    <>
      <CarouselClient
        size="sm"
        items={articles.filter((_, i) => i % 2 === 0)}
      />
      <CarouselClient
        size="sm"
        items={articles.filter((_, i) => i % 2 !== 0)}
      />
    </>
  );
};

export default GridBanner;
