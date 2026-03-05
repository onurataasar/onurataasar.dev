export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <div className="animate-pulse space-y-8">
      <div className="space-y-4">
        <div className="h-10 w-3/4 bg-[var(--color-border)] rounded-lg" />
        <div className="h-4 w-1/4 bg-[var(--color-border)] rounded-lg" />
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-[var(--color-border)] rounded-full" />
          <div className="h-6 w-24 bg-[var(--color-border)] rounded-full" />
        </div>
      </div>
      <div className="h-[400px] bg-[var(--color-border)] rounded-lg" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-[var(--color-border)] rounded-lg" />
        <div className="h-4 w-5/6 bg-[var(--color-border)] rounded-lg" />
        <div className="h-4 w-4/6 bg-[var(--color-border)] rounded-lg" />
      </div>
    </div>
    </div>
  );
}
