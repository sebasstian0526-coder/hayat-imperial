"use client";

import { motion } from "motion/react";

const motas = [
  { top: "10%", left: "6%", size: 260, color: "rgba(212,161,92,0.05)", delay: 0 },
  { top: "60%", left: "78%", size: 320, color: "rgba(212,161,92,0.045)", delay: 0.8 },
  { top: "30%", left: "88%", size: 240, color: "rgba(160,160,170,0.05)", delay: 0.4 },
  { top: "80%", left: "12%", size: 280, color: "rgba(212,161,92,0.04)", delay: 1.2 },
  { top: "18%", left: "40%", size: 220, color: "rgba(190,190,200,0.04)", delay: 1.6 },
  { top: "70%", left: "55%", size: 300, color: "rgba(212,161,92,0.04)", delay: 0.6 },
];

export function FondoAnimado() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% -5%, rgba(255,255,255,0.9), transparent 60%), radial-gradient(50% 45% at 90% 10%, rgba(212,161,92,0.05), transparent 55%), radial-gradient(55% 40% at 50% 110%, rgba(180,180,190,0.06), transparent 60%)",
        }}
      />
      {motas.map((m, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{ top: m.top, left: m.left, width: m.size, height: m.size, background: m.color }}
          animate={{ y: [0, -14, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, delay: m.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}