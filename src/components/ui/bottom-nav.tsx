"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Oruç", icon: "⏱" },
  { href: "/history", label: "Geçmiş", icon: "📋" },
  { href: "/stats", label: "İstatistik", icon: "📊" },
  { href: "/settings", label: "Ayarlar", icon: "⚙" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur border-t border-slate-800 z-50">
      <div className="max-w-md mx-auto flex">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors ${
                isActive
                  ? "text-sky-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
