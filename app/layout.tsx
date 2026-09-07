import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CarritoSheet from "@/components/CarritoSheet";
import Footer from "@/components/Footer";
import { FondoAnimado } from "@/components/FondoAnimado";
import { CarritoProvider } from "@/lib/carrito";
import { EstadoShopProvider } from "@/lib/estado";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
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