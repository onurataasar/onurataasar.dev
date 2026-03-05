"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog post error:", error);
  }, [error]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 min-h-[400px] flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-[var(--color-text-muted)]">
        {error.message || "Failed to load the blog post"}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg gradient-bg text-white hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
