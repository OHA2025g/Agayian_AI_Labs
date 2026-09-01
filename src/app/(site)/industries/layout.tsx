import type { ReactNode } from "react";
import { IndustriesPageMarker } from "./IndustriesPageMarker";
import "./industries.css";

export default function IndustriesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <IndustriesPageMarker />
      {children}
    </>
  );
}
