import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "LinkFlow | My Personal Directory",
  description: "Organize and access your favorite links with a beautiful personal directory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="max-w-[1000px] mx-auto p-4 sm:p-8">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
