import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export interface Crumb {
  name: string;
  href: string;
}

/**
 * Visible breadcrumb trail. Mirrors the BreadcrumbList JSON-LD emitted on the
 * same page, which is what lets search results show the path rather than a raw
 * URL under the title.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem]">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <Icon
                  name="chevron-down"
                  size={12}
                  className="-rotate-90 text-ink-faint"
                  aria-hidden
                />
              )}
              {isLast ? (
                <span className="text-ink-subtle" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-ink-faint transition-colors duration-200 hover:text-ink"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
