'use client';
import { useProductReviews } from '@/sdk/queries/ecommerce.client';
import AddReviewForm from './add-review-form';
import { IReview } from '@/types/ecommerce.types';
import Rate from '../ui/rate';
import { Loading } from '../ui/loading';
import { format } from 'date-fns';

const Reviews = ({ ids, activeId }: { ids: string[]; activeId: string }) => {
  const { reviews, loading } = useProductReviews({
    variables: { productIds: ids },
  });

  if (loading) return <Loading className="py-8" />;
  return (
    <div>
      <AddReviewForm activeId={activeId} />
      <div className="space-y-4">
        {reviews.map((review: IReview) => (
          <div className="border p-6 rounded-lg" key={review._id}>
            <div className="flex gap-3 items-center">
              <Rate rate={review.review} />
              <div className="inline-flex  items-center justify-between flex-1 text-xs text-neutral-500">
                <span className="">
                  {format(new Date(review.info.date), 'yyyy/MM/dd')}
                </span>
                <span>{review.info.name}</span>
              </div>
            </div>
            <div className="text-sm mt-2">{review.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
