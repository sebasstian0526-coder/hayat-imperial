"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
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

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      /* ignorar */
    }
  }, [items]);

  const agregar = useCallback((p: Producto) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === p.id);
      if (existe) {
        return prev.map((i) => (i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i));
      }
      return [...prev, { id: p.id, nombre: p.nombre, img: p.img, precio: p.precio, cantidad: 1 }];
    });
    setAbierto(true);
  }, []);

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

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito(): CarritoContextValue {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}

export function textoPedidoWhatsApp(items: ItemCarrito[], total: number): string {
  const lineas = items.map(
    (i) => `â€¢ ${i.nombre}\n   Cantidad: ${i.cantidad} x ${formatearPrecio(i.precio)}`
  );
  const cuerpo = [
    "Â¡Hola! Vengo de la pÃ¡gina de Hayat Imperial ðŸŒ¹ y quiero hacer un pedido:",
    "",
    ...lineas,
    "",
    `ðŸ’µ *Total: ${formatearPrecio(total)}*`,
    "",
    "Â¿EstÃ¡ disponible? Â¡Gracias!",
  ].join("\n");
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(cuerpo)}`;
}