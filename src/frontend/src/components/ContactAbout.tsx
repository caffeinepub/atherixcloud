import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Award, Cloud, Globe, Loader2, Send, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSubmitContactForm } from "../hooks/useQueries";

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
    <section id="contact" className="section-padding relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.84 0.17 191 / 0.3), transparent)",
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
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Get In Touch &{" "}
            <span className="text-gradient-cyan">Learn More</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? Our team is ready to help you find the perfect
            hosting solution.
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
                  ✓ Message sent! We'll respond within 24 hours.
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
                      <p
                        data-ocid="contact.error_state"
                        className="text-xs text-destructive"
                      >
                        {errors.email}
                      </p>
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
                    placeholder="Tell us about your project or ask a question..."
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary resize-none"
                  />
                  {errors.message && (
                    <p
                      data-ocid="contact.error_state"
                      className="text-xs text-destructive"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={isPending}
                  className="w-full rounded-xl bg-primary text-primary-foreground hover:opacity-90 neon-glow"
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
            id="about"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center neon-glow">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground">
                  About AtherixCloud
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2019, AtherixCloud is a next-generation hosting
                provider built by developers, for developers. We started with a
                simple mission: make enterprise-grade hosting accessible to
                everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our global infrastructure spans 15 data centers across 4
                continents, powered entirely by renewable energy. We obsess over
                performance, reliability, and developer experience.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, value: "50K+", label: "Active Clients" },
                { icon: Globe, value: "15", label: "Data Centers" },
                { icon: Award, value: "99.9%", label: "Avg Uptime" },
                { icon: Cloud, value: "2019", label: "Founded" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass-card rounded-xl p-4 flex items-center gap-3"
                  >
                    <Icon className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <div className="font-display font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="font-semibold text-foreground mb-2 text-sm">
                📍 Headquarters
              </div>
              <p className="text-sm text-muted-foreground">
                AtherixCloud Inc. · 100 Cloud Ave, Tech District, San Francisco,
                CA 94105
              </p>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <span className="text-primary">support@atherixcloud.com</span>
                  {" · "}+1 (800) ATHERIX
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
