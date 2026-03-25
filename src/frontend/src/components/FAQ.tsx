import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { useFAQs } from "../hooks/useQueries";

interface FAQType {
  question: string;
  answer: string;
}

const FALLBACK: FAQType[] = [
  {
    question: "What hosting plans do you offer?",
    answer:
      "We offer VPS hosting in two categories: Intel VPS (high-performance, Indian nodes) and Cheap VPS (budget-friendly, dedicated resources). All plans are billed in INR/NPR.",
  },
  {
    question: "How do I purchase a plan?",
    answer:
      "We don't have a billing panel. Join our Discord server and open a ticket to purchase any plan. Our team will guide you through the process.",
  },
  {
    question: "What is your uptime guarantee?",
    answer:
      "We guarantee 99.9% uptime for all VPS plans. Our Indian nodes are optimised for low-latency access from India, Delhi, and Nepal.",
  },
  {
    question: "Do you offer free migrations?",
    answer:
      "Yes! Open a ticket on our Discord and our team will assist with migrating your existing setup to AtherixCloud.",
  },
  {
    question: "Is there DDoS protection?",
    answer:
      "All plans include DDoS protection. Our multi-layered mitigation system filters malicious traffic in real time to keep your services online.",
  },
  {
    question: "Which OS is supported?",
    answer:
      "All VPS plans support Ubuntu and Debian. Pterodactyl + Wings panel is also supported out of the box for game server hosting.",
  },
];

function FAQColumn({
  faqs,
  startIndex,
}: { faqs: FAQType[]; startIndex: number }) {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div
          key={faq.question}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <AccordionItem
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
        </motion.div>
      ))}
    </Accordion>
  );
}

export default function FAQ() {
  const { data } = useFAQs();
  const items =
    data && data.length > 0 ? (data as unknown as FAQType[]) : FALLBACK;
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

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            data-ocid="faq.panel"
          >
            <FAQColumn faqs={items.slice(0, half)} startIndex={1} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <FAQColumn faqs={items.slice(half)} startIndex={half + 1} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
