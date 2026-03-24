import { Check, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { HostingPlan } from "../backend.d";
import { useHostingPlans } from "../hooks/useQueries";

const FALLBACK_PLANS: HostingPlan[] = [
  {
    name: "Shared Hosting",
    description: "Perfect for personal sites and small projects.",
    price: 4.99,
    planType: "sharedPlan" as any,
    features: [
      "5 GB NVMe SSD Storage",
      "1 Website",
      "Free SSL Certificate",
      "5 Email Accounts",
      "99.9% Uptime",
      "24/7 Support",
    ],
  },
  {
    name: "VPS Hosting",
    description: "For growing apps that need dedicated resources.",
    price: 19.99,
    planType: "vps" as any,
    features: [
      "50 GB NVMe SSD",
      "2 vCPU Cores",
      "4 GB RAM",
      "Unlimited Bandwidth",
      "Full Root Access",
      "Free Daily Backups",
      "DDoS Protection",
    ],
  },
  {
    name: "Cloud Hosting",
    description: "Auto-scaling cloud for high-traffic applications.",
    price: 29.99,
    planType: "cloud" as any,
    features: [
      "100 GB NVMe SSD",
      "4 vCPU Cores",
      "8 GB RAM",
      "Auto-Scaling",
      "Global CDN",
      "Advanced Firewall",
      "Priority Support",
      "Monitoring Dashboard",
    ],
  },
  {
    name: "Dedicated Server",
    description: "Maximum power for enterprise workloads.",
    price: 79.99,
    planType: "dedicated" as any,
    features: [
      "1 TB NVMe SSD",
      "16 vCPU Cores",
      "64 GB RAM",
      "Dedicated IP",
      "Custom Configuration",
      "Managed Security",
      "SLA 99.99%",
      "Dedicated Account Manager",
    ],
  },
];

export default function Pricing() {
  const { data: plans } = useHostingPlans();
  const displayPlans = plans && plans.length > 0 ? plans : FALLBACK_PLANS;
  const popularIdx = 2;

  return (
    <section id="pricing" className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, oklch(0.62 0.27 293 / 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-semibold mb-4">
            Transparent Pricing
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-4 tracking-tight">
            Choose Your{" "}
            <span className="text-gradient-purple">Perfect Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start small and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {displayPlans.map((plan, i) => {
            const isPopular = i === popularIdx;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-ocid={`pricing.item.${i + 1}`}
                className={`relative rounded-2xl flex flex-col ${
                  isPopular
                    ? "popular-rotating-border bg-[oklch(0.13_0.018_255/0.95)] shadow-2xl z-10"
                    : "glass-card glass-card-hover"
                } p-8`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[oklch(0.82_0.15_75)] to-[oklch(0.72_0.18_55)] text-[oklch(0.07_0.018_265)] text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Zap className="w-3 h-3" /> Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display font-bold text-foreground text-xl mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </div>
                <div className="mb-1">
                  <div className="flex items-end gap-1">
                    <span className="text-6xl font-display font-black text-foreground leading-none">
                      $
                      {typeof plan.price === "number"
                        ? plan.price.toFixed(2)
                        : plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm mb-2">
                      /mo
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mb-6">
                  Billed monthly · No contracts
                </p>
                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  data-ocid={`pricing.primary_button.${i + 1}`}
                  className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-all relative overflow-hidden ${
                    isPopular
                      ? "bg-primary text-primary-foreground hover:opacity-90 neon-glow"
                      : "border border-primary/30 text-primary hover:bg-primary/10"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
