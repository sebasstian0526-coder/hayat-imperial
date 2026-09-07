"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Producto } from "./tipos";
import { WHATSAPP, formatearPrecio } from "./productos";

interface ItemCarrito {
  id: string;
  nombre: string;
  img: string;
  precio: number;
  cantidad: number;
}

interface CarritoContextValue {
  items: ItemCarrito[];
  abierto: boolean;
  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  agregar: (p: Producto) => void;
  quitar: (id: string) => void;
  cambiarCantidad: (id: string, delta: number) => void;
  limpiar: () => void;
  total: number;
  conteo: number;
}

const CarritoContext = createContext<CarritoContextValue | null>(null);

const CLAVE = "hayat_carrito";

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const guardado = localStorage.getItem(CLAVE);
      return guardado ? (JSON.parse(guardado) as ItemCarrito[]) : [];
    } catch {
      return [];
    }
  });
  const [abierto, setAbierto] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      /* ignorar */
    }
  }, [items]);

  const mostrarToast = useCallback((titulo: string) => {
    setToast(titulo);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const agregar = useCallback(
    (p: Producto) => {
      setItems((prev) => {
        const existe = prev.find((i) => i.id === p.id);
        if (existe) {
          return prev.map((i) => (i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i));
        }
        return [...prev, { id: p.id, nombre: p.nombre, img: p.img, precio: p.precio, cantidad: 1 }];
      });
      mostrarToast(p.nombre);
    },
    [mostrarToast]
  );

  const quitar = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const cambiarCantidad = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i))
        .filter((i) => i.cantidad > 0)
    );
  }, []);

  const limpiar = useCallback(() => setItems([]), []);

  const { total, conteo } = useMemo(() => {
    const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    const conteo = items.reduce((acc, i) => acc + i.cantidad, 0);
    return { total, conteo };
  }, [items]);

  const valor = useMemo<CarritoContextValue>(
    () => ({
      items,
      abierto,
      abrirCarrito: () => setAbierto(true),
      cerrarCarrito: () => setAbierto(false),
      agregar,
      quitar,
      cambiarCantidad,
      limpiar,
      total,
      conteo,
    }),
    [items, abierto, agregar, quitar, cambiarCantidad, limpiar, total, conteo]
  );

  return (
    <CarritoContext.Provider value={valor}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast-carrito"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className="fixed bottom-6 left-1/2 z-[80] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-2xl"
            role="status"
          >
            <span className="shrink-0 rounded-full bg-green-500/15 p-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">Perfume añadido al carrito</p>
              <p className="truncate text-xs text-muted-foreground">{toast}</p>
            </div>
            <button
              onClick={() => setAbierto(true)}
              className="shrink-0 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:bg-primary hover:text-primary-foreground"
            >
              Ver carrito
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </CarritoContext.Provider>
  );
}

export function useCarrito(): CarritoContextValue {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}

export function textoPedidoWhatsApp(items: ItemCarrito[], total: number): string {
  const lineas = items.map(
    (i) => `• ${i.nombre}\n   Cantidad: ${i.cantidad} x ${formatearPrecio(i.precio)}`
  );
  const cuerpo = [
    "¡Hola! Vengo de la página de Hayat Imperial 🌹 y quiero hacer un pedido:",
    "",
    ...lineas,
    "",
    `💵 *Total: ${formatearPrecio(total)}*`,
    "",
    "¿Está disponible? ¡Gracias!",
  ].join("\n");
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(cuerpo)}`;
}