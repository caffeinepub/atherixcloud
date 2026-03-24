import { Star } from "lucide-react";
import { motion } from "motion/react";
import type { Testimonial } from "../backend.d";
import { useTestimonials } from "../hooks/useQueries";

const FALLBACK: Testimonial[] = [
  {
    name: "Sarah Chen",
    company: "TechFlow Analytics",
    quote:
      "AtherixCloud transformed our infrastructure. The NVMe SSD performance is incredible — our app loads 3x faster than before.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    company: "StartupLaunch Co.",
    quote:
      "Best hosting decision we've made. The VPS plan scales seamlessly during traffic spikes and the support team is always there.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    company: "EcomEdge Store",
    quote:
      "Switched from a major provider and cut hosting costs by 60% with zero downtime migration. AtherixCloud support made it painless.",
    rating: 5,
  },
  {
    name: "James Owusu",
    company: "DevHouse Berlin",
    quote:
      "The dedicated server handles our ML models like a champ. Uptime has been perfect for 14 months running.",
    rating: 5,
  },
];

const avatarGradients = [
  "from-[oklch(0.84_0.20_191)] to-[oklch(0.62_0.27_293)]",
  "from-[oklch(0.72_0.18_55)] to-[oklch(0.82_0.15_75)]",
  "from-[oklch(0.62_0.27_293)] to-[oklch(0.84_0.20_191)]",
  "from-[oklch(0.65_0.22_30)] to-[oklch(0.62_0.27_293)]",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const { data } = useTestimonials();
  const items = data && data.length > 0 ? data : FALLBACK;

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.84 0.20 191 / 0.3), transparent)",
        }}
      />
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-4">
            Customer Stories
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-4 tracking-tight">
            Trusted by <span className="text-gradient-cyan">50,000+</span>{" "}
            Developers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of businesses who've made the switch to AtherixCloud.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`testimonials.item.${i + 1}`}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Decorative quote watermark */}
              <span
                className="absolute -top-2 -right-1 text-[9rem] font-black text-foreground/[0.04] leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= (t.rating ?? 5) ? "text-primary fill-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center shrink-0`}
                >
                  <span className="text-xs font-bold text-white">
                    {getInitials(t.name)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground/70">
                    {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
