import { ArrowRight, Cloud } from "lucide-react";
import {
  SiDiscord,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
} from "react-icons/si";

const footerLinks = {
  Services: [
    { label: "Shared Hosting", href: "#pricing" },
    { label: "VPS Hosting", href: "#pricing" },
    { label: "Cloud Hosting", href: "#pricing" },
    { label: "Dedicated Servers", href: "#pricing" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "#contact" },
    { label: "Status Page", href: "/status" },
    { label: "Documentation", href: "/docs" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.84 0.20 191 / 0.5), oklch(0.62 0.27 293 / 0.4), transparent)",
        }}
      />

      {/* Premium CTA strip */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.016 255 / 0.8), oklch(0.14 0.020 265 / 0.8))",
          borderBottom: "1px solid oklch(0.24 0.025 250 / 0.4)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 80% 50%, oklch(0.84 0.20 191 / 0.05), transparent)",
          }}
        />
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div>
            <h3 className="font-display font-bold text-2xl text-foreground tracking-tight mb-1">
              Ready to power your world?
            </h3>
            <p className="text-muted-foreground text-sm">
              Start deploying in minutes. No credit card required.
            </p>
          </div>
          <a
            href="#pricing"
            data-ocid="footer.primary_button"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm neon-glow hover:opacity-90 transition-all shrink-0"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center neon-glow">
                <Cloud className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-foreground tracking-tight">
                Atherix<span className="text-gradient-cyan">Cloud</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Next-generation cloud hosting built for performance, reliability,
              and scale. Power your ambitions with AtherixCloud.
            </p>
            <div className="flex items-center gap-3">
              {(
                [
                  {
                    Icon: SiGithub,
                    href: "https://github.com",
                    label: "GitHub",
                  },
                  { Icon: SiX, href: "https://x.com", label: "X" },
                  {
                    Icon: SiLinkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    Icon: SiInstagram,
                    href: "https://instagram.com",
                    label: "Instagram",
                  },
                  {
                    Icon: SiDiscord,
                    href: "https://discord.com",
                    label: "Discord",
                  },
                ] as const
              ).map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground text-sm mb-5 tracking-wide uppercase text-xs">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[oklch(0.24_0.025_250/0.3)]">
          <p className="text-xs text-muted-foreground">
            © {year} AtherixCloud. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
