"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Plain form so search still works without JavaScript, enhanced with routing. */
export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();

  return (
    <form
      action="/search"
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/search?q=${encodeURIComponent(value.trim())}`);
      }}
      className="flex items-center gap-2 rounded-md border border-hairline bg-surface-2 pl-3.5 pr-1.5 transition-colors duration-200 focus-within:border-signal"
    >
      <Icon name="search" size={17} className="shrink-0 text-ink-faint" />
      <input
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="png to jpg, compress pdf, decode jwt"
        aria-label="Search prompts"
        autoComplete="off"
        className="h-12 w-full bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-faint"
      />
      <button
        type="submit"
        className="h-9 shrink-0 rounded-full bg-signal px-4 text-[0.8125rem] font-medium text-signal-ink transition-colors hover:bg-signal-bright"
      >
        Search
      </button>
    </form>
  );
}
