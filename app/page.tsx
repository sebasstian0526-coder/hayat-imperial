"use client";

import Hero from "@/components/Hero";
import Catalogo from "@/components/Catalogo";
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <main>
      <Hero />
      <Catalogo />
      <Contacto />
    </main>
  );
}