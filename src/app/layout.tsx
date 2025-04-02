import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naomi Devenport",
  description: "Naomi's Portofolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed top-0 left-0 w-full p-8 bg-transparent z-50">
          <h1 className="text-4xl font-bold">Naomi Devenport</h1>
          <p className="text-xl text-gray-300">2D Background Supervisor</p>
        </header>
        {children}
      </body>
    </html>
  );
}
