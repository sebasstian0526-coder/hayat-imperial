"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, X, Menu } from "lucide-react";
import { useCarrito } from "@/lib/carrito";
import { useEstadoShop } from "@/lib/estado";

export default function Navbar() {
  const { conteo, abrirCarrito } = useCarrito();
  const { setBusqueda, irSeccion } = useEstadoShop();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [busquedaActiva, setBusquedaActiva] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (busquedaActiva) inputRef.current?.focus();
  }, [busquedaActiva]);

const secciones = [
    { id: "inicio", label: "Inicio" },
    { id: "marcas", label: "Marcas" },
    { id: "caballero", label: "Caballero" },
    { id: "dama", label: "Dama" },
    { id: "unisex", label: "Unisex" },
    { id: "faq", label: "FAQ", pag: "/faq" },
    { id: "contacto", label: "Contacto" },
  ];

  const ir = (id: string, pag?: string) => {
    setMenuAbierto(false);
    setBusquedaActiva(false);
    if (pag) {
      router.push(pag);
      return;
    }
    irSeccion(id);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/60" : "bg-background/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <button
          className="rounded-md p-2 hover:bg-muted md:hidden"
          onClick={() => setMenuAbierto((v) => !v)}
          aria-label="Menú"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button onClick={() => ir("inicio")} className="flex items-center gap-2.5">
          <motion.img
            src="/hayat.jpg"
            alt="Hayat Imperial"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-primary/30"
            whileHover={{ scale: 1.06 }}
          />
          <span className="font-heading text-lg font-semibold tracking-wide">
            Hayat <span className="text-primary">Imperial</span>
          </span>
        </button>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-7">
{secciones.map((s) => (
            <button
              key={s.id}
              onClick={() => ir(s.id, s.pag)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="rounded-md p-2 hover:bg-muted"
            aria-label="Buscar"
            onClick={() => setBusquedaActiva((v) => !v)}
          >
            {busquedaActiva ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          <button
            className="relative rounded-md p-2 hover:bg-muted"
            aria-label="Carrito"
            onClick={abrirCarrito}
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {conteo > 0 && (
                <motion.span
                  key="contador"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                >
                  {conteo}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {busquedaActiva && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setBusqueda(e.target.value);
                }}
                placeholder="Buscar perfume, marca o nota..."
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
              {q && (
                <button
                  onClick={() => {
                    setQ("");
                    setBusqueda("");
                  }}
                  className="shrink-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  Limpiar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuAbierto && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
{secciones.map((s) => (
              <button
                key={s.id}
                onClick={() => ir(s.id, s.pag)}
                className="block w-full px-6 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
