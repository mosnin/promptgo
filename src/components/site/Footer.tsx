import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { categoriesWithPrompts, totalPromptCount } from "@/lib/prompts";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const LEGAL_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/tools", label: "Tools" },
  { href: "/skills", label: "Skills" },
  { href: "/ide-tools", label: "Builder Tools" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

/**
 * Sitewide footer. Every category and a deep sample of prompts are linked here,
 * which gives crawlers a complete, low depth path to the entire catalogue from
 * any page on the site.
 *
 * It sits in a band a shade darker than the page so the catalogue grid reads as
 * a separate surface rather than more page content, and the columns reveal on a
 * short stagger as it scrolls into view.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-hairline bg-[color-mix(in_oklch,var(--color-canvas)_92%,#000)]">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="shell relative py-16">
        {/* ---- Brand row ---------------------------------------------------- */}
        <Reveal blur={false} distance={14}>
          <div className="flex flex-col gap-6 border-b border-hairline pb-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-md">
              <Link href="/" className="flex items-center gap-2.5">
                <Wordmark />
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-ink-subtle">
                {totalPromptCount} free AI prompts, organised by the job you are doing rather than by the
                browser. Nothing is uploaded, nothing is stored and nothing costs anything.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {[
                { icon: "lock" as const, label: "Local processing" },
                { icon: "bolt" as const, label: "No signup" },
                { icon: "check" as const, label: "No file limits" },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-subtle"
                >
                  <Icon name={chip.icon} size={11} />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Catalogue grid ----------------------------------------------- */}
        <nav
          aria-label="Footer"
          className="mt-11 grid gap-x-6 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {categoriesWithPrompts.map((category, index) => (
            <Reveal
              key={category.slug}
              blur={false}
              distance={12}
              delay={(index % 5) * 0.05}
              className="min-w-0"
            >
              <Link
                href={`/${category.slug}`}
                className="group flex items-center gap-2 border-b border-hairline pb-2.5 text-[0.8125rem] font-semibold text-ink"
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: category.accent,
                    background: `color-mix(in oklch, ${category.accent} 14%, transparent)`,
                  }}
                >
                  <Icon name={category.icon} size={11} />
                </span>
                <span className="truncate">{category.name}</span>
              </Link>

              <ul className="mt-3 space-y-2">
                {category.prompts.slice(0, 6).map((prompt) => (
                  <li key={prompt.slug}>
                    <Link
                      href={prompt.href}
                      className="inline-block text-[0.8125rem] leading-snug text-ink-subtle transition-colors duration-200 hover:text-ink"
                    >
                      {prompt.name}
                    </Link>
                  </li>
                ))}
                {category.prompts.length > 6 && (
                  <li>
                    <Link
                      href={`/${category.slug}`}
                      className="group inline-flex items-center gap-1 text-[0.8125rem] font-medium text-signal-bright"
                    >
                      {category.prompts.length - 6} more
                      <Icon
                        name="arrow-right"
                        size={11}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                )}
                {category.prompts.length === 0 && (
                  <li className="text-[0.8125rem] text-ink-faint">Publishing soon</li>
                )}
              </ul>
            </Reveal>
          ))}
        </nav>

        {/* ---- Bottom bar --------------------------------------------------- */}
        <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
            © {year} {site.legalName}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.8125rem] text-ink-subtle transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
