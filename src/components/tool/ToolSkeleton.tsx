/**
 * Placeholder shown while a tool's client bundle loads. Matches the real panel
 * dimensions so there is no layout shift when the interface swaps in.
 */
export function ToolSkeleton() {
  return (
    <div className="panel p-5 sm:p-7" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the tool interface</span>
      <div className="h-[9.5rem] animate-pulse rounded-md border border-dashed border-hairline bg-surface-2/40" />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="h-10 animate-pulse rounded-xs bg-surface-2" />
        <div className="h-10 animate-pulse rounded-xs bg-surface-2" />
      </div>
      <div className="mt-6 h-11 w-40 animate-pulse rounded-xs bg-surface-2" />
    </div>
  );
}
