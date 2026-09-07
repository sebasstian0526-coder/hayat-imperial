"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { buscarProductos, marcas } from "@/lib/productos";
import ProductoCard from "./ProductoCard";
import { useEstadoShop } from "@/lib/estado";
import { SearchX, ArrowUp, ArrowDown } from "lucide-react";

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "caballero", label: "Caballero" },
  { id: "dama", label: "Dama" },
  { id: "unisex", label: "Unisex" },
] as const;

type Categoria = (typeof categorias)[number]["id"];

const LIMITE_PAG = 24;

export default function Catalogo() {
  const { busqueda, seccion, setBusqueda } = useEstadoShop();
  const [categoria, setCategoria] = useState<Categoria>("todos");
  const [marca, setMarca] = useState<string | null>(null);
  const [orden, setOrden] = useState<"defecto" | "menor" | "mayor">("defecto");
  const [visibles, setVisibles] = useState(LIMITE_PAG);

  const marcasLista = useMemo(() => marcas(), []);

  const lista = useMemo(() => {
    const act =
      seccion === "caballero" || seccion === "dama" || seccion === "unisex" || seccion === "todos"
        ? (seccion as Categoria)
        : categoria;
    const base = buscarProductos({ categoria: act, marca, q: busqueda });
    if (orden === "menor") base.sort((a, b) => (a.precio ?? 0) - (b.precio ?? 0));
    if (orden === "mayor") base.sort((a, b) => (b.precio ?? 0) - (a.precio ?? 0));
    return base;
  }, [categoria, marca, orden, busqueda, seccion]);

  const visiblesAhora = lista.slice(0, visibles);

  const reiniciar = () => {
    setVisibles(LIMITE_PAG);
    setCategoria("todos");
    setMarca(null);
    setBusqueda("");
  };

  const usarChips = seccion === "marcas";
  const tipoActivo: Categoria =
    seccion === "caballero" || seccion === "dama" || seccion === "unisex" || seccion === "todos"
      ? (seccion as Categoria)
      : categoria;

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          {categorias.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCategoria(c.id);
                setVisibles(LIMITE_PAG);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tipoActivo === c.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          {usarChips ? (
            <div className="flex w-full flex-wrap gap-2">
              <button
                onClick={() => {
                  setMarca(null);
                  setVisibles(LIMITE_PAG);
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  !marca ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                }`}
              >
                Todas
              </button>
              {marcasLista.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMarca(m === marca ? null : m);
                    setVisibles(LIMITE_PAG);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    marca === m ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {lista.length} fragancia{lista.length !== 1 ? "s" : ""}
              </span>
              <div className="ml-2 flex gap-1 rounded-full bg-muted p-1">
                {[
                  ["defecto", "Relevancia"],
                  ["menor", <ArrowUp key="up" className="h-3 w-3" />],
                  ["mayor", <ArrowDown key="down" className="h-3 w-3" />],
                ].map(([id, label]) => (
                  <button
                    key={id as string}
                    onClick={() => {
                      setOrden(id as typeof orden);
                      setVisibles(LIMITE_PAG);
                    }}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      orden === id ? "bg-foreground text-background" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {lista.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="font-heading text-lg">No encontramos fragancias</p>
          <p className="text-sm text-muted-foreground">
            ProbÃ¡ con otra palabra o limpiÃ¡ los filtros.
          </p>
          <button
            onClick={reiniciar}
            className="mt-2 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-muted"
          >
            Ver todo
          </button>
        </div>
      ) : (
        <>
          <motion.div
            key={`${tipoActivo}-${marca}-${orden}-${busqueda}-${visibles}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {visiblesAhora.map((p, i) => (
              <ProductoCard key={p.id} p={p} i={i} />
            ))}
          </motion.div>

          {visibles < lista.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibles((v) => v + LIMITE_PAG)}
                className="rounded-full border border-border px-8 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Ver mÃ¡s ({lista.length - visibles} restantes)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}