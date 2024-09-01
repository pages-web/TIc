import { Badge } from '@/components/ui/badge';
import { getConfig } from '@/sdk/queries/auth';

const Remainder = async ({ remainder }: { remainder?: number | null }) => {
  const { config } = await getConfig();
  const { isCheckRemainder } = config;

  if (!isCheckRemainder) return null;

  return (
    <div className="flex items-center pt-2">
      {remainder ? (
        <>
          Таны сонгосон бараа агуулахад:
          <Badge className="mx-2 bg-green-700">{remainder || 0}ш</Badge> байна.
        </>
      ) : (
        <>Таны сонгосон бараа агуулахад дууссан байна.</>
      )}
    </div>
  );
};

export default Remainder;
