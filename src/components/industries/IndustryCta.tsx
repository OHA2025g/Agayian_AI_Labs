import { PrimaryButton } from "@/components/ui/PrimaryButton";

export function IndustryCta() {
  return (
    <section className="industries-cta industries-main">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
        viewBox="0 0 1330 170"
        preserveAspectRatio="none"
      >
        <path
          d="M40 96 C220 40, 380 140, 560 88 S900 36, 1100 100 S1260 150, 1310 80"
          fill="none"
          stroke="#c5d3df"
          strokeWidth="1.4"
        />
        <path
          d="M20 120 C240 70, 420 150, 640 104 S980 58, 1200 118"
          fill="none"
          stroke="#d3dde6"
          strokeWidth="1.2"
        />
        <circle cx="210" cy="58" r="3" fill="#149fe6" />
        <circle cx="640" cy="92" r="3" fill="#ff5360" />
        <circle cx="1040" cy="78" r="2.6" fill="#149fe6" />
      </svg>
      <h2>
        Shape an industry-ready
        <br />
        AI programme with Agrayian.
      </h2>
      <PrimaryButton href="/contact?interest=consultation">
        Book a Consultation
      </PrimaryButton>
    </section>
  );
}
