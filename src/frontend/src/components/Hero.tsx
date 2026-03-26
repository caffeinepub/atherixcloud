import { ArrowRight, Server } from "lucide-react";
import { motion } from "motion/react";
import { Suspense } from "react";
import HeroScene from "./HeroScene";

const VIDEO_URL =
  "https://image2url.com/r2/default/videos/1774276546128-a34c5431-b4ea-4e23-aff2-d54b109a987a.mp4";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/65" />
      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, transparent 40%, oklch(0 0 0 / 0.5) 100%)",
        }}
      />

      {/* Subtle color blobs */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div
          className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.84 0.20 191 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.27 293 / 0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-[3] max-w-[1200px] mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-16">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Premium Cloud Infrastructure — India, Delhi &amp; Nepal
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display font-extrabold text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tighter text-foreground mb-6"
          >
            Power Your
            <br />
            <span className="text-gradient-cyan">World.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl"
          >
            Deploy faster, scale smarter. ENDERNET delivers enterprise-grade
            performance with NVMe SSD storage, 99.9% uptime guarantee, and 24/7
            expert support — serving India, Delhi &amp; Nepal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <a
              href="#pricing"
              data-ocid="hero.primary_button"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm overflow-hidden relative neon-glow transition-all hover:scale-[1.02]"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.2) 50%, transparent 60%), linear-gradient(oklch(0.84 0.20 191), oklch(0.84 0.20 191))",
                backgroundSize: "200% 100%, 100% 100%",
                backgroundPosition: "-200% 0, 0 0",
                transition:
                  "background-position 0.6s ease, transform 0.2s ease",
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
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-foreground font-semibold text-sm hover:bg-white/5 hover:border-primary/40 transition-all"
            >
              Explore Features <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-10"
          >
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "<10ms", label: "Avg Latency" },
              { value: "50K+", label: "Happy Clients" },
              { value: "24/7", label: "Expert Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-display font-black text-gradient-cyan tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-muted-foreground mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative h-[450px] lg:h-[600px]"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-primary/30 animate-pulse" />
              </div>
            }
          >
            <HeroScene />
          </Suspense>
          <div className="absolute bottom-8 left-4 glass-card rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Server className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">
                India &amp; Nepal CDN
              </div>
              <div className="text-xs text-muted-foreground">
                Delhi data center
              </div>
            </div>
          </div>
          <div className="absolute top-8 right-4 glass-card rounded-2xl px-4 py-3 text-center">
            <div className="text-lg font-display font-bold text-gradient-cyan">
              99.9%
            </div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] border-b border-white/5" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
