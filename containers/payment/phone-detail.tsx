import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { LoadingIcon } from '@/components/ui/loading';
import { phoneZod } from '@/lib/zod';
import { currentUserAtom } from '@/store/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { InfoIcon, CheckCircle2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BackButton from './back-button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const formSchema = z.object({
  phone: phoneZod,
});

const PhoneDetail = ({
  kind,
  loading,
  handleCreate,
  errorDescription,
  data,
}: {
  kind?: string;
  loading: boolean;
  handleCreate: (values: { phone: string }) => void;
  errorDescription?: string;
  data: {
    apiResponse: {
      error?: string;
      text?: string;
    };
  };
}) => {
  const { phone } = useAtomValue(currentUserAtom) || {};
  const { error, text } = data?.apiResponse || {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      phone: phone || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleCreate(values);
  }

  if (!error && !errorDescription && text)
    return (
      <div className="py-6 flex flex-col items-center gap-4">
        <CheckCircle2Icon className="h-14 w-14 text-green-500 animate-bounce" />
        <Alert variant="default">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Төлбөрийн нэхэмжлэхийг {kind} -рүү илгээсэн тул та эхний төлөлтөө
            хийж захиалгаа баталгаажуулна уу.
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-12 flex justify-center">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={8}
                    render={({ slots }) => (
                      <>
                        <InputOTPGroup>
                          {slots.slice(0, 4).map((slot, index) => (
                            <InputOTPSlot
                              key={index}
                              {...slot}
                              className="ring-0"
                            />
                          ))}
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          {slots.slice(4).map((slot, index) => (
                            <InputOTPSlot
                              key={index}
                              {...slot}
                              className="ring-0"
                            />
                          ))}
                        </InputOTPGroup>
                      </>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error || errorDescription ? (
          <Alert variant="destructive">
            <InfoIcon className="h-4 w-4 rotate-180" />
            <AlertTitle>Алдаа гарлаа</AlertTitle>
            <AlertDescription className="text-xs">
              {error || errorDescription}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="warning">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Та <span className="capitalize">{kind}</span>-д бүртгэлтэй утасны
              дугаараа оруулан хүсэлт илгээн үүссэн нэхэмжлэхийн дагуу худалдан
              авалтаа баталгаажуулснаар бараа бүтээгдэхүүн, үйлчилгээгээ авах
              боломжтой.
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter className="sm:justify-center gap-2 pt-4 block lg:flex space-y-2 lg:space-y-0">
          <BackButton disabled={loading} />
          <Button size="lg" className="flex-1 w-full" disabled={loading}>
            {loading && <LoadingIcon />} Хүсэлт илгээх
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PhoneDetail;
