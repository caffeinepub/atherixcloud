import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiDiscord } from "react-icons/si";

const DISCORD_LINK = "https://discord.gg/PyawmEuCgp";

const intelPlans = [
  { ram: "8 GB", cores: 2, nvme: "50 GB", price: "₹30", popular: false },
  { ram: "16 GB", cores: 4, nvme: "100 GB", price: "₹90", popular: false },
  { ram: "32 GB", cores: 6, nvme: "200 GB", price: "₹100", popular: true },
  { ram: "48 GB", cores: 8, nvme: "350 GB", price: "₹200", popular: false },
  { ram: "64 GB", cores: 12, nvme: "500 GB", price: "₹300", popular: false },
];

const cheapPlans = [
  {
    tier: "Basic",
    tierNum: 1,
    ram: "4 GB",
    cores: 1,
    nvme: "30 GB",
    price: "₹60",
    color: "oklch(0.72 0.17 145)",
  },
  {
    tier: "Standard",
    tierNum: 2,
    ram: "8 GB",
    cores: 2,
    nvme: "50 GB",
    price: "₹120",
    color: "oklch(0.72 0.18 220)",
  },
  {
    tier: "Pro",
    tierNum: 3,
    ram: "12 GB",
    cores: 3,
    nvme: "100 GB",
    price: "₹200",
    color: "oklch(0.72 0.21 293)",
  },
  {
    tier: "Elite",
    tierNum: 4,
    ram: "16 GB",
    cores: 4,
    nvme: "150 GB",
    price: "₹320",
    color: "oklch(0.84 0.20 60)",
  },
];

const included = [
  { text: "Full Root Access", ok: true },
  { text: "DDoS Protection", ok: true },
  { text: "Ubuntu / Debian OS", ok: true },
  { text: "NVMe Storage", ok: true },
  { text: "Monthly Billing", ok: true },
  { text: "Pterodactyl + Wings Supported", ok: true },
  { text: "Share IPv4", ok: true },
  { text: "No Refunds", ok: false },
];

function BuyButton({ label = "Buy on Discord" }: { label?: string }) {
  return (
    <div className="relative group/btn">
      <a
        href={DISCORD_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="vps.primary_button"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-[oklch(0.40_0.18_280)] hover:bg-[oklch(0.48_0.22_280)] text-white border border-[oklch(0.55_0.20_280/0.5)] hover:border-[oklch(0.65_0.25_280)] hover:shadow-[0_0_18px_oklch(0.62_0.27_280/0.45)]"
      >
        <SiDiscord className="w-4 h-4" />
        {label}
      </a>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-[oklch(0.10_0.018_265/0.95)] border border-[oklch(0.28_0.03_250/0.6)] text-[oklch(0.80_0.05_265)] text-xs rounded-lg px-3 py-1.5 shadow-xl">
          Open a ticket on Discord to purchase
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[oklch(0.28_0.03_250/0.6)]" />
        </div>
      </div>
    </div>
  );
}

function StatBadge({
  label,
  value,
}: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg bg-[oklch(0.14_0.018_255/0.6)] border border-[oklch(0.24_0.025_250/0.3)]">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

export default function VPSPlans() {
  const [activeTab, setActiveTab] = useState<"intel" | "cheap">("intel");

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.84 0.20 191 / 0.04), transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 opacity-80">
            VPS Hosting
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground tracking-tight mb-4">
            Power Your <span className="text-gradient-cyan">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            High-performance VPS plans hosted on Indian nodes — built for speed,
            stability, and scale.
          </p>
        </motion.div>

        {/* Notice bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[
            "INR / NPR payments only",
            "IPv4 included",
            "No billing panel — open a Discord ticket to buy",
          ].map((text) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-[oklch(0.14_0.018_255/0.7)] border border-[oklch(0.84_0.20_191/0.2)] text-[oklch(0.84_0.20_191)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.84_0.20_191)] animate-pulse" />
              {text}
            </span>
          ))}
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="relative flex bg-[oklch(0.10_0.014_255/0.8)] border border-[oklch(0.24_0.025_250/0.5)] rounded-2xl p-1 gap-1">
            {(["intel", "cheap"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                data-ocid={`vps.${tab}_tab`}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "text-[oklch(0.05_0.01_265)] "
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl bg-primary"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab === "intel" ? "⚡ Intel VPS Plans" : "💸 Cheap VPS Plans"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          {activeTab === "intel" ? (
            <motion.div
              key="intel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-center text-sm text-muted-foreground mb-8">
                High-performance VPS for websites, game servers & heavy
                workloads — Indian Node
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {intelPlans.map((plan, i) => (
                  <motion.div
                    key={plan.ram}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`relative flex flex-col rounded-2xl border p-5 glass-card group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_28px_oklch(0.84_0.20_191/0.18)] ${
                      plan.popular
                        ? "border-primary/50 shadow-[0_0_24px_oklch(0.84_0.20_191/0.14)]"
                        : "border-[oklch(0.24_0.025_250/0.4)]"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[oklch(0.05_0.01_265)] text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        Popular
                      </span>
                    )}
                    <div className="mb-4">
                      <div className="text-2xl font-display font-bold text-foreground">
                        {plan.ram}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        RAM
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      <StatBadge label="vCores" value={plan.cores} />
                      <StatBadge label="NVMe" value={plan.nvme} />
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-2xl font-bold text-gradient-cyan">
                          {plan.price}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /mo
                        </span>
                      </div>
                      <BuyButton />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cheap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-center text-sm text-muted-foreground mb-8">
                Budget-friendly plans with dedicated resources — perfect for
                smaller projects
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
                {cheapPlans.map((plan, i) => (
                  <motion.div
                    key={plan.tier}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="relative flex flex-col rounded-2xl border border-[oklch(0.24_0.025_250/0.4)] p-5 glass-card hover:border-[oklch(0.24_0.025_250/0.7)] transition-all duration-300"
                    style={{
                      boxShadow: `0 0 0 0 ${plan.color}`,
                    }}
                    whileHover={{ boxShadow: `0 0 28px ${plan.color}30` }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center text-sm font-bold"
                      style={{
                        background: `${plan.color}20`,
                        color: plan.color,
                        border: `1px solid ${plan.color}40`,
                      }}
                    >
                      T{plan.tierNum}
                    </div>
                    <div className="font-display font-bold text-lg text-foreground mb-1">
                      {plan.tier}
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">
                      Tier {plan.tierNum}
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mb-5">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">RAM</div>
                        <div className="text-sm font-semibold text-foreground">
                          {plan.ram}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          Cores
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {plan.cores}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          NVMe
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {plan.nvme}
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-1 mb-4">
                        <span
                          className="text-2xl font-bold"
                          style={{ color: plan.color }}
                        >
                          {plan.price}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /mo
                        </span>
                      </div>
                      <BuyButton />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* What's included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 rounded-2xl border border-[oklch(0.24_0.025_250/0.4)] bg-[oklch(0.10_0.014_255/0.5)] p-7"
        >
          <h3 className="font-semibold text-center text-foreground text-sm uppercase tracking-widest mb-5 text-xs">
            All Plans Include
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {included.map(({ text, ok }) => (
              <Badge
                key={text}
                variant="secondary"
                className={`text-xs px-3 py-1.5 rounded-full border ${
                  ok
                    ? "bg-[oklch(0.84_0.20_191/0.08)] border-[oklch(0.84_0.20_191/0.2)] text-[oklch(0.84_0.20_191)]"
                    : "bg-[oklch(0.65_0.22_29/0.08)] border-[oklch(0.65_0.22_29/0.2)] text-[oklch(0.65_0.22_29)]"
                }`}
              >
                {ok ? "✅" : "❌"} {text}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
