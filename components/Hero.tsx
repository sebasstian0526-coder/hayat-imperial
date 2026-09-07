"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useEstadoShop } from "@/lib/estado";

export default function Hero() {
  const { irSeccion } = useEstadoShop();

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,161,92,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 20%, rgba(212,161,92,0.10), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 30%, rgba(212,161,92,0.08), transparent 55%)",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 pb-20 pt-24 text-center sm:px-6 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          PerfumerÃ­a Original Â· Cartagena, Calle de la Cruz
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
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
          className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Descubre una colecciÃ³n exclusiva de perfumes importados y originales para
          hombre, mujer y unisex. EnvÃ­os a todo Colombia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => irSeccion("caballero")}
            className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.03] hover:bg-primary hover:text-primary-foreground"
          >
            Ver ColecciÃ³n
          </button>
          <button
            onClick={() => irSeccion("marcas")}
            className="rounded-full border border-border px-7 py-3 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Explorar Marcas
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center"
        >
          {[
            ["371+", "Fragancias"],
            ["100%", "Originales"],
            ["24h", "EnvÃ­o Colombia"],
            ["ðŸ’¬", "Pedidos WhatsApp"],
          ].map(([num, label]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-heading text-2xl font-semibold text-primary">{num}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}