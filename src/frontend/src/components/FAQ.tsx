import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { useRef } from "react";
import type * as THREE from "three";
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

function IcosahedronDecor() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.15;
      const pulse = Math.sin(state.clock.elapsedTime * 1.2) * 0.05 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          color={0xa855f7}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color={0x00e5ff}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

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

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            data-ocid="faq.panel"
          >
            <FAQColumn faqs={items.slice(0, half)} startIndex={1} />
          </motion.div>

          {/* 3D Icosahedron Decor - hidden on mobile */}
          <div className="hidden lg:block w-48 h-48 self-center shrink-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              dpr={[1, 1.5]}
              frameloop="demand"
              gl={{ antialias: false, alpha: true }}
              style={{ width: "100%", height: "100%" }}
            >
              <ambientLight intensity={0.4} />
              <pointLight
                position={[3, 3, 3]}
                intensity={1.5}
                color={0xa855f7}
              />
              <IcosahedronDecor />
            </Canvas>
          </div>

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
