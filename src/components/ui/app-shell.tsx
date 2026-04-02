"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BottomNav } from "./bottom-nav";
import { DisclaimerModal } from "./disclaimer-modal";

const ONBOARDING_KEY = "waterfast_onboarded";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onboarded = localStorage.getItem(ONBOARDING_KEY);
    if (!onboarded && pathname !== "/onboarding") {
      router.replace("/onboarding");
    } else {
      setReady(true);
    }
  }, [router, pathname]);

  // Onboarding page renders fullscreen, no shell
  if (pathname === "/onboarding") {
    return <>{children}</>;
  }

  if (!ready) return null;

  return (
    <>
      <DisclaimerModal />
      <main className="max-w-md mx-auto px-4 pt-6 pb-24">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
