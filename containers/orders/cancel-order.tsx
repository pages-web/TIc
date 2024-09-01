import { useDetail } from '@/components/order-detail/order-detail';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LoadingIcon } from '@/components/ui/loading';
import { useCancelOrder } from '@/sdk/hooks/order';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@/store/auth.store';

function CancelOrder() {
  const { _id, number } = useDetail();
  const { cancel, loading } = useCancelOrder();
  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="lg:h-12 px-0 flex-auto sm:flex-none sm:px-8"
        >
          Захиалга цуцлах
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Та {number} дугаартай энэ захиалгыг цуцлахдаа итгэлтэй байна уу?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Энэхүү захиалга бүр мөсөн устах бөгөөд дахин сэргээх боломжгүй болно
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Буцах</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              cancel({
                variables: { _id },
                onCompleted() {
                  toast.success(
                    `${number} дугаартай захиалга амжилттай цуцлагдлаа`
                  );
                  router.replace(
                    currentUser ? '/profile/orders?refetch=true' : '/'
                  );
                },
              })
            }
            disabled={loading}
          >
            {loading && <LoadingIcon />}
            Захиалга цуцлах
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default CancelOrder;
