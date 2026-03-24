import { Cloud, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileGetStarted = () => {
    setMobileOpen(false);
    window.location.hash = "#pricing";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.07_0.018_265/0.92)] backdrop-blur-2xl border-b border-[oklch(0.84_0.20_191/0.12)]"
          : "bg-transparent"
      }`}
    >
      <div
        className="max-w-[1200px] mx-auto px-6 h-18 flex items-center justify-between"
        style={{ height: "72px" }}
      >
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 neon-glow">
            <Cloud className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-xl text-foreground tracking-tight">
            Atherix<span className="text-gradient-cyan">Cloud</span>
          </span>
        </a>

        <nav
          className="hidden md:flex items-center gap-9"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            data-ocid="nav.primary_button"
            className="relative px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold overflow-hidden neon-glow hover:opacity-95 transition-opacity"
            style={{
              backgroundImage:
                "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.15) 50%, transparent 60%), linear-gradient(oklch(0.84 0.20 191), oklch(0.84 0.20 191))",
              backgroundSize: "200% 100%, 100% 100%",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundPosition =
                "200% 0, 0 0";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundPosition =
                "-200% 0, 0 0";
            }}
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[oklch(0.24_0.025_250/0.4)] bg-[oklch(0.07_0.018_265/0.97)] backdrop-blur-2xl px-6 py-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              data-ocid="nav.primary_button"
              onClick={handleMobileGetStarted}
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold text-center neon-glow"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
