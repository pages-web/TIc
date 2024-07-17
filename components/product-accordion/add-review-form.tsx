'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import Rate from '../ui/rate';
import { useAddReview } from '@/sdk/hooks/ecommerce';
import { LoadingIcon } from '../ui/loading';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@/store/auth.store';
import { toast } from 'sonner';

const FormSchema = z.object({
  description: z.string().min(2, {
    message: 'Comment must be at least 2 characters.',
  }),
  review: z.number().min(1, 'Review must be greater than or equal to 1').max(5),
});

export default function InputForm({ activeId }: { activeId: string }) {
  const customer = useAtomValue(currentUserAtom);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      review: 0,
      description: '',
    },
  });

  const { addReview, loading } = useAddReview();

  function onSubmit({ review, description }: z.infer<typeof FormSchema>) {
    if (!customer) {
      return toast.info('Эхлээд нэвтэрнэ үү');
    }
    addReview({
      variables: {
        productId: activeId,
        customerId: customer?.erxesCustomerId,
        review,
        description,
        info: {
          date: new Date(),
          name: `${customer?.firstName} ${customer?.lastName}`,
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 pb-8 px-1"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сэтгэгдэл</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-6">
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Rate
                    rateClassname="h-5 w-5"
                    rate={field.value}
                    onChange={(value) => field.onChange(value)}
                    className="pt-1.5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <LoadingIcon />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
