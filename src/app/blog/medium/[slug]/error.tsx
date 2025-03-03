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
    console.error("Medium post error:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        {error.message || "Failed to load the Medium post"}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
