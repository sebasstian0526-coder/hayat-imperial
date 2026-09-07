import raw from "./productos.json";
import type { Producto } from "./tipos";

export const WHATSAPP = "573235183500";

export function categoriaDe(genero: string): "caballero" | "dama" | "unisex" {
  const g = (genero || "").toLowerCase();
  if (g.includes("mujer") && g.includes("hombre")) return "unisex";
  if (g.includes("mujer")) return "dama";
  if (g.includes("hombre")) return "caballero";
  return "unisex";
}

function conRutaPublica(p: Producto): Producto {
  return {
    ...p,
    img: p.img ? "/" + p.img.replace(/^\/+/, "") : "/hayat.jpg",
    notas_img: p.notas_img ? "/" + p.notas_img.replace(/^\/+/, "") : "",
  };
}

export const productos: Producto[] = (raw as Producto[]).map(conRutaPublica);

export function formatearPrecio(n: number): string {
  return "$ " + Number(n || 0).toLocaleString("en-US") + " COP";
}

export function marcas(): string[] {
  const mapa = new Map<string, number>();
  productos.forEach((p) => {
    const m = p.marca?.trim();
    if (m) mapa.set(m, (mapa.get(m) || 0) + 1);
  });
  return Array.from(mapa.keys()).sort((a, b) => a.localeCompare(b, "es"));
}

export function buscarProductos(opts: {
  categoria: "todos" | "caballero" | "dama" | "unisex";
  marca: string | null;
  q: string;
}): Producto[] {
  const q = opts.q.trim().toLowerCase();
  return productos.filter((p) => {
    if (opts.categoria !== "todos" && categoriaDe(p.genero) !== opts.categoria) return false;
    if (opts.marca && p.marca !== opts.marca) return false;
    if (q) {
      const hay = [p.nombre, p.marca, p.notas_texto].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}