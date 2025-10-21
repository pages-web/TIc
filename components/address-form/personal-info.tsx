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

const PersonalInfo = ({
  form
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) => {
  return (
    <>
      <h2 className="col-span-6 text-lg font-bold">Захиалагчийн мэдээлэл</h2>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>Нэр</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} autoComplete="given-name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>Овог</FormLabel>
            <FormControl>
              <Input placeholder="Doe" {...field} autoComplete="family-name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>Утасны дугаар</FormLabel>
            <FormControl>
              <Input
                placeholder="0000 0000"
                {...field}
                autoComplete="tel-local"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>И-Мэйл хаяг</FormLabel>
            <FormControl>
              <Input
                placeholder="john@doe.com"
                {...field}
                autoComplete="email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div />
      <Separator className="col-span-6" />
    </>
  );
};

export default PersonalInfo;
