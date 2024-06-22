import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-auto flex items-center justify-center flex-col">
      <h2 className="text-4xl font-semibold">404</h2>
      <p className="text-neutral-500 pt-2 pb-1">Энэ хуудас олдсонгүй</p>
      <Button asChild variant="link">
        <Link href="/">Эхлэл рүү буцах </Link>
      </Button>
    </div>
  );
}
