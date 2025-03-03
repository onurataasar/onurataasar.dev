export default function Loading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="space-y-4">
        <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>
      </div>
      <div className="h-[400px] bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-4/6 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      </div>
    </div>
  );
}
