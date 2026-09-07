import raw from "./productos.json";
import type { Producto } from "./tipos";

export const ADMIN_PIN = "0000";
export const CLAVE_ADMIN = "hayat_admin_session";
export const CLAVE_VENTAS = "hayat_ventas";
export const CLAVE_PRECIOS = "hayat_precios";
export const CLAVE_ADICIONES = "hayat_adiciones";

export interface Venta {
  fecha: string;
  categoria: "caballero" | "dama" | "unisex";
  nombre: string;
  marca: string;
  cat: string;
  cant: number;
  precio: number;
  total: number;
  id: string;
}

export interface Adicion extends Producto {
  _nuevo?: boolean;
}

function leer<T>(clave: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(clave);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function guardar(clave: string, valor: unknown): boolean {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

let avisoSesion: (() => void) | null = null;

function notificarSesion(): void {
  if (avisoSesion) avisoSesion();
}

export function suscribirSesion(cb: () => void): () => void {
  avisoSesion = cb;
  return () => {
    if (avisoSesion === cb) avisoSesion = null;
  };
}

export function esAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(CLAVE_ADMIN) === "1";
}

export function entrarAdmin(pin: string): boolean {
  const ok = pin.trim() === ADMIN_PIN;
  if (ok) {
    try {
      sessionStorage.setItem(CLAVE_ADMIN, "1");
    } catch {
      /* ignorar */
    }
    notificarSesion();
  }
  return ok;
}

export function salirAdmin(): void {
  try {
    sessionStorage.removeItem(CLAVE_ADMIN);
  } catch {
    /* ignorar */
  }
  notificarSesion();
}

export function leerVentas(): Venta[] {
  return leer<Venta[]>(CLAVE_VENTAS, []);
}

export function guardarVentas(v: Venta[]): boolean {
  return guardar(CLAVE_VENTAS, v);
}

export function leerAdiciones(): Adicion[] {
  return leer<Adicion[]>(CLAVE_ADICIONES, []);
}

export function guardarAdiciones(a: Adicion[]): boolean {
  return guardar(CLAVE_ADICIONES, a);
}

export function precioPersonalizado(id: string): number | null {
  const sobre = leer<{ precios?: { id: string; precio: number }[] }>(CLAVE_PRECIOS, {});
  const arr = Array.isArray(sobre?.precios) ? sobre.precios : [];
  const en = arr.find((o) => o.id === id);
  return en ? Number(en.precio) : null;
}

export function guardarPrecios(edits: { id: string; precio: number }[]): boolean {
  const prev = leer<{ precios?: { id: string; precio: number }[] }>(CLAVE_PRECIOS, {});
  const all = (Array.isArray(prev?.precios) ? prev.precios : []).slice();
  edits.forEach((e) => {
    const f = all.find((x) => x.id === e.id);
    if (f) f.precio = e.precio;
    else all.push(e);
  });
  return guardar(CLAVE_PRECIOS, { precios: all });
}

export interface AdminProducto extends Producto {
  _nuevo: boolean;
}

export function catalogAdmin(): AdminProducto[] {
  const base = (raw as Producto[]).map((p) => ({ ...p, _nuevo: false }));
  const adiciones = leerAdiciones().map((p) => ({ ...p, _nuevo: true, img: "/" + (p.img || "").replace(/^\/+/, "") }));
  const todos = [...base, ...adiciones];
  todos.forEach((p) => {
    const sobre = precioPersonalizado(p.id);
    if (sobre != null) p.precio = sobre;
  });
  return todos;
}

export function registrarVenta(p: AdminProducto, cant: number, precio: number): Venta {
  const d = new Date();
  const fecha = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
  const categoria = categoriaDe(p.genero);
  const venta: Venta = {
    fecha,
    categoria,
    nombre: p.nombre,
    marca: p.marca,
    cat: etiquetaCategoria(categoria),
    cant,
    precio,
    total: cant * precio,
    id: p.id,
  };
  const todas = leerVentas();
  todas.push(venta);
  guardarVentas(todas);
  return venta;
}

export function hoyStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function mesStr(): string {
  return hoyStr().slice(0, 7);
}

export function fmtFecha(iso: string): string {
  const p = String(iso).split("-");
  return `${p[2] || ""}/${p[1] || ""}/${p[0] || ""}`;
}

export function fmtCOP(n: number): string {
  return "$ " + Number(n || 0).toLocaleString("es-CO");
}

export function categoriaDe(genero: string): "caballero" | "dama" | "unisex" {
  const g = (genero || "").toLowerCase();
  if (g.includes("mujer") && g.includes("hombre")) return "unisex";
  if (g.includes("mujer")) return "dama";
  if (g.includes("hombre")) return "caballero";
  return "unisex";
}

export function etiquetaCategoria(c: string): string {
  return c === "caballero" ? "Caballero" : c === "dama" ? "Dama" : "Unisex";
}

export function slug(s: string): string {
  return (
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "perfume"
  );
}

export function generarProductosJson(): string {
  const base = raw as Producto[];
  const adiciones = leerAdiciones();
  const sobre = leer<{ precios?: { id: string; precio: number }[] }>(CLAVE_PRECIOS, {});
  const mapa = new Map<string, number>();
  (Array.isArray(sobre?.precios) ? sobre.precios : []).forEach((o) => mapa.set(o.id, o.precio));

  const pondera = (p: Producto) => {
    const precio = mapa.get(p.id);
    return precio != null ? { ...p, precio } : p;
  };

  const lista = [
    ...base.map(pondera),
    ...adiciones.map((a) => {
      const c = { ...a };
      delete c._nuevo;
      return c;
    }),
  ];

  const limpiar = (p: Producto | Adicion) => {
    const obj: Record<string, unknown> = {};
    Object.keys(p)
      .filter((k) => k !== "_nuevo")
      .forEach((k) => {
        const v = (p as unknown as Record<string, unknown>)[k];
        obj[k] = typeof v === "string" ? String(v).replace(/^\//, "") : v;
      });
    return obj;
  };

  return JSON.stringify(lista.map(limpiar), null, 1);
}

export function descargarProductos(nombre = "productos.json"): void {
  const blob = new Blob([generarProductosJson()], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}