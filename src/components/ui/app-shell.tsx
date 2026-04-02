"use client";

import { BottomNav } from "./bottom-nav";
import { DisclaimerModal } from "./disclaimer-modal";

export function AppShell({ children }: { children: React.ReactNode }) {
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
