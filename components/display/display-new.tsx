import { Heading } from '../heading/heading';
import DisplayItem from './display-item';
import { kbCategoryDetail } from '@/sdk/queries/kb';

const DisplayNew = async () => {
  const { category } = await kbCategoryDetail({
    variables: {
      _id: 'display',
    },
  });

  if (!category) return null;

  return (
    <>
      <Heading
        title={category.title || ''}
        className={category.description ? 'mb-0 lg:mb-1' : 'lg:mb-8'}
      />
      {!!category.description && (
        <div className="lg:text-lg mb-4 lg:mb-6 text-neutral-500 container text-center">
          {category.description}
        </div>
      )}
      <div className="space-y-4 lg:space-y-0 lg:gap-4 lg:grid grid-cols-3 container mb-8 lg:mb-12">
        {category.articles.map((article) => (
          <DisplayItem key={article._id} {...(article || {})} />
        ))}
      </div>
    </>
  );
};

export default DisplayNew;
