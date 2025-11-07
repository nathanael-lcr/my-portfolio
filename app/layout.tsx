import "./globals.css";
import { Figtree, Bokor } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const bokor = Bokor({
  subsets: ["latin"],
  variable: "--font-bokor",
  weight: "400",
});

export const metadata = {
  title: "Nathanaël Lecron | Full-Stack Developer",
  description: "This is my portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${bokor.variable}`}>
      <body className="bg-neutral-50 text-neutral-900">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
