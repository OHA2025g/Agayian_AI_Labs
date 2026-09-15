import Link from "next/link";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Separator } from "@/components/ui/separator";
import { DashboardPreview } from "@/components/visualisations/DashboardPreview";
import { CTA } from "@/config/cta";
import { cn } from "@/lib/utils";

export function ProductDetailView({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  return (
    <div className={cn("space-y-8 text-sm", !compact && "mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16 lg:px-8")}>
      {!compact ? (
        <nav className="text-sm text-muted-light">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href="/products" className="hover:text-navy">
            Products
          </Link>
        </nav>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {(product.categories?.length ? product.categories : [product.category])
          .filter(Boolean)
          .map((label) => (
            <Badge key={label} variant="cyan">
              {label}
            </Badge>
          ))}
        <Badge>{product.maturity ?? product.status}</Badge>
        {product.industries.map((industry) => (
          <Badge key={industry} variant="violet">
            {industry}
          </Badge>
        ))}
      </div>

      <div>
        <h1 className="font-heading text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-balance text-navy">
          {product.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted-light md:text-lg">
          {product.valueProposition}
        </p>
      </div>

      <DetailBlock title="Business problem" body={product.businessProblem} />
      {product.whyProcessesFail ? (
        <DetailBlock
          title="Why existing processes fail"
          body={product.whyProcessesFail}
        />
      ) : null}
      <DetailBlock title="Solution overview" body={product.solutionOverview} />

      {product.targetUsers.length ? (
        <div>
          <h2 className="font-heading text-base font-semibold text-navy">
            Target users
          </h2>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {product.targetUsers.map((user) => (
              <li
                key={user}
                className="rounded-md border border-[var(--border-soft)] bg-[#f5f8fb] px-3 py-2 text-muted-light"
              >
                {user}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {product.modules.length ? (
        <div>
          <h2 className="font-heading text-base font-semibold text-navy">
            Major modules
          </h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {product.modules.map((module) => (
              <div
                key={module.title}
                className="rounded-lg border border-[var(--border-soft)] bg-[#f5f8fb] p-4"
              >
                <p className="font-medium text-navy">{module.title}</p>
                <p className="mt-1 text-muted-light">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {product.capabilities.length ? (
        <TagBlock title="Key capabilities" items={product.capabilities} />
      ) : null}

      {product.workflow.length ? (
        <div>
          <h2 className="font-heading text-base font-semibold text-navy">
            Product workflow
          </h2>
          <ol className="mt-3 space-y-3">
            {product.workflow.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-xs font-semibold text-cyan">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-navy">{step.title}</p>
                  <p className="text-muted-light">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {product.dataSources?.length ? (
        <TagBlock title="Data sources" items={product.dataSources} />
      ) : null}
      {product.aiCapabilities?.length ? (
        <TagBlock title="AI capabilities" items={product.aiCapabilities} />
      ) : null}
      {product.agents?.length ? (
        <TagBlock title="Agents" items={product.agents} />
      ) : null}
      {product.humanApprovalPoints?.length ? (
        <TagBlock
          title="Human approval points"
          items={product.humanApprovalPoints}
        />
      ) : null}
      {product.integrations?.length ? (
        <TagBlock title="Integrations" items={product.integrations} />
      ) : null}
      {product.governance?.length ? (
        <TagBlock title="Governance controls" items={product.governance} />
      ) : null}
      {product.architecture?.length ? (
        <TagBlock title="Technology architecture" items={product.architecture} />
      ) : null}
      {product.deploymentOptions?.length ? (
        <TagBlock
          title="Deployment options"
          items={product.deploymentOptions}
        />
      ) : null}

      {product.outcomes.length ? (
        <div>
          <h2 className="font-heading text-base font-semibold text-navy">
            Expected outcomes
          </h2>
          <ul className="mt-2 space-y-2">
            {product.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2 text-muted-light">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h2 className="font-heading text-base font-semibold text-navy">
          Interface preview
        </h2>
        <div className="mt-3">
          <DashboardPreview variant={product.slug} showDemoLabel />
        </div>
      </div>

      {product.relatedCapabilities && (
        <TagBlock
          title="Related capabilities"
          items={product.relatedCapabilities}
        />
      )}

      <Separator />

      <div className="flex flex-wrap gap-3">
        <PrimaryButton href={`${CTA.demo.href}&product=${product.slug}`}>
          {CTA.demo.label}
        </PrimaryButton>
      </div>
    </div>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-heading text-base font-semibold text-navy">
        {title}
      </h2>
      <p className="mt-2 leading-relaxed text-muted-light">{body}</p>
    </div>
  );
}

function TagBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-heading text-base font-semibold text-navy">
        {title}
      </h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
}
