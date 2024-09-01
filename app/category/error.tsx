'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-32 flex justify-center">
      <h2>Алдаа гарлаа.</h2>
      <p>{error.message}</p>
      <Button onClick={() => reset()}>Дахин оролдох</Button>
    </div>
  );
}
