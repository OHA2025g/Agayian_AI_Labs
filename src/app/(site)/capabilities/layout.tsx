import type { ReactNode } from "react";
import { CapabilitiesPageMarker } from "./CapabilitiesPageMarker";
import "./capabilities.css";

export default function CapabilitiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <CapabilitiesPageMarker />
      {children}
    </>
  );
}
