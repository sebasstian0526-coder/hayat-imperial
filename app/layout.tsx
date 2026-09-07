import type { Metadata } from "next";
import { Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CarritoSheet from "@/components/CarritoSheet";
import Footer from "@/components/Footer";
import { FondoAnimado } from "@/components/FondoAnimado";
import { CarritoProvider } from "@/lib/carrito";
import { EstadoShopProvider } from "@/lib/estado";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hayat Imperial | Perfumes Originales en Cartagena",
  description:
    "Perfumes originales e importados para hombre, mujer y unisex. Envíos a todo Colombia desde Cartagena, Calle de la Cruz. Pedidos por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full">
        <FondoAnimado />
        <CarritoProvider>
          <EstadoShopProvider>
            <Navbar />
            {children}
            <Footer />
            <CarritoSheet />
          </EstadoShopProvider>
        </CarritoProvider>
      </body>
    </html>
  );
}