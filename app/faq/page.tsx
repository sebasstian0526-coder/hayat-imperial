"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/productos";

const faqs = [
  ["¿Dónde está ubicada la tienda?", 
   "Estamos en la Calle de la Cruz, Cartagena de Indias (Colombia). También puedes hacer tu pedido por WhatsApp y te lo enviamos a todo el país."],
  ["¿Cómo hago un pedido?",
   "Agrega tus perfumes favoritos al carrito y presiona \"Pedir por WhatsApp\". Se abrirá una conversación con tu pedido listo y solo debes confirmar disponibilidad y envío."],
  ["¿Los perfumes son originales?",
   "Sí. Trabajamos 100% con perfumes originales e importados, sellados y garantizados. Cada producto incluye su empaque original."],
  ["¿Hacen envíos a otras ciudades?",
   "Sí, enviamos a todo Colombia. La entrega en Cartagena puede ser el mismo día o en 24 horas; para otras ciudades el tiempo depende de la transportadora."],
  ["¿Cuál es el costo de envío?",
   "Depende del destino y del peso del pedido. Escríbenos por WhatsApp y te confirmamos el valor exacto antes de enviar."],
  ["¿Qué métodos de pago aceptan?",
   "Aceptamos efectivo y transferencia por Nequi, Bancolombia y otros bancos. Coordinamos el pago por WhatsApp."],
  ["¿Puedo canjear o devolver un perfume?",
   "Aceptamos cambios solo en productos sin estrenar, con su empaque original y dentro de los 3 días posteriores a la compra. Los productos sellados no son reembolsables."],
  ["¿El perfume que compro es el que aparece en la foto?",
   "Sí, mostramos fotos reales de los productos que tenemos en tienda. Si llega a variar una referencia, te lo informamos antes de confirmar el pedido."],
];

export default function FaqPage() {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Ayuda
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Preguntas frecuentes
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Todo lo que necesitas saber sobre pedidos, envíos y nuestros perfumes.
          ¿Tienes otra duda? Escríbenos por WhatsApp.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => {
          const esAbierto = abierto === i;
          return (
            <div key={f[0]} className="rounded-2xl border border-border bg-card">
              <button
                onClick={() => setAbierto(esAbierto ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-heading text-sm font-semibold">{f[0]}</span>
                <motion.span
                  animate={{ rotate: esAbierto ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 rounded-full bg-primary/10 p-1.5 text-primary"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {esAbierto && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {f[1]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">¿No encontraste tu respuesta?</p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola, vengo de la web de Hayat Imperial y tengo una pregunta.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white transition-all hover:scale-[1.03] hover:bg-green-700"
        >
          <MessageCircle className="h-4 w-4" />
          Preguntar por WhatsApp
        </a>
      </div>
    </main>
  );
}