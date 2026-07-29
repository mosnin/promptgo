import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { categoriesWithPrompts } from "@/lib/prompts";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="glow pointer-events-none absolute inset-x-0 -top-32 h-96" aria-hidden />

      <div className="shell relative py-24 sm:py-32">
        <Reveal>
          <p className="eyebrow">Error 404</p>
          <h1 className="headline mt-4 max-w-2xl text-ink">
            That page is not part of the catalogue
          </h1>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-muted">
            The prompt you were looking for may have moved or may never have existed. Everything
            that does exist is one click away below.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/explore" size="lg">
              Explore all prompts
              <Icon name="arrow-right" size={16} />
            </ButtonLink>
            <ButtonLink href="/" size="lg" variant="outline">
              Back to home
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesWithPrompts.map((category) => (
              <div key={category.slug}>
                <Link
                  href={`/${category.slug}`}
                  className="flex items-center gap-2 text-[0.875rem] font-semibold text-ink"
                >
                  <span style={{ color: category.accent }}>
                    <Icon name={category.icon} size={14} />
                  </span>
                  {category.name}
                </Link>
                <ul className="mt-3 space-y-1.5 border-l border-hairline pl-4">
                  {category.prompts.slice(0, 5).map((prompt) => (
                    <li key={prompt.slug}>
                      <Link
                        href={prompt.href}
                        className="text-[0.8125rem] text-ink-subtle transition-colors hover:text-ink"
                      >
                        {prompt.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
