"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Producto } from "@/lib/tipos";
import { formatearPrecio } from "@/lib/productos";
import { useCarrito } from "@/lib/carrito";
import { ShoppingBag, Star } from "lucide-react";

const etiquetaCategoria: Record<string, string> = {
  caballero: "Caballero",
  dama: "Dama",
  unisex: "Unisex",
};

export default function ProductoCard({ p, i }: { p: Producto; i: number }) {
  const { agregar } = useCarrito();
  const [errorImg, setErrorImg] = useState(false);

  const cat = p.genero?.toLowerCase().includes("mujer")
    ? "dama"
    : p.genero?.toLowerCase().includes("hombre")
      ? "caballero"
      : "unisex";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {errorImg || !p.img ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted to-card p-4 text-center">
            <span className="font-heading text-lg font-semibold leading-tight">{p.nombre}</span>
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Original
            </span>
          </div>
        ) : (
          <img
            src={p.img}
            alt={p.nombre}
            loading="lazy"
            onError={() => setErrorImg(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm">
          {etiquetaCategoria[cat]}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-bold text-primary-foreground backdrop-blur-sm">
          Original
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary">
          {p.marca}
        </span>
        <h3 className="font-heading line-clamp-2 text-sm font-semibold leading-snug">{p.nombre}</h3>
        <p className="mt-auto flex items-center gap-1 text-[11px] text-muted-foreground">
          <Star className="h-3 w-3 fill-primary text-primary" />
          Notas y fragancia original
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-bold tracking-tight">{formatearPrecio(p.precio)}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => agregar(p)}
            className="flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={`Agregar ${p.nombre} al carrito`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            AÃ±adir
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}