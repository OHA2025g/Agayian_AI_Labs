import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Section } from "@/components/layout/Section";
import { themeClass } from "@/lib/cms-presets";
import { cn } from "@/lib/utils";

type Block = {
  blockType: string;
  [key: string]: unknown;
};

export function BlockRenderer({ blocks }: { blocks?: Block[] | null }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.blockType}-${index}`;
        const theme = themeClass(
          typeof block.sectionTheme === "string" ? block.sectionTheme : "dark",
        );
        switch (block.blockType) {
          case "hero":
            return (
              <Section
                key={key}
                className={cn(theme)}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                description={String(block.description ?? "")}
                cta={
                  <div className="flex flex-wrap gap-3">
                    {block.primaryCtaHref ? (
                      <PrimaryButton href={String(block.primaryCtaHref)}>
                        {String(block.primaryCtaLabel ?? "Learn more")}
                      </PrimaryButton>
                    ) : null}
                    {block.secondaryCtaHref ? (
                      <SecondaryButton href={String(block.secondaryCtaHref)}>
                        {String(block.secondaryCtaLabel ?? "Explore")}
                      </SecondaryButton>
                    ) : null}
                  </div>
                }
              >
                {null}
              </Section>
            );
          case "cta":
            return (
              <Section
                key={key}
                title={String(block.title ?? "")}
                description={String(block.description ?? "")}
                cta={
                  <div className="flex flex-wrap gap-3">
                    {block.primaryHref ? (
                      <PrimaryButton href={String(block.primaryHref)}>
                        {String(block.primaryLabel ?? "Continue")}
                      </PrimaryButton>
                    ) : null}
                    {block.secondaryHref ? (
                      <SecondaryButton href={String(block.secondaryHref)}>
                        {String(block.secondaryLabel ?? "Learn more")}
                      </SecondaryButton>
                    ) : null}
                  </div>
                }
              >
                {null}
              </Section>
            );
          case "cardGrid":
            return (
              <Section
                key={key}
                eyebrow={String(block.eyebrow ?? "")}
                title={String(block.title ?? "")}
                description={String(block.description ?? "")}
              >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {Array.isArray(block.cards)
                    ? block.cards.map((card) => {
                        const item = card as {
                          title?: string;
                          body?: string;
                          href?: string;
                        };
                        return (
                          <article
                            key={item.title}
                            className="rounded-xl border border-white/10 bg-bg-elevated/40 p-5"
                          >
                            <h3 className="font-heading text-lg font-semibold">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-dark">
                              {item.body}
                            </p>
                            {item.href ? (
                              <Link
                                href={item.href}
                                className="mt-4 inline-flex text-sm font-semibold text-cyan"
                              >
                                View →
                              </Link>
                            ) : null}
                          </article>
                        );
                      })
                    : null}
                </div>
              </Section>
            );
          case "timeline":
            return (
              <Section key={key} title={String(block.title ?? "Timeline")}>
                <ol className="space-y-4">
                  {Array.isArray(block.steps)
                    ? block.steps.map((step, stepIndex) => {
                        const item = step as {
                          title?: string;
                          description?: string;
                        };
                        return (
                          <li key={item.title} className="flex gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan/30 text-xs text-cyan">
                              {stepIndex + 1}
                            </span>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-muted-dark">
                                {item.description}
                              </p>
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ol>
              </Section>
            );
          case "richText":
            return (
              <Section key={key}>
                <div className="prose-dark max-w-3xl text-sm text-muted-dark">
                  {/* Lexical HTML rendering can be expanded; seed uses structured sections elsewhere. */}
                  <p>Rich content block</p>
                </div>
              </Section>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
