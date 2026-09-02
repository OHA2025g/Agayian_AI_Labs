import type { ProductVisual } from "@/components/products/products-catalog";
import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { mockupAssets } from "@/config/mockup-assets";

function assertNever(value: never): never {
  throw new Error(`Unhandled product visual: ${String(value)}`);
}

function sculptureSrc(type: ProductVisual): string {
  switch (type) {
    case "audit":
      return mockupAssets.flagshipOriginalAudit;
    case "vedhire":
      return mockupAssets.flagshipOriginalVedhire;
    case "social":
      return mockupAssets.flagshipOriginalWcd;
    case "governance":
      return mockupAssets.flagshipOriginalGovernance;
    case "decision":
      return mockupAssets.productDecisionRingSculpture;
    case "document":
      return mockupAssets.productDocumentStack;
    default: {
      const exhaustive: never = type;
      return assertNever(exhaustive);
    }
  }
}

/** Original HQ glass sculptures for each products-grid card. */
export function ProductSculpture({
  type,
  name = "",
}: {
  type: ProductVisual;
  name?: string;
}) {
  return (
    <div className="products-visual">
      <OriginalSculpture
        src={sculptureSrc(type)}
        alt={name}
        loading="eager"
        className="products-visual-art"
      />
    </div>
  );
}
