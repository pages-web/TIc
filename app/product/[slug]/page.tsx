import { BreadcrumbsLayout } from '@/app/breadcrumbs-layout';
import { type Breadcrumb } from '@/components/breadcrumb/breadcrumb';
import Gallery from '@/components/gallery/gallery';
import ProductAccordion from '@/components/product-accordion/product-accordion';
import PurchaseCard from '@/components/purchase-card/purchase-card';
import RecommendedProducts from '@/components/recommended-products/recommended-products';
import { Separator } from '@/components/ui/separator';
import {
  getBreadcrumbs,
  getCategories,
  getProductDetail,
  getProductSimilarities,
} from '@/sdk/queries/products';
import { IPageProps } from '@/types';
import { IAttachment } from '@/types';
import { Metadata } from 'next/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getActiveProduct } from '@/lib/product';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { product } = await getProductDetail({
    variables: { _id: params.slug },
  });

  if (!product) return notFound();

  const { attachment, description, name } = product || {};

  return {
    title: name,
    description: description || '',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: attachment?.url
      ? {
          images: [
            {
              url: attachment?.url,
              width: 400,
              height: 400,
              alt: name,
            },
          ],
        }
      : null,
  };
}

const Product = async ({ params, searchParams }: IPageProps) => {
  const { products } = await getProductSimilarities({
    variables: { id: params.slug, groupedSimilarity: 'config' },
  });

  if (!products.length) return notFound();
  const { product } = getActiveProduct({ products, searchParams }) || {};

  const productIds = products.map((prod) => prod._id);
  const {
    attachment,
    attachmentMore,
    description,
    _id,
    category,
    name,
    remainder,
    unitPrice,
  } = product;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: attachment?.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: remainder
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'MNT',
      highPrice: unitPrice,
      lowPrice: unitPrice,
    },
  };

  const { categories } = await getCategories();

  const breadcrumbs: Breadcrumb[] = [
    { name: 'Эхлэл', link: '/' },
    { name: 'Дэлгүүр', link: '/category' },
  ];

  const dynamicBreadcrumbs = getBreadcrumbs(category?.order || '', categories);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <BreadcrumbsLayout
        breadcrumbs={breadcrumbs
          .concat(dynamicBreadcrumbs)
          .concat([{ name, link: `/product/${_id}` }])}
      >
        <div
          className="lg:grid gap-x-6"
          style={{
            gridTemplateAreas: `"left-top right"
          "left-bottom right"`,
            gridTemplateColumns: `minmax(50%, 500px) auto`,
          }}
        >
          <section className="lg:h-full " style={{ gridArea: `left-top` }}>
            <Gallery
              attachments={(attachmentMore || []).concat([
                attachment as IAttachment,
              ])}
            />
          </section>
          <section
            className="mb-10 lg:mb-0 py-5 "
            style={{ gridArea: `right` }}
          >
            <PurchaseCard {...product} />
          </section>
          <section className="lg:mt-8" style={{ gridArea: `left-bottom` }}>
            <Separator />
            <ProductAccordion
              activeId={_id}
              description={description || 'empty'}
              ids={productIds}
            />
          </section>
        </div>
        <div className="mt-28 mb-20">
          <div className="my-4 text-lg">Танд санал болгох</div>
          <Suspense>
            <RecommendedProducts categoryId={category?._id} productId={_id} />
          </Suspense>
        </div>
      </BreadcrumbsLayout>
    </>
  );
};

export default Product;
