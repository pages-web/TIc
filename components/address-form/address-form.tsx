'use client';

import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import OrderSummary from '../order-summary/order-summary';
import { Button } from '../ui/button';
import { currentUserAtom } from '@/store/auth.store';
import { useAtom, useAtomValue } from 'jotai';
import {
  billTypeAtom,
  deliveryInfoAtom,
  registerNumberAtom,
} from '@/store/order.store';
import { changeDeliveryInfoAtom } from '@/store/order.store';
import { LoadingIcon } from '../ui/loading';
import { useRouter } from 'next/navigation';
import { phoneZod } from '@/lib/zod';
import PersonalInfo from './personal-info';
import Ebarimt from './ebarimt';
import AddressInfo from './address-info';

export const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string(),
    email: z.string().email().min(1, { message: 'Email is required' }),
    phone: phoneZod,
    city: z.string().min(1, { message: 'City is required' }),
    district: z.string().min(1, { message: 'District is required' }),
    street: z.string().min(1, { message: 'Street is required' }),
    detail: z.string().min(1, { message: 'Detailed address is required' }),
    haveBaby: z.boolean(),
    callBefore: z.boolean(),
    onlyAfternoon: z.boolean(),
    billType: z.enum(['1', '3', '9'], {
      required_error: 'You need to select a notification type.',
    }),
    registerNumber: z.string().optional(),
    companyName: z.string().optional(),
  })
  .refine((data) => (data.billType === '3' ? !!data.registerNumber : true), {
    message: 'Register number is required',
    path: ['registerNumber'], // path of error
  })
  .refine(
    (data) =>
      data.billType === '3' && data.registerNumber ? !!data.companyName : true,
    {
      message: 'Register number is incorrect',
      path: ['companyName'], // path of error
    }
  );

const AddressForm = () => {
  const {
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
  } = useAtomValue(currentUserAtom) || {};
  const deliveryInfo = useAtomValue(deliveryInfoAtom);
  const billType = useAtomValue(billTypeAtom);
  const registerNumber = useAtomValue(registerNumberAtom);
  const [loading, changeDeliveryInfo] = useAtom(changeDeliveryInfoAtom);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      firstName,
      lastName,
      email,
      phone,
      city: '',
      district: '',
      street: '',
      detail: '',
      haveBaby: false,
      callBefore: false,
      onlyAfternoon: false,
      billType: billType || '1',
      registerNumber: registerNumber || '',
      ...deliveryInfo,
    },
  });

  function onSubmit(v: z.infer<typeof formSchema>) {
    changeDeliveryInfo(v);
    router.push('/verify');
  }

  return (
    <Form {...form}>
      <form
        className="lg:grid lg:grid-cols-12 lg:gap-x-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="col-span-7">
          <div className="lg:grid grid-cols-6 mb-10 lg:mb-0 space-y-4 lg:space-y-0 gap-x-4 gap-y-3 ">
            <PersonalInfo form={form} />
            <Ebarimt form={form} />
            <AddressInfo form={form} />
          </div>
        </div>
        <OrderSummary className="col-span-5 lg:sticky lg:top-20 h-fit">
          <Button className="w-full" size="lg" disabled={loading}>
            {loading && <LoadingIcon />}
            Үргэлжлүүлэх
          </Button>
        </OrderSummary>
      </form>
    </Form>
  );
};

export default AddressForm;
