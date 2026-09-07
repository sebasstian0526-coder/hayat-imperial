"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <div className="flex items-center gap-2.5">
          <img src="/hayat.jpg" alt="" className="h-8 w-8 rounded-full object-cover" />
          <span className="font-heading text-base font-semibold tracking-wide">
            Hayat <span className="text-primary">Imperial</span>
          </span>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          Perfumes originales e importados. Envíos a todo Colombia. ¡El olor de la elegancia!
        </p>
        <p className="text-[11px] text-muted-foreground/60">
          © {new Date().getFullYear()} Hayat Imperial · Cartagena de Indias
        </p>
      </div>
    </footer>
  );
}