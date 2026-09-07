"use client";

import { MessageCircle, MapPin, HelpCircle, Lock } from "lucide-react";
import Link from "next/link";
import { WHATSAPP } from "@/lib/productos";

export default function Footer() {
  const anio = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <div className="flex items-center gap-2.5">
            <img src="/hayat.jpg" alt="" className="h-9 w-9 rounded-full object-cover ring-1 ring-primary/30" />
            <span className="font-heading text-lg font-bold tracking-wide">
              Hayat <span className="text-primary">Imperial</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Perfumes originales e importados. Envíos a todo Colombia. ¡El olor de la
            elegancia!
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-widest">
            Tienda
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/#caballero" className="hover:text-foreground">Caballero</Link></li>
            <li><Link href="/#dama" className="hover:text-foreground">Dama</Link></li>
            <li><Link href="/#unisex" className="hover:text-foreground">Unisex</Link></li>
            <li><Link href="/#marcas" className="hover:text-foreground">Marcas</Link></li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-widest">
            Ayuda
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/faq" className="inline-flex items-center gap-1.5 hover:text-foreground">
                <HelpCircle className="h-3.5 w-3.5" /> Preguntas frecuentes
              </Link>
            </li>
            <li><Link href="/terminos-y-condiciones" className="hover:text-foreground">Términos y condiciones</Link></li>
            <li><Link href="/politica-de-privacidad" className="hover:text-foreground">Política de privacidad</Link></li>
            <li>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-muted-foreground/70 hover:text-foreground">
                <Lock className="h-3 w-3" /> Panel admin
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-widest">
            Contacto
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Cartagena, Calle de la Cruz
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-center text-[11px] text-muted-foreground/60">
        © {anio} Hayat Imperial · Cartagena de Indias
      </p>
    </footer>
  );
}