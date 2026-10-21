import { useState, useEffect } from "preact/hooks";

export default function NavbarIsland() {
  const [open, setOpen] = useState(false);
  const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

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
        class={`lg:hidden relative min-w-11 min-h-11 p-2 z-50 inline-flex items-center justify-center rounded-full transition-colors ${open ? "text-primary hover:bg-primary/10" : "nav-link text-white hover:bg-white/10"}`}
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
        <div id="mobile-navigation" class="paper-grain fixed inset-0 bg-paper z-40 flex flex-col pt-24 px-8 pb-8 gap-3 overflow-y-auto lg:hidden">
          {[
            [`${base}#about`, "About Us"],
            [`${base}#why-choose-us`, "Why Us"],
            [`${base}products`, "Products"],
            [`${base}#testimonials`, "Testimonials"],
            [`${base}#licenses`, "Licenses"],
            [`${base}#locations`, "Locations"],
            [`${base}#awards`, "Awards"],
            [`${base}#contact`, "Contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              class="font-display min-h-11 flex items-center border-b border-border pb-2 text-2xl font-semibold text-primary hover:text-soil transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <button type="button" data-language-toggle aria-label="Switch language to English" class="mt-3 min-h-11 self-start rounded-full border border-primary/30 px-5 py-2 text-sm font-bold text-primary hover:border-mustard">
            <span data-language-label>English</span>
          </button>
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
