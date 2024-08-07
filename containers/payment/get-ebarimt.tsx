import { useDetail } from '@/components/order-detail/order-detail';
import Price from '@/components/price/price';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const GetEbarimt = () => {
  const { putResponses } = useDetail();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">И-Баримт авах</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-semibold flex justify-between items-start flex-row">
          И-Баримт
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="-translate-y-2">
              <XIcon className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
        {putResponses.map((pt) => (
          <>
            <div className="p-4">
              <div className="relative aspect-square mx-auto max-w-80">
                <div className="border rounded-lg absolute inset-0"></div>
                <div className="w-full h-full bg-background rounded-3xl absolute inset-0">
                  <QRCodeSVG
                    value={pt.qrData || ''}
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-64 h-64"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 text-sm gap-2 pb-4">
              <div className="col-span-6 lg:col-span-4">
                <div className="text-foreground/60 text-xs leading-5">ДДТД</div>
                <div className="font-medium leading-snug">{pt.id}</div>
              </div>
              <div className="col-span-3 lg:col-span-2">
                <div className="text-foreground/60">Харилцагч</div>
                <div className="font-medium leading-snug">
                  {pt.customerName || pt.customerTin}
                </div>
              </div>

              <div className="col-span-3 lg:col-span-4">
                <div className="text-foreground/60">Сугалааны дугаар</div>
                <div className="font-medium leading-snug">{pt.lottery}</div>
              </div>
              <div className="col-span-4 lg:col-span-2">
                <div className="text-foreground/60">Бүртгүүлэх дүн</div>
                <div className="font-medium leading-snug">
                  <Price amount={pt.totalAmount || 0} />
                </div>
              </div>
            </div>
          </>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default GetEbarimt;
