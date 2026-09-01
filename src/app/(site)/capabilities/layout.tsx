import { CapabilitiesPageMarker } from "./CapabilitiesPageMarker";
import "./capabilities.css";

export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CapabilitiesPageMarker />
      {children}
    </>
  );
}
