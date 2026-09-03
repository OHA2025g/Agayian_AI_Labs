import Image from "next/image";
import { mockupAssets } from "@/config/mockup-assets";

export function LifecycleSculpture() {
  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-navy">Responsible AI lifecycle</p>
      <div className="relative mt-2 w-full">
        <Image
          src={mockupAssets.lifecycleSculpture}
          alt="Responsible AI lifecycle from build and deploy through operate, review and retire"
          width={944}
          height={869}
          quality={100}
          sizes="(max-width: 1024px) 92vw, 42vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
