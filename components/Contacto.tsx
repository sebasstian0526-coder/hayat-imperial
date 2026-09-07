"use client";

import { motion } from "motion/react";
import { MapPin, MessageCircle, Clock } from "lucide-react";
import { WHATSAPP } from "@/lib/productos";

export default function Contacto() {
  return (
    <section id="contacto" className="border-t border-border bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 md:grid-cols-3"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-full bg-primary/10 p-4">
              <MapPin className="h-6 w-6 text-primary" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Ubicación</h3>
            <p className="text-sm text-muted-foreground">
              Cartagena · Calle de la Cruz
              <br />
              Centro Histórico, Colombia
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-full bg-primary/10 p-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Pedidos por WhatsApp</h3>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              Escribinos al WhatsApp →
            </a>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-full bg-primary/10 p-4">
              <Clock className="h-6 w-6 text-primary" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Horario</h3>
            <p className="text-sm text-muted-foreground">
              Lunes a sábado
              <br />
              9:00 a.m. – 8:00 p.m.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}