import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarkProps = { className?: string };

const marks: Record<string, (props: MarkProps) => ReactNode> = {
  intent: MarkIntent,
  strategy: MarkTarget,
  data: MarkData,
  modalities: MarkSpark,
  "generative-ai": MarkSpark,
  "agentic-ai": MarkAgent,
  governance: MarkShield,
  "product-engineering": MarkCode,
  "managed-services": MarkHeadset,
};

export function CapabilityMark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = marks[name] ?? MarkSpark;
  return <Icon className={className} />;
}

function stroke(className?: string) {
  return cn("h-full w-full", className);
}

function MarkIntent({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={stroke(className)} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 6.4 L12.9 10.7 L17.3 11.6 L12.9 12.5 L12 16.8 L11.1 12.5 L6.7 11.6 L11.1 10.7 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkTarget({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={stroke(className)} fill="none" aria-hidden>
      <circle cx="11" cy="13" r="6.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="13" r="0.9" fill="currentColor" />
      <path
        d="M16.4 4 L13.8 10.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M16.4 4 L14.6 4.7 L15.3 6.5 Z" fill="currentColor" />
    </svg>
  );
}

function MarkData({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={stroke(className)} fill="none" aria-hidden>
      <ellipse cx="12" cy="6.2" rx="6" ry="2.1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 6.2 V10.4 C6 11.6 8.7 12.5 12 12.5 S18 11.6 18 10.4 V6.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 10.4 V14.8 C6 16 8.7 16.9 12 16.9 S18 16 18 14.8 V10.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MarkSpark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={stroke(className)} fill="none" aria-hidden>
      <path
        d="M12 3.4 L13.5 10.5 L20.6 12 L13.5 13.5 L12 20.6 L10.5 13.5 L3.4 12 L10.5 10.5 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkAgent({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={stroke(className)} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="4.8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5.8" cy="16.6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.2" cy="16.6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 9.7 V6.4 M10.2 13.7 L7.2 15.5 M13.8 13.7 L16.8 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MarkShield({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={stroke(className)} fill="none" aria-hidden>
      <path
        d="M12 3.3 L19.2 6.2 V11.2 C19.2 15.6 16.2 18.6 12 20 C7.8 18.6 4.8 15.6 4.8 11.2 V6.2 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.8 L14.35 10.15 V12.85 L12 14.2 L9.65 12.85 V10.15 Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkCode({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={stroke(className)} fill="none" aria-hidden>
      <path
        d="M8.3 8.2 L4.6 12 L8.3 15.8 M15.7 8.2 L19.4 12 L15.7 15.8 M13.3 7.4 L10.7 16.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkHeadset({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={stroke(className)} fill="none" aria-hidden>
      <circle cx="12" cy="10" r="3.1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.8 11.2 A6.2 6.2 0 0 1 18.2 11.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="4.6"
        y="10.5"
        width="2.2"
        height="4.2"
        rx="0.9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="17.2"
        y="10.5"
        width="2.2"
        height="4.2"
        rx="0.9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6.8 14.8 C7 17 9.1 18.2 12 18.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
