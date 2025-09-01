import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { AppProvider } from "./AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Annotation du GDN",
  description: "Page d'annotation du Grand Debat National",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <header className="site-header" style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ color: "white" }}>Annotation du Grand Débat National</h1>
            <nav>
               <Link href="/welcome" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>
                Tutoriel
              </Link>
              <Link href="/examples" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>
                Exemples
              </Link>
              <Link href="/annotations" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>
                Annotations
              </Link>
              <Link href="/user" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>
                Profil
              </Link>
              <Link href="/contact" style={{ color: "white", marginLeft: "1rem", textDecoration: "none" }}>
                Contact
              </Link>
            </nav>
          </header>
          <main className="main-content">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
