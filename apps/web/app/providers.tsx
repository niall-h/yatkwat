"use client";

import { usePathname, useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const useHref = (href: string) => href;

  return (
    <HeroUIProvider navigate={router.push} useHref={useHref}>
      {children}
    </HeroUIProvider>
  );
}
