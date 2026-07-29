import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/tool/Breadcrumbs";

/**
 * Shared layout for the supporting pages an ad network expects a publisher to
 * have: about, privacy and terms.
 */
export function ProsePage({
  title,
  intro,
  path,
  updated,
  children,
}: {
  title: string;
  intro: string;
  path: string;
  updated?: string;
  children: ReactNode;
}) {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: title, href: path },
  ];

  return (
    <>
      <div className="relative overflow-hidden border-b border-hairline">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="shell relative py-12 sm:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <Reveal>
            <h1 className="headline mt-6 max-w-3xl text-ink">{title}</h1>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
              {intro}
            </p>
            {updated && (
              <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
                Last updated {updated}
              </p>
            )}
          </Reveal>
        </div>
      </div>

      <div className="shell py-12 pb-20">
        <article className="prose-tool max-w-3xl">{children}</article>
      </div>
    </>
  );
}
