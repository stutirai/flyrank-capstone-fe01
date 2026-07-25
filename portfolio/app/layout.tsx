import "./globals.css";
import Navbar from "./components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Portfolio",
  description: "Frontend AI Engineering Capstone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-900 text-white text-center p-4">
          © 2026 Stuti Rai
        </footer>
      </body>
    </html>
  );
}