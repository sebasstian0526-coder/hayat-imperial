"use client";

import { motion } from "motion/react";
import { Sparkles, MessageCircle, Truck, Droplets } from "lucide-react";
import { useEstadoShop } from "@/lib/estado";

const stats = [
  { icon: Droplets, num: "371+", label: "Fragancias" },
  { icon: Sparkles, num: "100%", label: "Originales" },
  { icon: Truck, num: "24h", label: "Envío Colombia" },
  { icon: MessageCircle, num: "WhatsApp", label: "Pedidos directos" },
];

export default function Hero() {
  const { irSeccion } = useEstadoShop();

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,161,92,0.20), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 20%, rgba(212,161,92,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 30%, rgba(212,161,92,0.09), transparent 55%)",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Perfumería Original · Cartagena, Calle de la Cruz
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Fragancias que
          <br />
          <span className="bg-gradient-to-r from-primary via-[#c9a86a] to-primary bg-clip-text text-transparent">
            dejan huella
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="max-w-xl text-base font-normal leading-relaxed text-muted-foreground sm:text-lg"
        >
          Descubre una colección exclusiva de perfumes importados y originales para
          hombre, mujer y unisex. Envíos a todo Colombia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => irSeccion("caballero")}
            className="rounded-full bg-foreground px-8 py-3.5 text-sm font-bold text-background transition-all hover:scale-[1.03] hover:bg-primary hover:text-primary-foreground"
          >
            Ver Colección
          </button>
          <button
            onClick={() => irSeccion("marcas")}
            className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Explorar Marcas
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 text-center sm:grid-cols-4"
        >
          {stats.map(({ icon: Icon, num, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="rounded-full bg-primary/10 p-2.5 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-heading text-2xl font-bold text-primary">{num}</span>
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}