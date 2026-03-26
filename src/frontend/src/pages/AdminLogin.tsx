import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ADMIN_EMAIL = "enderop67@gmail.com";
const ADMIN_PASSWORD = "enderop67gg#";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: `s${i}`,
  left: `${(i * 137.508) % 100}%`,
  top: `${(i * 97.3) % 100}%`,
  delay: `${(i * 0.37) % 6}s`,
  dur: `${3 + (i % 5)}s`,
  size: `${1 + (i % 2)}px`,
  opacity: 0.2 + (i % 4) * 0.1,
}));

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Small delay to simulate loading
    await new Promise((r) => setTimeout(r, 400));
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("atherix_admin_auth", "true");
      navigate({ to: "/admin/dashboard" });
    } else {
      toast.error("Invalid credentials. Please check your email and password.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[oklch(0.07_0.014_265)] flex flex-col">
      {/* Starfield BG */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {STARS.map((p) => (
          <span
            key={p.id}
            className="star-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.dur,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center gap-3 px-8 py-5 border-b border-[oklch(0.20_0.025_250/0.5)]">
        <img src="/assets/logo.webp" alt="ENDERNET" className="h-8 w-auto" />
        <span className="font-display font-bold text-lg text-[oklch(0.95_0.02_265)]">
          ENDERNET
        </span>
        <span className="ml-2 text-xs text-[oklch(0.84_0.20_191)] bg-[oklch(0.84_0.20_191/0.1)] border border-[oklch(0.84_0.20_191/0.25)] px-2 py-0.5 rounded-full">
          Admin
        </span>
      </header>

      {/* Login form */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div
            className="absolute -inset-px rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.84 0.20 191 / 0.10), transparent 70%)",
            }}
          />

          <div className="relative rounded-2xl border border-[oklch(0.24_0.025_250/0.5)] bg-[oklch(0.10_0.014_255/0.85)] p-8 shadow-2xl backdrop-blur-md">
            <div className="mb-8 text-center">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                style={{
                  background: "oklch(0.84 0.20 191 / 0.10)",
                  border: "1px solid oklch(0.84 0.20 191 / 0.25)",
                }}
              >
                <Lock className="w-6 h-6 text-[oklch(0.84_0.20_191)]" />
              </div>
              <h1 className="font-display font-bold text-2xl text-[oklch(0.95_0.02_265)] mb-1">
                Admin Access
              </h1>
              <p className="text-sm text-[oklch(0.55_0.03_265)]">
                Sign in to manage ENDERNET
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-[oklch(0.75_0.04_265)] text-sm"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] placeholder:text-[oklch(0.40_0.02_265)] focus:border-[oklch(0.84_0.20_191/0.6)] focus:ring-[oklch(0.84_0.20_191/0.2)]"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-[oklch(0.75_0.04_265)] text-sm"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] placeholder:text-[oklch(0.40_0.02_265)] focus:border-[oklch(0.84_0.20_191/0.6)] focus:ring-[oklch(0.84_0.20_191/0.2)]"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[oklch(0.84_0.20_191)] hover:bg-[oklch(0.78_0.22_191)] text-[oklch(0.07_0.014_265)] font-bold py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_oklch(0.84_0.20_191/0.4)] mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
