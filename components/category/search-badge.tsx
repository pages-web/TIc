'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';
import Link from 'next/link';

const SearchBadge = () => {
  const q = useSearchParams().get('q');

  if (!q) return null;

  return (
    <Button
      variant="outline"
      className="font-normal text-sm py-2 px-3 mx-2"
      asChild
    >
      <Link href="/category">
        Хайлт: {q}
        <XIcon className="h-5 w-5 ml-1.5" strokeWidth={1.5} />
      </Link>
    </Button>
  );
};

export default SearchBadge;
