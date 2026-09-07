"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface EstadoShop {
  busqueda: string;
  seccion: string;
  setBusqueda: (q: string) => void;
  irSeccion: (id: string) => void;
}

const EstadoContext = createContext<EstadoShop | null>(null);

function destinoDe(id: string): string {
  if (id === "marcas" || id === "caballero" || id === "dama" || id === "unisex") return "catalogo";
  return id;
}

export function EstadoShopProvider({ children }: { children: ReactNode }) {
  const [busqueda, setBusqueda] = useState("");
  const [seccion, setSeccion] = useState("todos");

  const irSeccion = (id: string) => {
    setSeccion(id);
    if (id === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    requestAnimationFrame(() => {
      const objetivo = document.getElementById(destinoDe(id));
      if (objetivo) objetivo.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <EstadoContext.Provider value={{ busqueda, seccion, setBusqueda, irSeccion }}>
      {children}
    </EstadoContext.Provider>
  );
}

export function useEstadoShop(): EstadoShop {
  const ctx = useContext(EstadoContext);
  if (!ctx) throw new Error("useEstadoShop debe usarse dentro de <EstadoShopProvider>");
  return ctx;
}