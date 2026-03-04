export default function Loading() {
  return (
    <div className="animate-pulse space-y-8 max-w-3xl mx-auto">
      <div className="space-y-4">
        <div className="h-10 w-3/4 bg-[var(--color-bg-layer-2)] rounded-xl" />
        <div className="h-4 w-1/4 bg-[var(--color-bg-layer-2)] rounded-lg" />
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-[var(--color-bg-layer-2)] rounded-lg" />
        <div className="h-4 w-5/6 bg-[var(--color-bg-layer-2)] rounded-lg" />
        <div className="h-4 w-4/6 bg-[var(--color-bg-layer-2)] rounded-lg" />
      </div>
    </div>
  );
}
