import { HardDrive, Headphones, Shield, Zap } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";

const features = [
  {
    icon: Zap,
    title: "Ultra-Fast NVMe SSD",
    description:
      "Experience blazing-fast load times with our enterprise NVMe SSD storage. Up to 10x faster than traditional HDDs.",
    cyan: true,
  },
  {
    icon: HardDrive,
    title: "99.9% Uptime SLA",
    description:
      "Our redundant infrastructure and proactive monitoring ensure your applications stay online around the clock.",
    cyan: false,
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description:
      "Enterprise-grade DDoS protection, free SSL certificates, daily backups, and real-time threat monitoring.",
    cyan: true,
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description:
      "Get instant help from our team of cloud engineers any time of day. Average response time under 5 minutes.",
    cyan: false,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const nums = ["01", "02", "03", "04"];

// SVG wireframe cube — pure CSS/SVG, no canvas
function WireframeCube({ color, size = 60 }: { color: string; size?: number }) {
  const s = size;
  const d = s * 0.35;
  return (
    <svg
      width={s + d}
      height={s + d}
      viewBox={`0 0 ${s + d} ${s + d}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <rect
        x={d}
        y={0}
        width={s}
        height={s}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.3"
        fill={color}
        fillOpacity="0.03"
      />
      <rect
        x={0}
        y={d}
        width={s}
        height={s}
        stroke={color}
        strokeWidth="1.5"
        fill={color}
        fillOpacity="0.06"
      />
      <line
        x1={0}
        y1={d}
        x2={d}
        y2={0}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line
        x1={s}
        y1={d}
        x2={s + d}
        y2={0}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line
        x1={0}
        y1={s + d}
        x2={d}
        y2={s}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line
        x1={s}
        y1={s + d}
        x2={s + d}
        y2={s}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

const cubeConfig = [
  { id: "cube-cyan-lg", color: "oklch(0.84 0.20 191)", size: 56, delay: 0 },
  { id: "cube-purple", color: "oklch(0.62 0.27 293)", size: 72, delay: 0.3 },
  { id: "cube-cyan-sm", color: "oklch(0.84 0.20 191)", size: 48, delay: 0.6 },
];

export default function Features() {
  return (
    <section id="features" className="section-padding relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.84 0.20 191 / 0.4), transparent)",
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
            Why ENDERNET
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-4 tracking-tight">
            Built for <span className="text-gradient-cyan">Performance</span>{" "}
            &amp; Reliability
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to run mission-critical applications at scale.
          </p>
        </motion.div>

        {/* Animated CSS wireframe cubes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="w-full h-48 mb-12 rounded-2xl overflow-hidden flex items-center justify-center gap-16"
          style={{ background: "oklch(0.10 0.015 255 / 0.4)" }}
        >
          {cubeConfig.map((c, i) => (
            <motion.div
              key={c.id}
              animate={{
                y: [0, -12, 0],
                rotateZ: [0, 8, -8, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                delay: c.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{ filter: `drop-shadow(0 0 12px ${c.color})` }}
            >
              <WireframeCube color={c.color} size={c.size} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={cardVariants}
                data-ocid={`features.item.${i + 1}`}
                className="premium-card glass-card-hover rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{
                    background: feat.cyan
                      ? "linear-gradient(to right, oklch(0.84 0.20 191), transparent)"
                      : "linear-gradient(to right, oklch(0.62 0.27 293), transparent)",
                  }}
                />
                <span
                  className="absolute top-4 right-5 text-3xl font-black text-foreground/5 select-none pointer-events-none leading-none"
                  aria-hidden="true"
                >
                  {nums[i]}
                </span>
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    feat.cyan
                      ? "bg-primary/10 neon-glow"
                      : "bg-secondary/10 purple-glow"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${feat.cyan ? "text-primary" : "text-secondary"}`}
                  />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
