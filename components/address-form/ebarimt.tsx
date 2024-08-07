import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { formSchema } from './address-form';
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { billTypeAtom } from '@/store/order.store';
import { useCheckRegister } from '@/sdk/queries/order';
import { LoadingIcon } from '../ui/loading';

const Ebarimt = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
}) => {
  const billType = useAtomValue(billTypeAtom);
  const [isOrg, changeIsOrg] = useState(billType === '3');
  const [registerNumber, setRegisterNumber] = useState('');
  const { checkRegister, loading } = useCheckRegister((name) =>
    form.setValue('companyName', name)
  );

  useEffect(() => {
    form.setValue('companyName', '');
    if ((registerNumber || '').length > 6) {
      checkRegister({ variables: { registerNumber } });
    }
  }, [registerNumber]);

  return (
    <>
      <h2 className="col-span-6 text-lg font-bold">И-баримт авах</h2>
      <FormField
        control={form.control}
        name="billType"
        render={({ field }) => (
          <FormItem className="space-y-3 col-span-6">
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  changeIsOrg(value === '3' ? true : false);
                }}
                defaultValue={field.value}
                className="grid grid-cols-2 lg:grid-cols-3"
              >
                <FormItem className="flex items-center space-x-3 space-y-0 ">
                  <FormControl>
                    <RadioGroupItem value="1" />
                  </FormControl>
                  <FormLabel className="font-medium">Хувь хүн</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="3" />
                  </FormControl>
                  <FormLabel className="font-medium">Байгуулга</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isOrg && (
        <>
          <FormField
            control={form.control}
            name="registerNumber"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Регистерийн дугаар</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Регистерийн дугаараа оруулна уу"
                    {...field}
                    onChange={(e) => {
                      setRegisterNumber(e.target.value);
                      field.onChange(e.target.value);
                    }}
                    autoComplete="false"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            rules={{ required: 'Регистерийн дугаар оруулна уу' }}
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel className="opacity-50">Байгууллагын нэр</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Байгууллагын нэр"
                      autoComplete="false"
                      disabled
                      {...field}
                      className="pr-8"
                    />
                  </FormControl>
                  {loading && (
                    <LoadingIcon className="absolute top-2.5 right-1" />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      <div className="col-span-6" />
      <Separator className="col-span-6" />
    </>
  );
};

export default Ebarimt;
