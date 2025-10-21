import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { formSchema } from './address-form';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Toggle } from '../ui/toggle';

const AddressInfo = ({
  form
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) => {
  return (
    <>
      <h2 className="col-span-6 text-lg font-bold">Хүргэлтийн хаяг</h2>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Хот</FormLabel>
            <FormControl>
              <Input
                placeholder="Хот/Аймаг сонгоно уу"
                {...field}
                autoComplete="address-level1"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Дүүрэг</FormLabel>
            <FormControl>
              <Input
                placeholder="Дүүрэг сонгоно уу"
                {...field}
                autoComplete="address-level2"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Хороо</FormLabel>
            <FormControl>
              <Input
                placeholder="Хороо/Баг сонгоно уу"
                {...field}
                autoComplete="address-level3"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="detail"
        render={({ field }) => (
          <FormItem className="col-span-6">
            <FormLabel>Дэлгэрэнгүй хаяг</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Та хаягаа зөв дэлгэрэнгүй, тодорхой оруулаагүйгээс үүдэн хүргэлт удаашрах, эсвэл хүргэгдэхгүй байж болзошгүйг анхаарна уу"
                {...field}
                autoComplete="address-level4"
                className="min-h-20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div />
      <Separator className="col-span-6" />
      <h2 className="col-span-6 text-lg font-bold">Нэмэлт Анхааруулга</h2>
      <FormField
        control={form.control}
        name="haveBaby"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormControl>
              <Toggle
                variant="outline"
                size={'lg'}
                className="w-full text-sm"
                pressed={field.value}
                onPressedChange={pressed => field.onChange(pressed)}
              >
                Нялх хүүхэдтэй
              </Toggle>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="callBefore"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormControl>
              <Toggle
                variant="outline"
                size={'lg'}
                className="w-full text-sm"
                pressed={field.value}
                onPressedChange={pressed => field.onChange(pressed)}
              >
                Хүргэхийн өмнө заавал залгах
              </Toggle>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="onlyAfternoon"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormControl>
              <Toggle
                variant="outline"
                size={'lg'}
                className="w-full text-sm"
                pressed={field.value}
                onPressedChange={pressed => field.onChange(pressed)}
              >
                Зөвхөн оройн цагаар хүргэх
              </Toggle>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AddressInfo;
