"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle } from "lucide-react";
import { useCarrito, textoPedidoWhatsApp } from "@/lib/carrito";
import { formatearPrecio } from "@/lib/productos";

export default function CarritoSheet() {
  const {
    items,
    abierto,
    cerrarCarrito,
    quitar,
    cambiarCantidad,
    limpiar,
    total,
  } = useCarrito();

  const mensaje = textoPedidoWhatsApp(items, total);

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrarCarrito}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-heading flex items-center gap-2 text-lg font-semibold">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Tu carrito
              </h2>
              <button
                onClick={cerrarCarrito}
                className="rounded-md p-2 hover:bg-muted"
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
                <p className="font-heading text-base">Tu carrito estÃ¡ vacÃ­o</p>
                <p className="text-sm text-muted-foreground">
                  ExplorÃ¡ nuestra colecciÃ³n y agregÃ¡ tus favoritos.
                </p>
                <button
                  onClick={cerrarCarrito}
                  className="mt-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background hover:bg-primary hover:text-primary-foreground"
                >
                  Ver productos
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-border bg-card p-3"
                    >
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.nombre}
                          className="h-16 w-16 shrink-0 rounded-lg object-cover bg-muted"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="h-16 w-16 shrink-0 rounded-lg bg-muted" />
                      )}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="line-clamp-2 text-xs font-semibold leading-snug">
                          {item.nombre}
                        </p>
                        <span className="mt-0.5 text-xs text-muted-foreground">
                          {formatearPrecio(item.precio)}
                        </span>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-border px-1 py-0.5">
                            <button
                              onClick={() => cambiarCantidad(item.id, -1)}
                              className="rounded-full p-1 hover:bg-muted"
                              aria-label="Menos"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-semibold">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() => cambiarCantidad(item.id, 1)}
                              className="rounded-full p-1 hover:bg-muted"
                              aria-label="MÃ¡s"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => quitar(item.id)}
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Quitar ${item.nombre}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border px-5 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-heading text-lg font-bold">{formatearPrecio(total)}</span>
                  </div>
                  <a
                    href={mensaje}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-green-700"
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    Pedir por WhatsApp
                  </a>
                  <button
                    onClick={limpiar}
                    className="mt-2 w-full rounded-full py-2 text-xs text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}