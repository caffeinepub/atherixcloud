import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import type { FAQ as FAQType } from "../backend.d";
import { useFAQs } from "../hooks/useQueries";

const FALLBACK: FAQType[] = [
  {
    question: "What hosting plans do you offer?",
    answer:
      "We offer Shared Hosting starting at $4.99/mo, VPS from $19.99/mo, Cloud Hosting from $29.99/mo, and Dedicated Servers from $79.99/mo. Each plan is designed for different scale requirements.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely. You can upgrade your plan at any time directly from your control panel. Downgrades take effect at the next billing cycle. All migrations are handled with zero downtime.",
  },
  {
    question: "What is your uptime guarantee?",
    answer:
      "We guarantee 99.9% uptime for all plans, backed by our SLA. Dedicated Server plans include a 99.99% SLA. If we fail to meet this, you'll receive credit on your next invoice.",
  },
  {
    question: "Do you offer free migrations?",
    answer:
      "Yes! Our expert migration team will move your website, databases, and emails for free. We handle the entire process with zero downtime so you can focus on your business.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "We offer a 30-day money-back guarantee on all shared and cloud hosting plans. If you're not 100% satisfied, just contact our support team and we'll issue a full refund.",
  },
  {
    question: "How does DDoS protection work?",
    answer:
      "All plans include our multi-layered DDoS mitigation system that automatically detects and filters malicious traffic in real time, keeping your applications protected and online during attacks.",
  },
];

function FAQColumn({
  faqs,
  startIndex,
}: { faqs: FAQType[]; startIndex: number }) {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={faq.question}
          value={`faq-${startIndex + i}`}
          data-ocid={`faq.item.${startIndex + i}`}
          className="glass-card rounded-xl border-0 px-5"
        >
          <AccordionTrigger className="text-foreground text-sm font-semibold hover:no-underline py-4 text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function FAQ() {
  const { data } = useFAQs();
  const items = data && data.length > 0 ? data : FALLBACK;
  const half = Math.ceil(items.length / 2);

  return (
    <section id="faq" className="section-padding relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.62 0.27 293 / 0.3), transparent)",
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-semibold mb-4">
            FAQ
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Frequently Asked{" "}
            <span className="text-gradient-purple">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about AtherixCloud hosting.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-6"
          data-ocid="faq.panel"
        >
          <FAQColumn faqs={items.slice(0, half)} startIndex={1} />
          <FAQColumn faqs={items.slice(half)} startIndex={half + 1} />
        </motion.div>
      </div>
    </section>
  );
}
