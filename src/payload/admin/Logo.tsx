import React from "react";

export default function Logo() {
  return (
    <div className="agrayian-admin-logo" aria-label="Agrayian AI Labs">
      <span className="agrayian-admin-logo__mark agrayian-admin-logo__mark--svg">
        <svg
          viewBox="0 0 140 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="36"
          aria-hidden
        >
          <path
            d="M72 40
               C72 22 86 12 100 12
               C118 12 130 24 130 40
               C130 56 118 68 100 68
               C86 68 72 58 72 40
               C72 58 58 68 44 68
               C26 68 14 56 14 40
               C14 24 26 12 44 12
               C52 12 59 15 64 20"
            stroke="#F1F5F9"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M58 8 L76 20 L58 32 Z" fill="url(#ag-admin-play)" />
          <defs>
            <linearGradient
              id="ag-admin-play"
              x1="58"
              y1="8"
              x2="76"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4D5A" />
              <stop offset="1" stopColor="#E63946" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="agrayian-admin-logo__copy">
        <span className="agrayian-admin-logo__name">Agrayian AI Labs</span>
        <span className="agrayian-admin-logo__tag">
          Growth reimagined with AI
        </span>
      </span>
    </div>
  );
}
