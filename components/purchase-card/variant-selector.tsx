'use client';
import { IProductDetail, ProductFields } from '@/types/products.types';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Label } from '../ui/label';
import { getActiveProduct } from '@/lib/product';

const VariantSelector = ({
  fields,
  products,
}: {
  fields: ProductFields;
  products: IProductDetail[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let params = {};
  Object.keys(fields).map((field) => {
    const param = searchParams.get(field);
    if (param) {
      params = { ...params, [field]: param };
    }
  });
  const { product } = getActiveProduct({ products, searchParams: params });

  return (
    <>
      {Object.values(fields).map((field) => {
        const optionNameLowerCase = field.fieldId;

        // Base option params on current params so we can preserve any other param state in the url.
        const optionSearchParams = new URLSearchParams(searchParams.toString());

        // Update the option params using the current option to reflect how the url *would* change,
        // if the option was clicked.
        const onValueChange = (value: string) => {
          optionSearchParams.set(optionNameLowerCase, value);
          return router.replace(createUrl(pathname, optionSearchParams), {
            scroll: false,
          });
        };

        const value =
          product[field.fieldId as keyof IProductDetail]?.toString();

        return (
          <div className="space-y-1" key={field.fieldId}>
            <Label>{field.title}</Label>
            <RadioGroup
              className="flex flex-wrap gap-2"
              value={value}
              onValueChange={onValueChange}
            >
              {field.variants.map((f) => {
                const val = f.toString();
                return (
                  <div key={val} className="relative">
                    <Button asChild variant="outline">
                      <div>
                        <RadioGroupItem
                          value={val}
                          id={val}
                          className="hidden"
                        />
                        {val}
                        <label
                          htmlFor={val}
                          className={cn(
                            'absolute inset-0 rounded-md',
                            val === value && 'border-2 border-primary'
                          )}
                        />
                      </div>
                    </Button>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        );
      })}
    </>
  );
};

export default VariantSelector;

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};
