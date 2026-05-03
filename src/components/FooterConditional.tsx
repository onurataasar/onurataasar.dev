"use client";

import { usePathname } from "next/navigation";
import CompactFooter from "@/components/CompactFooter";

/**
 * Renders CompactFooter on all routes except the homepage ("/").
 * The homepage has its own full brutalist footer embedded in BrutalistPage.
 */
export function FooterConditional() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <CompactFooter />;
}
