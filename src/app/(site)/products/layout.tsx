import type { ReactNode } from "react";
import { ProductsPageMarker } from "./ProductsPageMarker";
import "./products.css";

export default function ProductsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ProductsPageMarker />
      {children}
    </>
  );
}
