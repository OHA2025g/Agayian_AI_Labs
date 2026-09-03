import Image from "next/image";
import { mockupAssets } from "@/config/mockup-assets";

export function AuditEvidenceSculpture() {
  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-navy">Audit evidence graph</p>
      <div className="relative mt-2 w-full">
        <Image
          src={mockupAssets.auditEvidenceSculpture}
          alt="Audit evidence network with risk overview and evidence status"
          width={1004}
          height={713}
          quality={100}
          sizes="(max-width: 1024px) 92vw, 42vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
