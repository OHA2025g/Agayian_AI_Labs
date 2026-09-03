import Image from "next/image";
import { mockupAssets } from "@/config/mockup-assets";

export function DistrictHeatmapSculpture() {
  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-navy">
        District prioritisation heatmap
      </p>
      <div className="relative mt-2 w-full">
        <Image
          src={mockupAssets.districtHeatmapSculpture}
          alt="District need-severity map with assessment signals and intervention priorities"
          width={981}
          height={737}
          quality={100}
          sizes="(max-width: 1024px) 92vw, 42vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
