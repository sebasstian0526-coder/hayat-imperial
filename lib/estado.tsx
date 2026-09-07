"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface EstadoShop {
  busqueda: string;
  seccion: string;
  setBusqueda: (q: string) => void;
  setSeccion: (id: string) => void;
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
  const [objetivo, setObjetivo] = useState<string | null>(null);
  const router = useRouter();

  const irSeccion = (id: string) => {
    setSeccion(id);
    if (id === "inicio") {
      if (window.location.pathname !== "/") {
        setObjetivo("inicio");
        router.push("/");
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const destino = destinoDe(id);
    if (document.getElementById(destino)) {
      document
        .getElementById(destino)!
        .scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setObjetivo(destino);
    router.push("/");
  };

  useEffect(() => {
    if (!objetivo) return;
    const t = setTimeout(() => {
      if (objetivo === "inicio") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document
          .getElementById(objetivo)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setObjetivo(null);
    }, 400);
    return () => clearTimeout(t);
  }, [objetivo]);

  useEffect(() => {
    const desplazar = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    desplazar();
    window.addEventListener("hashchange", desplazar);
    return () => window.removeEventListener("hashchange", desplazar);
  }, []);

  return (
    <EstadoContext.Provider value={{ busqueda, seccion, setBusqueda, setSeccion, irSeccion }}>
      {children}
    </EstadoContext.Provider>
  );
}

export function useEstadoShop(): EstadoShop {
  const ctx = useContext(EstadoContext);
  if (!ctx) throw new Error("useEstadoShop debe usarse dentro de <EstadoShopProvider>");
  return ctx;
}