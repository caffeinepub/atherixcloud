import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import VPSPlans from "../components/VPSPlans";

const STAR_PARTICLES = Array.from({ length: 80 }, (_, i) => ({
  id: `star-${i}`,
  left: `${(i * 137.508) % 100}%`,
  top: `${(i * 97.3) % 100}%`,
  delay: `${(i * 0.37) % 6}s`,
  dur: `${3 + (i % 5)}s`,
  w: `${1 + (i % 3)}px`,
  opacity: 0.3 + (i % 4) * 0.15,
}));

const DRIFT_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: `drift-${i}`,
  left: `${(i * 211.3) % 100}%`,
  top: `${(i * 143.7) % 100}%`,
  delay: `${(i * 0.7) % 8}s`,
  dur: `${8 + (i % 6)}s`,
  w: `${2 + (i % 2)}px`,
  bg: i % 2 === 0 ? "oklch(0.84 0.20 191 / 0.4)" : "oklch(0.62 0.27 293 / 0.4)",
}));

export default function LandingPage() {
  return (
    <>
      {/* CSS animated starfield background */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {STAR_PARTICLES.map((p) => (
          <span
            key={p.id}
            className="star-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.dur,
              width: p.w,
              height: p.w,
              opacity: p.opacity,
            }}
          />
        ))}
        {DRIFT_PARTICLES.map((p) => (
          <span
            key={p.id}
            className="drift-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.dur,
              width: p.w,
              height: p.w,
              background: p.bg,
            }}
          />
        ))}
      </div>

      <div className="min-h-screen bg-background text-foreground relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <VPSPlans />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </>
  );
}
