"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/#features", label: "Características" },
  { href: "/#solution", label: "Solución" },
  { href: "/#demo", label: "Demo" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleMenu = () => setOpen(v => !v);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
      const hash = href.substring(1);
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="relative md:hidden">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        data-open={open ? "true" : "false"}
        className="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl
                   bg-white/5 ring-1 ring-[var(--border)] hover:bg-white/10
                   transition-all duration-200 z-[80]
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      >
        <span className="sr-only">Toggle menu</span>
        <span className="relative block h-3 w-5">
          <span className={`absolute left-0 top-0 block h-[2px] w-5 bg-white/90 transition-transform duration-300 ease-out ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 bg-white/90 transition-all duration-300 ease-out ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`absolute left-0 bottom-0 block h-[2px] w-5 bg-white/90 transition-transform duration-300 ease-out ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
        </span>
      </button>

      <div
        className={`fixed left-1/2 top-20 z-[70]
                    -translate-x-1/2 origin-top w-[min(100%-2rem,320px)]
                    rounded-[20px] border border-white/10 bg-black/90 
                    shadow-[0_20px_80px_rgba(0,0,0,0.8)]
                    transition-all duration-300 ease-out
                    ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <nav className="p-4">
          <ul className="space-y-1">
            {links.map((link, i) => (
              <li key={link.href} style={{ animationDelay: open ? `${i * 50}ms` : "0ms" }}>
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full rounded-xl px-4 py-3 text-base text-white/90 text-center transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => handleLinkClick("/#demo")}
              className="flex items-center justify-center w-full rounded-full px-5 py-3 text-base font-medium bg-[var(--brand)] text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-[0_8px_30px_rgba(235,104,28,.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              Solicitar Demo
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
