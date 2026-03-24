import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Canvas, useFrame } from "@react-three/fiber";
import { Award, Cloud, Globe, Loader2, Send, Users } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import { useSubmitContactForm } from "../hooks/useQueries";

function ContactScene() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const group = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.3;
      ring1.current.rotation.y += delta * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.x += delta * 0.25;
      ring2.current.rotation.z -= delta * 0.2;
    }
    if (ring3.current) {
      ring3.current.rotation.y += delta * 0.35;
      ring3.current.rotation.x -= delta * 0.15;
    }
    if (group.current) {
      group.current.rotation.y = t * 0.3;
    }
  });

  const spherePositions = useMemo<[number, number, number][]>(
    () => [
      [1.5, 0, 0],
      [-1.5, 0.5, 0.5],
      [0, 1.2, -0.5],
      [0.8, -1.0, 0.8],
    ],
    [],
  );

  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.016, 12, 80]} />
        <meshBasicMaterial color={0x00e5ff} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[2.6, 0.01, 12, 80]} />
        <meshBasicMaterial color={0xa855f7} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
        <torusGeometry args={[1.5, 0.012, 12, 80]} />
        <meshBasicMaterial color={0x00e5ff} transparent opacity={0.3} />
      </mesh>
      <group ref={group}>
        {spherePositions.map((pos) => (
          <mesh key={`${pos[0]}-${pos[1]}-${pos[2]}`} position={pos}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color={0x00e5ff} />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function ContactAbout() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending, isSuccess } = useSubmitContactForm();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutate(form, {
      onSuccess: () => setForm({ name: "", email: "", message: "" }),
    });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1]}
          frameloop="demand"
          gl={{ antialias: false, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 3]} intensity={1} color={0x00e5ff} />
          <ContactScene />
        </Canvas>
      </div>

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.84 0.17 191 / 0.3), transparent)",
        }}
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Get In Touch &{" "}
            <span className="text-gradient-cyan">Learn More</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? Our team is ready to help you find the perfect
            hosting solution for your business in India, Delhi &amp; Nepal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Send a Message
              </h3>
              {isSuccess && (
                <div
                  data-ocid="contact.success_state"
                  className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium"
                >
                  ✓ Message sent! We&apos;ll respond within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-foreground text-sm">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      data-ocid="contact.input"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                    />
                    {errors.name && (
                      <p
                        data-ocid="contact.error_state"
                        className="text-xs text-destructive"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-foreground text-sm">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      data-ocid="contact.input"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-foreground text-sm">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="contact.textarea"
                    placeholder="Tell us about your project or ask us anything..."
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={isPending}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold neon-glow"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                About AtherixCloud
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded by infrastructure engineers with a mission to
                democratize enterprise-grade hosting. We believe every developer
                in India, Delhi &amp; Nepal deserves blazing-fast, reliable, and
                affordable cloud infrastructure.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From solo developers to growing businesses, we power thousands
                of websites and applications across India and Nepal. Our
                strategically located Delhi data center ensures ultra-low
                latency for the region.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  {
                    icon: Globe,
                    title: "Delhi Data Center",
                    desc: "Serving India &amp; Nepal",
                  },
                  {
                    icon: Users,
                    title: "50,000+ Clients",
                    desc: "From startups to enterprise",
                  },
                  {
                    icon: Award,
                    title: "Award Winning",
                    desc: "Best Cloud Provider 2024",
                  },
                  {
                    icon: Cloud,
                    title: "99.99% Uptime",
                    desc: "Enterprise SLA guarantee",
                  },
                ] as const
              ).map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-4"
                >
                  <Icon className="w-6 h-6 text-primary mb-2" />
                  <p className="text-foreground text-sm font-semibold">
                    {title}
                  </p>
                  <p
                    className="text-muted-foreground text-xs mt-0.5"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: static trusted string
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
