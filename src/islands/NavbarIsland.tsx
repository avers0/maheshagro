import { useState, useEffect } from "preact/hooks";

export default function NavbarIsland() {
  const [open, setOpen] = useState(false);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        class="lg:hidden min-w-11 min-h-11 p-2 text-white z-50 inline-flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(o => !o)}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
        )}
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div id="mobile-navigation" class="fixed inset-0 bg-primary z-40 flex flex-col pt-24 px-8 pb-8 gap-5 overflow-y-auto lg:hidden">
          {[
            ["/#about","About Us"],
            ["/#why-choose-us","Why Us"],
            ["/products","Products"],
            ["/#testimonials","Testimonials"],
            ["/#licenses","Licenses"],
            ["/#locations","Locations"],
            ["/#awards","Awards"],
            ["/#contact","Contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              class="min-h-11 flex items-center text-2xl font-bold text-white tracking-tight hover:text-accent transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="https://wa.me/919166029301"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-accent mt-4 w-full justify-center"
            onClick={() => setOpen(false)}
          >
            WhatsApp Chat
          </a>
        </div>
      )}
    </>
  );
}
