"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  LogOut,
  LayoutDashboard,
  Boxes,
  BadgeDollarSign,
  History,
  Plus,
  Save,
  Download,
  X,
  ImagePlus,
  Search,
  Check,
  Store,
  DollarSign,
  TrendingUp,
  Package,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import {
  AdminProducto,
  catalogAdmin,
  categoriaDe,
  descargarProductos,
  entrarAdmin,
  esAdmin,
  etiquetaCategoria,
  fmtCOP,
  fmtFecha,
  guardarAdiciones,
  guardarPrecios,
  hoyStr,
  leerAdiciones,
  leerVentas,
  mesStr,
  registrarVenta,
  salirAdmin,
  slug,
  suscribirSesion,
  Venta,
} from "@/lib/admin";

type Vista = "resumen" | "inventario" | "ventas" | "historial";

const pestañas: { id: Vista; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "inventario", label: "Inventario", icon: Boxes },
  { id: "ventas", label: "Ventas", icon: BadgeDollarSign },
  { id: "historial", label: "Historial", icon: History },
];

function EstadoVacio({ icon: Icon, texto }: { icon: typeof Package; texto: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-10 text-center">
      <Icon className="h-8 w-8 text-muted-foreground/40" />
      <p className="text-sm text-muted-foreground">{texto}</p>
    </div>
  );
}

function Login() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const intentar = () => {
    if (entrarAdmin(pin)) {
      setPin("");
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 text-center shadow-xl"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="font-heading text-2xl font-bold">Panel Hayat Imperial</h1>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">Acceso restringido al administrador</p>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && intentar()}
          placeholder="Contraseña"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-center text-lg font-bold tracking-[0.3em] outline-none focus:border-primary"
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-destructive">Contraseña incorrecta</p>}
        <button
          onClick={intentar}
          className="mt-4 w-full rounded-full bg-foreground py-3.5 text-sm font-bold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Entrar
        </button>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Store className="h-3.5 w-3.5" /> Volver a la tienda
        </Link>
      </motion.div>
    </main>
  );
}

export default function AdminPanel() {
  const [vista, setVista] = useState<Vista>("resumen");
  const [tick, setTick] = useState(0);
  const logueado = useSyncExternalStore(suscribirSesion, esAdmin, () => false);

  const recargar = useCallback(() => setTick((t) => t + 1), []);
  const cat = useMemo(() => (logueado ? catalogAdmin() : []), [logueado, tick]);

  if (!logueado) return <Login />;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Panel · Hayat Imperial</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted"
          >
            <Store className="h-3.5 w-3.5" /> Ver tienda
          </Link>
          <button
            onClick={() => salirAdmin()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" /> Salir
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-1.5 rounded-2xl border border-border bg-card p-1.5 sm:flex sm:gap-2">
        {pestañas.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setVista(id)}
            className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors sm:flex-1 sm:flex-row sm:justify-center sm:gap-2 sm:px-5 ${
              vista === id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={vista}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {vista === "resumen" && <Resumen cat={cat} />}
          {vista === "inventario" && <Inventario cat={cat} recargar={recargar} />}
          {vista === "ventas" && <Ventas cat={cat} recargar={recargar} />}
          {vista === "historial" && <Historial />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

function Resumen({ cat }: { cat: AdminProducto[] }) {
  const ventas = leerVentas();
  const hoy = hoyStr();
  const mes = mesStr();
  const deHoy = ventas.filter((v) => String(v.fecha).startsWith(hoy));
  const delMes = ventas.filter((v) => String(v.fecha).startsWith(mes));
  const ingresosHoy = deHoy.reduce((s, v) => s + Number(v.total || 0), 0);
  const ingresosMes = delMes.reduce((s, v) => s + Number(v.total || 0), 0);
  const unidadesHoy = deHoy.reduce((s, v) => s + Number(v.cant || 0), 0);

  const stats = [
    { icon: DollarSign, label: "Ingresos hoy", valor: fmtCOP(ingresosHoy), color: "text-green-600 bg-green-500/10" },
    { icon: TrendingUp, label: "Ingresos del mes", valor: fmtCOP(ingresosMes), color: "text-primary bg-primary/10" },
    { icon: Package, label: "Unidades hoy", valor: String(unidadesHoy), color: "text-blue-600 bg-blue-500/10" },
    { icon: Receipt, label: "Ventas hoy", valor: String(deHoy.length), color: "text-destructive bg-destructive/10" },
  ];

  const top = useMemo(() => {
    const mapa = new Map<string, { cant: number; total: number }>();
    ventas.forEach((v) => {
      const a = mapa.get(v.nombre) || { cant: 0, total: 0 };
      a.cant += Number(v.cant || 0);
      a.total += Number(v.total || 0);
      mapa.set(v.nombre, a);
    });
    return Array.from(mapa.entries())
      .sort((a, b) => b[1].cant - a[1].cant)
      .slice(0, 5);
  }, [cat, ventas]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <span className={`mb-3 inline-flex rounded-xl p-2.5 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="font-heading mt-1 truncate text-xl font-bold sm:text-2xl">{s.valor}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
          Perfumes más vendidos
        </h2>
        {top.length === 0 ? (
          <EstadoVacio icon={Package} texto="Sin ventas todavía" />
        ) : (
          <ul className="space-y-2">
            {top.map(([nombre, d], i) => (
              <li
                key={nombre}
                className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-4 py-2.5 text-sm"
              >
                <span className="font-semibold">
                  {i + 1}. {nombre}
                </span>
                <span className="text-xs text-muted-foreground">
                  {d.cant} u · {fmtCOP(d.total)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
          Ventas recientes
        </h2>
        {ventas.length === 0 ? (
          <EstadoVacio icon={Receipt} texto="Aún no hay ventas registradas" />
        ) : (
          <ul className="space-y-2">
            {ventas
              .slice(-12)
              .reverse()
              .map((v, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-4 py-2.5 text-sm"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{v.cat}</p>
                    <p className="truncate font-semibold">{v.nombre}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{fmtCOP(v.total)}</p>
                    <p className="text-xs text-muted-foreground">
                      {fmtFecha(v.fecha)} · x{v.cant}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Inventario({ cat, recargar }: { cat: AdminProducto[]; recargar: () => void }) {
  const [q, setQ] = useState("");
  const [marca, setMarca] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [precios, setPrecios] = useState<Record<string, string>>({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  const marcas = useMemo(
    () => Array.from(new Set(cat.map((p) => p.marca).filter(Boolean))).sort((a, b) => a.localeCompare(b, "es")),
    [cat]
  );

  const lista = useMemo(
    () =>
      cat.filter((p) => {
        const c = p._nuevo ? "nuevo" : categoriaDe(p.genero);
        if (filtro === "nuevo" && !p._nuevo) return false;
        if (filtro !== "todos" && filtro !== "nuevo" && c !== filtro) return false;
        if (marca && p.marca !== marca) return false;
        if (q && !`${p.nombre} ${p.marca}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [cat, q, marca, filtro]
  );

  const flash = (m: string) => {
    setAviso(m);
    setTimeout(() => setAviso(null), 2400);
  };

  const aplicarPrecios = () => {
    const edits: { id: string; precio: number }[] = [];
    cat.forEach((p) => {
      const v = precios[p.id];
      if (v == null) return;
      const num = parseInt(v.replace(/[^\d]/g, ""), 10);
      if (!isNaN(num) && num >= 0 && num !== p.precio) edits.push({ id: p.id, precio: num });
    });
    if (edits.length === 0) return flash("Sin cambios de precio");
    guardarPrecios(edits);
    flash(`Guardados ${edits.length} precios`);
    setPrecios({});
    recargar();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar perfume o marca..."
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <select
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="">Todas las marcas</option>
          {marcas.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <div className="flex gap-1.5">
          <button
            onClick={aplicarPrecios}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-xs font-bold text-background hover:bg-primary hover:text-primary-foreground"
          >
            <Save className="h-3.5 w-3.5" /> Guardar
          </button>
          <button
            onClick={() => descargarProductos()}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" /> productos.json
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {[
          ["todos", "Todos"],
          ["caballero", "Caballero"],
          ["dama", "Dama"],
          ["unisex", "Unisex"],
          ["nuevo", "Añadidos"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFiltro(id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filtro === id ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => setMostrarFormulario((v) => !v)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-primary px-4 py-1.5 text-xs font-bold text-primary hover:bg-primary/10"
        >
          <Plus className="h-3.5 w-3.5" /> Añadir perfume
        </button>
      </div>

      {mostrarFormulario && <FormularioNuevo recargar={recargar} cerrar={() => setMostrarFormulario(false)} />}

      {aviso && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl bg-green-500/10 px-4 py-2.5 text-sm font-semibold text-green-700"
        >
          {aviso}
        </motion.p>
      )}

      <p className="text-xs text-muted-foreground">
        Mostrando {lista.length} de {cat.length} perfumes.
      </p>

      {lista.length === 0 ? (
        <EstadoVacio icon={Package} texto="Sin resultados" />
      ) : (
        <ul className="space-y-2">
          {lista.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
            >
              <img
                src={p.img || "/hayat.jpg"}
                alt=""
                className="h-12 w-12 shrink-0 rounded-lg border border-border bg-muted object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary">
                  {p.marca} <span className="ml-1 text-muted-foreground">· {etiquetaCategoria(categoriaDe(p.genero))}</span>
                  {p._nuevo && <span className="ml-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">NUEVO</span>}
                </p>
                <p className="truncate text-sm font-semibold">{p.nombre}</p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="shrink-0 text-xs text-muted-foreground">{fmtCOP(p.precio)}</span>
                <input
                  value={precios[p.id] ?? String(p.precio)}
                  onChange={(e) => setPrecios((prev) => ({ ...prev, [p.id]: e.target.value }))}
                  inputMode="numeric"
                  className="w-28 rounded-xl border border-border bg-background px-3 py-2 text-right text-sm outline-none focus:border-primary"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FormularioNuevo({ recargar, cerrar }: { recargar: () => void; cerrar: () => void }) {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [genero, setGenero] = useState<"caballero" | "dama" | "unisex">("caballero");
  const [precio, setPrecio] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onFoto = (archivo: File | undefined) => {
    if (!archivo) return;
    const reader = new FileReader();
    reader.onload = () => setImg(String(reader.result));
    reader.readAsDataURL(archivo);
  };

  const guardar = () => {
    if (!nombre.trim() || !marca.trim()) return setError("Nombre y marca son obligatorios");
    const precioNum = parseInt(precio.replace(/[^\d]/g, ""), 10);
    if (isNaN(precioNum) || precioNum <= 0) return setError("Precio inválido");
    const marcaSlug = slug(marca);
    let id = slug(nombre) + "-" + marcaSlug;
    let n = 1;
    const cat = catalogAdmin();
    while (cat.some((p) => p.id === id)) id = slug(nombre) + "-" + marcaSlug + "-" + n++;
    const nueva = {
      id,
      marca: marca.trim(),
      marca_slug: marcaSlug,
      nombre: nombre.trim(),
      genero: genero === "caballero" ? "Hombres" : genero === "dama" ? "Mujeres" : "Hombres y mujeres",
      categoria: genero,
      precio: precioNum,
      precio_num: precioNum,
      img: img || "img/perfumes/placeholder.jpg",
      notas_img: "",
      notas_texto: texto.trim(),
      pagina: 0,
    };
    const adiciones = leerAdiciones();
    adiciones.push(nueva);
    if (!guardarAdiciones(adiciones)) return setError("Imagen demasiado pesada para guardar");
    recargar();
    cerrar();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden rounded-2xl border border-primary/40 bg-card"
    >
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading flex items-center gap-2 text-lg font-bold">
            <Plus className="h-5 w-5 text-primary" /> Añadir perfume
          </h3>
          <button onClick={cerrar} className="rounded-md p-1.5 hover:bg-muted" aria-label="Cerrar">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre (ej. AMBER OUD)"
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Marca (ej. LATTAFA)"
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value as "caballero" | "dama" | "unisex")}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="caballero">Caballero</option>
            <option value="dama">Dama</option>
            <option value="unisex">Unisex</option>
          </select>
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio (COP)"
            inputMode="numeric"
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Especificaciones (opcional)"
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary sm:col-span-2"
          />
        </div>
        <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-primary/50 px-4 py-6 text-center text-sm text-muted-foreground hover:border-primary">
          <ImagePlus className="h-6 w-6 text-primary" />
          {img ? "Foto lista ✓" : "Subir foto del perfume"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => onFoto(e.target.files?.[0])} />
        </label>
        {img && (
          <div className="mt-3 flex justify-center">
            <img src={img} alt="Vista previa" className="h-24 w-24 rounded-xl border border-border object-cover" />
          </div>
        )}
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={cerrar}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted"
          >
            Cancelar
          </button>
          <button
            onClick={guardar}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background hover:bg-primary hover:text-primary-foreground"
          >
            <Check className="h-4 w-4" /> Guardar perfume
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Ventas({ cat, recargar }: { cat: AdminProducto[]; recargar: () => void }) {
  const [categoria, setCategoria] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [precio, setPrecio] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);

  const disponibles = useMemo(
    () => (categoria ? cat.filter((p) => categoriaDe(p.genero) === categoria) : []),
    [cat, categoria]
  );

  const seleccionado = useMemo(
    () => cat.find((p) => p.id === productoId) || null,
    [cat, productoId]
  );

  const total = (parseInt(cantidad || "0", 10) || 0) * (parseInt(precio || "0", 10) || 0);

  const flash = (m: string) => {
    setAviso(m);
    setTimeout(() => setAviso(null), 2400);
  };

  const registrar = () => {
    if (!seleccionado) return flash("Elige un perfume");
    const cant = parseInt(cantidad || "0", 10);
    const pre = parseInt(precio || "0", 10);
    if (cant <= 0 || pre <= 0) return flash("Cantidad y precio válidos");
    registrarVenta(seleccionado, cant, pre);
    flash("Venta registrada");
    setProductoId("");
    setCantidad("1");
    setPrecio("");
    recargar();
  };

  const ventasHoy = leerVentas().filter((v) => String(v.fecha).startsWith(hoyStr())).reverse();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading mb-4 flex items-center gap-2 text-lg font-bold">
          <BadgeDollarSign className="h-5 w-5 text-primary" /> Nueva venta de perfume
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setProductoId("");
              setPrecio("");
            }}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="">Categoría...</option>
            <option value="caballero">Caballero</option>
            <option value="dama">Dama</option>
            <option value="unisex">Unisex</option>
          </select>
          <select
            value={productoId}
            onChange={(e) => {
              setProductoId(e.target.value);
              const p = cat.find((x) => x.id === e.target.value);
              if (p) setPrecio(String(p.precio));
            }}
            disabled={!categoria}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-50"
          >
            <option value="">{categoria ? "Elige un perfume..." : "Elige categoría primero..."}</option>
            {disponibles.slice(0, 160).map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          <input
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            type="number"
            min="1"
            placeholder="Cantidad"
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            inputMode="numeric"
            placeholder="Precio unitario (COP)"
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-primary/5 px-5 py-4">
          <span className="text-sm font-semibold text-muted-foreground">Total</span>
          <span className="font-heading text-2xl font-bold text-primary">{fmtCOP(total)}</span>
        </div>
        <button
          onClick={registrar}
          className="mt-3 w-full rounded-full bg-green-600 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.01] hover:bg-green-700"
        >
          <Check className="mr-1.5 inline h-4 w-4" /> Registrar venta
        </button>
        {aviso && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 rounded-xl bg-green-500/10 px-4 py-2.5 text-sm font-semibold text-green-700"
          >
            {aviso}
          </motion.p>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading mb-4 flex items-center gap-2 text-lg font-bold">Ventas de hoy</h2>
        {ventasHoy.length === 0 ? (
          <EstadoVacio icon={Receipt} texto="Sin ventas hoy" />
        ) : (
          <ul className="space-y-2">
            {ventasHoy.map((v, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-4 py-2.5 text-sm">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{v.cat}</p>
                  <p className="truncate font-semibold">{v.nombre}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{fmtCOP(v.total)}</p>
                  <p className="text-xs text-muted-foreground">
                    x{v.cant} · {fmtCOP(v.precio)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Historial() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const ventas = leerVentas();
  const lista = useMemo(
    () =>
      ventas
        .filter((v) => {
          if (filtro !== "todas" && v.categoria !== filtro) return false;
          if (desde && String(v.fecha) < desde) return false;
          if (hasta && String(v.fecha) > hasta) return false;
          return true;
        })
        .reverse(),
    [ventas, desde, hasta, filtro]
  );

  const total = lista.reduce((s, v) => s + Number(v.total || 0), 0);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">Desde</label>
            <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">Hasta</label>
            <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            ["todas", "Todas"],
            ["caballero", "Caballero"],
            ["dama", "Dama"],
            ["unisex", "Unisex"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFiltro(id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                filtro === id ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-primary/5 px-5 py-4">
          <span className="text-sm font-semibold text-muted-foreground">Total del período</span>
          <span className="font-heading text-xl font-bold text-primary">{fmtCOP(total)}</span>
        </div>
      </section>

      {lista.length === 0 ? (
        <EstadoVacio icon={History} texto="Sin registros en este período" />
      ) : (
        <ul className="space-y-2">
          {lista.map((v, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{v.cat}</p>
                <p className="truncate font-semibold">{v.nombre}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{fmtCOP(v.total)}</p>
                <p className="text-xs text-muted-foreground">
                  {fmtFecha(v.fecha)} · x{v.cant}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="text-center text-xs text-muted-foreground">
        Los datos se guardan en este navegador.
      </p>
    </div>
  );
}