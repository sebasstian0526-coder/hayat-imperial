import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad | Hayat Imperial",
  description:
    "Política de privacidad y tratamiento de datos de Hayat Imperial, tienda de perfumes originales en Cartagena.",
};

const secciones = [
  {
    titulo: "1. Datos que recopilamos",
    texto:
      "Nuestra tienda en línea no te pide cuentas ni contraseñas. Cuando haces un pedido por WhatsApp nos compartes de manera voluntaria los datos necesarios para la entrega: nombre, ciudad, dirección y número de contacto.",
  },
  {
    titulo: "2. Uso de la información",
    texto:
      "Usamos tus datos únicamente para procesar pedidos, coordinar envíos y responder tus consultas. No cedemos, vendemos ni alquilamos tu información a terceros.",
  },
  {
    titulo: "3. Pagos",
    texto:
      "Los pagos se coordinan por WhatsApp mediante transferencia o efectivo. No procesamos ni almacenamos datos de tarjetas de crédito ni débito.",
  },
  {
    titulo: "4. Protección de la información",
    texto:
      "Mantenemos tus datos de contacto en los canales privados de la tienda y solo los usan las personas autorizadas para la gestión de pedidos.",
  },
  {
    titulo: "5. Cookies",
    texto:
      "Este sitio puede usar almacenamiento local en tu navegador para recordar el contenido de tu carrito de compras. No utilizamos cookies de rastreo publicitario.",
  },
  {
    titulo: "6. Tus derechos",
    texto:
      "Puedes solicitar la consulta, corrección o eliminación de tus datos personales en cualquier momento escribiéndonos por WhatsApp.",
  },
  {
    titulo: "7. Cambios en esta política",
    texto:
      "Podemos actualizar esta política ocasionalmente. Los cambios se publicarán en esta misma página.",
  },
];

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Legal
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Política de privacidad
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
    </main>
  );
}