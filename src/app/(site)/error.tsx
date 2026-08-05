"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/states/ErrorState";

export default function Error({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="This page could not be loaded"
      description="An unexpected error occurred. You can try again or return to the homepage."
      onRetry={unstable_retry ?? reset}
    />
  );
}
