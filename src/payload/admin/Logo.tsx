import React from "react";
import { AgrayianMark } from "@/components/layout/AgrayianMark";

export default function Logo() {
  return (
    <div className="agrayian-admin-logo" aria-label="Agrayian AI Labs">
      <span className="agrayian-admin-logo__mark agrayian-admin-logo__mark--svg">
        <span className="block h-9 w-[4rem]">
          <AgrayianMark variant="navy" />
        </span>
      </span>
      <span className="agrayian-admin-logo__copy">
        <span className="agrayian-admin-logo__name">Agrayian AI Labs</span>
        <span className="agrayian-admin-logo__tag">Content studio</span>
      </span>
    </div>
  );
}
