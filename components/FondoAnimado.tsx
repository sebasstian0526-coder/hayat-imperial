"use client";

import { motion } from "motion/react";

const motas = [
  { top: "12%", left: "8%", size: 5, delay: 0 },
  { top: "22%", left: "78%", size: 7, delay: 0.8 },
  { top: "35%", left: "15%", size: 4, delay: 0.4 },
  { top: "48%", left: "88%", size: 6, delay: 1.2 },
  { top: "58%", left: "6%", size: 8, delay: 0.2 },
  { top: "68%", left: "70%", size: 4, delay: 1.6 },
  { top: "78%", left: "30%", size: 5, delay: 0.6 },
  { top: "88%", left: "92%", size: 6, delay: 1.0 },
];

export function FondoAnimado() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(212,161,92,0.06), transparent 60%), radial-gradient(ellipse 50% 35% at 85% 15%, rgba(212,161,92,0.05), transparent 55%), radial-gradient(ellipse 45% 30% at 50% 100%, rgba(212,161,92,0.04), transparent 60%)",
        }}
      />
      {motas.map((m, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/15 blur-[1px]"
          style={{ top: m.top, left: m.left, width: m.size, height: m.size }}
          animate={{ y: [0, -22, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, delay: m.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}