import { OriginalSculpture } from "@/components/visualisations/glass/OriginalSculpture";
import { mockupAssets } from "@/config/mockup-assets";

/** Original glass infinity for the products hero, with the official icon tiles. */
export function ProductsInfinityGraphic() {
  return (
    <div className="products-infinity" aria-hidden>
      <OriginalSculpture
        src={mockupAssets.originalInfinityHero}
        alt=""
        priority
        className="products-infinity-art"
      />
      <svg className="products-infinity-overlay" viewBox="0 0 720 420">
        <g fill="#fff" stroke="#82ccee" strokeWidth="1.4">
          <rect x="168" y="78" width="46" height="46" rx="10" />
          <rect x="338" y="168" width="54" height="54" rx="12" />
          <rect x="498" y="72" width="46" height="46" rx="10" />
          <rect x="538" y="248" width="46" height="46" rx="10" />
        </g>
        <g fill="none" stroke="#087ad1" strokeWidth="1.8" strokeLinecap="round">
          <g transform="translate(181 91)">
            <path d="M10 3 17 6.5v5.5c0 4.2-2.8 7-7 8.5-4.2-1.5-7-4.3-7-8.5V6.5L10 3Z" />
            <path d="m7 11 2 2 4-4.5" />
          </g>
          <g transform="translate(353 183)">
            <ellipse cx="12" cy="6" rx="7" ry="2.6" />
            <path d="M5 6v6c0 1.5 3.1 2.6 7 2.6s7-1.1 7-2.6V6M5 12v6c0 1.5 3.1 2.6 7 2.6s7-1.1 7-2.6v-6" />
          </g>
          <g transform="translate(511 85)">
            <circle cx="10" cy="10" r="6.5" />
            <path d="m18 18-3.4-3.4" />
          </g>
          <g transform="translate(549 259)">
            <path d="M6 20V12M12 20V7M18 20v-6M22 20H4" />
            <path d="m6 10 4-3 5 4 5-5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
