"use client";

import { useRef } from "react";

type NavItem = {
  label: string;
  href: string;
};

export function MobileNavigation({ navItems }: { navItems: NavItem[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }

  return (
    <details ref={detailsRef} className="mobile-nav relative lg:hidden">
      <summary
        className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.14)] transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
        aria-label="Open navigation"
      >
        <span className="sr-only">Open navigation</span>
        <span className="flex flex-col gap-1.5" aria-hidden="true">
          <span className="block h-0.5 w-5 rounded-full bg-cyan-100" />
          <span className="block h-0.5 w-5 rounded-full bg-cyan-100" />
          <span className="block h-0.5 w-5 rounded-full bg-cyan-100" />
        </span>
      </summary>
      <div className="absolute right-0 top-14 z-50 w-64 rounded-3xl border border-cyan-200/20 bg-slate-950/95 p-3 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl">
        <nav className="grid gap-1 text-sm text-slate-200" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-2xl px-4 py-3 transition hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/evidence-readiness-review"
            onClick={closeMenu}
            className="mt-2 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-300/15"
          >
            Evidence Readiness Review
          </a>
        </nav>
      </div>
    </details>
  );
}
