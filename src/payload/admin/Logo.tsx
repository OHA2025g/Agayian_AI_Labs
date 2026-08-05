import React from "react";

export default function Logo() {
  return (
    <div className="agrayian-admin-logo" aria-label="Agrayian AI Labs">
      <span className="agrayian-admin-logo__mark">
        <img src="/icon.png" alt="" width={44} height={44} />
      </span>
      <span className="agrayian-admin-logo__copy">
        <span className="agrayian-admin-logo__name">Agrayian AI Labs</span>
        <span className="agrayian-admin-logo__tag">Content Command</span>
      </span>
    </div>
  );
}
