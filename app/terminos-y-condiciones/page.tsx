import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones | Hayat Imperial",
  description:
    "Términos y condiciones de compra, envíos y cambios de Hayat Imperial, perfumes originales en Cartagena.",
};

const secciones = [
  {
    titulo: "1. Información general",
    texto:
      "Hayat Imperial es una tienda de perfumes originales e importados ubicada en la Calle de la Cruz, Cartagena de Indias, Colombia. Al realizar un pedido a través de nuestra página web o WhatsApp, aceptas los presentes términos y condiciones.",
  },
  {
    titulo: "2. Pedidos",
    texto:
      "Los pedidos se realizan a través de nuestro catálogo en línea y se confirman por WhatsApp. Una vez confirmado el pedido y acordado el pago, procedemos al despacho. La disponibilidad de cada perfume puede variar según el stock de la tienda.",
  },
  {
    titulo: "3. Precios y pagos",
    texto:
      "Los precios están expresados en pesos colombianos (COP) e incluyen los productos. Aceptamos pago en efectivo (en tienda) y transferencias a través de Nequi, Bancolombia y otras entidades bancarias. El valor final puede incluir el costo de envío según el destino.",
  },
  {
    titulo: "4. Envíos y entregas",
    texto:
      "Realizamos envíos a todo el territorio colombiano. En Cartagena la entrega puede realizarse el mismo día o en un máximo de 24 horas, sujeto a disponibilidad. Para otras ciudades, el tiempo depende de la transportadora contratada. Los costos de envío se informan antes de confirmar la compra.",
  },
  {
    titulo: "5. Cambios y devoluciones",
    texto:
      "Aceptamos cambios únicamente en productos sin estrenar, con su empaque original sellado y dentro de los 3 días calendario posteriores a la compra. Los productos ya abiertos o utilizados no podrán cambiarse ni reembolsarse. Las devoluciones solo proceden si el producto presenta un defecto de fábrica comprobable.",
  },
  {
    titulo: "6. Garantía de originalidad",
    texto:
      "Todos nuestros productos son originales e importados. Cada perfume se entrega sellado con su empaque original. En caso de duda sobre la autenticidad, el cliente puede verificar los códigos de seguridad del producto.",
  },
  {
    titulo: "7. Responsabilidad",
    texto:
      "Los datos e imágenes mostrados en el catálogo son informativos. Hacemos el mejor esfuerzo por mantenerlos actualizados, pero puede haber variaciones menores entre versiones o lotes de un mismo producto.",
  },
  {
    titulo: "8. Modificaciones",
    texto:
      "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia una vez publicados en esta página.",
  },
];

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Legal
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Términos y condiciones
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última actualización: septiembre de 2026.
        </p>
      </div>

      <div className="space-y-8">
        {secciones.map((s) => (
          <section key={s.titulo}>
            <h2 className="font-heading mb-2 text-lg font-bold">{s.titulo}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.texto}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
        Para más información escríbenos por{" "}
        <Link href="/faq" className="font-semibold text-primary hover:underline">
          WhatsApp
        </Link>
        {" · "}
        <Link href="/faq" className="font-semibold text-primary hover:underline">
          preguntas frecuentes
        </Link>
      </div>
    </main>
  );
}