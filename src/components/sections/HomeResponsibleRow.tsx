const items = [
  {
    title: "Human approval at critical steps",
    body: "People-in-the-loop ensures important decisions remain human-led.",
    icon: IconPerson,
  },
  {
    title: "Privacy and data protection",
    body: "Built with privacy-by-design and robust data protection practices.",
    icon: IconLockShield,
  },
  {
    title: "Evidence and explainability",
    body: "Every output is traceable, verifiable and backed by evidence.",
    icon: IconEvidence,
  },
  {
    title: "Continuous monitoring",
    body: "Ongoing evaluation, drift detection and improvement at scale.",
    icon: IconMonitor,
  },
] as const;

export function HomeResponsibleRow() {
  return (
    <div className="relative pb-8 lg:pb-12">
      <ul className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className={`flex flex-col items-start ${
                index < items.length - 1
                  ? "lg:border-r lg:border-[#e4ebf3] lg:pr-7 lg:mr-7"
                  : ""
              }`}
            >
              <Icon className="h-[3.75rem] w-[3.75rem]" />
              <h3 className="mt-5 font-heading text-[1.02rem] font-semibold leading-snug text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-navy/58">
                {item.body}
              </p>
            </li>
          );
        })}
      </ul>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-10 lg:block"
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
      >
        <path
          d="M20 10 C160 34, 340 38, 500 36 S840 28, 980 8"
          fill="none"
          stroke="#149fe6"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <circle cx="36" cy="12" r="3.2" fill="#ff4d5e" />
        <circle cx="500" cy="36" r="3.2" fill="#071a3d" />
        <circle cx="968" cy="10" r="3.2" fill="#ff4d5e" />
      </svg>
    </div>
  );
}

function IconPerson({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <circle cx="26" cy="16.5" r="10" stroke="#071a3d" strokeWidth="2.1" />
      <path
        d="M6 56 C8 38.5, 14.5 31, 26 31 C37.5 31, 44 38.5, 46 56"
        stroke="#071a3d"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle cx="50" cy="49" r="10" fill="white" stroke="#149fe6" strokeWidth="2" />
      <path
        d="M45.6 49.4 L48.8 52.4 L55.1 45.2"
        stroke="#ff4d5e"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLockShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M32 3 L58 14.5 V31 C58 47.5, 45 58, 32 62 C19 58, 6 47.5, 6 31 V14.5 Z"
        stroke="#071a3d"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <rect
        x="22"
        y="31"
        width="20"
        height="15.5"
        rx="2.4"
        stroke="#071a3d"
        strokeWidth="2"
      />
      <path
        d="M26.5 31 V25.4 C26.5 21.6, 29 19, 32 19 C35 19, 37.5 21.6, 37.5 25.4 V31"
        stroke="#149fe6"
        strokeWidth="2"
      />
      <circle cx="32" cy="38.8" r="2.1" fill="#ff4d5e" />
    </svg>
  );
}

function IconEvidence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M12 4 H40 L54 18 V60 H12 Z"
        stroke="#071a3d"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path d="M40 4 V18 H54" stroke="#071a3d" strokeWidth="2.1" />
      <path
        d="M20 27 H44 M20 35 H38"
        stroke="#149fe6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="43" cy="48" r="9.5" fill="white" stroke="#149fe6" strokeWidth="2" />
      <circle cx="43" cy="48" r="4.4" stroke="#071a3d" strokeWidth="1.8" />
      <path
        d="M50 55.2 L56.4 61.4"
        stroke="#ff4d5e"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMonitor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <rect
        x="4"
        y="6"
        width="56"
        height="38"
        rx="3.2"
        stroke="#071a3d"
        strokeWidth="2.1"
      />
      <path d="M22 54 H42" stroke="#071a3d" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M32 44 V54" stroke="#071a3d" strokeWidth="2.1" />
      <path
        d="M12 34 L23 25 L32 30 L46 16"
        stroke="#149fe6"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.5 16 H48.5 V23"
        stroke="#ff4d5e"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
