import Image from "next/image";
import { mockupAssets } from "@/config/mockup-assets";

export function CandidateJourneySculpture() {
  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-navy">
        Candidate journey intelligence
      </p>
      <div className="relative mt-2 w-full">
        <Image
          src={mockupAssets.candidateJourneySculpture}
          alt="Candidate journey from Discover to Grow, with skill, engagement, pathway and learning previews"
          width={992}
          height={668}
          quality={100}
          sizes="(max-width: 1024px) 92vw, 42vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
